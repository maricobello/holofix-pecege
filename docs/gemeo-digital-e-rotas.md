# 🏭 Holofix — Linha-modelo, Gêmeo Digital e Rotas
### Linha 01: envase PET de refrigerante carbonatado

**Projeto:** Holofix · **Data:** 17/10/2026 · **Complementa:** Auditoria de Escopo e Caderno PECEGE

> 🎯 **Para quê:** deixar o piloto **específico**: cada máquina com TAG, cada ronda com ordem e pontos definidos, e um **gêmeo digital** que mostra o estado da linha.
> ⚠ Linha-modelo genérica para o piloto. Máquinas, ordem, riscos e rotas devem ser ajustados à planta real do cliente.
> Os dados vêm de `data/linha-modelo.json` (também usado pelo app). Este documento é gerado por `scripts/gerar-doc-linha.mjs`.

---

## ⚡ A cola de 30 segundos

- **15 máquinas e sistemas** com TAG e QR, **45 pontos de ronda**, **4 rotas**.
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

| TAG | Máquina | Zona | Crit. | Energias a bloquear (LOTO) | Riscos | Falhas típicas ⚠ |
|---|---|---|---|---|---|---|
| **UT‑CAR‑01** | Compressor de ar (parafuso) | Utilidades | A | elétrica, ar comprimido | ruído, superfície quente, alta pressão | filtro de ar saturado; vazamento de óleo; superaquecimento; dreno de condensado travado |
| **UT‑CO2‑01** | Estação de CO2 | Utilidades | B | gás CO2 pressurizado | asfixia em local fechado, alta pressão | vazamento em conexão; nível baixo no tanque; congelamento de linha |
| **UT‑CHL‑01** | Chiller de água gelada (moldes e processo) | Utilidades | B | elétrica | alta tensão, fluido refrigerante | baixa vazão; alarme de alta pressão; vazamento de água |
| **UT‑CIP‑01** | Estação CIP (limpeza no local) | Xaroparia e CIP | B | elétrica, pneumática, vapor ou água quente | soda e ácido: queimadura química, piso escorregadio | bomba com vazamento; sensor de condutividade fora; válvula travada |
| **LP01‑XAR‑01** | Proporcionador de xarope (blender) | Xaroparia e CIP | A | elétrica, pneumática | partes móveis, piso escorregadio | medidor de vazão com desvio; válvula de controle presa; vedação de bomba vazando |
| **LP01‑SOP‑01** | Sopradora de PET | Sopro de garrafas | A | elétrica, ar comprimido de alta pressão, térmica (forno) | alta pressão de ar, forno quente, partes móveis em alta velocidade | lâmpadas do forno queimadas; vazamento de ar no molde; válvula de sopro presa; garra de pré-forma desgastada |
| **LP01‑TRA‑01** | Transportadores de garrafas | Envase | B | elétrica, pneumática | pontos de esmagamento, correntes em movimento | corrente desalinhada; lubrificação deficiente; sensor de acúmulo falhando; garrafas tombando |
| **LP01‑ENC‑01** | Enchedora isobárica | Envase | A | elétrica, pneumática, CO2, produto | partes móveis, piso escorregadio, garrafa estourando | válvula de enchimento gotejando; vedação do carrossel; sensor de nível da cuba; desvio de volume |
| **LP01‑CAP‑01** | Capsulador (fechadora de tampas) | Envase | A | elétrica, pneumática | partes móveis | cabeçote desgastado; alimentação de tampas travada; torque fora da faixa; sensor de tampa falhando |
| **LP01‑INS‑01** | Inspetor de nível e tampa | Rotulagem e codificação | B | elétrica, pneumática | partes móveis (rejeitador) | lente suja; rejeição excessiva; sensor desalinhado |
| **LP01‑ROT‑01** | Rotuladora | Rotulagem e codificação | B | elétrica, térmica (cola quente) | faca de corte, cola quente | faca desgastada; cola insuficiente; rótulo torto; sensor de rótulo falhando |
| **LP01‑COD‑01** | Codificador a jato de tinta | Rotulagem e codificação | B | elétrica, solvente | solvente inflamável | bico entupido; nível de tinta ou solvente baixo; código ilegível |
| **LP01‑EMB‑01** | Embaladora com filme termoencolhível | Embalagem e paletização | B | elétrica, térmica (forno) | forno quente, facas de corte | filme com furo; temperatura do forno fora da faixa; faca desgastada; esteira desalinhada |
| **LP01‑PAL‑01** | Paletizadora | Embalagem e paletização | A | elétrica, pneumática | braço e partes móveis, intertravamento da cerca de segurança | garra ou ventosa desgastada; sensor de camada falhando; fim de curso; falha no intertravamento |
| **LP01‑ENV‑01** | Envolvedora de pallet (filme esticável) | Embalagem e paletização | C | elétrica | partes giratórias | tensão do filme; carro de filme travado; sensor de altura |

---

## 4 · As rotas

