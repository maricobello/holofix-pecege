// Valida data/linha-modelo.json e gera docs/gemeo-digital-e-rotas.md + docs/mapa-linha.svg.
// Uso: node scripts/gerar-doc-linha.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const dados = JSON.parse(readFileSync(join(raiz, "data/linha-modelo.json"), "utf8"));
const { linha, zonas, ativos, pontos, rotas } = dados;

// ---------- validação ----------
const erros = [];
const unicos = (lista, chave, rotulo) => {
  const vistos = new Set();
  for (const item of lista) {
    if (vistos.has(item[chave])) erros.push(`${rotulo} duplicado: ${item[chave]}`);
    vistos.add(item[chave]);
  }
  return vistos;
};
const tagsAtivos = unicos(ativos, "tag", "ativo");
const idsPontos = unicos(pontos, "id", "ponto");
const idsZonas = new Set(zonas.map((z) => z.id));
const idsRotas = unicos(rotas, "id", "rota");

for (const a of ativos) if (!idsZonas.has(a.zona)) erros.push(`ativo ${a.tag}: zona inexistente ${a.zona}`);
for (const p of pontos) {
  if (!tagsAtivos.has(p.ativo)) erros.push(`ponto ${p.id}: ativo inexistente ${p.ativo}`);
  if (!p.id.startsWith(`${p.ativo}.`)) erros.push(`ponto ${p.id}: id não começa com a TAG ${p.ativo}`);
  for (const r of p.rotas) if (!idsRotas.has(r)) erros.push(`ponto ${p.id}: rota inexistente ${r}`);
}
const pontosDaRota = (rota) =>
  rota.ordem.map((tag) => ({
    ativo: ativos.find((a) => a.tag === tag),
    pontos: pontos.filter((p) => p.ativo === tag && p.rotas.includes(rota.id)),
  }));
for (const r of rotas) {
  for (const tag of r.ordem) if (!tagsAtivos.has(tag)) erros.push(`rota ${r.id}: ativo inexistente ${tag}`);
  for (const { ativo, pontos: ps } of pontosDaRota(r)) {
    if (ativo && ps.length === 0) erros.push(`rota ${r.id}: ${ativo.tag} está na ordem mas não tem ponto nesta rota`);
  }
  for (const p of pontos.filter((x) => x.rotas.includes(r.id))) {
    if (!r.ordem.includes(p.ativo)) erros.push(`rota ${r.id}: ponto ${p.id} marcado, mas ${p.ativo} não está na ordem`);
  }
}
for (const a of ativos) {
  if (!pontos.some((p) => p.ativo === a.tag)) erros.push(`ativo ${a.tag}: sem nenhum ponto de ronda`);
}
if (erros.length) {
  console.error("Dados inválidos:\n- " + erros.join("\n- "));
  process.exit(1);
}

