# 🔬 Holofix — Auditoria de Escopo
### Qual setor atacar primeiro, e o que o técnico faz com os óculos todo dia

**Projeto:** Holofix · **Data:** 17/10/2026 · **Complementa:** Caderno de Estratégia (PECEGE)

> 🎯 **Pergunta da auditoria:** em qual setor o Holofix resolve uma dor **muito latente**, com **uso contínuo** (todo dia, não só em emergência) e **prático**?
> ⚠ = julgamento do grupo ou dado de fonte secundária. Onde só há dado de fornecedor, está dito.

---

## ⚡ Veredito em 30 segundos

🏆 **Setor-alvo do piloto: manutenção de linhas de produção em indústria de alimentos e bebidas** (envase, embalagem, utilidades).
🥈 **Plano B:** técnicos de campo de refrigeração/HVAC e elevadores.

**Por quê:** parada de linha é cara, a equipe do turno precisa seguir rotinas **todo dia** (ronda, ordem de serviço, passagem de turno), e o especialista quase nunca está na planta. O ganho não depende de emergência: **a ajuda remota é a exceção; a rotina guiada é o uso diário.**

**Ressalva honesta:** se o critério for *só* frequência de uso, o Plano B ganha (ver sensibilidade).

---

## 1 · Por que a ajuda remota sozinha não basta

Pedir ajuda acontece de vez em quando. Um produto usado **todo dia** precisa servir a rotina. Por isso o Holofix passa a ter **cinco usos diários**, com a ajuda ao especialista como o último:

| # | Uso diário | Quem usa | Quando |
|---|---|---|---|
| 1 | 🔁 **Ronda de inspeção** com checklist por equipamento | Todo técnico do turno | Início e meio do turno |
| 2 | 🧰 **Ordem de serviço guiada** (passo a passo, EPI e bloqueio antes de começar) | Quem executa a manutenção | A cada serviço |
| 3 | 🔄 **Troca de formato / setup de linha** com etapas e conferência | Mecânico e operador | A cada troca ⚠ |
| 4 | 📝 **Passagem de turno** por voz (o que ficou aberto) | Todos | Fim do turno |
| 5 | 🆘 **Pedir ajuda** ao especialista com imagem e texto | Quem travou | Exceção |

---

## 2 · Candidatos auditados

| Cód. | Setor | Perfil de uso |
|---|---|---|
| **A** | Alimentos e bebidas (linhas de produção) | Equipe de manutenção por turno, rotinas diárias |
| **B** | Usinas solares (O&M) | Equipes dispersas em campo aberto |
| **C** | Mineração e siderurgia | Ativos críticos, áreas de risco |
| **D** | Refrigeração/HVAC e elevadores | Técnico sozinho, vários atendimentos por dia |
| **E** | Máquinas agrícolas e frotas pesadas | Campo, sazonal |
| **F** | Engenharia clínica hospitalar | Equipamentos médicos regulados |

---

## 3 · Critérios e pesos

| Critério | Peso | Pergunta |
|---|---|---|
| 💥 Dor / custo da parada | 20% | Parar custa caro? |
| 📆 Frequência de uso diário | 20% | O técnico usa todo dia? |
| 🎓 Falta de especialista no local | 15% | O remoto faz diferença? |
| 📶 Ambiente e conexão | 15% | Óculos e internet funcionam ali? |
| 🔎 Viabilidade com modelos prontos | 10% | A visão pronta ajuda de verdade? |
| 🤝 Facilidade de piloto e venda | 10% | Dá pra testar em 30 dias? |
| 🛡️ Baixo risco regulatório | 10% | Menos exigência legal e de segurança? |

---

## 4 · Matriz (notas de 1 a 5, 5 = melhor)

