# 🎰 MAPA DAS 7 MECÂNICAS UNIVERSAIS

> **Como Usar:** Identifique qual TIPO DE RESULTADO a isca vai entregar, depois selecione a mecânica correspondente.

---

## Visão Geral

| # | Mecânica | Output Principal | Template | Engine | Status |
|---|----------|------------------|----------|--------|--------|
| 1 | Score/Diagnóstico | Score 0-100 | `ScoreResultTemplate` | `useScoreCalculator` | ✅ |
| 2 | Calculadora R$ | Valor em reais | `FinancialResultTemplate` | `useFinancialCalculator` | ✅ |
| 3 | Idade de X | Anos percebidos | `HealthResultTemplate` | `useHealthCalculator` | ✅ |
| 4 | Antes/Depois | Imagem transformada | (VISUAL AI ENGINE) | (pendente) | ⏳ |
| 5 | Match/Recomendação | Tipo/Perfil | `MatchResultTemplate` | `useMatchEngine` | ✅ |
| 6 | Risco/Vulnerabilidade | % de risco | `SecurityResultTemplate` | `useSecurityCalculator` | ✅ |
| 7 | Elegibilidade | % de chance | `EligibilityResultTemplate` | `useEligibilityEngine` | ✅ |

> ⚠️ 1 mecânica pendente (Antes/Depois) — Será desenvolvida como VISUAL AI ENGINE

---

## 📁 ONDE ESTÃO OS ARQUIVOS

| Tipo | Caminho |
|------|---------|
| **Templates** | `client/src/components/quiz/screens/templates/` |
| **Engines** | `client/src/components/quiz/screens/tools/` |
| **Componentes** | `client/src/components/quiz/screens/visual/` |
| **Funis** | `client/src/components/quiz/screens/funnels/` |

---

## 1️⃣ QUIZ DE SCORE/DIAGNÓSTICO

### Quando Usar
- Burnout, Ansiedade, TDAH
- Nível de Inglês/Espanhol
- Diagnóstico de saúde mental
- Qualquer "termômetro" ou "scanner"

### Estrutura Técnica
```
Template: templates/ScoreResultTemplate.tsx
Engine: tools/useScoreCalculator.ts
Questions: data/quiz-flows/BurnoutQuestions.ts (exemplo)
```

### Output Padrão
```typescript
{
  score: number;           // 0-100
  level: 'low' | 'medium' | 'high' | 'critical';
  factors: FactorItem[];
  verdictTitle: string;
}
```

### Funil Recomendado
- **Tratamento/Terapia:** `HighTicketConversionFlow.tsx`
- **E-book/Curso:** `ConversionFlow.tsx` + `LongVSLSalesPage.tsx`

---

## 2️⃣ CALCULADORA DE VALOR (R$)

### Quando Usar
- Restituição tributária
- Economia com energia solar
- Custo de churrasco/eventos
- Qualquer "quanto você perde/ganha"

### Estrutura Técnica
```
Template: templates/FinancialResultTemplate.tsx
Engine: tools/useFinancialCalculator.ts
Questions: data/quiz-flows/FinancialQuestions.ts (exemplo)
```

### Output Padrão
```typescript
{
  totalValue: number;           // R$ principal
  comparison: ComparisonItem[];
  projection: ProjectionItem[];
  verdictTitle: string;
}
```

### Funil Recomendado
- **Serviço High-Ticket:** `HighTicketConversionFlow.tsx`

---

## 3️⃣ SCANNER DE IDADE DE X

### Quando Usar
- Idade da Pele
- Idade Metabólica
- Idade do Corpo
- Qualquer "você tem X, mas aparenta Y"

### Estrutura Técnica
```
Template: templates/HealthResultTemplate.tsx
Engine: tools/useHealthCalculator.ts
Questions: data/quiz-flows/WeightLossQuestions.ts (exemplo)
```

### Output Padrão
```typescript
{
  realAge: number;
  perceivedAge: number;
  difference: number;
  factors: AgeFactorItem[];
}
```

