/**
 * 💡 TipCard
 * Card de dica de segurança (O que fazer / O que não fazer)
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TipCardProps {
    icon: string;
    title: string;
    description: string;
    type: 'do' | 'dont';
    action?: string;
    fact?: string;
    source?: string;
    emotionalHook?: string;
    delay?: number;
}

export function TipCard({
    icon,
    title,
    description,
    type,
    action,
    fact,
    source,
    emotionalHook,
    delay = 0
}: TipCardProps) {
    const isDo = type === 'do';

    return (
        <motion.div
            className={cn(
                'relative overflow-hidden rounded-2xl p-5',
                'border backdrop-blur-sm',
                isDo
                    ? 'bg-green-500/5 border-green-500/20 hover:border-green-500/40'
                    : 'bg-red-500/5 border-red-500/20 hover:border-red-500/40',
                'transition-all duration-300'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.15 }}
        >
            {/* Indicador de tipo */}
            <div className={cn(
                'absolute top-0 right-0 px-3 py-1 text-xs font-medium rounded-bl-xl',
                isDo ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            )}>
                {isDo ? '✅ FAÇA' : '❌ EVITE'}
            </div>

            {/* Ícone */}
            <div className="text-4xl mb-3">
                {icon}
            </div>

            {/* Título */}
            <h4 className={cn(
                'text-lg font-bold mb-2',
                isDo ? 'text-green-400' : 'text-red-400'
            )}>
                {title}
            </h4>

            {/* Descrição */}
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
                {description}
            </p>

            {/* Ação recomendada */}
            {action && (
                <div className="bg-white/5 rounded-lg p-3 mb-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Ação:</p>
                    <p className="text-sm text-white">{action}</p>
                </div>
            )}

            {/* Fato estatístico */}
            {fact && (
                <div className={cn(
                    'rounded-lg p-3 mb-2',
                    isDo ? 'bg-green-500/10' : 'bg-red-500/10'
                )}>
                    <p className={cn(
                        'text-sm font-medium',
                        isDo ? 'text-green-300' : 'text-red-300'
                    )}>
                        📊 {fact}
                    </p>
                </div>
            )}

            {/* Fonte */}
            {source && (
                <p className="text-xs text-gray-500 italic">
                    Fonte: {source}
                </p>
            )}

            {/* Gancho emocional */}
            {emotionalHook && (
                <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm text-yellow-300/90 italic">
                        💛 {emotionalHook}
                    </p>
                </div>
            )}
        </motion.div>
    );
}

// ============================================================================
// CONTAINER DE DICAS
// ============================================================================

interface TipsContainerProps {
    title: string;
    subtitle?: string;
    tips: Array<{
        icon: string;
        title: string;
        description: string;
        action?: string;
        fact?: string;
        source?: string;
        emotionalHook?: string;
    }>;
    type: 'do' | 'dont';
    onContinue?: () => void;
    ctaText?: string;
}

export function TipsContainer({
    title,
    subtitle,
    tips,
    type,
    onContinue,
    ctaText = 'Continuar'
}: TipsContainerProps) {
    return (
        <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
            <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-gray-400">{subtitle}</p>
                    )}
                </motion.div>

                {/* Grid de cards */}
                <div className="flex-1 space-y-4 mb-8">
                    {tips.map((tip, index) => (
                        <TipCard
                            key={index}
                            {...tip}
                            type={type}
                            delay={index}
                        />
                    ))}
                </div>

                {/* Botão de continuar */}
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
                        transition={{ delay: tips.length * 0.15 + 0.3 }}
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
