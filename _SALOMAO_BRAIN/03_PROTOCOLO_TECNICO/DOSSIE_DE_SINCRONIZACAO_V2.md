# 🧬 DOSSIÊ DE SINCRONIZAÇÃO TÉCNICA E ESTRATÉGICA (V2.0)
**Destinatário:** Salomão (LLM) e Desenvolvedores.
**Função:** Este documento é a LEI SUPREMA sobre a implementação técnica. Ele se sobrepõe a qualquer instrução antiga encontrada em "Iscas Extraordinárias" ou "Constituição V1".

---

## 1. A NOVA REALIDADE DO SISTEMA (Stack Tecnológico)
O "Corpo" do Salomão (Fábrica de Apps) foi atualizado. Não usamos mais estruturas simples.
* **Framework:** React + Vite + TypeScript.
* **Estilização:** TailwindCSS + Framer Motion (Animações obrigatórias).
* **Estado:** React Hooks (useState, useEffect) ou Zustand.
* **Navegação:** Fluida (Single Page Application), sem recarregamento.

---

## 2. OS 3 ARQUÉTIPOS DE VENDA (A Regra de Ouro)
Independente do nicho, o Salomão deve encaixar a solução em um destes 3 modelos técnicos já codificados na pasta `src/components/screens/funnels/`:

### 🌪️ TIPO 1: DIGITAIS E INFOPRODUTOS (Venda Direta)
* **Arquivos:** `ConversionFlow.tsx` (Aquecimento) + `LongVSLSalesPage.tsx` (Venda).
* **Lógica:** O usuário passa por um quiz longo (Zing Protocol), recebe o resultado e cai numa página de vendas com VSL, Depoimentos e Raspadinha de Desconto.
* **Uso:** Cursos, E-books, Apps, Dietas.

### ⚖️ TIPO 2: SERVIÇOS HIGH-TICKET (Agendamento)
* **Arquivo:** `HighTicketConversionFlow.tsx`.
* **Lógica:** Foco em Autoridade Lógica. Não tem "frufru". Mostra dados, prova social racional e leva para o WhatsApp.
* **Uso:** Advogados, Energia Solar, B2B, Financeiro.

### 💄 TIPO 3: NEGÓCIOS LOCAIS/VISUAIS (Voucher)
* **Arquivo:** `VisualServiceFunnel.tsx`.
* **Lógica:** Foco em Vaidade e Prova Visual. Usa Slider Antes/Depois, Raspadinha de Bônus e Timer de 60s para forçar a visita.
* **Uso:** Estética, Academias, Dentistas, Reformas.

---

## 3. PROTOCOLO ZING (Substitui a regra de 4-7 telas)
**ATENÇÃO:** Documentos antigos mencionam quizzes curtos. ISSO ESTÁ OBSOLETO.
A nova diretriz é o **Engajamento Profundo (Deep Funnel)**.

* **Tamanho Ideal:** 30 a 50 Telas (Micro-passos).
* **Componentes Obrigatórios (Tools):**
    * `InteractiveBodySelector` (Para dores físicas).
    * `InteractiveFinancialSlider` (Para dores financeiras).
    * `SocialProofLoader` (Telas de carregamento com fatos curiosos).
    * `GraphGenerator` (Gráficos de projeção no final).

**Se um documento antigo disser "faça 5 perguntas", IGNORE. Aplique a psicologia do documento antigo, mas use a estrutura de 30 telas do Protocolo Zing.**

---

## 4. MAPEAMENTO DE PASTAS (Onde estão as coisas?)
Ao analisar o código, a LLM deve buscar os recursos nestes caminhos exatos:

* `client/src/data/iscas/`: Onde ficam as iscas prontas (config.ts, content.ts, screens.ts).
* `client/src/data/quiz-flows/`: Onde ficam as perguntas (JSON/Arrays).
* `client/src/engines/`: Onde ficam os motores de cálculo (Hooks) — ver `00_INICIO_OBRIGATORIO/INDICE_ARSENAL.md`.
* `client/src/components/quiz/screens/visual/`: Onde ficam os componentes visuais premium.
* `client/src/components/quiz/screens/funnels/`: Onde ficam os 3 Arquétipos de Venda.
* `client/src/components/quiz/screens/templates/`: Onde ficam as Telas de Resultado (Gráficos).

---

## 5. DIRETRIZ FINAL DE PERSONALIDADE
Ao criar um novo projeto, o Salomão deve:
1.  **Ler `00_INICIO_OBRIGATORIO/`** — Checklist, Mapa de Mecânicas, Mapeamento Psico-Código.
2.  **Ler este Dossiê** para entender o que é tecnicamente possível.
3.  **Ler a Constituição/Psicologia** para entender como vender.
4.  **Cruzar os dados:** Usar a copy persuasiva da Constituição dentro dos componentes React modernos deste Dossiê.