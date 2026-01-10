import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { LucideIcon, User, BicepsFlexed, Zap, Trophy, Crown, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
export interface SliderLevel {
  value: number; // 1 a N
  label: string; // Ex: "Iniciante", "15-20%"
  description?: string; // Ex: "Nunca treinei antes"
  icon: LucideIcon;
  color: string; // Tailwind class text/bg (ex: "blue-500")
  customContent?: React.ReactNode; // Para injetar Imagens depois se quiser
}

interface VisualStateSliderProps {
  title: string;
  levels: SliderLevel[];
  defaultValue?: number;
  onChange?: (value: number) => void;
  delay?: number;
}

// --- COMPONENT ---
export default function VisualStateSlider({
  title,
  levels,
  defaultValue = 1,
  onChange,
  delay = 0
}: VisualStateSliderProps) {
  
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const activeLevel = levels.find(l => l.value === currentValue) || levels[0];

  // Mapear cores para valores hex (para animação suave de sombra)
  const getColorHex = (colorName: string) => {
    // Mapa simplificado para o exemplo - idealmente viria do theme
    const colors: Record<string, string> = {
      'gray-400': '#9ca3af',
      'blue-500': '#3b82f6',
      'green-500': '#22c55e',
      'purple-500': '#a855f7',
      'yellow-400': '#facc15',
      'red-500': '#ef4444',
      'orange-500': '#f97316',
    };
    // Tenta extrair a cor base da classe (ex: "text-blue-500" -> "blue-500")
    const base = colorName.replace('text-', '').replace('bg-', '');
    return colors[base] || '#ffffff';
  };

  const activeColorHex = getColorHex(activeLevel.color);

  // Handler de mudança
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    setCurrentValue(newVal);
    if (onChange) onChange(newVal);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay }}
      className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-[#121212] border border-white/5 shadow-2xl relative overflow-hidden"
    >
      {/* Background Glow Dinâmico */}
      <motion.div 
        animate={{ backgroundColor: activeColorHex }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 blur-[120px] opacity-20 rounded-full transition-colors duration-700 pointer-events-none"
      />

      {/* Header */}
      <h3 className="text-white text-lg font-bold mb-8 text-center relative z-10">{title}</h3>

      {/* --- VISUAL STAGE (O Ícone Morphing) --- */}
      <div className="relative w-40 h-40 mb-10 flex items-center justify-center z-10">
        
        {/* Círculo Base */}
        <div className="absolute inset-0 rounded-full border border-white/5 bg-[#1E1E1E] shadow-inner" />
        
        {/* Anel de Progresso Visual */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          <circle
            cx="50%" cy="50%" r="48%"
            fill="none"
            stroke="white"
            strokeOpacity="0.05"
            strokeWidth="4"
          />
          <motion.circle
            cx="50%" cy="50%" r="48%"
            fill="none"
            stroke={activeColorHex}
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: currentValue / levels.length }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            style={{ filter: `drop-shadow(0 0 4px ${activeColorHex})` }}
          />
        </svg>

        {/* O Ícone Que Muda (AnimatePresence para Morphing) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel.value}
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center justify-center text-center"
          >
            {/* Renderiza Imagem Custom ou Ícone Padrão */}
            {activeLevel.customContent ? (
              activeLevel.customContent
            ) : (
              <activeLevel.icon 
                className={cn(
                  "w-16 h-16 mb-2 transition-colors duration-300 drop-shadow-2xl",
                  `text-${activeLevel.color.replace('text-', '').replace('bg-', '')}`
                )} 
                strokeWidth={1.5}
              />
            )}
            
            {/* Label dentro do círculo (opcional, ou fora) */}
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-16 w-64 text-center"
            >
              <span className={cn(
                "text-2xl font-black tracking-tight block transition-colors duration-300",
                `text-${activeLevel.color.replace('text-', '').replace('bg-', '')}`
              )}>
                {activeLevel.label}
              </span>
              {activeLevel.description && (
                <span className="text-white/40 text-sm font-medium mt-1 block">
                  {activeLevel.description}
                </span>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- SLIDER CONTROL (Range Input Customizado) --- */}
      <div className="w-full relative z-20 mt-4 px-4">
        {/* Track */}
        <div className="w-full h-2 bg-white/10 rounded-full absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none overflow-hidden">
           <motion.div 
             className={cn("h-full transition-colors duration-500", `bg-${activeLevel.color.replace('text-', '').replace('bg-', '')}`)}
             animate={{ width: `${((currentValue - 1) / (levels.length - 1)) * 100}%` }}
           />
        </div>

        {/* Marcadores (Dots) na linha */}
        <div className="w-full flex justify-between absolute top-1/2 -translate-y-1/2 left-0 px-1 pointer-events-none">
          {levels.map((level) => (
            <div 
              key={level.value}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors duration-300 z-10",
                level.value <= currentValue ? "bg-white" : "bg-white/10"
              )}
            />
          ))}
        </div>

        {/* O Input Invisível (Para acessibilidade e toque nativo perfeito) */}
        <input
          type="range"
          min={1}
          max={levels.length}
          step={1}
          value={currentValue}
          onChange={handleSliderChange}
          className="w-full absolute inset-0 opacity-0 cursor-pointer h-10 z-30"
        />

        {/* O Thumb (Botão) Visual Customizado que segue o valor */}
        <div className="relative w-full h-2 pointer-events-none">
            <motion.div
              className={cn(
                "absolute top-1/2 -mt-3 -ml-3 w-6 h-6 rounded-full border-2 border-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center transition-colors duration-300",
                `bg-${activeLevel.color.replace('text-', '').replace('bg-', '')}`
              )}
              animate={{ left: `${((currentValue - 1) / (levels.length - 1)) * 100}%` }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }} // Movimento ultra-rápido para seguir o input
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </motion.div>
        </div>
      </div>

      {/* Footer Instructions */}
      <p className="mt-12 text-[10px] text-white/20 uppercase tracking-widest font-semibold">
        Arraste para ajustar
      </p>

    </motion.div>
  );
}

// --- EXEMPLO DE USO (MOCK DATA) ---
// const bodyLevels: SliderLevel[] = [
//   { value: 1, label: "5-9%", description: "Definição Extrema", icon: Zap, color: "text-blue-500" },
//   { value: 2, label: "10-14%", description: "Atleta", icon: BicepsFlexed, color: "text-green-500" },
//   { value: 3, label: "15-19%", description: "Em forma", icon: User, color: "text-yellow-400" },
//   { value: 4, label: "20-24%", description: "Médio", icon: User, color: "text-orange-500" },
//   { value: 5, label: "> 25%", description: "Acima do peso", icon: User, color: "text-red-500" },
// ];