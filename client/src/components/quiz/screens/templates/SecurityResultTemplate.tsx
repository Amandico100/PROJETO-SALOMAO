/**
 * 🛡️ SecurityResultTemplate
 * Tela de resultado do quiz de segurança
 * Mostra velocímetro de risco moderado + justificativas
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSecurityCalculator, type SecurityResult } from '../tools/useSecurityCalculator';

interface Props {
    result: SecurityResult;
    onContinue?: () => void;
}

export function SecurityResultTemplate({ result, onContinue }: Props) {
    const { riskPercentage, riskLevel, verdictTitle, verdictDescription, justifications } = result;

    // Calcular ângulo do velocímetro (0-180 graus)
    // 19% = ~30°, 28% = ~70°
    const angle = 30 + ((riskPercentage - 19) / 9) * 40; // Fica na zona amarela

    return (
        <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
            <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">

                {/* Badge GeoSecurity */}
                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-blue-400 text-sm font-medium">Análise GeoSecurity™</span>
                    </div>
                </motion.div>

                {/* Velocímetro */}
                <motion.div
                    className="relative w-64 h-40 mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Arco de fundo */}
                    <svg viewBox="0 0 200 100" className="w-full h-full">
                        {/* Fundo cinza */}
                        <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="16"
                            strokeLinecap="round"
                        />

                        {/* Zona verde (0-30%) */}
                        <path
                            d="M 20 100 A 80 80 0 0 1 50 35"
                            fill="none"
                            stroke="#22C55E"
                            strokeWidth="16"
                            strokeLinecap="round"
                            opacity="0.3"
                        />

                        {/* Zona amarela (30-60%) */}
                        <path
                            d="M 50 35 A 80 80 0 0 1 150 35"
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="16"
                            opacity="0.5"
                        />

                        {/* Zona vermelha (60-100%) */}
                        <path
                            d="M 150 35 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="#EF4444"
                            strokeWidth="16"
                            strokeLinecap="round"
                            opacity="0.3"
                        />
                    </svg>

                    {/* Ponteiro */}
                    <motion.div
                        className="absolute bottom-0 left-1/2 origin-bottom"
                        style={{
                            width: '4px',
                            height: '70px',
                            marginLeft: '-2px'
                        }}
                        initial={{ rotate: -90 }}
                        animate={{ rotate: angle - 90 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.5 }}
                    >
                        <div className="w-full h-full bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-full shadow-lg shadow-yellow-500/50" />
                    </motion.div>

                    {/* Centro */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-lg" />

                    {/* Labels */}
                    <div className="absolute bottom-0 left-4 text-green-500 text-xs font-medium">Baixo</div>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-yellow-500 text-xs font-medium">Moderado</div>
                    <div className="absolute bottom-0 right-4 text-red-500 text-xs font-medium">Alto</div>
                </motion.div>

                {/* Porcentagem */}
                <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <span className="text-5xl font-bold text-yellow-400">{riskPercentage}%</span>
                    <p className="text-gray-400 mt-1">probabilidade de ocorrência em 60 dias</p>
                </motion.div>

                {/* Veredito */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                        {verdictTitle}
                    </h2>
                    <p className="text-gray-300 text-sm">
                        Nível: <span className="text-yellow-400 font-medium">Risco Moderado</span>
                    </p>
                </motion.div>

                {/* Justificativas */}
                <motion.div
                    className="w-full bg-white/5 rounded-2xl p-5 mb-8 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    <p className="text-gray-400 text-sm mb-4">Fatores identificados:</p>
                    <div className="space-y-3">
                        {justifications.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + index * 0.1 }}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-gray-300 text-sm">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.p
                    className="text-xs text-gray-500 text-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                >
                    Dados processados por GeoSecurity™ — Inteligência Artificial de Análise de Risco Residencial
                </motion.p>

                {/* CTA */}
                {onContinue && (
                    <motion.button
                        className={cn(
                            'w-full py-4 rounded-xl font-bold text-lg',
                            'bg-gradient-to-r from-yellow-600 to-yellow-500',
                            'hover:from-yellow-500 hover:to-yellow-400',
                            'text-black',
                            'transition-all duration-300',
                            'shadow-lg shadow-yellow-500/25'
                        )}
                        onClick={onContinue}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Ver o que fazer →
                    </motion.button>
                )}
            </div>
        </div>
    );
}
