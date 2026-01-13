# 📚 ÍNDICE DO ARSENAL SALOMÃO

> **Como Usar:** Este é o mapa mestre que cruza TUDO: Templates, Engines, Componentes e Funis.

---

## 🎯 VISÃO GERAL DO ARSENAL

| Categoria | Quantidade | Localização REAL |
|-----------|------------|------------------|
| **Templates de Resultado** | 4 | `components/quiz/screens/templates/` |
| **Engines (Calculators)** | 4 | `components/quiz/screens/tools/` |
| **Componentes Visuais** | 21 | `components/quiz/screens/visual/` |
| **Funis de Conversão** | 4 | `components/quiz/screens/funnels/` |
| **Telas Base** | 10 | `components/quiz/screens/` |
| **Perguntas (Questions)** | 4 | `data/quiz-flows/` |
| **Protocolos** | 2 | `data/protocols/` |
| **Iscas Prontas** | 1 | `data/iscas/` |

---

## 🧩 MATRIZ: MECÂNICA → TEMPLATE → ENGINE → FUNIL

| Mecânica | Template | Engine | Funil Recomendado |
|----------|----------|--------|-------------------|
| Score/Diagnóstico | `ScoreResultTemplate.tsx` | `useScoreCalculator.ts` | HighTicket ou Conversion |
| Calculadora R$ | `FinancialResultTemplate.tsx` | `useFinancialCalculator.ts` | HighTicketConversionFlow |
| Idade de X | `HealthResultTemplate.tsx` | `useHealthCalculator.ts` | ConversionFlow |
| Risco/Vulnerabilidade | `SecurityResultTemplate.tsx` | `useSecurityCalculator.ts` | HighTicketConversionFlow |
| Antes/Depois | (pendente) | (pendente) | VisualServiceFunnel |
| Match/Recomendação | (pendente) | (pendente) | VisualServiceFunnel |
| Elegibilidade | (pendente) | (pendente) | HighTicketConversionFlow |

> ⚠️ **3 mecânicas pendentes de implementação** — ver `PENDENCIAS_TECNICAS.md`

---

## 📦 TEMPLATES DE RESULTADO (4)

**Localização:** `client/src/components/quiz/screens/templates/`

| Template | Nicho | Engine |
|----------|-------|--------|
| `FinancialResultTemplate.tsx` | Tributário, Solar, Consórcio | `useFinancialCalculator` |
| `HealthResultTemplate.tsx` | Fitness, Nutrição, Longevidade | `useHealthCalculator` |
| `ScoreResultTemplate.tsx` | Burnout, TDAH, Inglês | `useScoreCalculator` |
| `SecurityResultTemplate.tsx` | Segurança, Risco, Vulnerabilidade | `useSecurityCalculator` |

---

## ⚙️ ENGINES / CALCULATORS (4)

**Localização:** `client/src/components/quiz/screens/tools/`

| Engine | O que calcula | Documentação |
|--------|---------------|--------------|
| `useFinancialCalculator.ts` | R$ perdido, economia, projeção 5 anos | `README_TOOLS.txt` |
| `useHealthCalculator.ts` | IMC, idade biológica, meta de peso | `README_TOOLS.txt` |
| `useScoreCalculator.ts` | Score ponderado 0-100, níveis | `README_TOOLS.txt` |
| `useSecurityCalculator.ts` | % de risco, vulnerabilidades, fatores | `README_TOOLS.txt` |

---

## 🌪️ FUNIS DE CONVERSÃO (4)

**Localização:** `client/src/components/quiz/screens/funnels/`

> **IMPORTANTE:** Todo quiz DEVE terminar em um destes funis. Eles são o "pós-resultado".

| Funil | Tipo de Negócio | Arquivos |
|-------|-----------------|----------|
| **Arquétipo 1: Digital** | Infoprodutos, Cursos, Dietas | `ConversionFlow.tsx` + `LongVSLSalesPage.tsx` |
| **Arquétipo 2: High-Ticket** | Advogados, B2B, Solar | `HighTicketConversionFlow.tsx` |
| **Arquétipo 3: Visual** | Estética, Dentista, Academia | `VisualServiceFunnel.tsx` |

**Documentação:** `INSTRUCOES_FUNIS.md`

### Como Escolher o Funil:

```
└── O cliente vende PRODUTO DIGITAL?
    └── SIM → Arquétipo 1 (ConversionFlow + LongVSL)

└── O cliente vende SERVIÇO SÉRIO/COMPLEXO?
    └── SIM → Arquétipo 2 (HighTicketConversionFlow)

└── O cliente vende BELEZA/EXPERIÊNCIA LOCAL?
    └── SIM → Arquétipo 3 (VisualServiceFunnel)
```