// ---------- mapa da linha (SVG) ----------
const nomeCurto = (n) => n.replace(/\s*\(.*\)/, "");
const quebra = (texto, max) => {
  const linhas = [];
  let atual = "";
  for (const palavra of texto.split(" ")) {
    if ((atual + " " + palavra).trim().length > max) {
      linhas.push(atual);
      atual = palavra;
    } else atual = (atual + " " + palavra).trim();
  }
  linhas.push(atual);
  return linhas.slice(0, 2);
};
// Estados de exemplo, FICTÍCIOS, só para mostrar as cores.
const exemplo = { "LP01-ENC-01": "atencao", "LP01-CAP-01": "falha", "LP01-COD-01": "manutencao", "LP01-ROT-01": "sem_dado" };
const cores = {
  normal: ["#e3f4f1", "#2a9d8f", "Normal"],
  atencao: ["#fdf3d0", "#e0a800", "Atenção"],
  falha: ["#fde4de", "#e76f51", "Falha"],
  manutencao: ["#e3e8ff", "#3d5afe", "Em manutenção"],
  sem_dado: ["#eceff1", "#90a4ae", "Sem dado"],
};
const fluxo = ["LP01-XAR-01", "LP01-SOP-01", "LP01-TRA-01", "LP01-ENC-01", "LP01-CAP-01", "LP01-INS-01", "LP01-ROT-01", "LP01-COD-01", "LP01-EMB-01", "LP01-PAL-01", "LP01-ENV-01"];
const utilidades = ["UT-CAR-01", "UT-CO2-01", "UT-CHL-01", "UT-CIP-01"];
const W = 112, H = 60, GAP = 18, X0 = 10;
const colX = (c) => X0 + c * (W + GAP);
const caixa = (tag, x, y) => {
  const a = ativos.find((v) => v.tag === tag);
  const [fundo, borda] = cores[exemplo[tag] ?? "normal"];
  const nome = quebra(nomeCurto(a.nome), 18);
  return `<g><rect x="${x}" y="${y}" width="${W}" height="${H}" rx="9" fill="${fundo}" stroke="${borda}" stroke-width="2"/>
<text x="${x + W / 2}" y="${y + 15}" text-anchor="middle" font-size="9" font-weight="700" fill="#0b2a3d">${a.tag}</text>
${nome.map((l, i) => `<text x="${x + W / 2}" y="${y + 31 + i * 12}" text-anchor="middle" font-size="10" fill="#14202b">${l}</text>`).join("\n")}</g>`;
};
const seta = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#5b6b76" stroke-width="2" marker-end="url(#p)"/>`;
const y1 = 38, y2 = 138, yu = 258;
let svg = "";
fluxo.forEach((tag, i) => {
  const linha1 = i < 6;
  const col = linha1 ? i : 5 - (i - 6);
  svg += caixa(tag, colX(col), linha1 ? y1 : y2);
  if (i === 0) return;
  const anteriorLinha1 = i - 1 < 6;
  const colAnt = anteriorLinha1 ? i - 1 : 5 - (i - 1 - 6);
  if (linha1) svg += seta(colX(colAnt) + W, y1 + H / 2, colX(col) - 2, y1 + H / 2);
  else if (anteriorLinha1) svg += seta(colX(col) + W / 2, y1 + H, colX(col) + W / 2, y2 - 2);
  else svg += seta(colX(colAnt), y2 + H / 2, colX(col) + W + 2, y2 + H / 2);
});
utilidades.forEach((tag, i) => (svg += caixa(tag, colX(i), yu)));
const legenda = Object.values(cores)
  .map(([f, b, t], i) => `<rect x="${X0 + i * 140}" y="346" width="14" height="14" rx="3" fill="${f}" stroke="${b}" stroke-width="2"/><text x="${X0 + i * 140 + 20}" y="358" font-size="10" fill="#14202b">${t}</text>`)
  .join("");
const mapa = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${colX(6)} 374" width="100%" font-family="DejaVu Sans, Arial, sans-serif">
<defs><marker id="p" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#5b6b76"/></marker></defs>
<text x="${X0}" y="22" font-size="12" font-weight="700" fill="#0b2a3d">Fluxo da produção (PET pré-forma até pallet)</text>
${svg}
<text x="${X0}" y="244" font-size="12" font-weight="700" fill="#0b2a3d">Utilidades que alimentam a linha</text>
<text x="${X0}" y="336" font-size="10" fill="#5b6b76">Estados de exemplo, fictícios, só para mostrar as cores.</text>
${legenda}
</svg>`;

// ---------- documento ----------
const semQuebra = (t) => t.replaceAll("-", "\u2011");
const zonaNome = (id) => zonas.find((z) => z.id === id).nome;
const tabelaAtivos = [
  "| TAG | Máquina | Zona | Crit. | Energias a bloquear (LOTO) | Riscos | Falhas típicas ⚠ |",
  "|---|---|---|---|---|---|---|",
  ...ativos
    .filter((a) => a.energias.length)
    .map((a) => `| **${semQuebra(a.tag)}** | ${a.nome} | ${zonaNome(a.zona)} | ${a.crit} | ${a.energias.join(", ")} | ${a.riscos.join(", ")} | ${a.falhas.join("; ")} |`),
].join("\n");

const textoRota = (r) => {
  const blocos = pontosDaRota(r);
  const total = blocos.reduce((s, b) => s + b.pontos.length, 0);
  const minutos = Math.ceil(total * 1.5 + blocos.length);
  let n = 0;
  const linhas = blocos.flatMap(({ ativo, pontos: ps }) =>
    ps.map((p, i) => `| ${++n} | ${i === 0 ? `**${semQuebra(ativo.tag)}**<br>${nomeCurto(ativo.nome)}` : ""} | ${p.ponto} | ${p.como} | ${p.resposta} |`),
  );
  return `### ${r.id} · ${r.nome}
**Quando:** ${r.quando} · **Paradas:** ${blocos.length} · **Pontos:** ${total} · **Tempo ⚠:** cerca de ${minutos} min (1,5 min por ponto + 1 min por deslocamento, a medir no piloto)

