import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, TrendingUp, CheckCircle2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
interface EvolutionTrendChartProps {
  title: string;
  subtitle?: string;
  startLabel: string; // Ex: "Agora"
  startValue: string; // Ex: "78kg" ou "R$ 2.000"
  endLabel: string;   // Ex: "Em 12 Semanas"
  endValue: string;   // Ex: "65kg" ou "R$ 15.000"
  trend: 'up' | 'down'; // Define a direção visual da curva
  colorTheme?: 'green' | 'blue' | 'purple' | 'gold'; // Temas visuais
  delay?: number;
}

// --- COMPONENT ---
export default function EvolutionTrendChart({
  title,
  subtitle,
  startLabel,
  startValue,
  endLabel,
  endValue,
  trend = 'up',
  colorTheme = 'green',
  delay = 0.5
}: EvolutionTrendChartProps) {
  
  // Configuração de cores baseada no tema
  const themeColors = {
    green: {
      stroke: '#4ade80', // green-400
      gradientStart: '#22c55e', // green-500
      gradientEnd: '#bbf7d0', // green-200
      shadow: 'shadow-green-500/30',
      text: 'text-green-400',
      bg: 'bg-green-500',
    },
    blue: {
      stroke: '#60a5fa',
      gradientStart: '#3b82f6',
      gradientEnd: '#bfdbfe',
      shadow: 'shadow-blue-500/30',
      text: 'text-blue-400',
      bg: 'bg-blue-500',
    },
    purple: {
      stroke: '#c084fc',
      gradientStart: '#a855f7',
      gradientEnd: '#e9d5ff',
      shadow: 'shadow-purple-500/30',
      text: 'text-purple-400',
      bg: 'bg-purple-500',
    },
    gold: {
      stroke: '#facc15',
      gradientStart: '#eab308',
      gradientEnd: '#fef08a',
      shadow: 'shadow-yellow-500/30',
      text: 'text-yellow-400',
      bg: 'bg-yellow-500',
    },
  };

  const activeTheme = themeColors[colorTheme];
  const isUp = trend === 'up';

  // Definição do SVG Path (Curva de Bézier)
  // M = Move to (x, y)
  // C = Cubic Bézier (controlPoint1, controlPoint2, endPoint)
  // Coordenadas SVG: 0,0 é topo esquerdo. 
  // Width: 100% (viewBox 0 0 300 150)
  
  const startY = isUp ? 120 : 30;
  const endY = isUp ? 30 : 120;
  
  // Pontos de controle para fazer o "S" suave
  const pathData = `
    M 20 ${startY} 
    C 100 ${startY}, 
      200 ${endY}, 
      280 ${endY}
  `;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      className="w-full max-w-md mx-auto p-6 rounded-3xl relative overflow-hidden bg-[#121212] border border-white/5 shadow-2xl"
    >
      {/* Background Glow Effect */}
      <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 pointer-events-none rounded-full", activeTheme.bg)} />

      {/* Header */}
      <div className="mb-8 relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className={cn("w-5 h-5", activeTheme.text)} />
          <h3 className="text-white text-lg font-bold tracking-tight">{title}</h3>
        </div>
        {subtitle && (
          <p className="text-white/40 text-sm font-light">{subtitle}</p>
        )}
      </div>

      {/* Chart Area */}
      <div className="relative h-[200px] w-full select-none">
        
        {/* SVG Curve */}
        <svg 
          viewBox="0 0 300 150" 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id={`gradient-${colorTheme}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={activeTheme.gradientStart} stopOpacity="0.4" />
              <stop offset="100%" stopColor={activeTheme.gradientEnd} stopOpacity="1" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Animated Line */}
          <motion.path
            d={pathData}
            fill="none"
            stroke={`url(#gradient-${colorTheme})`}
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: delay + 0.2 }}
          />

          {/* Dotted Guide Lines (Vertical) */}
          <line x1="20" y1="10" x2="20" y2="140" stroke="white" strokeOpacity="0.05" strokeDasharray="4 4" />
          <line x1="280" y1="10" x2="280" y2="140" stroke="white" strokeOpacity="0.05" strokeDasharray="4 4" />
        </svg>

        {/* Start Point (Absolute Positioning over SVG) */}
        <motion.div 
          className="absolute left-0 transform -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ top: isUp ? '75%' : '15%' }} // Ajuste fino baseado na curva
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.5 }}
        >
          {/* Badge Label */}
          <div className="bg-[#1E1E1E] border border-white/10 px-3 py-1 rounded-full text-xs text-white/60 font-medium shadow-lg backdrop-blur-sm">
            {startLabel}
          </div>
          {/* Dot */}
          <div className="w-4 h-4 rounded-full bg-[#2A2A2A] border-2 border-white/20 z-10" />
          {/* Value */}
          <span className="text-white/50 text-sm font-semibold">{startValue}</span>
        </motion.div>

        {/* End Point (The Goal) */}
        <motion.div 
          className="absolute right-0 transform translate-x-1/2 flex flex-col items-center gap-2"
          style={{ top: isUp ? '15%' : '75%' }} // Ajuste fino baseado na curva
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 2.2, type: "spring" }} // Aparece depois da linha chegar
        >
          {/* Badge Label (Glowing) */}
          <div className={cn(
            "px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md flex items-center gap-1.5",
            "bg-white/10 border border-white/20 text-white"
          )}>
            {endLabel}
            <CheckCircle2 className={cn("w-3 h-3", activeTheme.text)} />
          </div>
          
          {/* Pulsing Dot */}
          <div className="relative">
            <div className={cn("absolute inset-0 rounded-full animate-ping opacity-75", activeTheme.bg)} />
            <div className={cn("w-5 h-5 rounded-full border-2 border-white z-20 relative shadow-[0_0_15px_rgba(255,255,255,0.5)]", activeTheme.bg)} />
          </div>

          {/* Value (Big & Bright) */}
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("text-xl font-bold mt-1", activeTheme.text)}
          >
            {endValue}
          </motion.span>
        </motion.div>

      </div>

      {/* Footer / Disclaimer */}
      <div className="mt-4 border-t border-white/5 pt-4">
        <p className="text-[10px] text-center text-white/20 uppercase tracking-widest">
          Projeção baseada em dados
        </p>
      </div>
    </motion.div>
  );
}