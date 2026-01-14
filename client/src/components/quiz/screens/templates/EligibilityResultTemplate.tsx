import React from 'react';
import { motion } from 'framer-motion';
import {
    CheckCircle2, XCircle, AlertCircle, Clock,
    ArrowRight, FileCheck, HelpCircle, Sparkles,
    ShieldCheck, ShieldX, ShieldAlert
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

interface EligibilityRule {
    id: string;
    name: string;
    description: string;
}

interface EligibilityResultProps {
    isEligible: boolean;
    eligibilityPercentage: number;
    status: 'eligible' | 'partially_eligible' | 'not_eligible' | 'needs_review';
    metRequirements: EligibilityRule[];
    failedRequirements: EligibilityRule[];
    verdictTitle: string;
    verdictDescription: string;
    nextSteps: string[];
    onContinue: () => void;
    ctaText?: string;
}

export default function EligibilityResultTemplate({
    isEligible,
    eligibilityPercentage,
    status,
    metRequirements,
    failedRequirements,
    verdictTitle,
    verdictDescription,
    nextSteps,
    onContinue,
    ctaText = "FALAR COM ESPECIALISTA"
}: EligibilityResultProps) {

    // Configurações visuais por status
    const statusConfig = {
        eligible: {
            icon: ShieldCheck,
            bgGradient: 'from-green-900/40 to-emerald-900/30',
            borderColor: 'border-green-500/30',
            textColor: 'text-green-400',
            badgeColor: 'bg-green-500/20 text-green-300',
            buttonBg: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
        },
        partially_eligible: {
            icon: ShieldAlert,
            bgGradient: 'from-yellow-900/40 to-orange-900/30',
            borderColor: 'border-yellow-500/30',
            textColor: 'text-yellow-400',
            badgeColor: 'bg-yellow-500/20 text-yellow-300',
            buttonBg: 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700'
        },
        not_eligible: {
            icon: ShieldX,
            bgGradient: 'from-red-900/40 to-rose-900/30',
            borderColor: 'border-red-500/30',
            textColor: 'text-red-400',
            badgeColor: 'bg-red-500/20 text-red-300',
            buttonBg: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
        },
        needs_review: {
            icon: HelpCircle,
            bgGradient: 'from-blue-900/40 to-indigo-900/30',
            borderColor: 'border-blue-500/30',
            textColor: 'text-blue-400',
            badgeColor: 'bg-blue-500/20 text-blue-300',
            buttonBg: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
        }
    };

    const config = statusConfig[status];
    const StatusIcon = config.icon;

    return (
        <div className="min-h-screen bg-[#121212] text-white pb-28">

            {/* HERO - RESULTADO */}
            <div className="pt-8 px-6 text-center">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className={cn(
                        "mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4",
                        `bg-gradient-to-br ${config.bgGradient} ${config.borderColor} border-2`
                    )}
                >
                    <StatusIcon className={cn("w-10 h-10", config.textColor)} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={cn("inline-block px-4 py-1 rounded-full text-sm font-bold mb-3", config.badgeColor)}
                >
                    {eligibilityPercentage}% DE COMPATIBILIDADE
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-black mb-2"
                >
                    {verdictTitle}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/60 text-sm leading-relaxed"
                >
                    {verdictDescription}
                </motion.p>
            </div>

            {/* CHECKLIST DE REQUISITOS */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 px-6"
            >
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-blue-400" />
                    Análise de Requisitos
                </h3>

                <div className="space-y-2">
                    {/* Requisitos Atendidos */}
                    {metRequirements.map((req, idx) => (
                        <motion.div
                            key={req.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + (idx * 0.05) }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-green-900/20 border border-green-500/20"
                        >
                            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                            <div>
                                <span className="text-sm font-medium text-white">{req.name}</span>
                                <p className="text-xs text-white/50">{req.description}</p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Requisitos Não Atendidos */}
                    {failedRequirements.map((req, idx) => (
                        <motion.div
                            key={req.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + ((metRequirements.length + idx) * 0.05) }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-red-900/20 border border-red-500/20"
                        >
                            <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <div>
                                <span className="text-sm font-medium text-white/80">{req.name}</span>
                                <p className="text-xs text-white/40">{req.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* PRÓXIMOS PASSOS */}
            {nextSteps.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-8 px-6"
                >
                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-400" />
                        Próximos Passos
                    </h3>
                    <div className="space-y-2">
                        {nextSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                            >
                                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                                    <span className="text-xs font-bold text-purple-400">{idx + 1}</span>
                                </div>
                                <span className="text-sm text-white/80">{step}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* BOTÃO DE AÇÃO */}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/95 to-transparent z-50">
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    onClick={onContinue}
                    className={cn(
                        "w-full py-4 rounded-xl font-bold text-lg shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2",
                        config.buttonBg
                    )}
                >
                    {isEligible && <Sparkles className="w-5 h-5" />}
                    <span>{ctaText}</span>
                    <ArrowRight className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    );
}
