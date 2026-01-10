import { 
  User, Briefcase, Battery, Brain, Frown, AlertTriangle, 
  Clock, DollarSign, HeartCrack, ShieldAlert 
} from 'lucide-react';

// Tipagem deve vir do seu arquivo de types global, aqui simplificado para o exemplo
export const burnoutFlow = [
  // --- BLOCO 1: IDENTIDADE & CONTEXTO (Micro-Compromissos) ---
  {
    id: 'q1',
    category: 'context',
    type: 'single-select',
    title: 'Qual o seu regime de trabalho atual?',
    subtitle: 'Isso define seus direitos legais.',
    options: [
      { label: 'CLT (Carteira Assinada)', value: 5, icon: Briefcase },
      { label: 'Servidor Público', value: 5, icon: ShieldAlert },
      { label: 'PJ / Autônomo', value: 1, icon: User },
      { label: 'Desempregado/Afastado', value: 3, icon: User },
    ]
  },
  {
    id: 'q2',
    category: 'context',
    type: 'single-select',
    title: 'Há quanto tempo você exerce essa função?',
    options: [
      { label: 'Menos de 1 ano', value: 1 },
      { label: '1 a 3 anos', value: 2 },
      { label: '3 a 10 anos', value: 3 },
      { label: 'Mais de 10 anos', value: 4 },
    ]
  },
  
  // --- BLOCO 2: AGITAÇÃO DA DOR FÍSICA (Pain Agitation) ---
  // Perguntas com peso para o score 'exaustao'
  {
    id: 'q3',
    category: 'exaustao',
    weight: 2,
    type: 'single-select',
    title: 'Como você se sente ao acordar em dias de trabalho?',
    subtitle: 'Seja sincero, ninguém vai ver isso.',
    options: [
      { label: 'Descansado', value: 0, icon: Battery },
      { label: 'Um pouco cansado', value: 2, icon: Battery },
      { label: 'Exausto/Sem energia', value: 5, icon: Battery },
    ]
  },
  {
    id: 'q4',
    category: 'exaustao',
    weight: 2,
    type: 'single-select',
    title: 'Você sente dores físicas sem explicação?',
    subtitle: 'Dor nas costas, estômago, cabeça frequente.',
    options: [
      { label: 'Raramente', value: 0 },
      { label: 'Às vezes', value: 2 },
      { label: 'Quase todo dia', value: 5 },
    ]
  },
  {
    id: 'q5',
    category: 'exaustao',
    weight: 3,
    type: 'single-select',
    title: 'Como está sua qualidade de sono?',
    subtitle: 'Insônia ou excesso de sono são marcadores clínicos.',
    options: [
      { label: 'Durmo bem', value: 0 },
      { label: 'Demoro a pegar no sono', value: 3 },
      { label: 'Acordo de madrugada pensando no trabalho', value: 5 },
    ]
  },

  // --- BLOCO 3: MENTAL / MBI (Despersonalização) ---
  {
    id: 'q6',
    category: 'cinismo',
    weight: 3,
    type: 'single-select',
    title: 'Você tem se sentido mais irritado ou cínico?',
    subtitle: 'Paciência curta com colegas ou clientes.',
    options: [
      { label: 'Não, estou normal', value: 0 },
      { label: 'Um pouco impaciente', value: 2 },
      { label: 'Me irrito com tudo e todos', value: 5 },
    ]
  },
  {
    id: 'q7',
    category: 'cinismo',
    weight: 3,
    type: 'single-select',
    title: 'Você sente que seu trabalho perdeu o sentido?',
    options: [
      { label: 'Ainda gosto do que faço', value: 0 },
      { label: 'Faço no automático', value: 3 },
      { label: 'Sinto que é inútil/vazio', value: 5 },
    ]
  },

  // --- BLOCO 4: FUTURE PACING & MEDO ---
  {
    id: 'q8',
    category: 'context',
    type: 'single-select',
    title: 'Se você continuar nesse ritmo por mais 1 ano, o que acontece?',
    subtitle: 'Uma projeção realista.',
    options: [
      { label: 'Vou conseguir lidar', value: 0 },
      { label: 'Vou ficar doente', value: 3 },
      { label: 'Vou colapsar/ser internado', value: 5 },
    ]
  },
  {
    id: 'q9',
    category: 'context',
    type: 'input',
    title: 'Qual sua estimativa de salário atual?',
    subtitle: 'Para calcularmos sua perda financeira ou benefício.',
    inputType: 'number',
    inputSuffix: 'R$'
  },

  // --- BLOCO 5: TÉCNICO / NEXO CAUSAL (Importante para Laudo) ---
  {
    id: 'q10',
    category: 'tecnico',
    weight: 4,
    type: 'single-select',
    title: 'Você já precisou de atestado médico por estresse?',
    options: [
      { label: 'Nunca', value: 0 },
      { label: 'Sim, de poucos dias', value: 3 },
      { label: 'Sim, afastamento longo (>15 dias)', value: 5 },
    ]
  },
  {
    id: 'q11',
    category: 'tecnico',
    weight: 4,
    type: 'single-select',
    title: 'Você sente que o ambiente é tóxico ou sofre assédio?',
    subtitle: 'Cobranças excessivas, gritos, metas inatingíveis.',
    options: [
      { label: 'Ambiente normal', value: 0 },
      { label: 'Ambiente pesado', value: 3 },
      { label: 'Ambiente insuportável/Abusivo', value: 5 },
    ]
  }
];

export const burnoutLoadingMessages = [
  "Mapeando níveis de cortisol baseados nos sintomas...",
  "Analisando critérios da CID-11 para Burnout...",
  "Verificando jurisprudência para seu cargo...",
  "Calculando índice de esgotamento mental...",
  "Gerando seu dossiê de saúde ocupacional..."
];