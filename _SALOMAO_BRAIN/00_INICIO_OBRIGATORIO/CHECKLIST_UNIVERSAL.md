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

### 1.2 — Consultar Variações por Nicho

> 📖 Consultar: `04_REPERTORIO/VARIAÇÕES_POR_NICHO/[nicho].md`

- [ ] **Existem variações documentadas para este nicho?**
  - [ ] SIM → Listar opções disponíveis
  - [ ] NÃO → Criar nova entrada depois (The Commit Rule)

### 1.3 — Estudar Benchmark

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
  - [ ] 1. Quiz de Score/Diagnóstico
  - [ ] 2. Calculadora de Valor (R$)
  - [ ] 3. Scanner de Idade de X
  - [ ] 4. Antes/Depois com IA
  - [ ] 5. Match/Recomendação
  - [ ] 6. Risco/Vulnerabilidade
  - [ ] 7. Elegibilidade/Chance

### 2.2 — Selecionar Template

- [ ] **Qual template corresponde à mecânica escolhida?**
  - Template: _____________________
  - Engine: _____________________

### 2.3 — Definir Tipo de Revelação

> 📖 Consultar: `04_REPERTORIO/Catálogo de Tipos de Revelação.md`

- [ ] **Qual tipo de revelação vai usar?**
  - [ ] Dinheiro Perdido (R$)
  - [ ] Tempo Perdido (horas/dias)
  - [ ] Risco com Prazo
  - [ ] Idade Percebida
  - [ ] Score/Ranking
  - [ ] Antes/Depois Visual
  - [ ] Outro: _____________________

---

## 💬 FASE 3: APRESENTAÇÃO AO CLIENTE

### 3.1 — Preparar Opções

- [ ] **Preparei 2-3 opções de isca para o cliente?**
  - Opção A: _____________________
  - Opção B: _____________________
  - Opção C (se houver): _____________________

### 3.2 — Explicar Diferenças

- [ ] **Expliquei as diferenças entre as opções?**
  - Qual atrai mais leads?
  - Qual qualifica melhor?
  - Qual tem visual mais impactante?

### 3.3 — Obter Escolha

- [ ] **Cliente escolheu qual opção?**
  - Opção escolhida: _____________________
  - Razão: _____________________

---

## 💻 FASE 4: EXECUÇÃO (Criar a isca)

### 4.1 — Estrutura de Arquivos

- [ ] **Criar pasta `data/iscas/[nome-da-isca]/`**

- [ ] **Criar arquivos obrigatórios:**
  - [ ] `config.ts` — Tema, metadata, engine
  - [ ] `content.ts` — TODOS os textos
  - [ ] `screens.ts` — Fluxo de telas
  - [ ] `logic.ts` — Cálculos (se específico)

### 4.2 — Configurar Engine

- [ ] **Definir engine no `config.ts`:**
  ```typescript
  engine: {
    type: '[financial|score|image]',
    name: '[nome-da-engine]',
    params: { ... }
  }
  ```

### 4.3 — Verificar Imagens

> 📖 Consultar: `assets/images/INDEX_MASTER.md`

- [ ] **Existem imagens para este nicho?**
  - [ ] SIM → Usar as existentes
  - [ ] NÃO → Usar placeholders + indicar quais comprar

### 4.4 — Mapear Componentes Visuais

> 📖 Consultar: `00_INICIO_OBRIGATORIO/MAPEAMENTO_PSICO_CODIGO.md`

- [ ] **Mapeei os componentes para cada efeito psicológico?**
  - Loading: _____________________
  - Big Reveal: _____________________
  - Comparação: _____________________

---

## ✅ FASE 5: VALIDAÇÃO (Testar tudo)

### 5.1 — Teste Funcional

- [ ] **Executei `npm run dev`?**
- [ ] **Naveguei por todas as telas?**
- [ ] **O cálculo retorna valores corretos?**

### 5.2 — Verificar Momento Caneta

- [ ] **O resultado final cria o "MEU DEUS!"?**
  - O número é chocante?
  - A visualização é impactante?
  - A pessoa vai querer agir?

### 5.3 — Verificar CTA

- [ ] **O botão final funciona?**
  - WhatsApp abre corretamente?
  - Webhook envia dados?
  - Timer de urgência funciona?

### 5.4 — The Commit Rule

- [ ] **Atualizei a documentação?**
  - [ ] Se criei componente novo → Atualizar `VISUAL_COMPONENTS_LIBRARY.md`
  - [ ] Se criei engine nova → Atualizar `engines/README.md`
  - [ ] Se criei variação nova → Atualizar `VARIAÇÕES_POR_NICHO/`

---

## 🏁 FINALIZAÇÃO

- [ ] **Isca testada e funcionando?**
- [ ] **Documentação atualizada?**
- [ ] **Commit no Git com mensagem clara?**

### Mensagem de Commit Padrão:
```
feat(isca): [nome-da-isca] - [mecânica] para [nicho]
```

---

*Documento: CHECKLIST_UNIVERSAL.md v1.0 — Janeiro 2026*
