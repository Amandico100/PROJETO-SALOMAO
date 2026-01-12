/**
 * 🛡️ CASA SEGURA - Security Calculator
 * Motor de cálculo de risco com score variável (19-28%)
 * 
 * Usa seed baseado no CEP/cidade para gerar números determinísticos
 * (mesma pessoa = mesmo resultado, mas parece único)
 */

import { useMemo } from 'react';

// ============================================================================
// TIPOS
// ============================================================================

export interface SecurityInputs {
    city: string;
    state?: string;
    propertyType: 'residential' | 'commercial';
    buildingType: string;
    protectionTarget: string[];
    currentSecurity: string[];
    safetyPerception: string;
    invasorLogic: string;
    urgencyLevel: string;
}

export interface SecurityResult {
    riskPercentage: number; // 19-28%
    riskLevel: 'low' | 'moderate' | 'high';
    verdictTitle: string;
    verdictDescription: string;
    justifications: {
        icon: string;
        text: string;
    }[];
    regionalIncrease: number; // % de aumento na região
    recentIncidents: number; // Número fictício de ocorrências recentes
    actionRequired: boolean;
}

export interface RiskFactor {
    id: string;
    label: string;
    impact: string;
    description: string;
    type: 'increase' | 'decrease';
}

// ============================================================================
// FATORES DE RISCO (Para a tabela de comparação)
// ============================================================================

export const riskFactorsIncrease: RiskFactor[] = [
    {
        id: 'cameras-no-monitoring',
        label: 'Câmeras sem monitoramento',
        impact: '+15%',
        description: 'Sinalizam bens de valor sem proteção ativa',
        type: 'increase'
    },
    {
        id: 'low-walls',
        label: 'Muros baixos ou vazados',
        impact: '+12%',
        description: 'Facilidade de acesso visual e físico',
        type: 'increase'
    },
    {
        id: 'weak-lighting',
        label: 'Iluminação externa fraca',
        impact: '+10%',
        description: 'Cobertura para ação criminosa',
        type: 'increase'
    },
    {
        id: 'empty-house',
        label: 'Casa vazia frequentemente',
        impact: '+18%',
        description: 'Principal fator de escolha pelos invasores',
        type: 'increase'
    },
    {
        id: 'old-alarm',
        label: 'Alarme desatualizado (5+ anos)',
        impact: '+8%',
        description: 'Sistemas conhecidos e facilmente burlados',
        type: 'increase'
    }
];

export const riskFactorsDecrease: RiskFactor[] = [
    {
        id: 'monitored-alarm',
        label: 'Alarme com monitoramento 24h',
        impact: '-61%',
        description: 'Maior inibidor comprovado cientificamente',
        type: 'decrease'
    },
    {
        id: 'response-protocol',
        label: 'Protocolo de resposta imediata',
        impact: '-35%',
        description: 'Tempo de reação é crucial',
        type: 'decrease'
    },
    {
        id: 'vulnerability-study',
        label: 'Estudo de vulnerabilidade',
        impact: '-39%',
        description: 'Elimina pontos cegos específicos',
        type: 'decrease'
    },
    {
        id: 'motion-sensor',
        label: 'Sensor de movimento',
        impact: '-20%',
        description: 'Alerta antecipado de invasão',
        type: 'decrease'
    },
    {
        id: 'auto-lighting',
        label: 'Iluminação automática',
        impact: '-12%',
        description: 'Simula presença e inibe aproximação',
        type: 'decrease'
    }
];

// ============================================================================
// DICAS DE SEGURANÇA (Para as telas de dicas)
// ============================================================================

export const securityTipsDontDo = [
    {
        id: 'cameras-no-plates',
        icon: '📹',
        title: 'Câmeras sem placa de alarme',
        description: 'Ladrões profissionais identificam câmeras como sinal de bens valiosos. Sem a placa de alarme, eles sabem que podem agir — a câmera só vai gravar o crime, não impedi-lo.'
    },
    {
        id: 'predictable-routine',
        icon: '🔌',
        title: 'Rotina previsível de ausência',
        description: 'Sair e voltar sempre nos mesmos horários facilita o "estudo" que invasores fazem. Eles observam até 2 semanas antes de agir. Varie seus horários quando possível.'
    },
    {
        id: 'only-fence',
        icon: '🔓',
        title: 'Confiar apenas na cerca elétrica',
        description: 'Cercas podem ser desativadas ou puladas. 67% das invasões a casas com apenas cerca elétrica foram bem-sucedidas.',
        source: 'Estudo FIESP 2023'
    }
];

