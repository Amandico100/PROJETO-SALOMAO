import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight, Star, ThumbsUp } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

interface MatchCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
}

interface MatchResultProps {
    matchedCategory: MatchCategory;
    matchScore: number; // 0-100
    alternativeMatches: Array<{
        category: MatchCategory;
        score: number;
    }>;
    reasoning: string[];
    recommendation: string;
    onContinue: () => void;
    ctaText?: string;
}

export default function MatchResultTemplate({
    matchedCategory,
    matchScore,
    alternativeMatches,
    reasoning,
    recommendation,
    onContinue,
    ctaText = "QUERO ESTE!"
}: MatchResultProps) {

    const isStrongMatch = matchScore >= 80;

    return (
        <div className="min-h-screen bg-[#121212] text-white pb-28">

            {/* HERO - O MATCH PERFEITO */}
            <div className="pt-8 px-6 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4"
                >
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-bold tracking-wider uppercase text-purple-300">
                        SEU MATCH PERFEITO
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-black mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                >
                    {matchedCategory.name}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/60 text-sm mb-6"
                >
                    {matchedCategory.description}
                </motion.p>
            </div>

            {/* SCORE VISUAL */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="mx-6 p-6 rounded-2xl bg-gradient-to-br from-green-900/30 to-emerald-900/20 border border-green-500/20"
            >
                <div className="flex items-center justify-between mb-4">
                    <span className="text-white/70 text-sm font-medium">Compatibilidade</span>
                    <div className="flex items-center gap-2">
                        {isStrongMatch && <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
                        <span className="text-3xl font-black text-green-400">{matchScore}%</span>
                    </div>
                </div>

                {/* Barra de Progresso */}
                <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${matchScore}%` }}
                        transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                        className={cn(
                            "h-full rounded-full",
                            matchScore >= 80 ? "bg-gradient-to-r from-green-500 to-emerald-400" :
                                matchScore >= 60 ? "bg-gradient-to-r from-yellow-500 to-orange-400" :
                                    "bg-gradient-to-r from-gray-500 to-gray-400"
                        )}
                    />
                </div>

                <p className="mt-3 text-sm text-green-300/80 text-center">
                    {recommendation}
                </p>
            </motion.div>

            {/* POR QUE ESSE MATCH? */}
            {reasoning.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 px-6"
                >
                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                        <ThumbsUp className="w-5 h-5 text-blue-400" />
                        Por que esse match?
                    </h3>
                    <div className="space-y-2">
                        {reasoning.map((reason, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2 + (idx * 0.1) }}
                                className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                            >
                                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                                <span className="text-sm text-white/80">{reason}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ALTERNATIVAS */}
            {alternativeMatches.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-8 px-6"
                >
                    <h3 className="text-white/60 font-medium text-sm mb-3">
                        Outras opções para você:
                    </h3>
                    <div className="space-y-2">
                        {alternativeMatches.slice(0, 2).map((alt, idx) => (
                            <div
                                key={alt.category.id}
                                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                            >
                                <span className="text-sm text-white/80">{alt.category.name}</span>
                                <span className="text-xs text-white/40">{alt.score}% match</span>
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
                    transition={{ delay: 1.8 }}
                    onClick={onContinue}
                    className="w-full py-4 rounded-xl font-bold text-lg shadow-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    <span>{ctaText}</span>
                    <ArrowRight className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    );
}
