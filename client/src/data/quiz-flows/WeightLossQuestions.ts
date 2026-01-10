import { User, Battery, Moon, Target, GlassWater, Activity } from 'lucide-react';

// --- TYPES ---
export type QuestionType = 'single-select' | 'multi-select' | 'input' | 'info' | 'body-select';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  variableName: string;
  options?: any[];
  inputType?: 'number' | 'text';
  inputSuffix?: string;
}

// --- O FLUXO ZING V2 (Com Body Selector) ---
export const weightLossFlow: QuizQuestion[] = [
  // 1. MICRO-COMPROMISSO
  {
    id: 'q1',
    type: 'single-select',
    title: 'Para começar, qual seu gênero biológico?',
    subtitle: 'Precisamos disso para calcular sua Taxa Metabólica Basal.',
    variableName: 'gender',
    options: [
      { label: 'Homem', value: 'male', icon: User },
      { label: 'Mulher', value: 'female', icon: User },
    ]
  },
  
  // 2. NOVA PERGUNTA VISUAL (Body Selector)
  // O Salomão deve renderizar o componente <InteractiveBodySelector /> aqui
  {
    id: 'q2',
    type: 'body-select', 
    title: 'Onde você quer focar seus resultados?',
    subtitle: 'Toque nas áreas que mais te incomodam hoje.',
    variableName: 'target_areas',
    options: [] // O componente resolve internamente
  },

  // 3. OBJETIVO
  {
    id: 'q3',
    type: 'single-select',
    title: 'Qual seu principal objetivo hoje?',
    variableName: 'goal_type',
    options: [
      { label: 'Perder Peso', value: 'lose_weight', icon: Target },
      { label: 'Ganhar Músculo', value: 'gain_muscle', icon: Activity },
      { label: 'Apenas Saúde', value: 'health', icon: Activity },
    ]
  },

  // 4. AGITAÇÃO DA DOR (Energia)
  {
    id: 'q4',
    type: 'single-select',
    title: 'Como está seu nível de energia durante o dia?',
    subtitle: 'A maioria das pessoas sofre com picos de cansaço.',
    variableName: 'energy_level',
    options: [
      { label: 'Baixo (Exausto)', value: 'low', icon: Battery },
      { label: 'Médio (Oscila)', value: 'medium', icon: Battery },
      { label: 'Alto (Disposto)', value: 'high', icon: Battery },
    ]
  },

  // ... (As perguntas de input numérico continuam iguais)
  {
    id: 'q6',
    type: 'input',
    title: 'Qual a sua idade?',
    variableName: 'age',
    inputType: 'number',
    inputSuffix: 'anos'
  },
  {
    id: 'q7',
    type: 'input',
    title: 'Qual a sua altura?',
    variableName: 'height',
    inputType: 'number',
    inputSuffix: 'cm'
  },
  {
    id: 'q8',
    type: 'input',
    title: 'Qual seu peso atual?',
    variableName: 'weight',
    inputType: 'number',
    inputSuffix: 'kg'
  },
  {
    id: 'q9',
    type: 'input',
    title: 'Qual seu peso ideal (Meta)?',
    variableName: 'goalWeight',
    inputType: 'number',
    inputSuffix: 'kg'
  }
];

export const weightLossLoadingMessages = [
  "Mapeando zonas de gordura localizada...",
  "Calculando projeção de 12 semanas...",
  "Comparando com 15.000 perfis similares...",
  "Gerando gráfico de transformação...",
  "Finalizando seu plano personalizado..."
];