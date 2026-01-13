# 📋 PENDÊNCIAS TÉCNICAS — BACKLOG DE DESENVOLVIMENTO

> **Propósito:** Lista de itens técnicos que precisam ser implementados para completar as 7 mecânicas universais.

---

## 🔴 PRIORIDADE ALTA: Mecânicas Faltantes

### 1. Mecânica "Antes/Depois com IA" (4/7)

**O que falta:**
- [ ] Criar `templates/BeforeAfterResultTemplate.tsx`
- [ ] Criar `tools/useBeforeAfterEngine.ts`
- [ ] Integração com API de IA (Replicate/SDXL) ou composição de catálogo

**Nichos impactados:**
- Dentista (clareamento, facetas)
- Arquiteto/Decorador
- Loja de Móveis/Tintas
- Cirurgia Plástica

**Funil recomendado:** `VisualServiceFunnel.tsx`

---

### 2. Mecânica "Match/Recomendação" (5/7)

**O que falta:**
- [ ] Criar `templates/MatchResultTemplate.tsx`
- [ ] Criar `tools/useMatchEngine.ts` (categorização)

**Nichos impactados:**
- Barbearia (tipo de corte ideal)
- Consultoria de investimentos
- Personal trainer (tipo de treino)
- Ótica (formato de óculos)

**Funil recomendado:** `VisualServiceFunnel.tsx` ou `ConversionFlow.tsx`

---

### 3. Mecânica "Elegibilidade/Chance" (7/7)

**O que falta:**
- [ ] Criar `templates/EligibilityResultTemplate.tsx`
- [ ] Criar `tools/useEligibilityEngine.ts` (threshold-based)

**Nichos impactados:**
- Advogado previdenciário (aposentadoria)
- Despachante de visto
- Correspondente bancário (financiamento)
- Consultor de imigração

**Funil recomendado:** `HighTicketConversionFlow.tsx`

---

## 🟡 PRIORIDADE MÉDIA: Melhorias

### 4. Documentação de Engines Existentes

- [ ] Expandir `tools/README_TOOLS.txt` com exemplos de props
- [ ] Adicionar TypeScript interfaces para cada engine

### 5. Variações por Nicho

- [ ] Criar pasta `_SALOMAO_BRAIN/04_REPERTORIO/VARIAÇÕES_POR_NICHO/`
- [ ] Documentar 5-10 nichos principais com variações

---

## 🟢 PRIORIDADE BAIXA: Nice to Have

### 6. Banco de Imagens

- [ ] Criar estrutura `client/src/assets/images/` com INDEX
- [ ] Comprar/organizar imagens para nichos principais

### 7. Prompts de IA

- [ ] Centralizar prompts para BeforeAfter em pasta segura
- [ ] Documentar variáveis de prompt por nicho

---

## 📊 RESUMO DE STATUS

| Mecânica | Status | Template | Engine |
|----------|--------|----------|--------|
| 1. Score/Diagnóstico | ✅ Pronto | `ScoreResultTemplate` | `useScoreCalculator` |
| 2. Calculadora R$ | ✅ Pronto | `FinancialResultTemplate` | `useFinancialCalculator` |
| 3. Idade de X | ✅ Pronto | `HealthResultTemplate` | `useHealthCalculator` |
| 4. Antes/Depois | ⏳ Pendente | - | - |
| 5. Match | ⏳ Pendente | - | - |
| 6. Risco | ✅ Pronto | `SecurityResultTemplate` | `useSecurityCalculator` |
| 7. Elegibilidade | ⏳ Pendente | - | - |

**Cobertura atual:** 4/7 mecânicas (57%)

---

*Documento criado em Janeiro 2026*
