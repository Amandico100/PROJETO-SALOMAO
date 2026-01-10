import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

interface ComparisonItem {
  label: string; // Ex: "Custo Mensal"
  valueBad: string; // Ex: "R$ 5.000"
  valueGood: string; // Ex: "R$ 2.000"
}

interface ComparisonCardProps {
  titleBad: string; // Ex: "Brasil (Atual)"
  titleGood: string; // Ex: "Paraguai (Estratégia)"
  items: ComparisonItem[];
  footerText?: string; // Ex: "Economia anual projetada:"
  footerValue?: string; // Ex: "R$ 36.000"
}

export default function ComparisonCard({
  titleBad,
  titleGood,
  items,
  footerText,
  footerValue
}: ComparisonCardProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-[#1E1E1E] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      
      {/* Header Grid */}
      <div className="grid grid-cols-2 text-center border-b border-white/10">
        <div className="p-4 bg-red-500/10 border-r border-white/10">
          <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-1">Cenário A</p>
          <h3 className="text-white font-bold">{titleBad}</h3>
        </div>
        <div className="p-4 bg-green-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-green-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">
            RECOMENDADO
          </div>
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-1">Cenário B</p>
          <h3 className="text-white font-bold">{titleGood}</h3>
        </div>
      </div>

      {/* Body Rows */}
      <div className="divide-y divide-white/5">
        {items.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="grid grid-cols-2 text-center relative group"
          >
            {/* Label Flutuante (Desktop/Mobile adjust) */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] px-2 text-[10px] text-white/30 uppercase tracking-wider z-10">
              {item.label}
            </div>

            {/* Bad Side */}
            <div className="p-4 pt-6 text-red-300/70 border-r border-white/5 flex flex-col items-center justify-center">
              <span className="text-lg font-medium decoration-red-500/30 line-through decoration-2">
                {item.valueBad}
              </span>
              <X className="w-4 h-4 mt-1 opacity-20" />
            </div>

            {/* Good Side */}
            <div className="p-4 pt-6 text-white font-bold bg-white/5 flex flex-col items-center justify-center relative">
              <span className="text-xl text-green-400">{item.valueGood}</span>
              <Check className="w-4 h-4 mt-1 text-green-500" />
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Impact (Total Savings) */}
      {footerValue && (
        <div className="p-6 bg-gradient-to-r from-green-900/40 to-[#1E1E1E] border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-xs">{footerText}</p>
              <div className="flex items-center gap-1 text-green-400 text-xs font-bold mt-1">
                <TrendingUp className="w-3 h-3" /> ROI Positivo
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-white block">{footerValue}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}