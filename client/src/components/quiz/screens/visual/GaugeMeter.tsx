import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
export interface GaugeSegment {
  label: string;
  min: number;
  max: number;
  color: string; // Ex: "bg-red-500", "bg-yellow-500", "bg-green-500"
  textColor: string; // Ex: "text-red-500"
}

interface GaugeMeterProps {
  title: string;
  value: number;
  min?: number;
  max?: number;
  segments: GaugeSegment[];
  unit?: string;
  description?: string;
  delay?: number;
}

// --- COMPONENT ---
export default function GaugeMeter({
  title,
  value,
  min = 0,
  max = 100,
  segments,
  unit = '',
  description,
  delay = 0.5
}: GaugeMeterProps) {
  
  // Encontrar o segmento atual com base no valor
  const activeSegment = segments.find(s => value >= s.min && value <= s.max) || segments[segments.length - 1];
  
  // Calcular porcentagem para posição do ponteiro (0 a 100%)
  // Clamp para não estourar a barra
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100), 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      className="w-full max-w-md mx-auto p-6 rounded-3xl bg-[#121212] border border-white/5 shadow-2xl relative overflow-hidden"
    >
      {/* Glow Ambiente baseado na cor do resultado */}
      <div className={cn("absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10 rounded-full pointer-events-none", activeSegment?.color)} />

      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <h3 className="text-white text-lg font-bold tracking-tight flex items-center gap-2">
          {title}
        </h3>
        {/* Badge de Resultado (O "Veredito") */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 1.5, type: "spring" }} // Aparece depois da agulha chegar
          className={cn(
            "px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-lg flex items-center gap-1.5",
            "bg-white/5 border-white/10",
            activeSegment?.textColor
          )}
        >
          {activeSegment?.label}
          <div className={cn("w-2 h-2 rounded-full animate-pulse", activeSegment?.color)} />
        </motion.div>
      </div>

      {/* --- METER AREA --- */}
      <div className="py-4 relative">
        
        {/* Value Display (Big Number) */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 1.8 }} // Só aparece no final para não distrair
              className={cn(
                "text-4xl font-black tabular-nums tracking-tighter shadow-2xl drop-shadow-lg",
                activeSegment?.textColor
              )}
            >
              {value}
              <span className="text-lg text-white/40 font-medium ml-1">{unit}</span>
            </motion.div>
          </div>
        </div>

        {/* The Bar (Segments) */}
        <div className="h-4 w-full rounded-full flex overflow-hidden relative bg-gray-800/50">
          {segments.map((seg, index) => {
            // Calcular largura de cada segmento proporcionalmente
            const segWidth = ((seg.max - seg.min) / (max - min)) * 100;
            return (
              <div 
                key={index}
                style={{ width: `${segWidth}%` }}
                className={cn(
                  "h-full border-r border-[#121212]/50 last:border-none relative group",
                  // Opacidade reduzida para segmentos inativos, brilho total para o ativo
                  activeSegment.label === seg.label ? `opacity-100 ${seg.color}` : `opacity-30 ${seg.color}`
                )}
              />
            );
          })}
        </div>

        {/* The Needle/Marker (Indicador) */}
        <div className="absolute top-4 left-0 w-full h-4 pointer-events-none">
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
            initial={{ left: '0%' }}
            animate={{ left: `${percentage}%` }}
            transition={{ 
              delay: delay + 0.5, 
              duration: 1.5, 
              type: "spring", 
              stiffness: 50, // Movimento "pesado" e preciso
              damping: 15 
            }}
          >
            {/* O Ponteiro Visual */}
            <div className={cn(
              "w-1 h-8 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] border border-white",
              "bg-white"
            )} />
            
            {/* O Triângulo abaixo (opcional, estilo régua) */}
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white mt-[-2px]" />
          </motion.div>
        </div>

        {/* Legend / Labels below bar */}
        <div className="flex justify-between mt-3 px-1">
          {segments.map((seg, index) => (
             <span 
               key={index} 
               className={cn(
                 "text-[9px] uppercase font-bold tracking-wider text-center w-full transition-colors duration-500",
                 activeSegment.label === seg.label ? seg.textColor : "text-white/10"
               )}
             >
               {seg.label}
             </span>
          ))}
        </div>

      </div>

      {/* Description / Feedback Context */}
      {description && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 2 }}
          className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-white/70 font-light leading-relaxed flex gap-3"
        >
          <Info className={cn("w-5 h-5 flex-shrink-0 mt-0.5", activeSegment?.textColor)} />
          <p>{description}</p>
        </motion.div>
      )}

    </motion.div>
  );
}