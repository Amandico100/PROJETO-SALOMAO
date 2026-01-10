import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, AlertTriangle, ArrowRight, ShieldCheck, Activity, TrendingDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// COMPONENTES VISUAIS (Certifique-se que os caminhos estão corretos)
import ComparisonDuelChart from '../../visual/ComparisonDuelChart';
import GaugeMeter from '../../visual/GaugeMeter';
import ProjectionLineChart from '../../visual/ProjectionLineChart';
import BeforeAfterSlider from '../../visual/BeforeAfterSlider';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

interface HealthResultTemplateProps {
  realAge: number;
  metabolicAge: number;
  bmiScore: number;
  riskTitle: string;
  projectedDate: string; // "14 de Outubro"
  ageDifference: number;
  currentWeight: number; // Novo
  goalWeight: number;    // Novo
  onContinue: () => void;
}

export default function HealthResultTemplate({
  realAge,
  metabolicAge,
  bmiScore,
  riskTitle,
  projectedDate,
  ageDifference,
  currentWeight,
  goalWeight,
  onContinue
}: HealthResultTemplateProps) {

  const isBadResult = ageDifference > 0;
  const mainColor = isBadResult ? "red" : "green";

  // Dados Simulados para a Projeção (Salomão pode refinar a lógica depois)
  const projectionData = [
    { label: 'Hoje', value: currentWeight, displayValue: `${currentWeight}kg` },
    { label: 'Mês 1', value: currentWeight - ((currentWeight - goalWeight) * 0.3), displayValue: 'Início' },
    { label: 'Mês 2', value: currentWeight - ((currentWeight - goalWeight) * 0.6), displayValue: 'Queima' },
    { label: 'Meta', value: goalWeight, displayValue: `${goalWeight}kg` },
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-32">
      
      {/* 1. HERO: O CHOQUE DE IDADE */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-8 px-6 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
          <Activity className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold tracking-widest uppercase text-blue-400">Análise Metabólica V2</span>
        </div>

        <ComparisonDuelChart 
          title="Idade Cronológica vs. Biológica"
          subtitle="Seu corpo está envelhecendo mais rápido que você?"
          badLine={{
            label: "Sua Idade",
            startValue: 20,
            endValue: 40,
            displayStart: "Nasc.",
            displayEnd: `${realAge} anos`,
            color: "gray"
          }}
          goodLine={{
            label: "Idade do Corpo",
            startValue: 20,
            endValue: isBadResult ? 85 : 30,
            displayStart: "Metabolismo",
            displayEnd: `${metabolicAge} anos`,
            color: isBadResult ? "red" : "green",
            icon: isBadResult ? AlertTriangle : ShieldCheck
          }}
          delay={0.2}
        />
      </motion.div>

      {/* 2. O RISCO (GAUGE) */}
      <div className="mt-8 px-4">
        <GaugeMeter 
          title="Nível de Inflamação / Risco"
          value={bmiScore}
          min={15}
          max={40}
          unit="IMC"
          segments={[
            { label: "Ótimo", min: 15, max: 24.9, color: "bg-green-500", textColor: "text-green-500" },
            { label: "Alerta", min: 25, max: 29.9, color: "bg-yellow-500", textColor: "text-yellow-500" },
            { label: "Perigo", min: 30, max: 40, color: "bg-red-500", textColor: "text-red-500" },
          ]}
          description={riskTitle}
          delay={1.5}
        />
      </div>

      {/* 3. A PROJEÇÃO (FUTURE PACING) - NOVO COMPONENTE */}
      <div className="mt-12 px-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5 text-green-400" />
          <h3 className="text-white font-bold text-lg">Sua Jornada Projetada</h3>
        </div>
        
        <ProjectionLineChart 
          data={projectionData}
          color="#22c55e" // Verde Esperança
          title={`Meta: ${goalWeight}kg até ${projectedDate}`}
        />
        <p className="text-xs text-white/40 mt-3 text-center">
          Baseado na metodologia de déficit calórico progressivo.
        </p>
      </div>

      {/* 4. A VISUALIZAÇÃO (ANTES E DEPOIS) - NOVO COMPONENTE */}
      {/* Nota: O Salomão deve substituir essas URLs por imagens genéricas do nicho ou do cliente */}
      <div className="mt-12 px-4">
        <h3 className="text-white font-bold text-lg mb-4 text-center">
          Resultados Típicos do Método
        </h3>
        <BeforeAfterSlider 
          beforeImage="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" // Exemplo genérico (Homem Fitness Antes)
          afterImage="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop"  // Exemplo genérico (Homem Fitness Depois)
          beforeLabel="Semana 1"
          afterLabel="Semana 12"
          overlayText="Arraste para ver a transformação"
        />
      </div>

      {/* 5. CTA FIXO */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-50">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className={cn(
            "w-full py-4 rounded-xl font-bold text-lg shadow-2xl flex items-center justify-center gap-2",
            isBadResult ? "bg-red-600 text-white" : "bg-green-600 text-white"
          )}
        >
          {isBadResult ? "REVERTER ISSO AGORA" : "ACESSAR MEU PLANO"}
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>

    </div>
  );
}