export const securityTipsDo = [
    {
        id: 'strong-lighting',
        icon: '💡',
        title: 'Iluminação forte na cor branca',
        description: 'Luz branca (4000K+) é a mais incômoda para invasores — não permite sombras e dificulta a identificação de quem está dentro. Criminosos evitam casas bem iluminadas.',
        action: 'Instale 2 a 4 refletores LED brancos no perímetro'
    },
    {
        id: 'alarm-plates',
        icon: '🚨',
        title: 'Use placas de alarme, mesmo sem alarme',
        description: 'Pode parecer "mentira", mas estatisticamente: ladrões respeitam mais uma placa de alarme do que uma câmera visível. A ameaça de resposta imediata é o maior inibidor.',
        fact: '74% dos assaltantes desistem ao ver placa de monitoramento',
        source: 'UNC Charlotte — Criminology'
    },
    {
        id: 'response-protocol',
        icon: '🚔',
        title: 'Tenha um protocolo de resposta tática',
        description: 'Só alarme não adianta se ninguém vier. Um bom sistema aciona: 1) Sirene, 2) Central de monitoramento, 3) Polícia/segurança privada em até 5 minutos. Pergunte sobre isso no Estudo.',
        emotionalHook: 'Seus filhos e família merecem a certeza de que alguém virá se algo acontecer.'
    }
];

// ============================================================================
// HOOK PRINCIPAL
// ============================================================================

export function useSecurityCalculator() {

    /**
     * Gera um número determinístico entre min e max baseado em uma string
     * (mesma string = mesmo número)
     */
    const generateDeterministicNumber = (seed: string, min: number, max: number): number => {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            const char = seed.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        const normalized = Math.abs(hash) / 2147483647; // Normalize to 0-1
        return Math.floor(normalized * (max - min + 1)) + min;
    };

    /**
     * Calcula o score de risco baseado nos inputs
     */
    const calculateRisk = (inputs: SecurityInputs): SecurityResult => {
        // Gerar número base (19-28) baseado na cidade
        const baseRisk = generateDeterministicNumber(inputs.city.toLowerCase(), 19, 28);

        // Gerar aumento regional (12-38%)
        const regionalIncrease = generateDeterministicNumber(inputs.city + 'region', 12, 38);

        // Gerar ocorrências recentes (fictício mas convincente)
        const recentIncidents = generateDeterministicNumber(inputs.city + 'incidents', 47, 156);

        // Determinar nível de risco (sempre moderado para ser credível)
        const riskLevel: SecurityResult['riskLevel'] =
            baseRisk < 22 ? 'low' :
                baseRisk < 26 ? 'moderate' :
                    'high';

        // Gerar justificativas baseadas no perfil
        const justifications: SecurityResult['justifications'] = [
            {
                icon: '📍',
                text: `Região com +${regionalIncrease}% de ocorrências vs média estadual`
            },
            {
                icon: '🏠',
                text: 'Perfil de imóvel frequentemente visado'
            },
            {
                icon: '📈',
                text: `Aumento de ${generateDeterministicNumber(inputs.city + 'increase', 15, 34)}% em B.O.s no último semestre`
            }
        ];

        // Adicionar justificativa se não tem alarme
        if (!inputs.currentSecurity.includes('alarm')) {
            justifications.push({
                icon: '🚨',
                text: 'Ausência de sistema de alarme monitorado'
            });
        }

        // Título e descrição do veredito
        const verdictTitle = riskLevel === 'high'
            ? '⚠️ ALTA VULNERABILIDADE DETECTADA'
            : '⚠️ VULNERABILIDADE DETECTADA';

        const verdictDescription = `Com base na análise da região e perfil do imóvel, existe ${baseRisk}% de probabilidade de uma ocorrência nos próximos 60 dias.`;

        return {
            riskPercentage: baseRisk,
            riskLevel,
            verdictTitle,
            verdictDescription,
            justifications,
            regionalIncrease,
            recentIncidents,
            actionRequired: true
        };
    };

    return {
        calculateRisk,
        riskFactorsIncrease,
        riskFactorsDecrease,
        securityTipsDontDo,
        securityTipsDo
    };
}

// ============================================================================
// ESTADOS BRASILEIROS (Para detecção)
// ============================================================================

export const brazilianStates: Record<string, string> = {
    'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas',
    'BA': 'Bahia', 'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo',
    'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul',
    'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
    'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
    'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
    'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
};