### Funil Recomendado
- **Curso/Dieta:** `ConversionFlow.tsx` + `LongVSLSalesPage.tsx`
- **Estética Local:** `VisualServiceFunnel.tsx`

---

## 4️⃣ ANTES/DEPOIS COM IA ⏳

### Quando Usar
- Dentista (clareamento, facetas)
- Arquiteto/Decorador
- Loja de Móveis/Tintas
- Cirurgia Plástica

### Status: PENDENTE
> Ver `PENDENCIAS_TECNICAS.md` para roadmap de implementação.

### Funil Recomendado
- **Negócio Local:** `VisualServiceFunnel.tsx`

---

## 5️⃣ MATCH/RECOMENDAÇÃO ⏳

### Quando Usar
- Tipo de corte (barbearia)
- Tipo de investimento
- Tipo de treino ideal
- Qual produto é para você

### Status: PENDENTE
> Ver `PENDENCIAS_TECNICAS.md` para roadmap de implementação.

### Funil Recomendado
- **Negócio Local:** `VisualServiceFunnel.tsx`
- **E-commerce:** `ConversionFlow.tsx`

---

## 6️⃣ RISCO/VULNERABILIDADE

### Quando Usar
- Segurança residencial
- Seguro de vida
- Risco de doença
- Vulnerabilidade fiscal

### Estrutura Técnica
```
Template: templates/SecurityResultTemplate.tsx
Engine: tools/useSecurityCalculator.ts
Questions: data/quiz-flows/SecurityQuestions.ts
```

### Output Padrão
```typescript
{
  riskPercentage: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  vulnerabilities: VulnerabilityItem[];
  recommendations: string[];
}
```

### Funil Recomendado
- **Serviço High-Ticket:** `HighTicketConversionFlow.tsx`

---

## 7️⃣ ELEGIBILIDADE/CHANCE ⏳

### Quando Usar
- Aposentadoria INSS
- Visto americano
- Financiamento imobiliário
- Qualificação para programa

### Status: PENDENTE
> Ver `PENDENCIAS_TECNICAS.md` para roadmap de implementação.

### Funil Recomendado
- **Serviço High-Ticket:** `HighTicketConversionFlow.tsx`

---

## 🔄 COMO ESCOLHER A MECÂNICA CERTA

### Fluxograma de Decisão

```
O resultado da isca é...

├─ UM NÚMERO EM R$?
│   └─ → Mecânica 2: Calculadora de Valor
│
├─ UM PERCENTUAL DE RISCO?
│   └─ → Mecânica 6: Risco/Vulnerabilidade
│
├─ UM SCORE (0-100)?
│   └─ → Mecânica 1: Score/Diagnóstico
│
├─ UMA IDADE COMPARADA?
│   └─ → Mecânica 3: Idade de X
│
├─ UMA IMAGEM TRANSFORMADA?
│   └─ → Mecânica 4: Antes/Depois (⏳)
│
├─ UM TIPO/PERFIL?
│   └─ → Mecânica 5: Match/Recomendação (⏳)
│
└─ UMA CHANCE (%)?
    └─ → Mecânica 7: Elegibilidade (⏳)
```

---

## 🌪️ ESCOLHENDO O FUNIL (OBRIGATÓRIO)

Depois de escolher a mecânica, você DEVE escolher o funil de conversão:

| Tipo de Negócio | Funil | Arquivos |
|-----------------|-------|----------|
| Infoprodutos/Cursos | Arquétipo 1 | `ConversionFlow` + `LongVSLSalesPage` |
| Serviço High-Ticket | Arquétipo 2 | `HighTicketConversionFlow` |
| Estética/Local | Arquétipo 3 | `VisualServiceFunnel` |

**Documentação completa:** `funnels/INSTRUCOES_FUNIS.md`

---

*Documento: MAPA_MECANICAS.md v2.0 — Janeiro 2026 (Corrigido)*
