# 🧠→💻 MAPEAMENTO: PSICOLOGIA → CÓDIGO

> **Como Usar:** Quando você precisa criar um EFEITO PSICOLÓGICO específico, consulte esta tabela para saber qual COMPONENTE usar.

---

## 📁 ONDE ESTÃO OS COMPONENTES

**Localização:** `client/src/components/quiz/screens/visual/`

**Documentação completa:** `visual/VISUAL_COMPONENTS_LIBRARY.md`

---

## 📊 TABELA MESTRE

| EFEITO PSICOLÓGICO | COMPONENTE | ARQUIVO | ÍCONE LUCIDE |
|--------------------|------------|---------|--------------|
| **Big Reveal (Choque)** | `GaugeMeter` | `visual/GaugeMeter.tsx` | `AlertCircle` |
| **Labor Illusion (Tensão)** | `SocialProofLoader` | `visual/SocialProofLoader.tsx` | `Loader2` |
| **Loading Forense** | `ChecklistLoader` | `visual/ChecklistLoader.tsx` | `CheckCircle` |
| **Comparação Visual** | `ComparisonCard` | `visual/ComparisonCard.tsx` | `ArrowLeftRight` |
| **Duelo de Cenários** | `ComparisonDuelChart` | `visual/ComparisonDuelChart.tsx` | `GitBranch` |
| **Projeção Futura** | `ProjectionLineChart` | `visual/ProjectionLineChart.tsx` | `TrendingUp` |
| **Jornada Visual** | `EvolutionTrendChart` | `visual/EvolutionTrendChart.tsx` | `LineChart` |
| **Transformação** | `BeforeAfterSlider` | `visual/BeforeAfterSlider.tsx` | `ArrowLeftRight` |
| **Gamificação** | `ScratchCard` | `visual/ScratchCard.tsx` | `Gift` |
| **Prova Social** | `ReviewsCarousel` | `visual/ReviewsCarousel.tsx` | `Star` |
| **Autoridade Local** | `MapRadarBackground` | `visual/MapRadarBackground.tsx` | `MapPin` |
| **Urgência** | `TimeSlotSelector` | `visual/TimeSlotSelector.tsx` | `Clock` |
| **Educação** | `TipCard` | `visual/TipCard.tsx` | `Lightbulb` |
| **Viralização** | `ShareButton` | `visual/ShareButton.tsx` | `Share2` |
| **Seleção Corporal** | `InteractiveBodySelector` | `visual/InteractiveBodySelector.tsx` | `User` |
| **Morphing Visual** | `VisualStateSlider` | `visual/VisualStateSlider.tsx` | `Sliders` |
| **Proporção** | `DonutChart` | `visual/DonutChart.tsx` | `PieChart` |
| **Grid de Opções** | `IconGrid` | `visual/IconGrid.tsx` | `Grid` |
| **Input Numérico Grande** | `InteractiveInput` | `visual/InteractiveInput.tsx` | `Hash` |
| **Tabela Comparativa** | `ComparisonTable` | `visual/ComparisonTable.tsx` | `Table` |
| **Crescimento Gradual** | `ProgressJourneyChart` | `visual/ProgressJourneyChart.tsx` | `TrendingUp` |

---

## 🎯 REGRAS OBRIGATÓRIAS

### Regra 1: Toda Isca DEVE Ter

| Elemento | Componente | Obrigatório? |
|----------|------------|--------------|
| Loading de Tensão | `SocialProofLoader` ou `ChecklistLoader` | ✅ SIM |
| Big Reveal | `GaugeMeter` ou equivalente numérico | ✅ SIM |
| **Funil de Conversão** | Ver `funnels/` | ✅ SIM |

### Regra 2: NUNCA Use Emojis Como Ícones

```tsx
// ❌ PROIBIDO (Amador)
<span>🏠</span>

// ✅ CORRETO (Profissional)
import { Home } from 'lucide-react';
<Home className="w-6 h-6 text-blue-500" />
```

### Regra 3: Componentes Por Tipo de Isca

#### Para Iscas FINANCEIRAS:
- `ComparisonCard` — Cenário Atual vs Cenário Otimizado
- `ProjectionLineChart` — Custo da Inação (5 anos)
- `GaugeMeter` ou big number — Valor total em R$
- **Funil:** `HighTicketConversionFlow.tsx`

#### Para Iscas de SAÚDE/CORPO:
- `InteractiveBodySelector` — Seleção de áreas problemáticas
- `EvolutionTrendChart` — Projeção de melhoria
- `BeforeAfterSlider` — Transformação visual
- **Funil:** `ConversionFlow.tsx` + `LongVSLSalesPage.tsx`

#### Para Iscas de RISCO:
- `MapRadarBackground` — Contexto local
- `GaugeMeter` — Percentual de risco
- `ChecklistLoader` — Análise forense
- **Funil:** `HighTicketConversionFlow.tsx`

#### Para Iscas de ESTÉTICA:
- `BeforeAfterSlider` — Transformação visual
- `ScratchCard` — Gamificação com voucher
- **Funil:** `VisualServiceFunnel.tsx`

---

## 📦 ÍCONES LUCIDE POR NICHO

### Segurança
```tsx
import { Shield, Lock, Camera, Bell, Eye, Radio, AlertTriangle } from 'lucide-react';
```

### Saúde
```tsx
import { Heart, Activity, Thermometer, Scale, Moon, Apple, Brain } from 'lucide-react';
```

### Finanças
```tsx
import { Wallet, TrendingUp, DollarSign, PiggyBank, Landmark, CreditCard } from 'lucide-react';
```

### Fitness
```tsx
import { Dumbbell, Timer, Flame, Target, Zap, Trophy } from 'lucide-react';
```

### Jurídico
```tsx
import { Gavel, FileText, Scale, ShieldCheck, AlertCircle, BookOpen } from 'lucide-react';
```

### Estética
```tsx
import { Sparkles, Smile, Scissors, Palette, Eye, Sun } from 'lucide-react';
```

---

## 🔄 COMBINAÇÕES PRONTAS

### Combo 1: Isca de Diagnóstico (Score)
```
Perguntas → ChecklistLoader → GaugeMeter → TipCard → FUNIL → CTA
```

### Combo 2: Isca Financeira
```
Perguntas → SocialProofLoader → ComparisonCard → ProjectionLineChart → FUNIL → CTA
```

### Combo 3: Isca de Transformação
```
Foto Upload → BeforeAfterSlider → ReviewsCarousel → FUNIL → CTA
```

### Combo 4: Isca de Risco Local
```
MapRadarBackground → Perguntas → ChecklistLoader → GaugeMeter → TipCard → FUNIL → CTA
```

---

## ⚠️ CHECKLIST ANTES DE USAR COMPONENTE

- [ ] O componente existe em `visual/`?
- [ ] Importei corretamente? (`import X from '@/components/quiz/screens/visual/X'`)
- [ ] Passei todas as props obrigatórias?
- [ ] Usei ícone Lucide em vez de emoji?
- [ ] **Configurei o Funil de conversão?**

---

*Documento: MAPEAMENTO_PSICO_CODIGO.md v2.0 — Janeiro 2026 (Corrigido)*
