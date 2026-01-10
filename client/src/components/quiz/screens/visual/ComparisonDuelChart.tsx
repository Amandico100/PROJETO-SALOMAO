import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Swords, ShieldCheck, AlertTriangle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
interface LineData {
  label: string;
  startValue: number; // 0 a 100 (para facilitar o desenho no SVG)
  endValue: number;   // 0 a 100
  displayStart: string; // O que aparece escrito (ex: "Baixa", "R$ 0")
  displayEnd: string;   // O que aparece escrito (ex: "Alta", "R$ 10k")
  color: 'red' | 'green' | 'blue' | 'gold' | 'gray';
  icon?: React.ElementType;
}

interface ComparisonDuelChartProps {
  title: string;
  subtitle?: string;
  badLine: LineData;  // A linha do "Inimigo" (Cortisol, Dívidas, Peso)
  goodLine: LineData; // A linha do "Herói" (Testosterona, Lucro, Saúde)
  timeLabels: string[]; // Ex: ["Mês 1", "Mês 2", "Mês 3", "Mês 4"]
  delay?: number;
}

// --- THEME CONFIG ---
const colorMap = {
  red: { stroke: '#ef4444', fill: 'bg-red-500', text: 'text-red-500', glow: 'shadow-red-500/50' },
  green: { stroke: '#22c55e', fill: 'bg-green-500', text: 'text-green-500', glow: 'shadow-green-500/50' },
  blue: { stroke: '#3b82f6', fill: 'bg-blue-500', text: 'text-blue-500', glow: 'shadow-blue-500/50' },
  gold: { stroke: '#eab308', fill: 'bg-yellow-500', text: 'text-yellow-500', glow: 'shadow-yellow-500/50' },
  gray: { stroke: '#9ca3af', fill: 'bg-gray-500', text: 'text-gray-400', glow: 'shadow-gray-500/20' },
};

export default function ComparisonDuelChart({
  title,
  subtitle,
  badLine,
  goodLine,
  timeLabels = ['Início', 'Progresso', 'Progresso', 'Meta'],
  delay = 0
}: ComparisonDuelChartProps) {

  // Resolve Cores
  const badColor = colorMap[badLine.color];
  const goodColor = colorMap[goodLine.color];

  // Cálculos de SVG (ViewBox 0 0 400 200)
  // Invertemos Y porque no SVG 0 é o topo. Então valor 100 = Y 0, valor 0 = Y 200.
  const calcY = (val: number) => 200 - (val * 2); 

  const badPath = `
    M 20 ${calcY(badLine.startValue)} 
    C 150 ${calcY(badLine.startValue)}, 
      250 ${calcY(badLine.endValue)}, 
      380 ${calcY(badLine.endValue)}
  `;

  const goodPath = `
    M 20 ${calcY(goodLine.startValue)} 
    C 150 ${calcY(goodLine.startValue)}, 
      250 ${calcY(goodLine.endValue)}, 
      380 ${calcY(goodLine.endValue)}
  `;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: delay }}
      className="w-full max-w-md mx-auto p-5 sm:p-6 rounded-3xl bg-[#121212] border border-white/5 shadow-2xl relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className={cn("absolute -top-10 -right-10 w-40 h-40 blur-[90px] opacity-10 rounded-full", goodColor.fill)} />
      <div className={cn("absolute -bottom-10 -left-10 w-40 h-40 blur-[90px] opacity-5 rounded-full", badColor.fill)} />

      {/* Header */}
      <div className="mb-6 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white text-lg font-bold flex items-center gap-2">
              <Swords className="w-5 h-5 text-white/40" />
              {title}
            </h3>
            {subtitle && <p className="text-white/40 text-xs sm:text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-[220px] w-full select-none">
        
        {/* Background Grid (Vertical Bars) */}
        <div className="absolute inset-0 flex justify-between px-5 pointer-events-none opacity-10">
          {timeLabels.map((_, i) => (
            <div key={i} className="h-full w-[1px] bg-white border-r border-dashed border-white/50" />
          ))}
        </div>

        {/* SVG Layer */}
        <svg viewBox="0 0 400 220" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            {/* Glow Filter */}
            <filter id="glowLine" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Bad Line (O Problema) */}
          <motion.path
            d={badPath}
            fill="none"
            stroke={badColor.stroke}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 4" // Tracejado para indicar algo "perdendo força" ou negativo
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }} // Opacidade menor para não roubar a cena
            transition={{ duration: 2, ease: "easeInOut", delay: delay + 0.3 }}
          />

          {/* Good Line (A Solução - Brilhante) */}
          <motion.path
            d={goodPath}
            fill="none"
            stroke={goodColor.stroke}
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#glowLine)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: delay + 0.5 }}
          />
        </svg>

        {/* --- LABELS & ICONS OVERLAY (Responsive HTML positioning) --- */}
        
        {/* PONTO INICIAL - BAD LINE */}
        <motion.div 
          className="absolute left-0 transform -translate-x-2 sm:translate-x-0"
          style={{ top: `${100 - badLine.startValue}%` }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 1 }}
        >
          <div className={cn("px-2 py-1 rounded bg-black/50 border border-white/10 backdrop-blur-md text-[10px] text-white/50")}>
            {badLine.label}
          </div>
        </motion.div>

        {/* PONTO FINAL - BAD LINE (Caindo) */}
        <motion.div 
          className="absolute right-0 flex items-center gap-2 transform translate-x-2 sm:translate-x-0"
          style={{ top: `${100 - badLine.endValue}%` }}
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: delay + 2.5 }}
        >
          <span className={cn("text-xs font-medium", badColor.text)}>{badLine.displayEnd}</span>
          <div className={cn("w-2 h-2 rounded-full", badColor.fill)} />
        </motion.div>

        {/* PONTO INICIAL - GOOD LINE */}
        <motion.div 
          className="absolute left-0 transform -translate-x-2 sm:translate-x-0"
          style={{ top: `${100 - goodLine.startValue}%` }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 1.2 }}
        >
          <div className={cn("px-2 py-1 rounded bg-black/50 border border-white/10 backdrop-blur-md text-[10px] text-white/50")}>
            {goodLine.label}
          </div>
        </motion.div>

        {/* PONTO FINAL - GOOD LINE (O VENCEDOR) */}
        <motion.div 
          className="absolute right-0 flex flex-col items-end transform translate-x-3 sm:translate-x-0 z-20"
          style={{ top: `${100 - goodLine.endValue - 10}%` }} // -10% para flutuar acima da linha
          initial={{ opacity: 0, scale: 0 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: delay + 2.8, type: "spring" }}
        >
          {/* Badge de Sucesso */}
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg border backdrop-blur-xl mb-1",
            "bg-white/10 border-white/20 text-white"
          )}>
            {goodLine.icon && <goodLine.icon className={cn("w-3 h-3", goodColor.text)} />}
            <span className="text-xs font-bold">{goodLine.displayEnd}</span>
          </div>
          {/* Seta/Indicador Visual */}
          <div className={cn("w-3 h-3 rounded-full mr-4 animate-ping absolute bottom-[-5px]", goodColor.fill)} />
          <div className={cn("w-3 h-3 rounded-full mr-4 border-2 border-white relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.8)]", goodColor.fill)} />
        </motion.div>

      </div>

      {/* Time Labels Footer */}
      <div className="flex justify-between mt-2 px-1">
        {timeLabels.map((label, i) => (
          <span key={i} className="text-[10px] uppercase tracking-wider text-white/20 font-medium">
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}