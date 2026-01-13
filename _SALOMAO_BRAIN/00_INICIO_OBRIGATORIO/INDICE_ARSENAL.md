# 📚 ÍNDICE DO ARSENAL SALOMÃO

> **Como Usar:** Este é o mapa mestre que cruza TUDO: Templates, Engines, Componentes, Imagens e Documentação.

---

## 🎯 VISÃO GERAL DO ARSENAL

| Categoria | Quantidade | Localização |
|-----------|------------|-------------|
| **Templates** | 4 (expandir para 7) | `client/src/components/quiz/screens/templates/` |
| **Componentes Visuais** | 21 | `client/src/components/quiz/screens/visual/` |
| **Engines/Hooks** | 4 (expandir) | `client/src/components/quiz/screens/tools/` → migrar para `engines/` |
| **Iscas Prontas** | 1 (Casa Segura) | `client/src/data/iscas/` |
| **Benchmarks** | 3 | `_SALOMAO_BRAIN/05_BENCHMARKING_GLOBAL/` |
| **Coringas** | 20+ | `_SALOMAO_BRAIN/04_REPERTORIO/` |

---

## 🧩 MATRIZ: MECÂNICA → TEMPLATE → ENGINE

| Mecânica | Template | Engine Principal | Componentes Visuais |
|----------|----------|------------------|---------------------|
| Score/Diagnóstico | `ScoreResultTemplate` | `useScoreCalculator` | GaugeMeter, DonutChart |
| Calculadora R$ | `FinancialResultTemplate` | `useFinancialCalculator` | ComparisonCard, ProjectionLineChart |
| Idade de X | `HealthResultTemplate` | `useHealthCalculator` | ComparisonDuelChart, EvolutionTrendChart |
| Risco | `SecurityResultTemplate` | `useSecurityCalculator` | GaugeMeter, MapRadarBackground |
| Antes/Depois | (criar) | (criar) | BeforeAfterSlider |
| Match | (criar) | (criar) | IconGrid |
| Elegibilidade | (criar) | (criar) | GaugeMeter |

---

## 📦 TEMPLATES DISPONÍVEIS

### Template 1: FinancialResultTemplate

**Arquivo:** `templates/FinancialResultTemplate.tsx`

**Quando usar:** Iscas que calculam valor em R$

**Props:**
```typescript
interface FinancialResultProps {
  totalSavings: number;
  badScenarioValue: number;
  goodScenarioValue: number;
  projectionData: any[];
  verdictTitle: string;
  onContinue: () => void;
}
```

**Componentes internos:**
- `ComparisonCard`
- `ProjectionLineChart`
- CTA sticky

---

### Template 2: HealthResultTemplate

**Arquivo:** `templates/HealthResultTemplate.tsx`

**Quando usar:** Iscas de saúde, idade metabólica, corpo

**Componentes internos:**
- `ComparisonDuelChart`
- `ProjectionLineChart`
- `BeforeAfterSlider`

---

### Template 3: ScoreResultTemplate

**Arquivo:** `templates/ScoreResultTemplate.tsx`

**Quando usar:** Iscas de score 0-100 (burnout, ansiedade)

**Componentes internos:**
- `GaugeMeter`
- Barras de progresso
- Card de veredito

---

### Template 4: SecurityResultTemplate

**Arquivo:** `templates/SecurityResultTemplate.tsx`

**Quando usar:** Iscas de risco e vulnerabilidade

**Componentes internos:**
- `GaugeMeter`
- Lista de fatores
- `TipCard`

---

## ⚙️ ENGINES DISPONÍVEIS

### Engine 1: useFinancialCalculator

**Arquivo:** `tools/useFinancialCalculator.ts`

**Input:**
```typescript
{
  currentValue: number;
  optimizedValue: number;
  timeHorizonMonths: number;
  context: 'monthly' | 'total';
}
```

**Output:**
```typescript
{
  monthlySavings: number;
  totalSavings: number;
  projectedLoss5Years: number;
  comparisonData: ComparisonItem[];
  projectionGraph: ProjectionItem[];
  verdictTitle: string;
}
```

---

### Engine 2: useSecurityCalculator

**Arquivo:** `tools/useSecurityCalculator.ts`

**Funcionalidade:** Calcula risco de invasão baseado em fatores

**Output:** riskPercentage, riskLevel, justifications, tips

---

### Engine 3: useHealthCalculator

**Arquivo:** `tools/useHealthCalculator.ts`

**Funcionalidade:** Calcula idade biológica, IMC, taxa metabólica

---

### Engine 4: useScoreCalculator

**Arquivo:** `tools/useScoreCalculator.ts`

**Funcionalidade:** Calcula score ponderado baseado em respostas

---

## 🎨 COMPONENTES VISUAIS (21)

### Categoria: Visualização de Dados

| Componente | Uso | Psicologia |
|------------|-----|------------|
| `GaugeMeter` | Velocímetro de score | Big Reveal |
| `DonutChart` | Gráfico pizza | Proporção |
| `ProjectionLineChart` | Linha de projeção | Futuro |
| `EvolutionTrendChart` | Jornada | Crescimento |
| `ComparisonDuelChart` | Duas linhas | Contraste |
| `ProgressJourneyChart` | Barras crescentes | Progresso |

### Categoria: Comparação

