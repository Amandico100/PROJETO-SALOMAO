import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
interface InteractiveInputProps {
  label: string; // Ex: "Qual seu peso atual?"
  value: string | number;
  onChange: (val: string) => void;
  type?: 'number' | 'text';
  suffix?: string; // Ex: "kg", "cm", "anos"
  prefix?: string; // Ex: "R$"
  placeholder?: string;
  min?: number;
  max?: number;
  
  // O Feedback Inteligente
  feedbackText?: string; // Ex: "IMC Estimado: 24.5 (Normal)"
  feedbackColor?: 'default' | 'green' | 'yellow' | 'red' | 'blue';
  
  delay?: number;
}

// --- THEME ---
const feedbackThemes = {
  default: { text: 'text-white/50', bg: 'bg-white/5', icon: Info },
  green: { text: 'text-green-400', bg: 'bg-green-500/10', icon: CheckCircle2 },
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: AlertCircle },
  red: { text: 'text-red-400', bg: 'bg-red-500/10', icon: AlertCircle },
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', icon: Info },
};

// --- COMPONENT ---
export default function InteractiveInput({
  label,
  value,
  onChange,
  type = 'number',
  suffix = '',
  prefix = '',
  placeholder = '0',
  min,
  max,
  feedbackText,
  feedbackColor = 'default',
  delay = 0
}: InteractiveInputProps) {
  
  const theme = feedbackThemes[feedbackColor];
  const Icon = theme.icon;
  const [isFocused, setIsFocused] = useState(false);

  // Handler para garantir limites numéricos se necessário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Se for número, valida min/max
    if (type === 'number' && val !== '') {
        const num = parseFloat(val);
        if (max !== undefined && num > max) val = max.toString();
        // Não travamos o min no onChange para permitir apagar, mas pode validar no blur
    }
    onChange(val);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="w-full max-w-md mx-auto"
    >
      {/* Label */}
      <h3 className="text-center text-white text-xl font-bold mb-8">{label}</h3>

      {/* Input Area Giant */}
      <div 
        className={cn(
          "relative flex items-center justify-center py-8 rounded-3xl transition-all duration-300 border-2",
          "bg-[#121212]",
          isFocused ? "border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]" : "border-white/5"
        )}
      >
        <div className="flex items-baseline gap-1 relative z-10">
          {/* Prefix */}
          {prefix && (
            <span className={cn("text-3xl sm:text-4xl font-medium transition-colors", isFocused ? "text-white/60" : "text-white/30")}>
              {prefix}
            </span>
          )}

          {/* The Input */}
          <input
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={cn(
              "bg-transparent border-none outline-none p-0 text-center font-black text-white tracking-tight w-[140px]",
              "text-6xl sm:text-7xl placeholder:text-white/10"
            )}
            style={{ 
              // Truque para esconder setas do input number
              appearance: 'textfield', 
            }} 
          />

          {/* Suffix */}
          {suffix && (
            <span className={cn("text-2xl sm:text-3xl font-medium transition-colors", isFocused ? "text-white/60" : "text-white/30")}>
              {suffix}
            </span>
          )}
        </div>

        {/* Focus Glow Background */}
        <div className={cn(
          "absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none",
          isFocused ? "opacity-100" : "opacity-0"
        )}
        style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
        />
      </div>

      {/* Feedback Area (Aparece se houver texto) */}
      <div className="h-16 mt-4 w-full flex items-start justify-center">
        <AnimatePresence mode="wait">
          {feedbackText && (
            <motion.div
              key={feedbackText} // Anima quando o texto muda
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={cn(
                "px-4 py-2 rounded-xl flex items-center gap-2 border backdrop-blur-md",
                theme.bg,
                theme.text,
                "border-white/5"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-semibold tracking-wide">
                {feedbackText}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slider Helper (Opcional - Visual Range para ajuste fino) */}
      {/* Se quiser adicionar um slider embaixo do input number, podemos incluir aqui depois */}

    </motion.div>
  );
}

/* CSS Global necessário para esconder setas do input number em alguns browsers:
   input[type=number]::-webkit-inner-spin-button, 
   input[type=number]::-webkit-outer-spin-button { 
     -webkit-appearance: none; 
     margin: 0; 
   }
*/