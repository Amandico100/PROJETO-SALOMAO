# ✅ CHECKLIST UNIVERSAL DE CRIAÇÃO DE ISCA

> **REGRA ABSOLUTA:** Marque cada item ANTES de avançar para o próximo.
> Se você pular um item, sua isca vai falhar em converter.

---

## 📋 FASE 0: DISCOVERY (Antes de tudo)

### 0.1 — Entender o Cliente

- [ ] **Qual é o nicho do cliente?**
  - Anotar: _____________________

- [ ] **Qual problema ele resolve para os clientes dele?**
  - Anotar: _____________________

- [ ] **Qual é o cliente IDEAL dele?** (Quem compra?)
  - Anotar: _____________________

### 0.2 — Definir o Vilão Mensurável

> 📖 Consultar: `02_PSICOLOGIA_E_COPY/Vilão Mensurável.md`

- [ ] **Qual é o NÚMERO que vai chocar a pessoa?**
  - Tipo de revelação: R$ / % / Anos / Score
  - O número: _____________________
  - Frase de impacto: "Você está perdendo _____________________"

- [ ] **O vilão é MENSURÁVEL e CORRIGÍVEL?**
  - Se não consegue medir → Não serve como vilão
  - Se não tem solução clara → Não serve como vilão

---

## 🔍 FASE 1: PESQUISA (Consultar materiais)

### 1.1 — Consultar Iscas Coringa

> 📖 Consultar: `04_REPERTORIO/CONCEITOS_ISCAS_CORINGA.md`

- [ ] **Existe uma Isca Coringa que se adapta a este nicho?**
  - [ ] SIM → Qual? _____________________
  - [ ] NÃO → Prosseguir para criação específica

### 1.2 — Estudar Benchmark

> 📖 Consultar: `05_BENCHMARKING_GLOBAL/`

- [ ] **Como Zing/BetterMe fariam uma isca similar?**
  - Estrutura de perguntas: _____________________
  - Loading que usam: _____________________
  - Tipo de resultado: _____________________

---

## 🎯 FASE 2: DEFINIÇÃO (Escolher mecânica)

### 2.1 — Identificar Mecânica

> 📖 Consultar: `00_INICIO_OBRIGATORIO/MAPA_MECANICAS.md`

- [ ] **Qual das 7 mecânicas se aplica?**
  - [ ] 1. Quiz de Score/Diagnóstico (✅ disponível)
  - [ ] 2. Calculadora de Valor R$ (✅ disponível)
  - [ ] 3. Scanner de Idade de X (✅ disponível)
  - [ ] 4. Antes/Depois com IA (⏳ pendente)
  - [ ] 5. Match/Recomendação (⏳ pendente)
  - [ ] 6. Risco/Vulnerabilidade (✅ disponível)
  - [ ] 7. Elegibilidade/Chance (⏳ pendente)

### 2.2 — Selecionar Template e Engine

> 📖 Consultar: `00_INICIO_OBRIGATORIO/INDICE_ARSENAL.md`

- [ ] **Qual template e engine?**
  - Template (em `screens/templates/`): _____________________
  - Engine (em `screens/tools/`): _____________________

---

## 🌪️ FASE 3: ESCOLHER FUNIL DE CONVERSÃO (OBRIGATÓRIO)

> 📖 Consultar: `components/quiz/screens/funnels/INSTRUCOES_FUNIS.md`

**⚠️ ATENÇÃO:** Toda isca DEVE terminar em um funil. Sem funil = sem conversão.

### 3.1 — Identificar Tipo de Negócio

- [ ] **O cliente vende o quê?**
  - [ ] Produto Digital (Curso, E-book, App) → **Arquétipo 1**
  - [ ] Serviço High-Ticket (Advogado, B2B, Solar) → **Arquétipo 2**
  - [ ] Estética/Local (Dentista, Academia, Salão) → **Arquétipo 3**

### 3.2 — Selecionar Arquivos do Funil

| Arquétipo | Arquivos | CTA Final |
|-----------|----------|-----------|
| **1: Digital** | `ConversionFlow.tsx` + `LongVSLSalesPage.tsx` | Compra (Pix/Cartão) |
| **2: High-Ticket** | `HighTicketConversionFlow.tsx` | WhatsApp |
| **3: Visual** | `VisualServiceFunnel.tsx` | WhatsApp + Voucher |

- [ ] **Funil escolhido:** _____________________
- [ ] **CTA final definido:** _____________________

---

## 💬 FASE 4: APRESENTAÇÃO AO CLIENTE

### 4.1 — Preparar Opções

- [ ] **Preparei 2-3 opções de isca para o cliente?**
  - Opção A: _____________________
  - Opção B: _____________________
  - Opção C (se houver): _____________________

### 4.2 — Obter Escolha

- [ ] **Cliente escolheu qual opção?**
  - Opção escolhida: _____________________

---

## 💻 FASE 5: EXECUÇÃO (Criar a isca)

### 5.1 — Estrutura de Arquivos

- [ ] **Criar pasta `data/iscas/[slug-cliente]/`**

- [ ] **Criar arquivos obrigatórios:**
  - [ ] `config.ts` — Configuração QuizConfig
  - [ ] `logica.ts` — Cálculos específicos (se necessário)
  - [ ] `metadata.json` — Dados do cliente

### 5.2 — Configurar Perguntas

- [ ] **Criar ou adaptar arquivo em `data/quiz-flows/`**
- [ ] **Verificar se perguntas alimentam o engine corretamente**

### 5.3 — Mapear Componentes Visuais

> 📖 Consultar: `00_INICIO_OBRIGATORIO/MAPEAMENTO_PSICO_CODIGO.md`

- [ ] **Mapeei os componentes para cada efeito psicológico?**
  - Loading: _____________________
  - Big Reveal: _____________________
  - Comparação: _____________________

### 5.4 — Configurar Funil

- [ ] **Configurei as props do funil escolhido?**
  - WhatsApp configurado? (se aplicável)
  - Preço/Oferta configurados? (se aplicável)

---

## ✅ FASE 6: VALIDAÇÃO (Testar tudo)

### 6.1 — Teste Funcional

- [ ] **Executei `npm run dev`?**
- [ ] **Naveguei por todas as telas?**
- [ ] **O cálculo retorna valores corretos?**
- [ ] **O funil aparece após o resultado?**
- [ ] **O CTA final funciona?**

### 6.2 — Verificar Momento Caneta

- [ ] **O resultado final cria o "MEU DEUS!"?**
  - O número é chocante?
  - A visualização é impactante?
  - A pessoa vai querer agir?

### 6.3 — The Commit Rule

- [ ] **Atualizei a documentação?**
  - [ ] Se criei componente novo → Atualizar `VISUAL_COMPONENTS_LIBRARY.md`
  - [ ] Se criei engine nova → Atualizar `tools/README_TOOLS.txt`

---

## 🏁 FINALIZAÇÃO

- [ ] **Isca testada e funcionando?**
- [ ] **Funil configurado corretamente?**
- [ ] **Documentação atualizada?**
- [ ] **Commit no Git com mensagem clara?**

### Mensagem de Commit Padrão:
```
feat(isca): [slug-cliente] - [mecânica] para [nicho]
```

---

*Documento: CHECKLIST_UNIVERSAL.md v2.0 — Janeiro 2026 (Adicionada Fase de Funis)*
