import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, AlertTriangle, ArrowRight, Wallet, Landmark } from 'lucide-react';
import ComparisonCard from '../../visual/ComparisonCard';
import ProjectionLineChart from '../../visual/ProjectionLineChart';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

interface FinancialResultProps {
  totalSavings: number; // Valor Total Recuperável (O número mágico)
  badScenarioValue: number; // O que ele paga hoje
  goodScenarioValue: number; // O que deveria pagar
  projectionData: any[]; // Para o gráfico
  verdictTitle: string;
  onContinue: () => void;
}

export default function FinancialResultTemplate({
  totalSavings,
  badScenarioValue,
  goodScenarioValue,
  projectionData,
  verdictTitle,
  onContinue
}: FinancialResultProps) {

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-32">
      
      {/* 1. HERO: O DINHEIRO NA MESA */}
      <div className="pt-8 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
          <Wallet className="w-4 h-4 text-yellow-500" />
          <span className="text-xs font-bold tracking-widest uppercase text-yellow-500">Diagnóstico Financeiro</span>
        </div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <p className="text-white/60 text-sm font-medium mb-1">Potencial de Economia/Recuperação</p>
          <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tighter">
            R$ {totalSavings.toLocaleString('pt-BR')}
          </h1>
          <p className="text-red-400 text-xs mt-2 flex items-center justify-center gap-1 font-bold bg-red-500/10 py-1 px-2 rounded-lg inline-block">
            <AlertTriangle className="w-3 h-3" />
            Valor sendo desperdiçado atualmente
          </p>
        </motion.div>
      </div>

      {/* 2. O DUELO (CENÁRIO A vs B) - O NOVO COMPONENTE */}
      <div className="px-4 mb-12">
        <ComparisonCard 
          titleBad="Cenário Atual"
          titleGood="Cenário Otimizado"
          items={[
            { 
              label: "Custo Estimado", 
              valueBad: `R$ ${badScenarioValue.toLocaleString()}`, 
              valueGood: `R$ ${goodScenarioValue.toLocaleString()}` 
            }
          ]}
          footerText="Diferença anual no seu bolso:"
          footerValue={`R$ ${totalSavings.toLocaleString()}`}
        />
      </div>

      {/* 3. A PROJEÇÃO (O CUSTO DA INAÇÃO) - O NOVO COMPONENTE */}
      <div className="px-4 mb-12">
        <h3 className="text-white font-bold mb-4 pl-2 border-l-4 border-yellow-500">
          O Custo da Inação (5 Anos)
        </h3>
        <p className="text-sm text-white/60 mb-4 pl-2">
          Veja como esse prejuízo acumula se você não fizer nada hoje.
        </p>
        <ProjectionLineChart 
          data={projectionData} 
          title="Acúmulo de Perda"
          color="#ef4444" // Vermelho para mostrar perda
        />
      </div>

      {/* 4. AVISO DE AUTORIDADE */}
      <div className="mx-4 p-4 rounded-xl bg-gray-800/50 border border-white/5 flex gap-4 items-center">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
          <Landmark className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">Análise Jurídica Preliminar</p>
          <p className="text-xs text-white/50">Baseado na legislação vigente e precedentes recentes.</p>
        </div>
      </div>

      {/* 5. CTA STICKY */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-50">
        <button
          onClick={onContinue}
          className="w-full py-4 rounded-xl font-bold text-lg shadow-2xl bg-green-600 hover:bg-green-500 text-white flex items-center justify-center gap-2"
        >
          QUERO RECUPERAR ESSE VALOR
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}