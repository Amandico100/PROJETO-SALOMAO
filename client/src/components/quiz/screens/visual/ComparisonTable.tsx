/**
 * 📊 ComparisonTable
 * Tabela comparativa de fatores de risco (aumenta vs diminui)
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RiskFactor {
    id: string;
    label: string;
    impact: string;
    description: string;
    type: 'increase' | 'decrease';
}

interface Props {
    title?: string;
    increaseFactors: RiskFactor[];
    decreaseFactors: RiskFactor[];
    footer?: string;
    onContinue?: () => void;
    ctaText?: string;
}

export function ComparisonTable({
    title = 'O que aumenta e diminui o risco?',
    increaseFactors,
    decreaseFactors,
    footer = 'Cada imóvel é único. Somente um Estudo Presencial pode identificar seus Pontos Cegos.',
    onContinue,
    ctaText = 'Continuar'
}: Props) {
    return (
        <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
            <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {title}
                    </h2>
                </motion.div>

                {/* Fatores que AUMENTAM */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">🔴</span>
                        <h3 className="text-lg font-bold text-red-400">
                            AUMENTAM O RISCO
                        </h3>
                    </div>

                    <div className="space-y-3">
                        {increaseFactors.map((factor, index) => (
                            <motion.div
                                key={factor.id}
                                className={cn(
                                    'p-4 rounded-xl',
                                    'bg-red-500/5 border border-red-500/20',
                                    'flex items-start gap-4'
                                )}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-white">{factor.label}</span>
                                        <span className="text-red-400 font-bold text-sm bg-red-500/20 px-2 py-1 rounded">
                                            {factor.impact}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm">{factor.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Fatores que DIMINUEM */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">🟢</span>
                        <h3 className="text-lg font-bold text-green-400">
                            DIMINUEM O RISCO
                        </h3>
                    </div>

                    <div className="space-y-3">
                        {decreaseFactors.map((factor, index) => {
                            const isMain = factor.impact === '-61%'; // Alarme é o principal

                            return (
                                <motion.div
                                    key={factor.id}
                                    className={cn(
                                        'p-4 rounded-xl',
                                        isMain
                                            ? 'bg-green-500/10 border-2 border-green-500/40 shadow-lg shadow-green-500/10'
                                            : 'bg-green-500/5 border border-green-500/20',
                                        'flex items-start gap-4'
                                    )}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={cn(
                                                'font-medium',
                                                isMain ? 'text-green-300' : 'text-white'
                                            )}>
                                                {factor.label}
                                                {isMain && <span className="ml-2 text-xs">⭐ Principal</span>}
                                            </span>
                                            <span className={cn(
                                                'font-bold text-sm px-2 py-1 rounded',
                                                isMain
                                                    ? 'text-green-300 bg-green-500/30'
                                                    : 'text-green-400 bg-green-500/20'
                                            )}>
                                                {factor.impact}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">{factor.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="text-gray-300 text-sm text-center">
                        💡 {footer}
                    </p>
                </motion.div>

                {/* CTA */}
                {onContinue && (
                    <motion.button
                        className={cn(
                            'w-full py-4 rounded-xl font-bold text-lg',
                            'bg-gradient-to-r from-blue-600 to-blue-500',
                            'hover:from-blue-500 hover:to-blue-400',
                            'transition-all duration-300',
                            'shadow-lg shadow-blue-500/25'
                        )}
                        onClick={onContinue}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {ctaText}
                    </motion.button>
                )}
            </div>
        </div>
    );
}
