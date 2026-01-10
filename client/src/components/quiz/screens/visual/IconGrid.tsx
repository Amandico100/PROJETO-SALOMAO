import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, LucideIcon, Circle, User, Briefcase, Heart, Zap, Image as ImageIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
export interface GridOption {
  id: string | number;
  label: string;
  icon?: LucideIcon; // Ícone Lucide padrão
  imageUrl?: string; // URL de imagem (opcional, sobrescreve o ícone)
  description?: string; // Pequeno texto auxiliar (opcional)
}

interface IconGridProps {
  title?: string;
  subtitle?: string;
  options: GridOption[];
  multiSelect?: boolean;
  defaultSelected?: (string | number)[];
  onChange?: (selectedIds: (string | number)[]) => void;
  columns?: 2 | 3; // Mobile friendly control
  colorTheme?: 'green' | 'blue' | 'purple' | 'gold' | 'red';
  delay?: number;
}

// --- THEME ---
const themes = {
  green: { border: 'border-green-500', bg: 'bg-green-500', text: 'text-green-500', glow: 'shadow-green-500/30' },
  blue: { border: 'border-blue-500', bg: 'bg-blue-500', text: 'text-blue-500', glow: 'shadow-blue-500/30' },
  purple: { border: 'border-purple-500', bg: 'bg-purple-500', text: 'text-purple-500', glow: 'shadow-purple-500/30' },
  gold: { border: 'border-yellow-400', bg: 'bg-yellow-400', text: 'text-yellow-400', glow: 'shadow-yellow-400/30' },
  red: { border: 'border-red-500', bg: 'bg-red-500', text: 'text-red-500', glow: 'shadow-red-500/30' },
};

// --- COMPONENT ---
export default function IconGrid({
  title,
  subtitle,
  options,
  multiSelect = false,
  defaultSelected = [],
  onChange,
  columns = 2,
  colorTheme = 'blue',
  delay = 0
}: IconGridProps) {
  
  const theme = themes[colorTheme];
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>(defaultSelected);

  const handleSelect = (id: string | number) => {
    let newSelected: (string | number)[];

    if (multiSelect) {
      if (selectedIds.includes(id)) {
        newSelected = selectedIds.filter(item => item !== id);
      } else {
        newSelected = [...selectedIds, id];
      }
    } else {
      // Se for single select, permite desmarcar se clicar no mesmo? Normalmente não em quizzes.
      // Vamos assumir comportamento de rádio (troca direta).
      newSelected = [id];
    }

    setSelectedIds(newSelected);
    if (onChange) onChange(newSelected);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="w-full max-w-md mx-auto"
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && <h3 className="text-white text-xl font-bold tracking-tight">{title}</h3>}
          {subtitle && <p className="text-white/50 text-sm mt-2">{subtitle}</p>}
        </div>
      )}

      {/* Grid Container */}
      <div className={cn(
        "grid gap-4",
        columns === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"
      )}>
        {options.map((option, index) => {
          const isSelected = selectedIds.includes(option.id);
          const Icon = option.icon || Circle; // Fallback icon

          return (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + (index * 0.1) }} // Staggered entry
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative group flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 min-h-[140px]",
                "bg-[#1E1E1E]", // Fundo base
                isSelected 
                  ? cn(theme.border, "bg-white/5", theme.glow, "shadow-lg") 
                  : "border-white/5 hover:border-white/20 hover:bg-white/5"
              )}
            >
              {/* Checkmark Badge (Top Right) */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className={cn(
                      "absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-black shadow-lg",
                      theme.bg
                    )}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon / Image Area */}
              <div className="mb-4 relative">
                {option.imageUrl ? (
                  // Modo Imagem (High-End)
                  <div className={cn(
                    "w-16 h-16 rounded-full overflow-hidden border-2 transition-colors duration-300",
                    isSelected ? theme.border : "border-white/10"
                  )}>
                    <img 
                      src={option.imageUrl} 
                      alt={option.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  // Modo Ícone (Lucide)
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300",
                    isSelected ? cn("bg-white/10", theme.text) : "bg-white/5 text-white/40 group-hover:text-white/70"
                  )}>
                    <Icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                )}
                
                {/* Glow behind icon when selected */}
                {isSelected && (
                  <div className={cn("absolute inset-0 blur-xl opacity-40 rounded-full", theme.bg)} />
                )}
              </div>

              {/* Label */}
              <span className={cn(
                "text-sm font-bold text-center transition-colors duration-300",
                isSelected ? "text-white" : "text-white/60 group-hover:text-white/90"
              )}>
                {option.label}
              </span>

              {/* Optional Description */}
              {option.description && (
                <span className="text-[10px] text-white/30 text-center mt-1 leading-tight">
                  {option.description}
                </span>
              )}

            </motion.button>
          );
        })}
      </div>

    </motion.div>
  );
}