| Setor | Dor | Uso | Remoto | Ambiente | Visão | Piloto | Risco | **Total** |
|---|---|---|---|---|---|---|---|---|
| 🥇 **A · Alimentos e bebidas** | 5 | 4 | 4 | 4 | 3 | 4 | 4 | **4,10** |
| 🥈 **D · Refrigeração/HVAC e elevadores** | 3 | 5 | 5 | 3 | 3 | 4 | 4 | **3,90** |
| 🥉 B · Usinas solares | 3 | 4 | 4 | 2 | 4 | 3 | 3 | 3,30 |
| 🥉 C · Mineração e siderurgia | 5 | 4 | 4 | 2 | 3 | 1 | 2 | 3,30 |
| E · Agrícola e frotas | 4 | 3 | 4 | 1 | 3 | 3 | 4 | 3,15 |
| F · Engenharia clínica | 4 | 3 | 4 | 3 | 2 | 2 | 1 | 2,95 |

**Por que as notas:**
- **A:** dor alta, rede interna (Wi-Fi) e rotina de turno. Visão nota 3: o modelo pronto reconhece EPI, mas não a sua máquina.
- **D:** o técnico sozinho com um sênior remoto é o caso mais puro, e atende vários chamados por dia. Mas atua em locais de terceiros (condomínios, lojas), com 4G irregular.
- **B:** a internet em campo aberto é fraca e o sol atrapalha a tela. Há bons modelos prontos para inspeção visual de painéis.
- **C:** a dor é a maior, mas áreas classificadas (risco de explosão) exigem equipamento certificado e a venda é longa.
- **E:** quase sem sinal e uso sazonal.
- **F:** exigência regulatória e privacidade de paciente.

---

## 5 · Teste de sensibilidade (e se os pesos mudarem?)

| Cenário de pesos | A | D | Vence |
|---|---|---|---|
| Base (acima) | 4,10 | 3,90 | **A** |
| Foco em vender rápido (piloto 25%, dor 15%) | 4,05 | 3,95 | **A** (margem pequena) |
| Foco em uso contínuo (uso 35%, dor 10%) | 4,00 | 4,20 | **D** |

📌 **Leitura:** A e D estão **próximos**. A é a escolha mais segura para um piloto com óculos (equipe fixa, rede interna, orçamento maior). D passa à frente só se **frequência de uso** for o único critério. **Se o grupo tem acesso a uma empresa de refrigeração ou elevadores, vale reavaliar.**

---

## 6 · Qualidade das evidências

| Dado | Fonte | Confiança |
|---|---|---|
| Custo de manutenção na faixa de **4% a 5% do faturamento** | Abraman, citada em reportagens e artigos de 2007 a 2026 | 🟡 Média: fonte secundária, datas variadas |
| Alimentos e bebidas com **1,40%** do faturamento | Estudo Abraman de 2011, citado em trabalho acadêmico | 🟠 Baixa: antigo. Mostra que o custo da manutenção é pequeno; **a dor é a parada, não o gasto** |
| Tempo efetivo do técnico ("mão na ferramenta") de **25% a 35%** | Artigos de 2026 e relatório citado pelo Monitor Mercantil | 🟡 Média |
| Parada não planejada: **~US$ 125 mil/h** (média) e até **R$ 700 mil/h** (teto) | IndustriALL; ABB com Sapio Research (via imprensa) | 🟠 Baixa para o nosso caso: **não é por setor** |
| Óculos de suporte remoto **reduziram até 50% a parada** na Coca-Cola HBC | Estudo de caso publicado pelo **próprio fornecedor** (TeamViewer) | 🟠 Baixa: fonte interessada |
| **+25% de acerto na 1ª visita**, −32% de erros, retorno em 9 a 18 meses | Blog de um fornecedor de software, sem nomear clientes | 🔴 Não verificável |
| Escassez de técnicos qualificados | **Não encontrei dado confiável** | 🔴 Lacuna |

⚠ **Conclusão da auditoria de evidências:** a dor é **plausível e comum**, mas **não há prova independente do ganho**. Por isso o piloto existe: **ele gera a evidência que falta.** O caderno não deve prometer percentual de ganho.

---

## 7 · Escopo delimitado (setor A)

### 👥 Quem usa
- **Usuário dos óculos:** mecânico, eletricista e lubrificador do turno de manutenção.
- **Usuário do painel:** supervisor ou engenheiro de manutenção, ou especialista do fabricante da máquina (remoto).
- **Piloto:** 1 planta, 1 linha, 1 turno, ≥ 5 técnicos.

