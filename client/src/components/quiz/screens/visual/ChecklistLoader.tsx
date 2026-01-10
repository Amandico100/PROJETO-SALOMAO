import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface ChecklistItem {
  label: string;
  status: 'pending' | 'loading' | 'completed';
}

interface ChecklistLoaderProps {
  steps: string[]; // ["Analisando perfil...", "Verificando SPC...", "Calculando Score..."]
  onComplete: () => void;
}

export default function ChecklistLoader({ steps, onComplete }: ChecklistLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length) {
      setTimeout(onComplete, 1000); // Espera 1s após o último check
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 1500); // 1.5s por passo

    return () => clearTimeout(timer);
  }, [currentStep, steps.length, onComplete]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[#1E1E1E] rounded-2xl border border-white/10">
      <h3 className="text-white font-bold text-center mb-6 animate-pulse">
        Gerando Diagnóstico...
      </h3>
      
      <div className="space-y-4">
        {steps.map((step, idx) => {
          let status: ChecklistItem['status'] = 'pending';
          if (idx < currentStep) status = 'completed';
          if (idx === currentStep) status = 'loading';

          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0.5, x: -10 }}
              animate={{ opacity: status === 'pending' ? 0.3 : 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                {status === 'completed' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                {status === 'loading' && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
                {status === 'pending' && <Circle className="w-5 h-5 text-white/20" />}
              </div>
              <span className={cn(
                "text-sm",
                status === 'completed' ? "text-white font-medium" : "text-white/50"
              )}>
                {step}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}