Cada rota segue o **sentido do fluxo**, para o técnico andar uma vez só. ⚠ A ordem física depende do layout real; ajustar na planta.

### R1 · Abertura de turno: linha inteira
**Quando:** Início do turno e após parada longa · **Paradas:** 14 · **Pontos:** 33 · **Tempo ⚠:** cerca de 64 min (1,5 min por ponto + 1 min por deslocamento, a medir no piloto)

| # | Máquina | Ponto | Como verificar | Resposta |
|---|---|---|---|---|
| 1 | **UT‑CAR‑01**<br>Compressor de ar | Pressão de descarga | Ler o manômetro ou o painel | Número (bar) |
| 2 |  | Temperatura e alarmes do painel | Foto do painel | Foto |
| 3 | **UT‑CO2‑01**<br>Estação de CO2 | Nível e pressão do tanque de CO2 | Ler o indicador | Número (bar) |
| 4 |  | Vazamento nas conexões | Ouvir chiado e ver gelo nas conexões | OK / Atenção / Falha |
| 5 | **UT‑CIP‑01**<br>Estação CIP | Último ciclo de CIP concluído | Conferir o registro no painel | Sim / Não |
| 6 | **LP01‑XAR‑01**<br>Proporcionador de xarope | Brix do produto | Ler o analisador em linha | Número (°Brix) |
| 7 |  | Vazamento em bombas e vedações | Ver o piso e as vedações | OK / Atenção / Falha |
| 8 |  | Alarmes ativos | Foto do painel | Foto |
| 9 | **LP01‑SOP‑01**<br>Sopradora de PET | Lâmpadas do forno | Olhar pela janela de inspeção, sem abrir | OK / Atenção / Falha |
| 10 |  | Vazamento de ar na região dos moldes | Ouvir chiado, sem encostar | OK / Atenção / Falha |
| 11 |  | Garrafas sem defeito (base, parede, gargalo) | Foto de 3 garrafas da saída | Foto |
| 12 | **LP01‑TRA‑01**<br>Transportadores de garrafas | Ruído anormal e vibração | Ouvir ao longo do trecho | OK / Atenção / Falha |
| 13 |  | Lubrificação de corrente e guias | Ver se está seca ou com excesso | OK / Atenção / Falha |
| 14 | **LP01‑ENC‑01**<br>Enchedora isobárica | Gotejamento nas válvulas de enchimento | Olhar o carrossel em movimento | OK / Atenção / Falha |
| 15 |  | Pressão da cuba | Ler o manômetro | Número (bar) |
| 16 |  | Nível da cuba estável | Ver o visor por 30 segundos | OK / Atenção / Falha |
| 17 | **LP01‑CAP‑01**<br>Capsulador | Alimentação de tampas | Ver o fluxo contínuo, sem travar | OK / Atenção / Falha |
| 18 |  | Tampas tortas ou frouxas | Foto de 3 garrafas fechadas | Foto |
| 19 |  | Ruído nos cabeçotes | Ouvir o carrossel | OK / Atenção / Falha |
| 20 | **LP01‑INS‑01**<br>Inspetor de nível e tampa | Lente e câmera limpas | Foto da lente | Foto |
| 21 |  | Taxa de rejeição estável | Ler o contador do painel | Número (%) |
| 22 | **LP01‑ROT‑01**<br>Rotuladora | Cola: nível e temperatura | Ler o painel e o reservatório | OK / Atenção / Falha |
| 23 |  | Rótulos alinhados e colados | Foto de 3 garrafas | Foto |
| 24 |  | Faca de corte | Ver o corte do rótulo (sem tocar na faca) | OK / Atenção / Falha |
| 25 | **LP01‑COD‑01**<br>Codificador a jato de tinta | Código de lote e validade legível | Foto do código na garrafa | Foto |
| 26 |  | Nível de tinta e solvente | Ler o painel do codificador | OK / Atenção / Falha |
| 27 | **LP01‑EMB‑01**<br>Embaladora com filme termoencolhível | Pacotes bem selados | Foto de um pacote na saída | Foto |
| 28 |  | Temperatura do forno | Ler o painel | Número (°C) |
| 29 |  | Bobina de filme: quantidade restante | Olhar a bobina | OK / Atenção / Falha |
| 30 | **LP01‑PAL‑01**<br>Paletizadora | Intertravamento da cerca e das portas | Confirmar que portas fecham e o rearme funciona | OK / Atenção / Falha |
| 31 |  | Garras e ventosas | Ver desgaste e se seguram a carga | OK / Atenção / Falha |
| 32 | **LP01‑ENV‑01**<br>Envolvedora de pallet | Pallet envolvido e firme | Foto do pallet pronto | Foto |
| 33 |  | Filme: estoque e tensão | Olhar a bobina e o carro de filme | OK / Atenção / Falha |

### R2 · Utilidades e CIP
**Quando:** Duas vezes por turno (hipótese) · **Paradas:** 4 · **Pontos:** 9 · **Tempo ⚠:** cerca de 18 min (1,5 min por ponto + 1 min por deslocamento, a medir no piloto)

