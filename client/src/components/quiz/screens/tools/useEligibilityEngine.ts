import { useMemo } from 'react';

// --- TYPES ---
export interface EligibilityRule {
    id: string;
    name: string;
    description: string;
    weight: number; // Peso no cálculo (1-10)
    required: boolean; // Se é obrigatório para elegibilidade
}

export interface EligibilityResult {
    isEligible: boolean;
    eligibilityPercentage: number; // 0-100
    status: 'eligible' | 'partially_eligible' | 'not_eligible' | 'needs_review';
    metRequirements: EligibilityRule[];
    failedRequirements: EligibilityRule[];
    verdictTitle: string;
    verdictDescription: string;
    nextSteps: string[];
    urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface EligibilityConfig {
    rules: EligibilityRule[];
    minimumScoreToPass: number; // Percentual mínimo para ser elegível (ex: 60)
    partialThreshold: number; // Percentual para ser "parcialmente elegível"
}

// --- HOOK ---
export function useEligibilityEngine() {

    /**
     * Verifica se o usuário é elegível baseado nas respostas
     */
    const checkEligibility = (
        answers: Record<string, boolean | string | number>, // { hasDocuments: true, yearsContributed: 15 }
        config: EligibilityConfig
    ): EligibilityResult => {

        const metRequirements: EligibilityRule[] = [];
        const failedRequirements: EligibilityRule[] = [];
        let totalWeight = 0;
        let earnedWeight = 0;
        let hasFailedRequired = false;

        // Processar cada regra
        config.rules.forEach(rule => {
            const answer = answers[rule.id];
            totalWeight += rule.weight;

            // Determinar se a regra foi atendida
            let passed = false;
            if (typeof answer === 'boolean') {
                passed = answer === true;
            } else if (typeof answer === 'number') {
                passed = answer > 0;
            } else if (typeof answer === 'string') {
                passed = answer !== '' && answer.toLowerCase() !== 'não' && answer.toLowerCase() !== 'nao';
            }

            if (passed) {
                metRequirements.push(rule);
                earnedWeight += rule.weight;
            } else {
                failedRequirements.push(rule);
                if (rule.required) {
                    hasFailedRequired = true;
                }
            }
        });

        // Calcular percentual
        const eligibilityPercentage = Math.round((earnedWeight / totalWeight) * 100);

        // Determinar status
        let status: EligibilityResult['status'] = 'not_eligible';
        let isEligible = false;
        let urgencyLevel: EligibilityResult['urgencyLevel'] = 'low';
        let verdictTitle = '';
        let verdictDescription = '';
        let nextSteps: string[] = [];

        if (hasFailedRequired) {
            status = 'not_eligible';
            verdictTitle = 'Requisitos Obrigatórios Não Atendidos';
            verdictDescription = 'Infelizmente, você não atende aos critérios obrigatórios para este benefício.';
            nextSteps = [
                'Revise os requisitos faltantes',
                'Consulte um especialista para alternativas'
            ];
        } else if (eligibilityPercentage >= config.minimumScoreToPass) {
            status = 'eligible';
            isEligible = true;
            urgencyLevel = 'high';
            verdictTitle = '🎉 VOCÊ É ELEGÍVEL!';
            verdictDescription = 'Parabéns! Você atende aos requisitos necessários para solicitar este benefício.';
            nextSteps = [
                'Reúna a documentação necessária',
                'Agende uma consulta com o especialista',
                'Inicie o processo o quanto antes'
            ];
        } else if (eligibilityPercentage >= config.partialThreshold) {
            status = 'partially_eligible';
            urgencyLevel = 'medium';
            verdictTitle = 'Elegibilidade Parcial';
            verdictDescription = 'Você atende a alguns requisitos. Com ajustes, pode se tornar elegível.';
            nextSteps = [
                'Verifique os requisitos faltantes',
                'Consulte um especialista para orientação',
                'Avalie possibilidades de adequação'
            ];
        } else {
            status = 'needs_review';
            urgencyLevel = 'medium';
            verdictTitle = 'Análise Necessária';
            verdictDescription = 'Seu caso precisa de avaliação mais detalhada por um especialista.';
            nextSteps = [
                'Agende uma consulta para análise completa',
                'Prepare documentação para avaliação'
            ];
        }

        // Ajustar urgência baseado no score
        if (eligibilityPercentage >= 90) {
            urgencyLevel = 'critical'; // Quanto maior, mais urgente agir!
        }

        return {
            isEligible,
            eligibilityPercentage,
            status,
            metRequirements,
            failedRequirements,
            verdictTitle,
            verdictDescription,
            nextSteps,
            urgencyLevel
        };
    };

    /**
     * Cria configuração padrão para casos de INSS/Aposentadoria
     */
    const createINSSConfig = (): EligibilityConfig => ({
        rules: [
            { id: 'idade', name: 'Idade Mínima', description: '65 anos (homem) ou 62 anos (mulher)', weight: 4, required: true },
            { id: 'contribuicao', name: 'Tempo de Contribuição', description: 'Mínimo de 15 anos', weight: 4, required: true },
            { id: 'carencia', name: 'Carência', description: '180 meses de contribuição', weight: 3, required: false },
            { id: 'documentos', name: 'Documentação', description: 'Carteira de trabalho e comprovantes', weight: 2, required: false },
        ],
        minimumScoreToPass: 60,
        partialThreshold: 40
    });

    /**
     * Cria configuração padrão para Visto Americano
     */
    const createVisaConfig = (): EligibilityConfig => ({
        rules: [
            { id: 'passaporte', name: 'Passaporte Válido', description: 'Validade mínima de 6 meses', weight: 5, required: true },
            { id: 'vinculos', name: 'Vínculos com o Brasil', description: 'Emprego, imóveis, família', weight: 4, required: true },
            { id: 'financeiro', name: 'Comprovação Financeira', description: 'Renda ou patrimônio comprovado', weight: 4, required: false },
            { id: 'historico', name: 'Histórico de Viagens', description: 'Carimbos em passaportes anteriores', weight: 2, required: false },
            { id: 'negativas', name: 'Sem Antecedentes Negativos', description: 'Sem recusas de visto anteriores', weight: 3, required: false },
        ],
        minimumScoreToPass: 70,
        partialThreshold: 50
    });

    return {
        checkEligibility,
        createINSSConfig,
        createVisaConfig
    };
}
