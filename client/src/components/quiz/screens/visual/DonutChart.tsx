import React from 'react';
import { motion } from 'framer-motion';

interface DonutChartProps {
  percentage: number; // 0 a 100
  label: string; // Ex: "Compatibilidade"
  sublabel: string; // Ex: "Perfil Ideal"
  color?: string; // hex
}

export default function DonutChart({ 
  percentage, 
  label, 
  sublabel,
  color = "#22c55e" 
}: DonutChartProps) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* SVG Circle */}
      <svg className="w-full h-full transform -rotate-90">
        {/* Track */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#333"
          strokeWidth="12"
          fill="transparent"
        />
        {/* Indicator */}
        <motion.circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={color}
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          strokeLinecap="round"
        />
      </svg>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          className="text-5xl font-black text-white"
        >
          {percentage}%
        </motion.span>
        <span className="text-xs text-white/50 uppercase tracking-widest mt-1">{label}</span>
        <span className="text-[10px] text-white/30">{sublabel}</span>
      </div>
    </div>
  );
}