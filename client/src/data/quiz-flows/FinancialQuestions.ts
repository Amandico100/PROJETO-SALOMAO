// src/data/quiz-flows/FinancialQuestions.ts
import { 
  DollarSign, TrendingDown, Scale, Building, 
  AlertOctagon, PiggyBank, Briefcase 
} from 'lucide-react';

// Este fluxo é um MODELO UNIVERSAL. O Salomão deve adaptar os textos
// para "Imposto", "Juros" ou "Conta de Luz" conforme o nicho.

export const financialFlow = [
  // --- BLOCO 1: IDENTIDADE & CONTEXTO ---
  {
    id: 'q1',
    category: 'identity',
    type: 'single-select',
    title: 'Qual o perfil do titular da conta/processo?',
    options: [
      { label: 'Pessoa Física (CPF)', value: 'pf', icon: User },
      { label: 'Pessoa Jurídica (CNPJ)', value: 'pj', icon: Building },
    ]
  },
  {
    id: 'q2',
    category: 'identity',
    type: 'single-select',
    title: 'Qual sua faixa de faturamento/renda mensal?',
    subtitle: 'Isso define qual tabela de cálculo usaremos.',
    options: [
      { label: 'Até R$ 5.000', value: 5000 },
      { label: 'R$ 5k a R$ 20k', value: 15000 },
      { label: 'R$ 20k a R$ 100k', value: 50000 },
      { label: 'Acima de R$ 100k', value: 150000 },
    ]
  },

  // --- BLOCO 2: AGITAÇÃO DA DOR (Pain Agitation) ---
  {
    id: 'q3',
    category: 'pain',
    type: 'single-select',
    title: 'Você sente que está pagando mais do que deveria?',
    subtitle: 'A maioria dos brasileiros paga 30% a mais por falta de revisão.',
    options: [
      { label: 'Sim, é abusivo', value: 'high_pain', icon: AlertOctagon },
      { label: 'Acho que está na média', value: 'medium_pain', icon: Scale },
      { label: 'Não sei dizer', value: 'low_pain', icon: Briefcase },
    ]
  },
  {
    id: 'q4',
    category: 'pain',
    type: 'single-select',
    title: 'Você já tentou negociar ou revisar isso antes?',
    options: [
      { label: 'Nunca tentei', value: 'never' },
      { label: 'Tentei e fui ignorado', value: 'failed' },
      { label: 'Tenho medo de burocracia', value: 'fear' },
    ]
  },

  // --- BLOCO 3: DADOS TÉCNICOS (Inputs para o Motor) ---
  // AQUI USAMOS O COMPONENTE "InteractiveInput"
  {
    id: 'q5',
    category: 'input',
    type: 'input',
    title: 'Qual o valor aproximado que você paga HOJE?',
    subtitle: 'Seja mensal (parcela/imposto) ou valor da dívida.',
    inputType: 'number',
    variableName: 'currentValue', // Alimenta a Tool
    inputPrefix: 'R$'
  },
  
  // --- BLOCO 4: FUTURE PACING ---
  {
    id: 'q6',
    category: 'future',
    type: 'single-select',
    title: 'O que você faria se recuperasse R$ 20.000 hoje?',
    subtitle: 'Visualizar o ganho aumenta o compromisso.',
    options: [
      { label: 'Reinvestiria no negócio', value: 'invest', icon: TrendingDown },
      { label: 'Faria uma viagem', value: 'travel', icon: User },
      { label: 'Quitaria dívidas', value: 'debt', icon: PiggyBank },
    ]
  }
];

export const financialLoadingMessages = [
  "Analisando alíquotas e taxas de juros...",
  "Comparando com a legislação vigente...",
  "Identificando cobranças indevidas...",
  "Calculando juros compostos de 5 anos...",
  "Gerando relatório de economia potencial..."
];