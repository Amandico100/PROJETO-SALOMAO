/**
 * 🛡️ CASA SEGURA - Quiz Principal
 * Versão simplificada que funciona standalone
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Componentes visuais customizados
import { MapRadarBackground } from '@/components/quiz/screens/visual/MapRadarBackground';
import { ComparisonTable } from '@/components/quiz/screens/visual/ComparisonTable';
import { TimeSlotSelector } from '@/components/quiz/screens/visual/TimeSlotSelector';
import { TipsContainer } from '@/components/quiz/screens/visual/TipCard';
import { ConfirmationCard } from '@/components/quiz/screens/visual/ShareButton';
import { SecurityResultTemplate } from '@/components/quiz/screens/templates/SecurityResultTemplate';

// Lógica
import {
    useSecurityCalculator,
    riskFactorsIncrease,
    riskFactorsDecrease,
    securityTipsDontDo,
    securityTipsDo
} from '@/components/quiz/screens/tools/useSecurityCalculator';

// ============================================================================
// TIPOS
// ============================================================================

type ScreenType =
    | 'welcome'
    | 'geo-input'
    | 'geo-validation'
    | 'property-type'
    | 'building-type'
    | 'protection-target'
    | 'current-security'
    | 'camera-warning'
    | 'safety-perception'
    | 'perception-feedback'
    | 'invasor-logic'
    | 'invasor-feedback'
    | 'authority'
    | 'demand'
    | 'urgency-filter'
    | 'loading'
    | 'result'
    | 'comparison'
    | 'interest'
    | 'time-slot'
    | 'lead-capture'
    | 'tips-dont'
    | 'tips-do'
    | 'confirmation';

interface QuizState {
    currentScreen: ScreenType;
    city: string;
    propertyType: 'residential' | 'commercial' | null;
    buildingType: string;
    protectionTargets: string[];
    currentSecurity: string[];
    safetyPerception: string;
    urgencyLevel: string;
    timeSlot: string;
    whatsapp: string;
    result: any;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function CasaSeguraQuiz() {
    const { calculateRisk } = useSecurityCalculator();

    const [state, setState] = useState<QuizState>({
        currentScreen: 'welcome',
        city: '',
        propertyType: null,
        buildingType: '',
        protectionTargets: [],
        currentSecurity: [],
        safetyPerception: '',
        urgencyLevel: '',
        timeSlot: '',
        whatsapp: '',
        result: null
    });

    const [loadingStep, setLoadingStep] = useState(0);

    // Navegação
    const goTo = (screen: ScreenType) => {
        setState(prev => ({ ...prev, currentScreen: screen }));
    };

    // Calcular resultado
    const calculateResult = () => {
        const result = calculateRisk({
            city: state.city || 'Joinville',
            propertyType: state.propertyType || 'residential',
            buildingType: state.buildingType || 'house',
            protectionTarget: state.protectionTargets,
            currentSecurity: state.currentSecurity,
            safetyPerception: state.safetyPerception || 'worse',
            invasorLogic: 'blindspots',
            urgencyLevel: state.urgencyLevel || 'soon'
        });
        setState(prev => ({ ...prev, result }));
        return result;
    };

    // Loading animation
    useEffect(() => {
        if (state.currentScreen === 'loading') {
            const steps = ['Acessando banco GeoSecurity™...', 'Verificando ocorrências...', 'Analisando perfil...', 'Gerando score...'];
            let step = 0;
            const interval = setInterval(() => {
                step++;
                setLoadingStep(step);
                if (step >= steps.length) {
                    clearInterval(interval);
                    calculateResult();
                    setTimeout(() => goTo('result'), 500);
                }
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [state.currentScreen]);

    // Progresso
    const screens: ScreenType[] = ['welcome', 'geo-input', 'geo-validation', 'property-type', 'building-type', 'protection-target', 'current-security', 'safety-perception', 'invasor-logic', 'authority', 'demand', 'urgency-filter', 'loading', 'result', 'comparison', 'interest', 'time-slot', 'lead-capture', 'tips-dont', 'tips-do', 'confirmation'];
    const progress = ((screens.indexOf(state.currentScreen) + 1) / screens.length) * 100;

    // ============================================================================
    // RENDERIZAÇÃO POR TELA
    // ============================================================================

    const renderScreen = () => {
        switch (state.currentScreen) {

            // ===== WELCOME =====
            case 'welcome':
                return (
                    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
                        <motion.div
                            className="text-center max-w-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="text-6xl mb-4">🛡️</div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                CASA SEGURA™
                            </h1>
                            {state.city && (
                                <p className="text-blue-400 mb-4">{state.city}</p>
                            )}
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                                Seu imóvel é um alvo fácil?
                            </h2>
                            <p className="text-gray-400 mb-6">
                                Descubra os 5 Pontos Cegos que deixam imóveis vulneráveis
                            </p>
                            <p className="text-sm text-gray-500 mb-8">
                                📊 11.872 Estudos de Segurança realizados
                            </p>
                            <motion.button
                                className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/25"
                                onClick={() => goTo('geo-input')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                INICIAR VARREDURA DE RISCO
                            </motion.button>
                        </motion.div>
                    </div>
                );

            // ===== GEO INPUT =====
            case 'geo-input':
                return (
                    <div className="relative min-h-screen">
                        <MapRadarBackground city={state.city || 'Sua Região'} isScanning={true} showPin={!!state.city} />
                        <div className="relative z-10 min-h-screen flex flex-col pt-20 pb-8 px-4">
                            <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center"
                                >
                                    <h2 className="text-2xl font-bold text-white mb-4">
                                        Em qual cidade está o imóvel?
                                    </h2>
                                    <input
                                        type="text"
                                        placeholder="Ex: Joinville"
                                        value={state.city}
                                        onChange={(e) => setState(prev => ({ ...prev, city: e.target.value }))}
                                        className="w-full py-4 px-6 bg-white/10 border border-white/20 rounded-xl text-center text-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                        autoFocus
                                    />
                                    <motion.button
                                        className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-bold shadow-lg"
                                        onClick={() => goTo('geo-validation')}
                                        disabled={!state.city}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        LOCALIZAR REGIÃO
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                );

            // ===== GEO VALIDATION =====
            case 'geo-validation':
                return (
                    <div className="relative min-h-screen">
                        <MapRadarBackground city={state.city} isScanning={false} showPin={true} />
                        <div className="relative z-10 min-h-screen flex flex-col pt-20 pb-8 px-4">
                            <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                                    <h2 className="text-2xl font-bold text-white mb-6">
                                        O imóvel fica nesta região?
                                    </h2>
                                    <div className="space-y-3">
                                        <button
                                            className="w-full py-4 bg-green-500/20 border border-green-500/40 rounded-xl text-green-400 font-medium hover:bg-green-500/30"
                                            onClick={() => goTo('property-type')}
                                        >
                                            ✅ Sim, é minha região
                                        </button>
                                        <button
                                            className="w-full py-4 bg-white/5 border border-white/20 rounded-xl text-gray-400 hover:bg-white/10"
                                            onClick={() => goTo('geo-input')}
                                        >
                                            ❌ Corrigir endereço
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                );

            // ===== PROPERTY TYPE =====
            case 'property-type':
                return renderMultiSelect(
                    'O Estudo é para qual tipo de imóvel?',
                    [
                        { id: 'residential', label: 'Residência', icon: '🏠' },
                        { id: 'commercial', label: 'Empresa', icon: '🏢' }
                    ],
                    (id) => {
                        setState(prev => ({ ...prev, propertyType: id as any }));
                        goTo('building-type');
                    }
                );

            // ===== BUILDING TYPE =====
            case 'building-type':
                return renderMultiSelect(
                    'Como é o seu imóvel?',
                    [
                        { id: 'house', label: 'Casa térrea', icon: '🏠' },
                        { id: 'townhouse', label: 'Sobrado', icon: '🏡' },
                        { id: 'apartment', label: 'Apartamento', icon: '🏢' },
                        { id: 'condo', label: 'Condomínio', icon: '🏘️' }
                    ],
                    (id) => {
                        setState(prev => ({ ...prev, buildingType: id }));
                        goTo('protection-target');
                    }
                );

            // ===== PROTECTION TARGET =====
            case 'protection-target':
                return renderMultiSelect(
                    'Quem você mais precisa proteger?',
                    [
                        { id: 'children', label: 'Meus filhos', icon: '👶' },
                        { id: 'elderly', label: 'Meus pais idosos', icon: '👴' },
                        { id: 'assets', label: 'Meu patrimônio', icon: '💼' },
                        { id: 'alone', label: 'Moro sozinho(a)', icon: '🧍' }
                    ],
                    (id) => {
                        setState(prev => ({ ...prev, protectionTargets: [id] }));
                        goTo('current-security');
                    }
                );

            // ===== CURRENT SECURITY =====
            case 'current-security':
                return renderMultiSelect(
                    'Possui algum sistema de segurança?',
                    [
                        { id: 'cameras', label: 'Câmeras', icon: '📹' },
                        { id: 'fence', label: 'Cerca elétrica', icon: '⚡' },
                        { id: 'alarm', label: 'Alarme', icon: '🚨' },
                        { id: 'dog', label: 'Cachorro', icon: '🐕' },
                        { id: 'none', label: 'Nenhum', icon: '❌' }
                    ],
                    (id) => {
                        setState(prev => ({ ...prev, currentSecurity: [id] }));
                        goTo(id === 'cameras' ? 'camera-warning' : 'safety-perception');
                    }
                );

            // ===== CAMERA WARNING =====
            case 'camera-warning':
                return renderInfoScreen(
                    '⚠️',
                    'ATENÇÃO: Câmeras podem aumentar o risco',
                    'Em 82% das invasões, criminosos cortam a internet ou roubam o DVR. Câmeras sem monitoramento são "vitrines de bens".',
                    () => goTo('safety-perception')
                );

            // ===== SAFETY PERCEPTION =====
            case 'safety-perception':
                return renderMultiSelect(
                    'Nos últimos 3 anos, a segurança no Brasil...',
                    [
                        { id: 'much-worse', label: 'Está muito mais perigoso', icon: '😰' },
                        { id: 'worse', label: 'Está piorando', icon: '📈' },
                        { id: 'same', label: 'Ficou igual', icon: '➡️' },
                        { id: 'better', label: 'Melhorou', icon: '📉' }
                    ],
                    (id) => {
                        setState(prev => ({ ...prev, safetyPerception: id }));
                        goTo(['much-worse', 'worse'].includes(id) ? 'perception-feedback' : 'invasor-logic');
                    }
                );

            // ===== PERCEPTION FEEDBACK =====
            case 'perception-feedback':
                return renderInfoScreen(
                    '✅',
                    'Você tem razão.',
                    'Dados oficiais indicam +34% em invasões residenciais. A insegurança não é coisa da sua cabeça.',
                    () => goTo('invasor-logic'),
                    'Fonte: SSP 2024'
                );

            // ===== INVASOR LOGIC =====
            case 'invasor-logic':
                return renderMultiSelect(
                    'Como um invasor escolhe a próxima casa?',
                    [
                        { id: 'luck', label: 'Sorte / Acaso', icon: '🎲' },
                        { id: 'rich', label: 'Casas mais ricas', icon: '💰' },
                        { id: 'blindspots', label: 'Analisa Pontos Cegos', icon: '🔍' }
                    ],
                    () => goTo('invasor-feedback')
                );

            // ===== INVASOR FEEDBACK =====
            case 'invasor-feedback':
                return renderInfoScreen(
                    '🔍',
                    'O Fator Real: Planejamento.',
                    '90% das invasões são planejadas. Eles escolhem a casa com Pontos Cegos, não a mais rica.',
                    () => goTo('authority'),
                    'USP 2023'
                );

            // ===== AUTHORITY =====
            case 'authority':
                return renderInfoScreen(
                    '🛡️',
                    'Equipe Casa Segura',
                    'Somos especialistas em detectar falhas. Já blindamos +1.500 imóveis em Santa Catarina.',
                    () => goTo('demand')
                );

            // ===== DEMAND =====
            case 'demand':
                return renderInfoScreen(
                    '📊',
                    'Alta demanda...',
                    'Estudos profissionais custam R$ 450. Por sermos gratuitos, a fila é de 3 semanas.',
                    () => goTo('urgency-filter')
                );

            // ===== URGENCY FILTER =====
            case 'urgency-filter':
                return renderMultiSelect(
                    'Pode esperar 21 dias ou quer analisar antes?',
                    [
                        { id: 'soon', label: 'Quero fazer logo', icon: '⚡' },
                        { id: 'urgent', label: 'Tenho urgência', icon: '⏰' },
                        { id: 'wait', label: 'Posso esperar', icon: '🤔' }
                    ],
                    (id) => {
                        setState(prev => ({ ...prev, urgencyLevel: id }));
                        goTo('loading');
                    }
                );

            // ===== LOADING =====
            case 'loading':
                const loadingSteps = [
                    'Acessando banco GeoSecurity™...',
                    'Verificando ocorrências da região...',
                    'Analisando perfil de vulnerabilidade...',
                    'Gerando Score de Risco...'
                ];
                return (
                    <div className="min-h-screen flex flex-col items-center justify-center px-4">
                        <motion.div className="text-center max-w-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                            <h2 className="text-2xl font-bold text-white mb-6">
                                Calculando Índice de Vulnerabilidade...
                            </h2>
                            <div className="space-y-3">
                                {loadingSteps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        className={cn(
                                            'py-3 px-4 rounded-lg text-sm',
                                            i < loadingStep ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500'
                                        )}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.5 }}
                                    >
                                        {i < loadingStep ? '✅' : '⏳'} {step}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                );

            // ===== RESULT =====
            case 'result':
                return (
                    <SecurityResultTemplate
                        result={state.result || calculateResult()}
                        onContinue={() => goTo('comparison')}
                    />
                );

            // ===== COMPARISON =====
            case 'comparison':
                return (
                    <ComparisonTable
                        increaseFactors={riskFactorsIncrease}
                        decreaseFactors={riskFactorsDecrease}
                        onContinue={() => goTo('interest')}
                    />
                );

            // ===== INTEREST =====
            case 'interest':
                return renderMultiSelect(
                    'Quer um Estudo de Segurança Gratuito?',
                    [
                        { id: 'yes', label: 'Sim, quero agendar', icon: '✅' },
                        { id: 'no', label: 'Agora não', icon: '❌' }
                    ],
                    (id) => goTo(id === 'yes' ? 'time-slot' : 'tips-dont'),
                    'Um Especialista identifica os 5 Pontos Cegos. Sem custo.'
                );

            // ===== TIME SLOT =====
            case 'time-slot':
                return (
                    <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
                        <div className="flex-1 flex flex-col justify-center">
                            <TimeSlotSelector
                                onSelect={(slot) => {
                                    setState(prev => ({ ...prev, timeSlot: slot }));
                                    goTo('lead-capture');
                                }}
                            />
                        </div>
                    </div>
                );

            // ===== LEAD CAPTURE =====
            case 'lead-capture':
                return (
                    <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
                        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                                <h2 className="text-2xl font-bold text-white mb-2">Prioridade garantida!</h2>
                                <p className="text-gray-400 mb-6">
                                    Confirme seu WhatsApp para receber os dados do Especialista
                                </p>
                                <input
                                    type="tel"
                                    placeholder="(00) 00000-0000"
                                    value={state.whatsapp}
                                    onChange={(e) => setState(prev => ({ ...prev, whatsapp: e.target.value }))}
                                    className="w-full py-4 px-6 bg-white/10 border border-white/20 rounded-xl text-center text-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 mb-4"
                                />
                                <motion.button
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-bold shadow-lg"
                                    onClick={() => goTo('tips-dont')}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    CONFIRMAR
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                );

            // ===== TIPS DONT =====
            case 'tips-dont':
                return (
                    <TipsContainer
                        title="⚠️ Erros que aumentam o risco"
                        subtitle="Enquanto o Especialista não chega..."
                        tips={securityTipsDontDo}
                        type="dont"
                        onContinue={() => goTo('tips-do')}
                        ctaText="Ver dicas de proteção"
                    />
                );

            // ===== TIPS DO =====
            case 'tips-do':
                return (
                    <TipsContainer
                        title="✅ Dicas que protegem sua família"
                        subtitle="Ações simples com alto impacto"
                        tips={securityTipsDo}
                        type="do"
                        onContinue={() => goTo('confirmation')}
                        ctaText="Finalizar"
                    />
                );

            // ===== CONFIRMATION =====
            case 'confirmation':
                return (
                    <ConfirmationCard
                        details={{
                            slot: state.timeSlot === 'morning' ? 'Manhã (08h-12h)' :
                                state.timeSlot === 'afternoon' ? 'Tarde (13h-18h)' :
                                    'Noite (após 18h)',
                            city: state.city || 'Sua cidade',
                            whatsapp: state.whatsapp || '(00) 00000-0000'
                        }}
                    />
                );

            default:
                return <div className="text-white">Tela não encontrada</div>;
        }
    };

    // ============================================================================
    // HELPERS
    // ============================================================================

    function renderMultiSelect(
        question: string,
        options: { id: string; label: string; icon: string }[],
        onSelect: (id: string) => void,
        subtitle?: string
    ) {
        return (
            <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
                <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">{question}</h2>
                        {subtitle && <p className="text-gray-400">{subtitle}</p>}
                    </motion.div>
                    <div className="space-y-3">
                        {options.map((opt, i) => (
                            <motion.button
                                key={opt.id}
                                className="w-full py-4 px-6 bg-white/5 border border-white/20 rounded-xl flex items-center gap-4 hover:bg-white/10 hover:border-white/40 transition-all"
                                onClick={() => onSelect(opt.id)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-2xl">{opt.icon}</span>
                                <span className="text-white font-medium">{opt.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    function renderInfoScreen(
        icon: string,
        headline: string,
        body: string,
        onContinue: () => void,
        footnote?: string
    ) {
        return (
            <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
                <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="text-6xl mb-4">{icon}</div>
                        <h2 className="text-2xl font-bold text-white mb-4">{headline}</h2>
                        <p className="text-gray-300 mb-4">{body}</p>
                        {footnote && <p className="text-xs text-gray-500 mb-6">{footnote}</p>}
                        <motion.button
                            className="py-4 px-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-bold shadow-lg"
                            onClick={onContinue}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Continuar
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        );
    }

    // ============================================================================
    // RENDER
    // ============================================================================

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Progress bar */}
            {state.currentScreen !== 'welcome' && (
                <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {/* Logo */}
            {state.currentScreen !== 'welcome' && (
                <div className="fixed top-4 left-4 z-40 flex items-center gap-2">
                    <span className="text-xl">🛡️</span>
                    <span className="text-sm font-bold text-white/80">CASA SEGURA</span>
                </div>
            )}

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={state.currentScreen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderScreen()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default CasaSeguraQuiz;