---

## 🎨 COMPONENTES VISUAIS (21)

**Localização:** `client/src/components/quiz/screens/visual/`

### Gráficos e Projeções
| Componente | Psicologia |
|------------|------------|
| `GaugeMeter.tsx` | Big Reveal (velocímetro) |
| `DonutChart.tsx` | Proporção |
| `ProjectionLineChart.tsx` | Projeção futura |
| `EvolutionTrendChart.tsx` | Jornada A→B |
| `ComparisonDuelChart.tsx` | Duelo de linhas |
| `ProgressJourneyChart.tsx` | Barras crescentes |

### Comparação
| Componente | Psicologia |
|------------|------------|
| `ComparisonCard.tsx` | Cenário A vs B |
| `ComparisonTable.tsx` | Tabela comparativa |
| `BeforeAfterSlider.tsx` | Transformação visual |

### Loading
| Componente | Psicologia |
|------------|------------|
| `SocialProofLoader.tsx` | Labor Illusion + fatos |
| `ChecklistLoader.tsx` | Auditoria forense |

### Interação
| Componente | Psicologia |
|------------|------------|
| `InteractiveBodySelector.tsx` | Toque na dor |
| `VisualStateSlider.tsx` | Morphing |
| `InteractiveInput.tsx` | Big Data |
| `IconGrid.tsx` | Shopping visual |
| `ScratchCard.tsx` | Gamificação |

### Social/Trust
| Componente | Psicologia |
|------------|------------|
| `ReviewsCarousel.tsx` | Prova social |
| `MapRadarBackground.tsx` | Autoridade local |
| `TipCard.tsx` | Reciprocidade |

### Ação
| Componente | Psicologia |
|------------|------------|
| `TimeSlotSelector.tsx` | Urgência |
| `ShareButton.tsx` | Viralização |

**Documentação:** `VISUAL_COMPONENTS_LIBRARY.md`

---

## 📋 TELAS BASE (10)

**Localização:** `client/src/components/quiz/screens/`

| Tela | Uso |
|------|-----|
| `WelcomeScreen.tsx` | Capa/entrada |
| `MultiSelectScreen.tsx` | Perguntas com opções |
| `ImageSelectScreen.tsx` | Cards com imagens |
| `InputScreen.tsx` | Campos de texto/número |
| `InfoInterstitialScreen.tsx` | Fatos educativos |
| `LoadingCalculatedScreen.tsx` | Loading com mensagens |
| `EmailCaptureScreen.tsx` | Captura de email |
| `VSLSalesScreen.tsx` | Página de vendas |
| `ScaleScreen.tsx` | Escala 1-5 ou 1-10 |
| `SliderScreen.tsx` | Range contínuo |

---

## 📁 DADOS (Data)

### Perguntas (quiz-flows/)
**Localização:** `client/src/data/quiz-flows/`

| Arquivo | Nicho |
|---------|-------|
| `BurnoutQuestions.ts` | Saúde Mental |
| `FinancialQuestions.ts` | Tributário/Financeiro |
| `SecurityQuestions.ts` | Segurança Residencial |
| `WeightLossQuestions.ts` | Emagrecimento |

**Documentação:** `README_QUESTIONS.txt`

### Protocolos (protocols/)
**Localização:** `client/src/data/protocols/`

| Arquivo | Função |
|---------|--------|
| `ZING_PROTOCOL_MASTER.md` | Ordem psicológica das telas (30-50) |
| `CONVERSION_PROTOCOL_MASTER.md` | Fluxo de conversão |

### Iscas de Clientes (iscas/)
**Localização:** `client/src/data/iscas/`

Cada cliente tem sua pasta: `iscas/[slug-cliente]/config.ts`

---

## 🔍 COMO ENCONTRAR O QUE PRECISA

### "Preciso criar uma isca de [NICHO]"
1. → `CHECKLIST_UNIVERSAL.md` (processo)
2. → `MAPA_MECANICAS.md` (qual mecânica?)
3. → Este arquivo (qual template/engine/funil?)

### "Preciso de um componente para [EFEITO]"
1. → `MAPEAMENTO_PSICO_CODIGO.md`
2. → `visual/VISUAL_COMPONENTS_LIBRARY.md`

### "Preciso configurar o resultado"
1. → `templates/` (escolher template)
2. → `tools/README_TOOLS.txt` (entender engine)

### "Preciso configurar a oferta/venda"
1. → `funnels/INSTRUCOES_FUNIS.md`
2. → Escolher arquétipo (Digital, HighTicket, Visual)

---

*Documento: INDICE_ARSENAL.md v2.0 — Janeiro 2026 (Corrigido)*
