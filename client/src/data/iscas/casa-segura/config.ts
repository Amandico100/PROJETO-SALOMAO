/**
 * 🛡️ CASA SEGURA - Configuração Principal
 * Isca de segurança residencial/empresarial
 */

import type { QuizConfig } from '@/types/quiz';

export const casaSeguraConfig: QuizConfig = {
    id: 'casa-segura',
    name: 'Casa Segura',
    version: '1.0.0',

    // Identidade Visual
    theme: {
        primaryColor: '#3B82F6',  // Azul elétrico
        secondaryColor: '#FACC15', // Amarelo alerta
        backgroundColor: '#0F172A', // Slate 900
        textColor: '#FFFFFF',
        accentColor: '#22C55E', // Verde sucesso
        fontFamily: 'Inter, sans-serif',
        borderRadius: '1rem'
    },

    // Configurações globais
    settings: {
        showProgressBar: true,
        progressBarColor: '#3B82F6',
        allowBackNavigation: false,
        animationSpeed: 'normal',
        mobileFirst: true
    },

    // Tela inicial
    welcomeScreen: {
        logo: '🛡️',
        brandName: 'CASA SEGURA™',
        headline: 'Seu imóvel é um alvo fácil?',
        subtitle: 'Descubra os 5 Pontos Cegos que deixam imóveis vulneráveis',
        authorityText: '📊 11.872 Estudos de Segurança realizados',
        ctaText: 'INICIAR VARREDURA DE RISCO',
        backgroundType: 'gradient'
    },

    // Fluxo residencial
    screens: [
        // T1: HOME (Welcome) - configurado acima

        // T2: GEO-INPUT
        {
            id: 'geo-input',
            type: 'input',
            question: 'Em qual cidade está o imóvel que deseja analisar?',
            subtitle: 'Digite a cidade ou permita a detecção automática',
            inputType: 'text',
            placeholder: 'Ex: Joinville',
            validation: { required: true, minLength: 2 },
            ctaText: 'LOCALIZAR REGIÃO',
            customComponent: 'MapRadarBackground',
            nextScreenId: 'geo-validation'
        },

        // T3: VALIDAÇÃO
        {
            id: 'geo-validation',
            type: 'multi_select',
            question: 'Identificamos esta região. O imóvel fica nesta área?',
            options: [
                { id: 'yes', label: 'Sim, é minha região', icon: '✅' },
                { id: 'no', label: 'Não, corrigir endereço', icon: '❌' }
            ],
            nextScreenId: 'property-type-selector'
        },

        // T3.5: BIFURCAÇÃO
        {
            id: 'property-type-selector',
            type: 'multi_select',
            question: 'O Estudo de Segurança é para qual tipo de imóvel?',
            options: [
                { id: 'residential', label: 'Residência', icon: '🏠', description: 'Casa, apartamento ou condomínio' },
                { id: 'commercial', label: 'Empresa', icon: '🏢', description: 'Comércio, escritório ou indústria' }
            ],
            branching: {
                residential: 'building-type',
                commercial: 'business-type'
            }
        },

        // T4: TIPO DE IMÓVEL
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
            conditionalNext: {
                condition: { includes: 'cameras' },
                trueNext: 'camera-warning',
                falseNext: 'safety-perception'
            }
        },

        // T6.1: FEEDBACK CÂMERA
        {
            id: 'camera-warning',
            type: 'info_interstitial',
            icon: '⚠️',
            headline: 'ATENÇÃO: Câmeras podem aumentar o risco',
            body: 'Em 82% das invasões, criminosos cortam a internet ou roubam o DVR. Câmeras sem monitoramento ativo são "vitrines de bens" — sinalizam que há algo valioso, mas não impedem a entrada.',
            ctaText: 'Entendi',
            nextScreenId: 'safety-perception'
        },

        // T7: PERCEPÇÃO
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
            conditionalNext: {
                condition: { oneOf: ['much-worse', 'worse'] },
                trueNext: 'perception-feedback',
                falseNext: 'invasor-logic'
            }
        },

        // T7.1: FEEDBACK VALIDAÇÃO
        {
            id: 'perception-feedback',
            type: 'info_interstitial',
            icon: '✅',
            headline: 'Você tem razão.',
            body: 'Dados oficiais indicam aumento de 34% em invasões residenciais no último triênio. A sensação de insegurança não é coisa da sua cabeça — é um fato documentado.',
            footnote: 'Fonte: SSP 2024',
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
            footnote: 'Pesquisa com ex-detentos — USP 2023',
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

        // T13-T18: Gerenciados por componentes customizados
        {
            id: 'result',
            type: 'custom',
            component: 'SecurityResultTemplate',
            nextScreenId: 'comparison'
        },

        {
            id: 'comparison',
            type: 'custom',
            component: 'ComparisonTable',
            nextScreenId: 'interest-confirmation'
        },

        {
            id: 'interest-confirmation',
            type: 'multi_select',
            question: 'Estudo de Segurança Gratuito',
            subtitle: 'Um Especialista credenciado pode identificar os 5 Pontos Cegos do seu imóvel. Sem custo.',
            options: [
                { id: 'yes', label: 'Sim, quero agendar', icon: '✅' },
                { id: 'no', label: 'Agora não', icon: '❌' }
            ],
            conditionalNext: {
                condition: { equals: 'yes' },
                trueNext: 'time-slot',
                falseNext: 'tips-dont'
            }
        },

        {
            id: 'time-slot',
            type: 'custom',
            component: 'TimeSlotSelector',
            nextScreenId: 'lead-capture'
        },

        {
            id: 'lead-capture',
            type: 'email_capture',
            headline: 'Prioridade garantida!',
            subtitle: 'Confirme seu WhatsApp para receber os dados do Especialista em Segurança credenciado que fará sua visita.',
            inputType: 'phone',
            placeholder: '(00) 00000-0000',
            ctaText: 'CONFIRMAR',
            showTimer: true,
            timerDuration: 59,
            nextScreenId: 'tips-dont'
        },

        {
            id: 'tips-dont',
            type: 'custom',
            component: 'TipsContainerDont',
            nextScreenId: 'tips-do'
        },

        {
            id: 'tips-do',
            type: 'custom',
            component: 'TipsContainerDo',
            nextScreenId: 'confirmation'
        },

        {
            id: 'confirmation',
            type: 'custom',
            component: 'ConfirmationCard'
        }
    ],

    // Metadados
    metadata: {
        category: 'security',
        niche: 'alarme-residencial',
        targetAudience: 'homeowners',
        conversionGoal: 'lead-generation',
        estimatedTime: '3 minutos'
    }
};

export default casaSeguraConfig;
