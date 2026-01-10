import { useState, useMemo } from 'react';

// --- TYPES ---
export interface ScoreQuestion {
  id: string;
  category: string; // Ex: 'exaustao', 'cinismo', 'eficacia'
  weight: number; // Peso da pergunta (1 a 5)
}

export interface ScoreResult {
  totalScore: number;
  maxPossibleScore: number;
  percentage: number;
  categoryBreakdown: Record<string, number>; // { exaustao: 80, cinismo: 40 }
  severityLevel: 'low' | 'moderate' | 'high' | 'critical';
  verdictTitle: string;
  verdictDescription: string;
  actionRequired: boolean; // Se true, manda pro Funil High-Ticket
}

// --- HOOK ---
export function useScoreCalculator() {
  
  // Função principal de cálculo
  const calculateScore = (
    answers: Record<string, number>, // { q1: 5, q2: 3 } (Onde o valor é a pontuação da resposta)
    questionMap: ScoreQuestion[]
  ): ScoreResult => {
    
    let totalScore = 0;
    let maxPossibleScore = 0;
    const categoryScores: Record<string, { current: number, max: number }> = {};

    // 1. Processar Pontuação
    questionMap.forEach((q) => {
      const answerValue = answers[q.id] || 0;
      
      // Soma Geral
      totalScore += answerValue * q.weight;
      maxPossibleScore += 5 * q.weight; // Assumindo escala Likert de 0 a 5

      // Soma por Categoria
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { current: 0, max: 0 };
      }
      categoryScores[q.category].current += answerValue * q.weight;
      categoryScores[q.category].max += 5 * q.weight;
    });

    // 2. Calcular Percentuais
    const percentage = Math.round((totalScore / maxPossibleScore) * 100);
    
    const categoryBreakdown: Record<string, number> = {};
    Object.keys(categoryScores).forEach(key => {
      categoryBreakdown[key] = Math.round((categoryScores[key].current / categoryScores[key].max) * 100);
    });

    // 3. Determinar Severidade (Lógica Clínica Adaptada)
    let severityLevel: ScoreResult['severityLevel'] = 'low';
    let verdictTitle = "Nível de Estresse Controlado";
    let verdictDescription = "Seus sintomas indicam cansaço normal, não patológico.";
    let actionRequired = false;

    if (percentage > 30) {
      severityLevel = 'moderate';
      verdictTitle = "Sinal de Alerta Amarelo";
      verdictDescription = "Você apresenta sinais iniciais de esgotamento profissional.";
    }
    if (percentage > 60) {
      severityLevel = 'high';
      verdictTitle = "Alta Probabilidade de Burnout";
      verdictDescription = "Seus níveis de exaustão e despersonalização são compatíveis com quadros clínicos que exigem afastamento.";
      actionRequired = true;
    }
    if (percentage > 85) {
      severityLevel = 'critical';
      verdictTitle = "Estado Crítico de Incapacidade";
      verdictDescription = "Seu perfil indica colapso iminente. Juridicamente, há fortes indícios para incapacidade laborativa total.";
      actionRequired = true;
    }

    return {
      totalScore,
      maxPossibleScore,
      percentage,
      categoryBreakdown,
      severityLevel,
      verdictTitle,
      verdictDescription,
      actionRequired
    };
  };

  return { calculateScore };
}