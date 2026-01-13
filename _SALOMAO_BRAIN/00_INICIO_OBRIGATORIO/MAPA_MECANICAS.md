# 🎰 MAPA DAS 7 MECÂNICAS UNIVERSAIS

> **Como Usar:** Identifique qual TIPO DE RESULTADO a isca vai entregar, depois selecione a mecânica correspondente.

---

## Visão Geral

| # | Mecânica | Output Principal | Exemplo de Vilão |
|---|----------|------------------|------------------|
| 1 | Score/Diagnóstico | Score 0-100 | "Seu nível de ansiedade é 74/100" |
| 2 | Calculadora R$ | Valor em reais | "Você está perdendo R$ 34.000/ano" |
| 3 | Idade de X | Anos percebidos | "Sua pele aparenta 51 anos" |
| 4 | Antes/Depois | Imagem transformada | "Veja como você ficaria" |
| 5 | Match/Recomendação | Tipo/Perfil | "Seu perfil é X, você precisa de Y" |
| 6 | Risco/Vulnerabilidade | % de risco | "Seu risco de invasão é 73%" |
| 7 | Elegibilidade | % de chance | "Você tem 87% de chance de aprovação" |

---

## 1️⃣ QUIZ DE SCORE/DIAGNÓSTICO

### Quando Usar
- Burnout, Ansiedade, TDAH
- Nível de Inglês/Espanhol
- Diagnóstico de saúde mental
- Qualquer "termômetro" ou "scanner"
- Testes de perfil comportamental

### Estrutura Técnica
```
Template: ScoreQuizTemplate
Engine: score/weighted-average.ts
```

### Output Padrão
```typescript
{
  score: number;           // 0-100
  level: 'low' | 'medium' | 'high' | 'critical';
  factors: FactorItem[];   // Fatores que compõem o score
  verdictTitle: string;    // "Ansiedade Alta Detectada"
  recommendations: string[];
}
```

### Exemplo de Isca
**Nome:** Termômetro de Ansiedade  
**Vilão:** "Seu nível de ansiedade é 74/100 — isso está te custando R$ 34.000/ano em produtividade"

### Nichos Compatíveis
- Psicólogo, Psiquiatra
- Coach de produtividade
- Personal trainer (burnout)
- Nutricionista (compulsão)
- RH (clima organizacional)

---

## 2️⃣ CALCULADORA DE VALOR (R$)

### Quando Usar
- Restituição tributária
- Economia com energia solar
- Custo de churrasco/eventos
- Planejamento de reforma
- Qualquer "quanto você perde/ganha"

### Estrutura Técnica
```
Template: FinancialQuizTemplate
Engine: 
  - financial/simple-sum.ts (soma simples)
  - financial/compound-interest.ts (juros compostos)
  - financial/tax-recovery.ts (tributário)
```

### Output Padrão
```typescript
{
  totalValue: number;           // R$ principal
  comparison: ComparisonItem[]; // Cenário A vs B
  projection: ProjectionItem[]; // Projeção 5 anos
  verdictTitle: string;         // "Perda Detectada"
  verdictLevel: 'low' | 'medium' | 'high';
}
```

### Exemplo de Isca
**Nome:** Calculadora de Restituição  
**Vilão:** "Você deixou R$ 47.000 na mesa nos últimos 5 anos"

### Nichos Compatíveis
- Advogado tributário
- Energia solar
- Consórcio
- Contabilidade
- Açougue (churrasco)
- Material de construção

---

## 3️⃣ SCANNER DE IDADE DE X

### Quando Usar
- Idade da Pele
- Idade dos Dentes
- Idade Metabólica
- Idade do Corpo
- Qualquer comparação "você tem X, mas aparenta Y"

### Estrutura Técnica
```
Template: AgeComparisonTemplate
Engine: score/multi-factor-age.ts
```

### Output Padrão
```typescript
{
  realAge: number;
  perceivedAge: number;
  difference: number;           // +13 anos
  factors: AgeFactorItem[];     // O que envelhece
  reversibleYears: number;      // Quantos anos pode rejuvenescer
  percentReversible: number;    // 70% reversível
}
```

### Exemplo de Isca
**Nome:** Scanner da Idade dos Dentes  
**Vilão:** "Você tem 38 anos, mas seu sorriso aparenta 51. São 4 fatores envelhecendo você."

