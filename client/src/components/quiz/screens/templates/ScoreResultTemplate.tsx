import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, ShieldAlert, BrainCircuit, Activity } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import GaugeMeter from '../../visual/GaugeMeter'; // Reutilizando seu componente

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

interface ScoreResultProps {
  scorePercentage: number; // 0 a 100
  severity: 'low' | 'moderate' | 'high' | 'critical';
  title: string;
  description: string;
  categoryBreakdown: Record<string, number>; // { exaustao: 80, cinismo: 50 }
  onContinue: () => void;
}

export default function ScoreResultTemplate({
  scorePercentage,
  severity,
  title,
  description,
  categoryBreakdown,
  onContinue
}: ScoreResultProps) {

  const isCritical = severity === 'high' || severity === 'critical';
  const colorClass = isCritical ? 'text-red-500' : (severity === 'moderate' ? 'text-yellow-500' : 'text-green-500');
  const bgClass = isCritical ? 'bg-red-500' : (severity === 'moderate' ? 'bg-yellow-500' : 'bg-green-500');

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24">
      
      {/* HERO SECTION */}
      <div className="pt-8 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
          <BrainCircuit className="w-4 h-4 text-white/70" />
          <span className="text-xs font-bold tracking-widest uppercase text-white/70">Diagnóstico Preliminar</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">
          Resultado da Análise
        </h1>
        
        <div className={cn("p-4 rounded-xl border mb-6 bg-opacity-10", colorClass.replace('text', 'border'), bgClass)}>
          <div className="flex items-center justify-center gap-2 mb-2">
            {isCritical ? <AlertTriangle className="w-6 h-6 animate-pulse" /> : <CheckCircle2 className="w-6 h-6" />}
            <span className="font-black text-lg uppercase tracking-tight">{title}</span>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* GAUGE PRINCIPAL */}
      <div className="px-4">
        <GaugeMeter 
          title="Nível de Esgotamento (Score)"
          value={scorePercentage}
          min={0}
          max={100}
          unit="%"
          segments={[
            { label: "Normal", min: 0, max: 30, color: "bg-green-500", textColor: "text-green-500" },
            { label: "Alerta", min: 31, max: 60, color: "bg-yellow-500", textColor: "text-yellow-500" },
            { label: "Crítico", min: 61, max: 100, color: "bg-red-500", textColor: "text-red-500" },
          ]}
          delay={0.2}
        />
      </div>

      {/* DETALHAMENTO (Barras de Progresso) */}
      <div className="mt-8 px-6">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" /> Detalhamento Clínico
        </h3>
        
        <div className="space-y-4">
          {Object.entries(categoryBreakdown).map(([key, value], idx) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-xs uppercase font-bold tracking-wider text-white/60">
                <span>{key.replace('_', ' ')}</span>
                <span>{value}%</span>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ delay: 0.5 + (idx * 0.1), duration: 1 }}
                  className={cn("h-full rounded-full", value > 70 ? "bg-red-500" : (value > 40 ? "bg-yellow-500" : "bg-green-500"))}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AVISO LEGAL IMPORTANTE */}
      <div className="mt-8 mx-6 p-4 rounded-lg bg-blue-900/20 border border-blue-500/20 flex gap-3 items-start">
        <ShieldAlert className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-[10px] text-blue-200 leading-relaxed">
          <strong>Atenção:</strong> Este teste não substitui um laudo médico oficial. Ele serve como indicativo para buscar ajuda profissional ou jurídica especializada.
        </p>
      </div>

      {/* BOTÃO DE AÇÃO */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-50">
        <button
          onClick={onContinue}
          className={cn(
            "w-full py-4 rounded-xl font-bold text-lg shadow-2xl transition-transform active:scale-95",
            isCritical ? "bg-red-600 hover:bg-red-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
          )}
        >
          {isCritical ? "VER COMO SOLICITAR AFASTAMENTO" : "VER PLANO DE PREVENÇÃO"}
        </button>
      </div>

    </div>
  );
}