| # | Máquina | Ponto | Como verificar | Resposta |
|---|---|---|---|---|
${linhas.join("\n")}
`;
};

const totalPontos = pontos.length;
const md = `# 🏭 Holofix — Linha-modelo, Gêmeo Digital e Rotas
### ${linha.nome}

**Projeto:** Holofix · **Data:** 17/10/2026 · **Complementa:** Auditoria de Escopo e Caderno PECEGE

> 🎯 **Para quê:** deixar o piloto **específico**: cada máquina com TAG, cada ronda com ordem e pontos definidos, e um **gêmeo digital** que mostra o estado da linha.
> ⚠ ${linha.aviso}
> Os dados vêm de \`data/linha-modelo.json\` (também usado pelo app). Este documento é gerado por \`scripts/gerar-doc-linha.mjs\`.

---

## ⚡ A cola de 30 segundos

- **${ativos.length - 1} máquinas e sistemas** com TAG e QR, **${totalPontos} pontos de ronda**, **${rotas.length} rotas**.
- O técnico caminha na **ordem do fluxo** e responde cada ponto por voz, toque ou foto.
- O **gêmeo digital** pinta cada máquina de verde, amarelo, vermelho, azul ou cinza, com histórico e pendências.
- Na v1 o gêmeo é alimentado **pelo técnico** (ronda, ordem de serviço, chamado). Ligar a CLP/SCADA fica para a fase 2.

---

## 1 · A linha-modelo

![Mapa da linha](mapa-linha.svg)

| Zona | O que acontece |
|---|---|
| Xaroparia e CIP | Mistura do xarope e limpeza no local |
| Sopro de garrafas | A pré-forma vira garrafa PET |
| Envase | Enche com CO2 e fecha com a tampa |
| Rotulagem e codificação | Rótulo, lote e validade |
| Embalagem e paletização | Pacote, pallet e filme |
| Utilidades | Ar comprimido, CO2 e água gelada |

---

## 2 · O gêmeo digital

**O que é (v1):** um espelho vivo da linha. Cada máquina tem **TAG**, **estado**, **histórico** e **pendências**, alimentados pelo trabalho do técnico.
**O que não é (v1):** não simula a física da máquina e não lê CLP, sensor ou SCADA.
**Fase 2 (só se o piloto pedir):** conectar o mesmo modelo a dados de CLP/SCADA (OPC UA ou MQTT).

### Camadas
| Camada | Conteúdo |
|---|---|
| **Estrutura** | Planta › Linha › Zona › Máquina › Ponto de ronda |
| **Estado** | A cor atual da máquina (regras abaixo) |
| **Histórico** | Rondas, ordens de serviço, chamados e fotos, com data e técnico |
| **Procedimentos** | Passo a passo, EPI e bloqueio de cada serviço |

### Regras de estado (da mais forte para a mais fraca)
| Estado | Quando |
|---|---|
| 🔵 **Em manutenção** | Há ordem de serviço em andamento (bloqueio ativo) |
| 🔴 **Falha** | Algum ponto marcado como Falha, ou chamado urgente aberto |
| 🟡 **Atenção** | Algum ponto marcado como Atenção, ou número fora da faixa cadastrada |
| ⚪ **Sem dado** | Sem ronda dentro de 1,5 vez o intervalo da rota ⚠ |
| 🟢 **Normal** | Última ronda toda OK e nada aberto |

---

<div style="break-before:page"></div>

## 3 · Inventário de ativos

Criticidade: **A** para a linha se parar · **B** degrada a produção · **C** impacto menor. ⚠ Falhas típicas são hipóteses de manutenção; confirmar com o histórico da planta.

${tabelaAtivos}

---

## 4 · As rotas

Cada rota segue o **sentido do fluxo**, para o técnico andar uma vez só. ⚠ A ordem física depende do layout real; ajustar na planta.

${rotas.map(textoRota).join("\n")}

**Tipos de resposta:** OK / Atenção / Falha (1 toque ou voz) · Número com unidade (ler e falar) · Foto · Sim / Não · Voz. As faixas aceitáveis de cada número vêm do **manual do fabricante** ou do **procedimento da planta** (⚠ cadastrar antes do piloto; este caderno não inventa limites).

---

## 5 · Regras de campo

1. **Cada máquina tem um QR.** O técnico escaneia para confirmar onde está; o reconhecimento por imagem é só apoio.
2. **Sem internet, a ronda continua** e os dados sobem quando a rede voltar.
3. **Segurança antes de tudo:** os óculos **não** substituem bloqueio e etiquetagem (LOTO). Em serviço, o app só libera o passo 1 depois de o técnico confirmar o bloqueio.
4. **Nada de mexer em máquina em movimento** para inspecionar: os pontos são de olhar, ouvir e ler painel.
5. **Fora de escopo:** sala de máquinas de amônia e áreas classificadas (risco de explosão).

---

## 6 · O que o app guarda

| Entidade | Principais campos |
|---|---|
| Ativo | TAG, nome, zona, criticidade, energias, riscos, QR |
| Ponto de ronda | Ativo, o que olhar, como, tipo de resposta, faixa |
| Rota | Nome, quando, ordem das máquinas |
| Execução de ronda | Rota, técnico, hora, respostas, fotos |
| Ordem de serviço | Ativo, passos, EPI, bloqueio, resultado |
| Chamado de ajuda | Ativo, quadros, mensagens, urgência |
| Evento | Tudo acima na linha do tempo, que gera o estado |

## ☑️ Para validar com o cliente
- [ ] Quais máquinas existem de fato na linha e em que ordem
- [ ] Layout físico, para ajustar a ordem das rotas
- [ ] Faixas aceitáveis de cada número (pressão, temperatura, Brix)
- [ ] Quantas rondas por turno o cliente já faz e em que papel
- [ ] Onde os óculos e a câmera são permitidos
`;

