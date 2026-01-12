/**
 * 🛡️ CASA SEGURA - Security Questions
 * Perguntas do quiz de análise de vulnerabilidade residencial/empresarial
 * 
 * Seguindo padrão Zing: Micro-compromissos progressivos, agitação emocional,
 * feedback imediato e construção de consciência.
 */

import type { Screen } from '@/types/quiz';

// ============================================================================
// TIPOS ESPECÍFICOS DE SEGURANÇA
// ============================================================================

export interface SecurityProfile {
    city: string;
    state: string;
    propertyType: 'residential' | 'commercial';
    buildingType: string;
    protectionTarget: string[];
    currentSecurity: string[];
    safetyPerception: string;
    invasorLogic: string;
    urgencyLevel: string;
    preferredSlot: string;
    whatsapp: string;
}

// ============================================================================
// FLUXO RESIDENCIAL - PERGUNTAS
// ============================================================================

export const residentialQuestions: Screen[] = [
    // T1: HOME
    {
        id: 'welcome',
        type: 'welcome',
        headline: 'Seu imóvel é um alvo fácil?',
        subtitle: 'Descubra os 5 Pontos Cegos que deixam imóveis vulneráveis',
        ctaText: 'INICIAR VARREDURA DE RISCO',
        backgroundGradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        nextScreenId: 'geo-input'
    },

    // T2: GEO-INPUT (Mapa aparece aqui)
    {
        id: 'geo-input',
        type: 'input',
        question: 'Em qual cidade está o imóvel que deseja analisar?',
        subtitle: 'Digite a cidade ou permita a detecção automática',
        inputType: 'text',
        placeholder: 'Ex: Joinville',
        ctaText: 'LOCALIZAR REGIÃO',
        nextScreenId: 'geo-validation'
    },

    // T3: VALIDAÇÃO DE REGIÃO
    {
        id: 'geo-validation',
        type: 'multi_select',
        question: 'Identificamos esta região. O imóvel fica nesta área?',
        subtitle: 'Confirme para continuarmos a análise',
        options: [
            { id: 'yes', label: 'Sim, é minha região', icon: '✅' },
            { id: 'no', label: 'Não, corrigir endereço', icon: '❌' }
        ],
        nextScreenId: 'property-type-selector'
    },

    // T3.5: BIFURCAÇÃO (Residência vs Empresa)
    {
        id: 'property-type-selector',
        type: 'multi_select',
        question: 'O Estudo de Segurança é para qual tipo de imóvel?',
        options: [
            { id: 'residential', label: 'Residência', icon: '🏠', description: 'Casa, apartamento ou condomínio' },
            { id: 'commercial', label: 'Empresa', icon: '🏢', description: 'Comércio, escritório ou indústria' }
        ],
        nextScreenId: 'building-type'
    },

    // T4: TIPO DE IMÓVEL (Residencial)
    {
        id: 'building-type',
        type: 'multi_select',
        question: 'Como é o seu imóvel?',
        options: [
            { id: 'house', label: 'Casa térrea', icon: '🏠' },
            { id: 'townhouse', label: 'Sobrado', icon: '🏡' },
            { id: 'apartment', label: 'Apartamento', icon: '🏢' },
            { id: 'condo', label: 'Condomínio fechado', icon: '🏘️' }
        ],
        nextScreenId: 'protection-target'
    },

    // T5: QUEM PROTEGER
    {
        id: 'protection-target',
        type: 'multi_select',
        question: 'Quem você mais precisa proteger neste imóvel?',
        subtitle: 'Selecione todos que se aplicam',
        options: [
            { id: 'children', label: 'Meus filhos', icon: '👶' },
            { id: 'elderly', label: 'Meus pais idosos', icon: '👴' },
            { id: 'assets', label: 'Meu patrimônio', icon: '💼' },
            { id: 'alone', label: 'Moro sozinho(a)', icon: '🧍' }
        ],
        allowMultiple: true,
        nextScreenId: 'current-security'
    },

    // T6: SISTEMA ATUAL
    {
        id: 'current-security',
        type: 'multi_select',
        question: 'Você já possui algum sistema de segurança?',
        options: [
            { id: 'cameras', label: 'Câmeras', icon: '📹' },
            { id: 'fence', label: 'Cerca elétrica', icon: '⚡' },
            { id: 'alarm', label: 'Alarme', icon: '🚨' },
            { id: 'dog', label: 'Cachorro', icon: '🐕' },
            { id: 'none', label: 'Nenhum', icon: '❌' }
        ],
        allowMultiple: true,
        nextScreenId: 'camera-warning'
    },

    // T6.1: FEEDBACK CÂMERA (Condicional)
    {
        id: 'camera-warning',
        type: 'info_interstitial',
        icon: '⚠️',
        headline: 'ATENÇÃO: Câmeras podem aumentar o risco',
        body: 'Em 82% das invasões, criminosos cortam a internet ou roubam o DVR. Câmeras sem monitoramento ativo são "vitrines de bens" — sinalizam que há algo valioso, mas não impedem a entrada.',
        ctaText: 'Entendi',
        nextScreenId: 'safety-perception'
    },

    // T7: PERCEPÇÃO DE SEGURANÇA
    {
        id: 'safety-perception',
        type: 'multi_select',
        question: 'Na sua percepção, a segurança no Brasil nos últimos 3 anos...',
        options: [
            { id: 'much-worse', label: 'Está muito mais perigoso', icon: '😰' },
            { id: 'worse', label: 'Está piorando aos poucos', icon: '📈' },
            { id: 'same', label: 'Ficou igual', icon: '➡️' },
            { id: 'better', label: 'Melhorou', icon: '📉' }
        ],
        nextScreenId: 'perception-feedback'
    },

    // T7.1: FEEDBACK VALIDAÇÃO
    {
        id: 'perception-feedback',
        type: 'info_interstitial',
        icon: '✅',
        headline: 'Você tem razão.',
        body: 'Dados oficiais indicam aumento de 34% em invasões residenciais no último triênio. A sensação de insegurança não é coisa da sua cabeça — é um fato documentado.',
        fact: 'Fonte: SSP 2024',
        ctaText: 'Continuar análise',
        nextScreenId: 'invasor-logic'
    },

    // T8: LÓGICA DO INVASOR
    {
        id: 'invasor-logic',
        type: 'multi_select',
        question: 'Na sua opinião, como um invasor escolhe a próxima casa?',
        options: [
            { id: 'luck', label: 'Sorte / Acaso', icon: '🎲' },
            { id: 'rich', label: 'Casas mais ricas', icon: '💰' },
            { id: 'blindspots', label: 'Analisa Pontos Cegos', icon: '🔍' }
        ],
        nextScreenId: 'invasor-feedback'
    },

    // T8.1: FEEDBACK LÓGICA
    {
        id: 'invasor-feedback',
        type: 'info_interstitial',
        icon: '🔍',
        headline: 'O Fator Real: Planejamento.',
        body: '90% das invasões são planejadas. Eles não escolhem a casa mais rica — escolhem a casa com Pontos Cegos. Por isso o Estudo de Vulnerabilidade é vital.',
        fact: 'Pesquisa com ex-detentos — USP 2023',
        ctaText: 'Ver resultado',
        nextScreenId: 'authority'
    },

    // T9: AUTORIDADE
    {
        id: 'authority',
        type: 'info_interstitial',
        icon: '🛡️',
        headline: 'Equipe Casa Segura',
        body: 'Nossa missão é proteger Residências e Empresas. Somos especialistas em detectar falhas que ladrões usam. Já blindamos +1.500 imóveis somente em Santa Catarina no último ano.',
        ctaText: 'Continuar',
        nextScreenId: 'demand'
    },

    // T10: DEMANDA
    {
        id: 'demand',
        type: 'info_interstitial',
        icon: '📊',
        headline: 'Por isso estamos com alta demanda...',
        body: 'Estudos de Segurança profissionais custam em média R$ 450. Por sermos a única empresa que oferece gratuitamente, nossa fila de espera está em 3 semanas.',
        ctaText: 'Verificar disponibilidade',
        nextScreenId: 'urgency-filter'
    },

    // T11: FILTRO DE URGÊNCIA
    {
        id: 'urgency-filter',
        type: 'multi_select',
        question: 'Você pode esperar 21 dias ou gostaria de analisar o risco antes?',
        options: [
            { id: 'soon', label: 'Gostaria de fazer isso logo', icon: '⚡' },
            { id: 'urgent', label: 'Tenho urgência', icon: '⏰' },
            { id: 'wait', label: 'Posso esperar, provavelmente não vai acontecer nada', icon: '🤔' }
        ],
        nextScreenId: 'loading-forensic'
    },

    // T12: LOADING FORENSE
    {
        id: 'loading-forensic',
        type: 'loading_calculated',
        headline: 'Calculando Índice de Vulnerabilidade...',
        steps: [
            { id: 'step1', label: 'Acessando banco de dados GeoSecurity™...', duration: 2000 },
            { id: 'step2', label: 'Verificando histórico policial da região...', duration: 3000 },
            { id: 'step3', label: 'Analisando perfil de vulnerabilidade...', duration: 3000 },
            { id: 'step4', label: 'Gerando Score de Risco...', duration: 2000 }
        ],
        completionText: 'Análise concluída',
        nextScreenId: 'result'
    },

    // T13-T18 serão gerenciados por componentes específicos
];