| Componente | Uso | Psicologia |
|------------|-----|------------|
| `ComparisonCard` | A vs B | Contraste |
| `ComparisonTable` | Tabela | Matrix |
| `BeforeAfterSlider` | Arrastar | Transformação |

### Categoria: Loading

| Componente | Uso | Psicologia |
|------------|-----|------------|
| `SocialProofLoader` | Loading + fatos | Labor Illusion |
| `ChecklistLoader` | Loading + checklist | Auditoria |

### Categoria: Interação

| Componente | Uso | Psicologia |
|------------|-----|------------|
| `InteractiveBodySelector` | Mapa corporal | Toque na Dor |
| `VisualStateSlider` | Slider morph | Morphing |
| `InteractiveInput` | Input grande | Big Data |
| `IconGrid` | Grid de ícones | Shopping |
| `ScratchCard` | Raspadinha | Gamificação |

### Categoria: Social/Trust

| Componente | Uso | Psicologia |
|------------|-----|------------|
| `ReviewsCarousel` | Reviews | Prova Social |
| `MapRadarBackground` | Mapa local | Autoridade |
| `TipCard` | Dicas | Reciprocidade |

### Categoria: Ação

| Componente | Uso | Psicologia |
|------------|-----|------------|
| `TimeSlotSelector` | Agendamento | Urgência |
| `ShareButton` | Compartilhar | Viralização |

---

## 📁 LOCALIZAÇÃO DE ARQUIVOS

### Código Principal
```
client/src/
├── components/quiz/screens/
│   ├── visual/                    ← 21 componentes
│   ├── templates/                 ← 4 templates
│   └── tools/                     ← 4 hooks
├── data/
│   ├── iscas/                     ← Iscas prontas
│   │   └── casa-segura/
│   └── quiz-flows/                ← Fluxos de perguntas
└── assets/images/                 ← Banco de imagens (criar)
```

### Documentação (Brain)
```
_SALOMAO_BRAIN/
├── 00_INICIO_OBRIGATORIO/         ← Porta de entrada
├── 01_ESTRATEGIA_MESTRE/          ← Micro-tarefas
├── 02_PSICOLOGIA_E_COPY/          ← Vilão, Caneta Giordano
├── 03_PROTOCOLO_TECNICO/          ← APIs
├── 04_REPERTORIO/                 ← Coringas, Variações
│   └── VARIAÇÕES_POR_NICHO/       ← (criar)
└── 05_BENCHMARKING_GLOBAL/        ← Zing, BetterMe
```

---

## 📝 DOCUMENTAÇÃO DE REFERÊNCIA

| Documento | Propósito | Localização |
|-----------|-----------|-------------|
| `LEIA_PRIMEIRO.md` | Identidade e regras | `00_INICIO_OBRIGATORIO/` |
| `CHECKLIST_UNIVERSAL.md` | Processo passo a passo | `00_INICIO_OBRIGATORIO/` |
| `MAPA_MECANICAS.md` | 7 mecânicas universais | `00_INICIO_OBRIGATORIO/` |
| `MAPEAMENTO_PSICO_CODIGO.md` | Psicologia → Componente | `00_INICIO_OBRIGATORIO/` |
| `LOGICA_TRANSPOSICAO.md` | Como adaptar benchmarks | `00_INICIO_OBRIGATORIO/` |
| `VISUAL_COMPONENTS_LIBRARY.md` | Detalhes dos componentes | `visual/` |
| `README_TOOLS.txt` | Detalhes das engines | `tools/` |
| `Vilão Mensurável.md` | Como definir o vilão | `02_PSICOLOGIA_E_COPY/` |
| `CONCEITOS_ISCAS_CORINGA.md` | 20+ iscas coringa | `04_REPERTORIO/` |

---

## 🔍 COMO ENCONTRAR O QUE PRECISA

### "Preciso criar uma isca de [NICHO]"
1. → `CHECKLIST_UNIVERSAL.md` (processo)
2. → `04_REPERTORIO/CONCEITOS_ISCAS_CORINGA.md` (existe pronta?)
3. → `MAPA_MECANICAS.md` (qual mecânica?)

### "Preciso de um componente para [EFEITO]"
1. → `MAPEAMENTO_PSICO_CODIGO.md` (qual componente?)
2. → `visual/VISUAL_COMPONENTS_LIBRARY.md` (como usar?)

### "Preciso adaptar o Zing para [NICHO]"
1. → `05_BENCHMARKING_GLOBAL/dossie_ZING_COACH.md` (estudar)
2. → `LOGICA_TRANSPOSICAO.md` (como adaptar)

### "Preciso de uma engine para [CÁLCULO]"
1. → `tools/README_TOOLS.txt` (qual engine?)
2. → Ver código fonte da engine

---

## ⚠️ O QUE AINDA PRECISA SER CRIADO

### Fase 2: Engenharia
- [ ] Pasta `engines/` com estrutura modular
- [ ] 3 novos templates (BeforeAfter, Match, Eligibility)
- [ ] Banco de imagens com INDEX

### Fase 3: Conteúdo
- [ ] Pasta `VARIAÇÕES_POR_NICHO/`
- [ ] 10+ arquivos de variação
- [ ] Prompts de IA documentados

---

*Documento: INDICE_ARSENAL.md v1.0 — Janeiro 2026*
