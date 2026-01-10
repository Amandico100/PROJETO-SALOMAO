import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Target, ArrowUp } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
export interface ChartBarData {
  label: string;      // Ex: "Mês 1", "Semana 2"
  value: number;      // Valor numérico
  displayValue?: string; // Opcional: O que aparece escrito (ex: "5kg", "R$ 1k")
  isProjected?: boolean; // Se true, estilo "fantasma" (futuro)
  isActive?: boolean;    // Se true, destaque total (momento atual)
}

interface ProgressJourneyChartProps {
  title: string;
  subtitle?: string;
  data: ChartBarData[];
  goalValue?: number; // Linha de meta horizontal opcional
  goalLabel?: string;
  colorTheme?: 'green' | 'blue' | 'purple' | 'gold' | 'orange';
  delay?: number;
}

// --- THEME ---
const themes = {
  green: { from: 'from-green-500', to: 'to-green-900', text: 'text-green-400', border: 'border-green-500/50', shadow: 'shadow-green-500/20' },
  blue: { from: 'from-blue-500', to: 'to-blue-900', text: 'text-blue-400', border: 'border-blue-500/50', shadow: 'shadow-blue-500/20' },
  purple: { from: 'from-purple-500', to: 'to-purple-900', text: 'text-purple-400', border: 'border-purple-500/50', shadow: 'shadow-purple-500/20' },
  gold: { from: 'from-yellow-400', to: 'to-yellow-700', text: 'text-yellow-400', border: 'border-yellow-500/50', shadow: 'shadow-yellow-500/20' },
  orange: { from: 'from-orange-500', to: 'to-orange-800', text: 'text-orange-400', border: 'border-orange-500/50', shadow: 'shadow-orange-500/20' },
};

// --- COMPONENT ---
export default function ProgressJourneyChart({
  title,
  subtitle,
  data,
  goalValue,
  goalLabel = "Meta",
  colorTheme = 'blue',
  delay = 0
}: ProgressJourneyChartProps) {
  
  const theme = themes[colorTheme];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calcular valor máximo para escala Y (adiciona 20% de respiro)
  const maxValue = Math.max(...data.map(d => d.value), goalValue || 0) * 1.2;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      className="w-full max-w-md mx-auto p-6 rounded-3xl bg-[#121212] border border-white/5 shadow-2xl relative overflow-hidden"
    >
      {/* Background Lights */}
      <div className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10")} />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8 relative z-20">
        <div>
          <h3 className="text-white text-lg font-bold flex items-center gap-2">
            <BarChart3 className={cn("w-5 h-5", theme.text)} />
            {title}
          </h3>
          {subtitle && <p className="text-white/40 text-xs mt-1">{subtitle}</p>}
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-[200px] w-full flex items-end justify-between gap-2 sm:gap-4 z-10 select-none">
        
        {/* Goal Line (Optional) */}
        {goalValue && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            transition={{ delay: delay + 1, duration: 1 }}
            className="absolute left-0 w-full border-t border-dashed border-white/30 z-0 flex items-center"
            style={{ bottom: `${(goalValue / maxValue) * 100}%` }}
          >
            <div className="absolute right-0 -top-6 flex items-center gap-1 bg-[#121212]/80 backdrop-blur px-2 py-0.5 rounded border border-white/10">
              <Target className="w-3 h-3 text-white/50" />
              <span className="text-[10px] text-white/50 font-mono uppercase">{goalLabel}</span>
            </div>
          </motion.div>
        )}

        {/* BARS LOOP */}
        {data.map((item, index) => {
          const heightPercent = (item.value / maxValue) * 100;
          const isHovered = hoveredIndex === index;
          
          return (
            <div 
              key={index} 
              className="relative flex flex-col items-center justify-end h-full flex-1 group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Value Popup (Always visible if active, or on hover) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: item.isActive || isHovered ? 1 : 0, 
                  y: item.isActive || isHovered ? -5 : 5 
                }}
                className="absolute mb-1 z-30 pointer-events-none"
                style={{ bottom: `${heightPercent}%` }}
              >
                <div className={cn(
                  "px-2 py-1 rounded-md text-[10px] font-bold shadow-lg border backdrop-blur-md whitespace-nowrap",
                  item.isActive ? `bg-${colorTheme}-500 text-white border-white/20` : "bg-[#1E1E1E] text-white/70 border-white/10"
                )}>
                  {item.displayValue || item.value}
                </div>
              </motion.div>

              {/* THE BAR */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ 
                  duration: 1, 
                  delay: delay + (index * 0.15), // Stagger effect (escadinha)
                  type: "spring",
                  damping: 15
                }}
                className={cn(
                  "w-full max-w-[40px] rounded-t-lg relative overflow-hidden transition-all duration-300",
                  // Estilo para Projetado (Futuro) vs Real (Passado/Presente)
                  item.isProjected 
                    ? "bg-white/5 border-2 border-dashed border-white/10" 
                    : `bg-gradient-to-t ${theme.from} ${theme.to} ${theme.border} border-t border-x`,
                  // Brilho extra se ativo
                  item.isActive && !item.isProjected && theme.shadow,
                  isHovered && "brightness-125"
                )}
              >
                {/* Inner Glow animation inside bar */}
                {!item.isProjected && (
                   <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-0 animate-pulse" />
                )}
              </motion.div>

              {/* X Axis Label */}
              <div className="mt-3 text-center">
                <span className={cn(
                  "text-[10px] font-medium block transition-colors",
                  item.isActive ? "text-white" : "text-white/30"
                )}>
                  {item.label}
                </span>
                {item.isActive && (
                  <div className={cn("w-1 h-1 rounded-full mx-auto mt-1", theme.text.replace('text', 'bg'))} />
                )}
              </div>
            </div>
          );
        })}

      </div>
    </motion.div>
  );
}