### 🕐 Um dia de uso (turno)
| Hora ⚠ | O que acontece |
|---|---|
| Início | Técnico põe os óculos, ouve o **resumo da passagem de turno** e o app **checa EPI** pela câmera (alerta, não bloqueio). |
| Primeira hora | **Ronda**: ~20 pontos ⚠ por QR, foto ou voz: "ok", "atenção" ou "falha". |
| Durante o turno | **Ordens de serviço guiadas**: etapas na tela, aviso de bloqueio e segurança antes de começar. Em troca de formato, checklist de setup. |
| Quando trava | **Pede ajuda**: o app manda quadros e texto; o especialista responde pelo painel. |
| Fim do turno | **Registro por voz** do que ficou aberto; vira o resumo do próximo turno. |

### ✅ Dentro do escopo (versão 1)
- Ronda por checklist com QR, foto e voz.
- Ordem de serviço e troca de formato com passo a passo.
- Alerta de EPI por modelo pronto.
- Pedido de ajuda com imagem, texto e resposta no painel.
- Passagem de turno por voz.
- Registro de tempos, resultado e nota (indicadores do caderno).

### ⛔ Fora do escopo (por enquanto)
- Diagnóstico automático de falha.
- Áreas classificadas (risco de explosão).
- Vídeo contínuo ao vivo.
- Integração com ERP/CMMS do cliente.
- Modelo de visão próprio e manutenção preditiva por sensores.
- Outros setores.

### 📏 Como saber se é uso contínuo (metas do piloto ⚠)
| Indicador | Sinal bom |
|---|---|
| Rondas feitas com os óculos ÷ rondas previstas | Alto e **estável** por 4 semanas |
| Técnicos que abrem o app em dias seguidos | Maioria usa sem ser cobrada |
| Ordens guiadas ÷ ordens totais | Cresce semana a semana |
| Pedidos de ajuda | **Podem até cair** (técnico resolve com o guia): isso também é sucesso |

---

## 8 · Riscos do escopo escolhido

| Risco | Plano |
|---|---|
| Wi-Fi fraco em partes da planta | Ronda e OS funcionam **sem internet** e enviam depois |
| Técnico acha cansativo | Voz e 1 toque; sem digitar |
| Óculos não aprovados em área de produção | Validar com segurança do trabalho antes do piloto |
| Câmera capta pessoas | Aviso, retenção curta, sem gravar vídeo contínuo |
| Reconhecimento erra | Confirmar sempre por QR ou lista; mostrar "pode ser" |

---

## 9 · O que muda no app

1. **QR e checklist de ronda** viram o fluxo principal (não só o pedido de ajuda).
2. **Modo offline** para ronda e ordens de serviço.
3. **Passagem de turno** por voz.
4. Reconhecimento por modelo pronto vira **apoio**; o QR confirma o equipamento.
5. O catálogo nasce com **ativos de uma linha de envase** (editável).

## ☑️ Para validar com o cliente
- [ ] Rotinas reais do turno (ronda, trocas de formato) e quantos pontos por ronda
- [ ] Wi-Fi e cobertura onde os óculos serão usados
- [ ] Regras de segurança e câmera na planta
- [ ] Quem seria o especialista no painel
- [ ] Qual dado de parada o cliente já mede (linha de base do piloto)

Fontes consultadas: Abraman (via [Jornal de Brasília](https://jornaldebrasilia.com.br/brasilia/unb-nao-faz-manutencao-preventiva-de-equipamentos/) e [A Gazeta](https://www.agazeta.com.br/artigos/por-que-a-ia-deve-redefinir-a-manutencao-industrial-nos-proximos-anos-0526)), [Monitor Mercantil](https://monitormercantil.com.br/estudo-revela-que-ate-75-da-jornada-da-manutencao-industrial-pode-ser-desperdicada-no-brasil/), [Rádio Tupi](https://www.tupi.fm/?p=2435711), [estudo de caso Coca-Cola HBC (TeamViewer)](https://www.teamviewer.com/en-ca/resources/success-stories/coca-cola-hbc) e [Oxmaint](https://oxmaint.com/industries/manufacturing-plant/ar-smart-glasses-manufacturing-maintenance-guide).