| # | Máquina | Ponto | Como verificar | Resposta |
|---|---|---|---|---|
| 1 | **UT‑CAR‑01**<br>Compressor de ar | Pressão de descarga | Ler o manômetro ou o painel | Número (bar) |
| 2 |  | Temperatura e alarmes do painel | Foto do painel | Foto |
| 3 |  | Dreno de condensado | Ver se está drenando, sem travar | OK / Atenção / Falha |
| 4 | **UT‑CO2‑01**<br>Estação de CO2 | Nível e pressão do tanque de CO2 | Ler o indicador | Número (bar) |
| 5 |  | Vazamento nas conexões | Ouvir chiado e ver gelo nas conexões | OK / Atenção / Falha |
| 6 | **UT‑CHL‑01**<br>Chiller de água gelada | Temperatura da água gelada | Ler o painel | Número (°C) |
| 7 |  | Alarmes e ruído anormal | Ver o painel e ouvir | OK / Atenção / Falha |
| 8 | **UT‑CIP‑01**<br>Estação CIP | Nível dos tanques de soda e ácido | Ver o visor dos tanques | OK / Atenção / Falha |
| 9 |  | Vazamento em bombas e válvulas | Ver o piso e as conexões | OK / Atenção / Falha |

### R3 · Pontos críticos: meio de turno
**Quando:** A cada 2 a 3 horas (hipótese) · **Paradas:** 11 · **Pontos:** 19 · **Tempo ⚠:** cerca de 40 min (1,5 min por ponto + 1 min por deslocamento, a medir no piloto)

| # | Máquina | Ponto | Como verificar | Resposta |
|---|---|---|---|---|
| 1 | **UT‑CAR‑01**<br>Compressor de ar | Pressão de descarga | Ler o manômetro ou o painel | Número (bar) |
| 2 | **LP01‑XAR‑01**<br>Proporcionador de xarope | Brix do produto | Ler o analisador em linha | Número (°Brix) |
| 3 |  | Alarmes ativos | Foto do painel | Foto |
| 4 | **LP01‑SOP‑01**<br>Sopradora de PET | Lâmpadas do forno | Olhar pela janela de inspeção, sem abrir | OK / Atenção / Falha |
| 5 |  | Vazamento de ar na região dos moldes | Ouvir chiado, sem encostar | OK / Atenção / Falha |
| 6 |  | Alarmes e contagem de rejeitos | Foto do painel | Foto |
| 7 | **LP01‑TRA‑01**<br>Transportadores de garrafas | Garrafas tombando ou acumulando | Olhar a entrada da enchedora | Sim / Não |
| 8 | **LP01‑ENC‑01**<br>Enchedora isobárica | Gotejamento nas válvulas de enchimento | Olhar o carrossel em movimento | OK / Atenção / Falha |
| 9 |  | Pressão da cuba | Ler o manômetro | Número (bar) |
| 10 |  | Nível das garrafas na saída | Comparar visualmente várias garrafas | OK / Atenção / Falha |
| 11 | **LP01‑CAP‑01**<br>Capsulador | Alimentação de tampas | Ver o fluxo contínuo, sem travar | OK / Atenção / Falha |
| 12 |  | Tampas tortas ou frouxas | Foto de 3 garrafas fechadas | Foto |
| 13 | **LP01‑INS‑01**<br>Inspetor de nível e tampa | Taxa de rejeição estável | Ler o contador do painel | Número (%) |
| 14 | **LP01‑ROT‑01**<br>Rotuladora | Rótulos alinhados e colados | Foto de 3 garrafas | Foto |
| 15 | **LP01‑COD‑01**<br>Codificador a jato de tinta | Código de lote e validade legível | Foto do código na garrafa | Foto |
| 16 | **LP01‑EMB‑01**<br>Embaladora com filme termoencolhível | Pacotes bem selados | Foto de um pacote na saída | Foto |
| 17 | **LP01‑PAL‑01**<br>Paletizadora | Intertravamento da cerca e das portas | Confirmar que portas fecham e o rearme funciona | OK / Atenção / Falha |
| 18 |  | Garras e ventosas | Ver desgaste e se seguram a carga | OK / Atenção / Falha |
| 19 |  | Camadas formadas alinhadas | Foto do pallet em formação | Foto |

### R4 · Fechamento e passagem de turno
**Quando:** Fim do turno · **Paradas:** 1 · **Pontos:** 3 · **Tempo ⚠:** cerca de 6 min (1,5 min por ponto + 1 min por deslocamento, a medir no piloto)

| # | Máquina | Ponto | Como verificar | Resposta |
|---|---|---|---|---|
| 1 | **LP01‑GER‑01**<br>Linha | Pendências que passam para o próximo turno | Falar em voz alta; o app transcreve | Voz |
| 2 |  | Limpeza e organização da linha | Foto da área | Foto |
| 3 |  | Bloqueio (LOTO) ainda ativo em alguma máquina | Conferir cadeados e etiquetas | Sim / Não |


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
