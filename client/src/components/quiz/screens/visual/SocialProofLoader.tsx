import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, Users, BrainCircuit, ShieldCheck, Lock } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
interface SocialProofLoaderProps {
  loadingMessages?: string[]; // Frases que trocam (Ex: "Analisando perfil...", "Calculando metabolismo...")
  socialProofText?: string;   // Ex: "Mais de 15.400 planos gerados hoje"
  insights?: string[];        // Fatos rápidos que aparecem embaixo (Ex: "83% dos usuários veem resultado em 2 semanas")
  onComplete?: () => void;    // Função chamada quando termina
  duration?: number;          // Duração total em ms (Padrão 6000ms = 6s)
  colorTheme?: 'green' | 'blue' | 'purple' | 'gold';
}

// --- THEME ---
const themes = {
  green: { color: 'text-green-500', bg: 'bg-green-500', stroke: '#22c55e', shadow: 'shadow-green-500/20' },
  blue: { color: 'text-blue-500', bg: 'bg-blue-500', stroke: '#3b82f6', shadow: 'shadow-blue-500/20' },
  purple: { color: 'text-purple-500', bg: 'bg-purple-500', stroke: '#a855f7', shadow: 'shadow-purple-500/20' },
  gold: { color: 'text-yellow-400', bg: 'bg-yellow-400', stroke: '#facc15', shadow: 'shadow-yellow-500/20' },
};

// --- COMPONENT ---
export default function SocialProofLoader({
  loadingMessages = [
    "Conectando à base de dados segura...",
    "Analisando suas respostas...",
    "Identificando padrões de sucesso...",
    "Personalizando sua estratégia...",
    "Finalizando seu plano exclusivo..."
  ],
  socialProofText = "Junte-se a 1.2M de pessoas que mudaram de vida",
  insights = [
    "Pessoas com seu perfil têm 3x mais chance de sucesso.",
    "Este método foi validado por especialistas.",
    "Seus dados estão 100% criptografados e seguros."
  ],
  onComplete,
  duration = 6000,
  colorTheme = 'green'
}: SocialProofLoaderProps) {

  const theme = themes[colorTheme];
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(nextProgress);

      // Troca mensagens baseado no progresso
      const totalMessages = loadingMessages.length;
      const msgStage = Math.floor((nextProgress / 100) * totalMessages);
      setMsgIndex(Math.min(msgStage, totalMessages - 1));

      // Troca insights a cada 33%
      const totalInsights = insights.length;
      const insightStage = Math.floor((nextProgress / 100) * totalInsights);
      setInsightIndex(Math.min(insightStage, totalInsights - 1));

      if (nextProgress >= 100) {
        clearInterval(interval);
        if (onComplete) setTimeout(onComplete, 500); // Pequeno delay final para respirar
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, loadingMessages, insights, onComplete]);

  // Cálculos do Círculo SVG
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-full max-w-md mx-auto min-h-[500px] flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#121212] rounded-3xl border border-white/5 shadow-2xl">
      
      {/* Background Ambience */}
      <div className={cn("absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none radial-gradient-center", theme.bg)} 
           style={{ background: `radial-gradient(circle at 50% 30%, ${theme.stroke} 0%, transparent 70%)` }} 
      />

      {/* --- MAIN LOADER (CIRCLE) --- */}
      <div className="relative mb-12">
        {/* SVG Circle */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Track */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="50%" cy="50%" r={radius}
              fill="none"
              stroke="white"
              strokeOpacity="0.05"
              strokeWidth="6"
            />
            {/* Progress Indicator */}
            <motion.circle
              cx="50%" cy="50%" r={radius}
              fill="none"
              stroke={theme.stroke}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.1, ease: "linear" }}
              style={{ filter: `drop-shadow(0 0 8px ${theme.stroke})` }}
            />
          </svg>

          {/* Central Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white tracking-tighter tabular-nums">
              {Math.round(progress)}%
            </span>
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <BrainCircuit className={cn("w-6 h-6 mt-2", theme.color)} />
            </motion.div>
          </div>
          
          {/* Orbiting Particles (Visual Flair) */}
          <motion.div 
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
             <div className={cn("absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]")} />
          </motion.div>
        </div>
      </div>

      {/* --- DYNAMIC MESSAGES --- */}
      <div className="h-16 w-full flex items-center justify-center mb-8 relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-white text-lg font-medium text-center absolute w-full px-4"
          >
            {loadingMessages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* --- INSIGHT CARDS (Bottom Slider) --- */}
      <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2 opacity-50">
          <ShieldCheck className="w-3 h-3 text-white" />
          <span className="text-[10px] uppercase tracking-widest text-white font-bold">Sabia disso?</span>
        </div>
        
        <div className="h-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={insightIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center"
            >
              <p className="text-white/80 text-sm font-light leading-snug">
                {insights[insightIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar for insights */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
          <motion.div 
            className={cn("h-full", theme.bg)}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: duration / insights.length / 1000, ease: "linear", repeat: insights.length }}
          />
        </div>
      </div>

      {/* --- SOCIAL PROOF FOOTER --- */}
      <div className="mt-8 flex items-center gap-3 opacity-60">
        <div className="flex -space-x-2">
           {[1,2,3].map(i => (
             <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border border-[#121212] flex items-center justify-center text-[8px] text-white">
                <Users className="w-3 h-3" />
             </div>
           ))}
        </div>
        <p className="text-xs text-white/50 max-w-[150px] leading-tight">
          {socialProofText}
        </p>
      </div>
      
      {/* Secure Connection Badge */}
      <div className="absolute bottom-4 flex items-center gap-1.5 text-white/20">
        <Lock className="w-3 h-3" />
        <span className="text-[9px] uppercase tracking-wider font-bold">SSL Secure Connection</span>
      </div>

    </div>
  );
}