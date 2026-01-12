/**
 * 🗺️ MapRadarBackground
 * Componente de mapa com efeito radar para a isca Casa Segura
 * Usa CSS puro para simular efeito de radar em vez de API paga
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
    city?: string;
    isScanning?: boolean;
    showPin?: boolean;
    className?: string;
}

export function MapRadarBackground({
    city = 'Sua Região',
    isScanning = true,
    showPin = true,
    className
}: Props) {
    const [scanAngle, setScanAngle] = useState(0);

    // Animar o radar
    useEffect(() => {
        if (!isScanning) return;

        const interval = setInterval(() => {
            setScanAngle((prev) => (prev + 2) % 360);
        }, 30);

        return () => clearInterval(interval);
    }, [isScanning]);

    return (
        <div className={cn(
            'absolute inset-0 overflow-hidden',
            'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
            className
        )}>
            {/* Grid de fundo (estilo mapa) */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Círculos concêntricos (estilo radar) */}
            <div className="absolute inset-0 flex items-center justify-center">
                {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-blue-500/20"
                        style={{
                            width: `${i * 25}%`,
                            height: `${i * 25}%`
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                    />
                ))}
            </div>

            {/* Linha de varredura do radar */}
            {isScanning && (
                <div
                    className="absolute top-1/2 left-1/2 origin-bottom"
                    style={{
                        width: '2px',
                        height: '40%',
                        transform: `translate(-50%, -100%) rotate(${scanAngle}deg)`,
                        background: 'linear-gradient(to top, rgba(59, 130, 246, 0.8), transparent)'
                    }}
                />
            )}

            {/* Efeito de brilho do radar */}
            {isScanning && (
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                        width: '80%',
                        height: '80%',
                        background: `conic-gradient(
              from ${scanAngle}deg,
              transparent 0deg,
              rgba(59, 130, 246, 0.15) 30deg,
              transparent 60deg
            )`,
                        borderRadius: '50%'
                    }}
                />
            )}

            {/* Pino central */}
            {showPin && (
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: 'spring', delay: 0.5 }}
                >
                    {/* Pino */}
                    <div className="relative">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                            <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                        {/* Triângulo apontando para baixo */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 top-full -mt-1"
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: '8px solid transparent',
                                borderRight: '8px solid transparent',
                                borderTop: '12px solid #EF4444'
                            }}
                        />
                    </div>
                </motion.div>
            )}

            {/* Pulso de alerta */}
            {showPin && (
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/30"
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ width: 150, height: 150, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
            )}

            {/* Nome da cidade */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <div className="text-center">
                    <p className="text-blue-400/60 text-sm font-medium uppercase tracking-wider">
                        Rastreando perímetro
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
                        {city}
                    </h3>
                    {isScanning && (
                        <motion.div
                            className="mt-3 flex items-center justify-center gap-2"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-green-400 text-sm">Análise em andamento...</span>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Overlay gradiente para legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
        </div>
    );
}