### Nichos Compatíveis
- Dentista
- Dermatologista
- Nutricionista
- Personal trainer
- Clínica estética

---

## 4️⃣ ANTES/DEPOIS COM IA

### Quando Usar
- Dentista (clareamento, facetas)
- Arquiteto/Decorador
- Loja de Móveis
- Loja de Tintas
- Cirurgia Plástica
- Barbearia/Cabeleireiro

### Estrutura Técnica
```
Template: BeforeAfterAITemplate
Engine: 
  - image/generative-ai.ts (IA cria imagem)
  - image/catalog-overlay.ts (composição de catálogo)
```

### Modos de Operação

**Modo Generativo (IA):**
- Usuário envia foto
- IA transforma com prompt específico
- Retorna imagem modificada

**Modo Catálogo:**
- Usuário envia foto do ambiente
- Sistema compõe produtos do catálogo
- Retorna imagem com produtos inseridos

### Exemplo de Isca
**Nome:** Veja Seu Novo Sorriso  
**Vilão:** "Olha como você fica com os dentes clareados"

### Nichos Compatíveis
- Odontologia estética
- Arquitetura/Decoração
- Lojas de móveis
- Lojas de tintas
- Cirurgia plástica
- Harmonização facial

---

## 5️⃣ MATCH/RECOMENDAÇÃO

### Quando Usar
- Tipo de corte (barbearia)
- Tipo de investimento
- Tipo de treino ideal
- Qual produto é para você
- Descobrir seu perfil

### Estrutura Técnica
```
Template: MatchQuizTemplate
Engine: score/categorization.ts
```

### Output Padrão
```typescript
{
  profileType: string;       // "Investidor Conservador"
  matchScore: number;        // 87% de match
  recommendation: string;    // "Você deveria..."
  alternatives: string[];    // Outras opções
  whyThisMatch: string[];    // Justificativas
}
```

### Exemplo de Isca
**Nome:** Descubra Seu Corte Ideal  
**Vilão:** "Você está usando o corte errado para seu formato de rosto"

### Nichos Compatíveis
- Barbearia
- Consultoria de investimentos
- Personal trainer
- Nutricionista
- Loja de cosméticos
- Ótica

---

## 6️⃣ RISCO/VULNERABILIDADE

### Quando Usar
- Segurança residencial
- Seguro de vida
- Risco de doença
- Vulnerabilidade fiscal
- Qualquer análise de pontos fracos

### Estrutura Técnica
```
Template: RiskAssessmentTemplate
Engine: score/risk-factors.ts
```

### Output Padrão
```typescript
{
  riskPercentage: number;      // 23%
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  vulnerabilities: VulnerabilityItem[];
  protections: ProtectionItem[];
  recommendations: string[];
}
```

### Exemplo de Isca
**Nome:** Casa Segura  
**Vilão:** "Seu índice de vulnerabilidade é 73%. Imóveis como o seu têm 3x mais chances de invasão."

### Nichos Compatíveis
- Empresas de segurança
- Seguradoras
- Clínicas médicas (checkup)
- Advogados (risco fiscal)
- TI (segurança digital)

---

## 7️⃣ ELEGIBILIDADE/CHANCE

### Quando Usar
- Aposentadoria INSS
- Visto americano
- Financiamento imobiliário
- Qualificação para programa
- Qualquer "você consegue ou não"

### Estrutura Técnica
```
Template: EligibilityQuizTemplate
Engine: score/threshold-based.ts
```

### Output Padrão
```typescript
{
  eligibilityScore: number;    // 87%
  isEligible: boolean;
  requirementsMet: RequirementItem[];
  requirementsMissing: RequirementItem[];
  nextSteps: string[];
}
```

### Exemplo de Isca
**Nome:** Calculadora de Aposentadoria  
**Vilão:** "Você tem 87% de chance de se aposentar em 2 anos. Veja o que falta."

### Nichos Compatíveis
- Advogado previdenciário
- Despachante de visto
- Correspondente bancário
- Imobiliária (financiamento)
- Consultor de imigração

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
│   └─ → Mecânica 4: Antes/Depois
│
├─ UM TIPO/PERFIL?
│   └─ → Mecânica 5: Match/Recomendação
│
└─ UMA CHANCE (%)?
    └─ → Mecânica 7: Elegibilidade
```

---

*Documento: MAPA_MECANICAS.md v1.0 — Janeiro 2026*
