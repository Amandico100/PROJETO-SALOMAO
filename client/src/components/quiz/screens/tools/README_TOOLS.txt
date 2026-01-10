### 📖 DOCUMENTAÇÃO TÉCNICA: KITS E FERRAMENTAS

---

### 🧬 FERRAMENTA 01: HEALTH & BODY ENGINE (V2)

**Arquivos:** `useHealthCalculator.ts`, `HealthResultTemplate.tsx`, `WeightLossQuestions.ts`**Tipo:** Calculadora de Fórmulas.
**Nicho:** Saúde, Fitness, Nutrição, Longevidade.

**🔹 PARA QUE SERVE (A Promessa):**
Calcula o IMC, a Taxa Metabólica e, principalmente, a "Idade do Corpo". Cria um choque de realidade comparando a idade real com a biológica e projeta uma data exata para o corpo dos sonhos.

**🔹 INPUTS NECESSÁRIOS (Perguntas):**

- `gender`: Homem/Mulher.
- `target_areas`: (NOVO) Array de strings vindo do **BodySelector** (ex: barriga, pernas).
- `age`, `height`, `weight`: Dados vitais.
- `goalWeight`: Para traçar a linha de chegada.

**🔹 VISUALIZAÇÃO DO RESULTADO (HealthResultTemplate):**

- **Hero:** Usa `ComparisonDuelChart` para duelar "Idade Real" vs "Idade Biológica".
- **Projeção:** Usa `ProjectionLineChart` (NOVO) para mostrar a curva de peso caindo mês a mês até a meta.
- **Sonho:** Usa `BeforeAfterSlider` (NOVO) com fotos genéricas de transformação para tangibilizar o resultado.

**🔹 RECOMENDAÇÃO DE FUNIL:**
Conecte este motor ao **Arquétipo 1 (Digital)**:

1. Aquecimento: `ConversionFlow.tsx`
2. Venda: `LongVSLSalesPage.tsx`

---

### 🧠 FERRAMENTA 02: SCORE DIAGNOSTIC ENGINE

**Arquivos:** `useScoreCalculator.ts`, `ScoreResultTemplate.tsx`, `BurnoutQuestions.ts`**Tipo:** Sistema de Pontuação (Scoring).
**Nicho:** Saúde Mental, Burnout, TDAH, Testes de QI, Nível de Inglês/Espanhol.

**🔹 PARA QUE SERVE (A Promessa):**
Transforma sintomas subjetivos em um "Diagnóstico Numérico". Valida o sentimento do usuário ("Eu sabia que tinha algo errado") e classifica a gravidade (Normal, Alerta, Crítico).

**🔹 INPUTS NECESSÁRIOS (Perguntas):**

- Respostas com pesos (Value 0 a 5).
- Exemplo: "Você sente taquicardia?" (0 = Nunca, 5 = Sempre).
- Categorias: As perguntas devem ser tagueadas (ex: 'exaustao', 'cinismo') para gerar o gráfico radar.

**🔹 VISUALIZAÇÃO DO RESULTADO (ScoreResultTemplate):**

- **Hero:** Usa `GaugeMeter` para mostrar o nível de gravidade (Verde/Amarelo/Vermelho).
- **Detalhamento:** Barras de progresso por categoria ("Sua Exaustão: 85%").
- **Veredito:** Um card de "Laudo Preliminar" com texto sério e autoritário.

**🔹 RECOMENDAÇÃO DE FUNIL:**
Depende da gravidade e do produto:

- **Para Tratamento/Terapia:** Use o **Arquétipo 2 (High-Ticket)**.
- **Para E-book de Prevenção:** Use o **Arquétipo 1 (Digital)**.

---

### ⚖️ FERRAMENTA 03: MONEY RECOVERY ENGINE

**Arquivos:** `useFinancialCalculator.ts`, `FinancialResultTemplate.tsx`, `FinancialQuestions.ts`**Tipo:** Calculadora de Comparação e Perda.
**Nicho:** Jurídico (Tributário), Energia Solar, Consórcio, Milhas, Dívidas.

**🔹 PARA QUE SERVE (A Promessa):**
Calcula "Dinheiro na Mesa". Mostra a diferença brutal entre o Cenário A (O que o cliente faz hoje) e o Cenário B (O que ele faria com sua ajuda). Ativa o gatilho da Ganância e Aversão à Perda.

**🔹 INPUTS NECESSÁRIOS (Perguntas):**

- `currentValue`: O valor gasto/perdido hoje (ex: Conta de Luz R$ 500).
- `timeHorizon`: Tempo para projeção (ex: 5 anos).
- Configuração interna: O Salomão deve definir a `% de economia` média do nicho no código.

**🔹 VISUALIZAÇÃO DO RESULTADO (FinancialResultTemplate):**

- **Hero:** "Potencial de Recuperação: R$ 50.000".
- **Comparativo:** Usa `ComparisonCard` (NOVO) para mostrar uma tabela "Jeito Velho (Vermelho)" vs "Jeito Novo (Verde)".
- **Projeção:** Usa `ProjectionLineChart` subindo (acumulo de riqueza) ou descendo (eliminação de dívida).

**🔹 RECOMENDAÇÃO DE FUNIL:**
Conecte este motor ao **Arquétipo 2 (High-Ticket)**:

- Fluxo: `HighTicketConversionFlow.tsx` (Foco em autoridade e agendamento WhatsApp).

---

### 💄 FERRAMENTA EXTRA: VISUAL MATCH ENGINE (Implícita no Funil)

**Arquivos:** Integrada no `VisualServiceFunnel.tsx`**Nicho:** Estética, Cabelo, Dentes.

**🔹 PARA QUE SERVE:**
Para nichos onde não há "cálculo matemático", mas sim "análise visual". O motor aqui é a própria confirmação de que "Seu perfil é compatível".

**🔹 RECOMENDAÇÃO DE FUNIL:**
Use exclusivamente o **Arquétipo 3 (Visual Service)**.
Ele já contém a lógica de: Antes/Depois -> Raspadinha -> Timer -> WhatsApp.