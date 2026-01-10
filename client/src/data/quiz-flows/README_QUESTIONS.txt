### 🗃️ DATA FLOW 01: WeightLossQuestions (Saúde/Estética)

**Arquivo:** `src/data/quiz-flows/WeightLossQuestions.ts`**Objetivo:** Coletar dados antropométricos e emocionais para calcular a "Idade Metabólica" e o "Plano Personalizado".

**ESTRUTURA DE ENGAJAMENTO:**

1. **Identidade (Q1):** Gênero (Filtro biológico para cálculo).
2. **Desejo Visual (Q2 - NOVO):** `BodySelector` (Toque no corpo). Micro-compromisso tátil.
3. **Agitação (Q3-Q5):** Energia/Sono. Faz o usuário admitir que está cansado.
4. **Dados Duros (Q6-Q9):** Idade, Altura, Peso. Necessários para o motor `useHealthCalculator`.

**COMO USAR:**

- Importe e renderize sequencialmente.
- Na Q2, use o componente `<InteractiveBodySelector />`.
- Ao final, envie os dados para `useHealthCalculator`.

---

### 🗃️ DATA FLOW 02: BurnoutQuestions (Saúde Mental/Score)

**Arquivo:** `src/data/quiz-flows/BurnoutQuestions.ts`**Objetivo:** Diagnosticar níveis de estresse/exaustão usando pontuação (Score).

**ESTRUTURA DE ENGAJAMENTO:**

1. **Contexto (Q1-Q2):** Regime de trabalho (CLT/PJ). Define a base legal.
2. **Sintomas Físicos (Q3-Q5):** Dores, Sono. (Peso alto na pontuação).
3. **Sintomas Mentais (Q6-Q7):** Cinismo, Irritação. (Validação emocional).
4. **Nexo Causal (Q10-Q11):** Ambiente tóxico. (Vital para advogados/laudos).

**COMO USAR:**

- Este fluxo usa o sistema de **Pesos (`weight`)**.
- Ao final, envie as respostas para `useScoreCalculator`, que somará os pontos e dará o veredito (Verde/Amarelo/Vermelho).

---

### 🗃️ DATA FLOW 03: FinancialQuestions (Recuperação de Dinheiro)

**Arquivo:** `src/data/quiz-flows/FinancialQuestions.ts`**Objetivo:** Calcular o prejuízo financeiro ("Dinheiro na Mesa") para gerar indignação.

**ESTRUTURA DE ENGAJAMENTO:**

1. **Perfil (Q1-Q2):** PF/PJ e Renda. Filtra se o lead tem dinheiro (qualificação).
2. **Agitação da Dor (Q3-Q4):** "Você acha justo pagar tanto?".
3. **O Número Chave (Q5):** "Qual valor você paga hoje?". (Este é o input principal para o cálculo).
4. **Future Pacing (Q6):** "O que faria com o dinheiro recuperado?".

**COMO USAR:**

- O input da Q5 (`currentValue`) é o coração do cálculo.
- Ao final, envie este valor para `useFinancialCalculator`.