// ============================================================================
// FLUXO EMPRESARIAL - PERGUNTAS
// ============================================================================

export const commercialQuestions: Screen[] = [
    // TE1: TIPO DE NEGÓCIO
    {
        id: 'business-type',
        type: 'multi_select',
        question: 'Como você classifica sua empresa?',
        options: [
            { id: 'retail', label: 'Comércio de rua', icon: '🏪' },
            { id: 'mall', label: 'Loja em shopping/centro comercial', icon: '🏬' },
            { id: 'factory', label: 'Fábrica/Galpão industrial', icon: '🏭' },
            { id: 'office', label: 'Escritório em edifício', icon: '🏢' }
        ],
        nextScreenId: 'business-location'
    },

    // TE2: LOCALIZAÇÃO
    {
        id: 'business-location',
        type: 'multi_select',
        question: 'Onde está localizada sua empresa?',
        options: [
            { id: 'downtown', label: 'Centro da cidade', icon: '🏙️' },
            { id: 'residential', label: 'Bairro residencial', icon: '🏘️' },
            { id: 'commercial', label: 'Zona comercial', icon: '🌆' },
            { id: 'outskirts', label: 'Fora da cidade', icon: '🌾' }
        ],
        nextScreenId: 'team-size'
    },

    // TE3: TAMANHO DA EQUIPE
    {
        id: 'team-size',
        type: 'multi_select',
        question: 'Quantos funcionários trabalham na empresa?',
        options: [
            { id: 'solo', label: 'Apenas eu', icon: '👤' },
            { id: 'small', label: '2 a 5 funcionários', icon: '👥' },
            { id: 'medium', label: '6 a 20 funcionários', icon: '👨‍👩‍👧‍👦' },
            { id: 'large', label: 'Mais de 20', icon: '🏢' }
        ],
        nextScreenId: 'business-hours'
    },

    // TE4: HORÁRIO DE FUNCIONAMENTO
    {
        id: 'business-hours',
        type: 'multi_select',
        question: 'Qual o horário de funcionamento?',
        subtitle: '70% dos roubos a empresas ocorrem fora do horário comercial.',
        options: [
            { id: 'commercial', label: 'Comercial (8h-18h)', icon: '☀️' },
            { id: 'night', label: 'Noturno', icon: '🌙' },
            { id: '24h', label: '24 horas', icon: '⏰' },
            { id: 'weekdays', label: 'Apenas dias úteis', icon: '📅' }
        ],
        nextScreenId: 'asset-value'
    },

    // TE5: VALOR EM RISCO
    {
        id: 'asset-value',
        type: 'multi_select',
        question: 'Qual o valor aproximado dos equipamentos e mercadorias na empresa?',
        options: [
            { id: 'high', label: 'Alto valor (acima de R$ 100k)', icon: '💰' },
            { id: 'medium', label: 'Médio valor (R$ 20k - R$ 100k)', icon: '💵' },
            { id: 'low', label: 'Baixo valor (abaixo de R$ 20k)', icon: '🪙' }
        ],
        nextScreenId: 'business-history'
    },

    // TE6: HISTÓRICO
    {
        id: 'business-history',
        type: 'multi_select',
        question: 'Sua empresa ou alguma próxima já foi roubada?',
        options: [
            { id: 'self', label: 'Sim, minha empresa', icon: '⚠️' },
            { id: 'nearby', label: 'Sim, uma empresa próxima', icon: '🔔' },
            { id: 'no', label: 'Não que eu saiba', icon: '✅' }
        ],
        nextScreenId: 'business-security'
    },

    // TE7: SISTEMA ATUAL (Empresas)
    {
        id: 'business-security',
        type: 'multi_select',
        question: 'A empresa já possui algum sistema de segurança?',
        options: [
            { id: 'cameras', label: 'Câmeras', icon: '📹' },
            { id: 'alarm', label: 'Alarme', icon: '🚨' },
            { id: 'guard', label: 'Vigilante', icon: '👮' },
            { id: 'none', label: 'Nenhum', icon: '❌' }
        ],
        allowMultiple: true,
        nextScreenId: 'loading-forensic'
    }
];

// ============================================================================
// DADOS DE CONFIGURAÇÃO
// ============================================================================

export const securityQuizMetadata = {
    name: 'Casa Segura',
    version: '1.0.0',
    description: 'Quiz de análise de vulnerabilidade residencial e empresarial',
    totalScreensResidential: 21,
    totalScreensCommercial: 14,
    estimatedTime: '3 minutos',
    category: 'security',
    primaryColor: '#3B82F6',
    secondaryColor: '#FACC15'
};
