import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface DataPoint {
  label: string; // "Mês 1"
  value: number; // 1000
  displayValue: string; // "R$ 1k"
}

interface ProjectionLineChartProps {
  data: DataPoint[];
  color?: string; // hex
  title?: string;
}

export default function ProjectionLineChart({ data, color = '#22c55e', title }: ProjectionLineChartProps) {
  // Normalizar dados para o SVG (0 a 100)
  const maxVal = Math.max(...data.map(d => d.value));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.value / maxVal) * 80; // Deixa 20% de margem no topo
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full bg-[#1E1E1E] p-6 rounded-2xl border border-white/10 shadow-2xl">
      {title && (
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5" style={{ color }} />
          <h3 className="text-white font-bold">{title}</h3>
        </div>
      )}
      
      <div className="relative h-40 w-full">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-10">
          <div className="border-b border-white w-full" />
          <div className="border-b border-white w-full" />
          <div className="border-b border-white w-full" />
        </div>

        {/* SVG Chart */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          {/* Area Gradient */}
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.5" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area Fill */}
          <motion.path
            d={`M 0,100 ${points.split(' ').map((p, i) => `L ${p}`).join(' ')} L 100,100 Z`}
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Line Stroke */}
          <motion.polyline
            fill="none"
            stroke={color}
            strokeWidth="3"
            points={points}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Dots */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - (d.value / maxVal) * 80;
            return (
              <g key={i}>
                <motion.circle
                  cx={x} cy={y} r="3" fill="#1E1E1E" stroke={color} strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + (i * 0.2) }}
                />
                {/* Tooltip Value */}
                <motion.foreignObject x={x - 10} y={y - 15} width="40" height="20" 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + (i * 0.2) }}
                >
                  <div className="text-[8px] text-white bg-black/50 px-1 rounded text-center -translate-x-1/2">
                    {d.displayValue}
                  </div>
                </motion.foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Labels X Axis */}
      <div className="flex justify-between mt-4 text-xs text-white/40">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}