# 

`# 🎨 BIBLIOTECA DE COMPONENTES VISUAIS (ARSENAL DE DOPAMINA)
**Versão:** 2.0
**Objetivo:** Guia de uso e psicologia por trás de cada componente visual do projeto.

---

## 1. GRÁFICOS E PROJEÇÕES

### 📈 EvolutionTrendChart
**Arquivo:** `EvolutionTrendChart.tsx`
**Psicologia (Dopamine Hit):** A linha desenha a jornada do usuário (pathLength 0->1). O ponto final "pulsa", sinalizando a recompensa futura.
**Uso Ideal:** Mostrar a jornada do ponto A ao ponto B.
**Exemplo (Emagrecimento):**
```tsx
<EvolutionTrendChart
  title="Sua Jornada de Peso"
  startLabel="Hoje"
  startValue="90kg"
  endLabel="Meta (Fev 04)"
  endValue="72kg"
  trend="down"
  colorTheme="green"
/>`

### ⚔️ ComparisonDuelChart

Arquivo: ComparisonDuelChart.tsx

Psicologia (The Crossing): A linha "ruim" é tracejada e cai (o problema desaparecendo). A linha "boa" é sólida e sobe (a solução).

Uso Ideal: Comparar hormônios (Cortisol vs Testo), Finanças (Dívida vs Lucro).

Exemplo (Advogado):

TypeScript

# 

`<ComparisonDuelChart
  badLine={{ label: "Imposto Pago", startValue: 100, endValue: 0 }}
  goodLine={{ label: "Dinheiro Recuperado", startValue: 0, endValue: 100 }}
/>`

### 📏 GaugeMeter (A Sentença)

Arquivo: GaugeMeter.tsx

Psicologia (Judgment Drag): O ponteiro desliza criando tensão. As cores não selecionadas apagam (foco seletivo na dor ou glória).

Uso Ideal: IMC, Score de Crédito, Nível de Estresse.

Exemplo (Score):

TypeScript

# 

`<GaugeMeter
  value={350}
  min={0}
  max={1000}
  segments={[
    { label: "Baixo", min: 0, max: 400, color: "bg-red-500" },
    { label: "Bom", min: 401, max: 800, color: "bg-green-500" }
  ]}
/>`

### 🚀 ProgressJourneyChart

Arquivo: ProgressJourneyChart.tsx

Psicologia (Staggered Growth): As barras crescem uma a uma. O "Modo Projeção" mostra barras fantasmas do futuro, tangibilizando o ganho.

Uso Ideal: Acumulação de renda, crescimento de leads.

### 📉 ProjectionLineChart (NOVO)

Arquivo: ProjectionLineChart.tsx

Psicologia (Visionary): Mostra múltiplos pontos no tempo (Mês 1, 2, 3). Ativa a ganância (curva subindo) ou esperança (curva descendo).

Uso Ideal: Planejamento Financeiro, Perda de Peso progressiva.

Exemplo:

TypeScript

# 

`<ProjectionLineChart
  data={[{label: "Jan", value: 100}, {label: "Fev", value: 150}]}
  title="Crescimento Patrimonial"
/>`

---

## 2. INTERATIVIDADE E ENGAJAMENTO

### 🖼️ BeforeAfterSlider (NOVO)

Arquivo: BeforeAfterSlider.tsx

Psicologia (Visual Proof): Prova irrefutável. O ato de arrastar engaja o usuário na transformação.

Uso Ideal: Estética, Dermato, Arquitetura, Emagrecimento.

Exemplo:

TypeScript

# 

`<BeforeAfterSlider
  beforeImage="url_antes.jpg"
  afterImage="url_depois.jpg"
  overlayText="Arraste para ver a mágica"
/>`

### 🎫 ScratchCard (NOVO)

Arquivo: ScratchCard.tsx

Psicologia (Loteria): Gamificação pura. O usuário sente que "ganhou" o desconto por sorte/mérito, não que foi dado de graça.

Uso Ideal: Revelar preços, cupons ou bônus secretos.

Exemplo:

TypeScript

# 

`<ScratchCard
  prizeText="50% OFF"
  onReveal={() => desbloquearBotao()}
/>`

### 🧍 InteractiveBodySelector (NOVO)

Arquivo: InteractiveBodySelector.tsx

Psicologia (Toque na Dor): Micro-compromisso tátil. O usuário aponta onde dói ou onde quer melhorar.

Uso Ideal: Fitness, Fisioterapia, Estética Corporal.

### 🎚️ VisualStateSlider

Arquivo: VisualStateSlider.tsx

Psicologia (Morphing): Feedback imediato. O ícone muda e explode na tela ao deslizar.

Uso Ideal: Selecionar Nível de Atividade, Faixa de Renda.

### 🔢 InteractiveInput

Arquivo: InteractiveInput.tsx

Psicologia (Big Data & Feedback): Números gigantes parecem importantes. O feedback imediato (texto que muda enquanto digita) conversa com o usuário.

Uso Ideal: Digitar Salário, Peso, Idade.

### 🧱 IconGrid

Arquivo: IconGrid.tsx

Psicologia (Shopping): Transforma perguntas chatas em um catálogo visual clicável.

Uso Ideal: Primeira pergunta do quiz (para reduzir abandono).

---

## 3. PROVA SOCIAL E AUTORIDADE

### 💬 ReviewsCarousel

Arquivo: ReviewsCarousel.tsx

Psicologia (Trust Anchor): O selo "Verificado" e o movimento automático chamam a atenção para a prova social.

Uso Ideal: Blocos de "O que dizem nossos alunos".

### 📊 ComparisonCard (NOVO)

Arquivo: ComparisonCard.tsx

Psicologia (Contraste): Humilha o cenário atual (Vermelho) e exalta a solução (Verde). Aversão à perda vs Ganância.

Uso Ideal: Advogados (Tributário), Energia Solar, Consórcio.

Exemplo:

TypeScript

# 

`<ComparisonCard
  titleBad="Custo Atual"
  titleGood="Com Energia Solar"
  items={[{ label: "Mensal", valueBad: "R$ 500", valueGood: "R$ 50" }]}
/>`

### 🔄 SocialProofLoader

Arquivo: SocialProofLoader.tsx

Psicologia (Labor Illusion): Faz o usuário esperar e valorizar o cálculo. Mostra curiosidades ("Você sabia?") para reter a atenção.

Uso Ideal: Entre o Quiz e o Resultado.

### ✅ ChecklistLoader (NOVO)

Arquivo: ChecklistLoader.tsx

Psicologia (Auditoria): Mostra que o sistema é rigoroso e está verificando item por item. Passa seriedade.

Uso Ideal: Advogados, Contadores, Médicos (Diagnósticos sérios).