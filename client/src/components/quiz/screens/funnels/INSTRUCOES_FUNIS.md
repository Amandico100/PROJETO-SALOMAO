# 🌪️ DOCUMENTAÇÃO TÉCNICA: FUNIS DE CONVERSÃO (PÓS-RESULTADO)

Esta pasta contém os fluxos de telas que ocorrem **após** o cálculo do resultado.
O sistema possui **3 ARQUÉTIPOS** de venda. O Salomão deve escolher qual usar baseado no modelo de negócio do cliente.

---

## 1️⃣ ARQUÉTIPO "VENDA DIGITAL" (Produtos/Info)
**Foco:** Emoção -> Transformação -> Compra Imediata (Cartão/Pix).
**Ideal para:** E-books, Cursos Online, Dietas, Apps, Treinos.

*Este arquétipo funciona em 2 etapas (2 Arquivos):*

### ETAPA A: O AQUECIMENTO
**Arquivo:** `ConversionFlow.tsx`
**O que faz:**
1.  **Significado:** "O que isso significa para você?" (Ancoragem Emocional).
2.  **Projeção:** Gráfico de linha mostrando o sucesso futuro.
3.  **Identidade:** Gráfico Donut de compatibilidade (98%).
4.  **Compromisso:** "Você promete seguir o plano?" (Micro-sim).
5.  **Lead Gate:** Captura Nome e WhatsApp antes de revelar a oferta.
**Configuração (Props):**
* `brandName`: Nome do Expert/Produto.
* `transformationObjective`: Ex: "Secar a Barriga".

### ETAPA B: A VENDA (Long Page)
**Arquivo:** `LongVSLSalesPage.tsx`
**O que faz:**
1.  **Hero Visual:** Slider Antes/Depois + Headline.
2.  **Resumo:** Mostra os dados do quiz ("Sua meta: -10kg").
3.  **Gamificação:** O preço e o botão de compra ficam escondidos sob uma "Raspadinha".
4.  **Urgência:** Timer e Exit Intent.
**Configuração (Props):**
* `comparisonData`: Tabela "Nós vs Eles".
* `benefits`: Lista de entregáveis.
* `discountPrice`: Valor da oferta.

---

## 2️⃣ ARQUÉTIPO "AUTORIDADE & LÓGICA" (Serviços High-Ticket)
**Foco:** Problema -> Solução Lógica -> Agendamento no WhatsApp.
**Ideal para:** Advogados, Energia Solar, Consórcio, B2B, Psiquiatra, Finanças.

### Arquivo Único: `HighTicketConversionFlow.tsx`
**O que faz:**
1.  **Significado:** Foca na dor/resolução (Ex: "Justiça", "Economia").
2.  **Autoridade:** "Já recuperamos R$ X milhões." (Prova Social Racional).
3.  **Protocolo:** Loading de "Análise Jurídica/Técnica" (Checklist).
4.  **Comparação:** Tabela final "Fazer Sozinho (Perigo)" vs "Com Especialista (Segurança)".
5.  **CTA:** Botão direto para o WhatsApp do especialista (Lead Qualificado).

**Configuração (Props):**
* `expertName`: Nome da Empresa.
* `authorityText`: Números de autoridade (Ex: "+500 Casos").
* `guaranteeText`: Promessa de risco zero.

---

## 3️⃣ ARQUÉTIPO "VAIDADE & EXPERIÊNCIA" (Negócios Locais)
**Foco:** Desejo Visual -> Gamificação -> Visita Presencial.
**Ideal para:** Estética, Implante Capilar, Dentista (Lentes), Academia Premium.

### Arquivo Único: `VisualServiceFunnel.tsx`
**O que faz:**
1.  **Desejo:** Foca na autoestima/espelho.
2.  **Prova Visual:** Slider Antes/Depois (Item Obrigatório e Central).
3.  **Compromisso:** "Você promete comparecer?" (Filtro anti-faltas).
4.  **Gamificação:** Raspadinha para ganhar o Bônus/Avaliação (Dopamina).
5.  **Time Bomb:** Timer de 60 segundos com confetes para forçar o clique.
6.  **CTA:** WhatsApp para travar o voucher/bônus.

**Configuração (Props):**
* `heroImageBefore` / `heroImageAfter`: Fotos de transformação.
* `bonusTitle`: O prêmio da raspadinha (Ex: "Avaliação 3D Gratuita").

---

## ⚙️ RESUMO DE DECISÃO (Qual usar?)

1.  O cliente vende **CONHECIMENTO/PRODUTO DIGITAL**?
    👉 Use **Arquétipo 1** (`ConversionFlow` -> `LongVSLSalesPage`).

2.  O cliente vende **SERVIÇO SÉRIO/COMPLEXO (B2B)**?
    👉 Use **Arquétipo 2** (`HighTicketConversionFlow`).

3.  O cliente vende **BELEZA/ESTÉTICA (LOCAL)**?
    👉 Use **Arquétipo 3** (`VisualServiceFunnel`).