mkdirSync(join(raiz, "docs"), { recursive: true });
writeFileSync(join(raiz, "docs/mapa-linha.svg"), mapa);
writeFileSync(join(raiz, "docs/gemeo-digital-e-rotas.md"), md);

// ---------- resumo direto (1 a 2 páginas) ----------
const resumoRotas = rotas.map((r) => {
  const blocos = pontosDaRota(r);
  const total = blocos.reduce((n, b) => n + b.pontos.length, 0);
  const minutos = Math.ceil(total * 1.5 + blocos.length);
  const paradas = blocos.map((b) => nomeCurto(b.ativo.nome)).join(" › ");
  return `| **${r.id}** ${r.nome} | ${r.quando} | ${paradas} | ${total} | ~${minutos} min |`;
});
const resumo = `# 🏭 Holofix — Linha, Gêmeo Digital e Rotas
### Resumo direto · ${linha.nome}

**Data:** 17/10/2026 · ⚠ Linha-modelo para o piloto; ajustar à planta real.

![Mapa da linha](mapa-linha.svg)

## 🗺️ As 4 rotas (na ordem do fluxo)

| Rota | Quando | Paradas | Pontos | Tempo ⚠ |
|---|---|---|---|---|
${resumoRotas.join("\n")}

⚠ Tempo = 1,5 min por ponto + 1 min por parada. A medir no piloto.

## 🚦 Estado de cada máquina no gêmeo digital

| Cor | Quando |
|---|---|
| 🔵 Em manutenção | Ordem de serviço em andamento (bloqueio ativo) |
| 🔴 Falha | Ponto marcado Falha, ou chamado urgente aberto |
| 🟡 Atenção | Ponto marcado Atenção, ou número fora da faixa |
| ⚪ Sem dado | Sem ronda no prazo (1,5 vez o intervalo ⚠) |
| 🟢 Normal | Última ronda toda OK e nada aberto |

## ✅ Regras de campo

1. **QR em cada máquina**: o técnico confirma onde está; o reconhecimento por imagem é só apoio.
2. **Sem internet, a ronda continua** e sobe quando a rede voltar.
3. **LOTO manda**: os óculos não substituem bloqueio e etiquetagem.
4. **Só olhar, ouvir e ler painel**: nunca mexer em máquina em movimento.
5. **Fora de escopo**: sala de amônia e áreas classificadas.

## ☑️ Validar com o cliente
- [ ] Máquinas reais da linha e a ordem
- [ ] Layout físico (ajusta a ordem das rotas)
- [ ] Faixas aceitáveis de pressão, temperatura e Brix (manual do fabricante)
- [ ] Onde óculos e câmera são permitidos
`;
writeFileSync(join(raiz, "docs/gemeo-digital-resumo.md"), resumo);
console.log(`OK: ${ativos.length} ativos, ${pontos.length} pontos, ${rotas.length} rotas`);
