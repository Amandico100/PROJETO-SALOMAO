import { useState, useMemo } from 'react';

// --- TYPES ---
export type Gender = 'male' | 'female';
export type ActivityLevel = 1.2 | 1.375 | 1.55 | 1.725 | 1.9;

interface HealthInput {
  gender: Gender;
  age: number;
  height: number; // em cm
  weight: number; // em kg
  goalWeight: number; // em kg
  activityLevel: ActivityLevel;
}

interface HealthResult {
  bmi: number;
  bmiClassification: string;
  bmiColor: 'green' | 'yellow' | 'red' | 'blue';
  bmr: number; // Taxa Metabólica Basal
  tdee: number; // Gasto Calórico Total Diário
  metabolicAge: number; // A Idade "Real" do corpo
  ageDifference: number; // Diferença entre idade real e metabólica
  weeksToGoal: number; // Tempo estimado para chegar na meta
  projectedDate: string; // Data exata (ex: "14 de Outubro")
  riskLevel: string; // Copy persuasiva de risco
}

// --- HOOK (O MOTOR) ---
export function useHealthCalculator() {
  
  // Lógica de Cálculo (Mifflin-St Jeor - Padrão Ouro da Medicina)
  const calculate = (data: HealthInput): HealthResult => {
    const { gender, age, height, weight, goalWeight, activityLevel } = data;

    // 1. Cálculo do IMC
    const bmi = weight / ((height / 100) * (height / 100));
    let bmiClass = '';
    let bmiColor: HealthResult['bmiColor'] = 'green';
    let riskText = '';

    if (bmi < 18.5) {
      bmiClass = 'Abaixo do Peso';
      bmiColor = 'yellow';
      riskText = 'Fraqueza Imunológica';
    } else if (bmi < 24.9) {
      bmiClass = 'Peso Ideal';
      bmiColor = 'green';
      riskText = 'Baixo Risco';
    } else if (bmi < 29.9) {
      bmiClass = 'Sobrepeso';
      bmiColor = 'yellow';
      riskText = 'Inflamação Silenciosa'; // Copy Salomão: Medo sutil
    } else if (bmi < 34.9) {
      bmiClass = 'Obesidade Grau I';
      bmiColor = 'red';
      riskText = 'Sobrecarga Articular e Cardíaca';
    } else {
      bmiClass = 'Obesidade Grau II+';
      bmiColor = 'red';
      riskText = 'Zona de Perigo Iminente'; // Copy Salomão: Medo forte
    }

    // 2. Cálculo TMB (Mifflin-St Jeor)
    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // 3. TDEE (Gasto Total)
    const tdee = bmr * activityLevel;

    // 4. A Mágica do Salomão: IDADE METABÓLICA (Estimativa baseada em composição)
    // Se o IMC estiver alto, "penalizamos" a idade. Se estiver ótimo, "rejuvenescemos".
    // Isso cria o choque de realidade necessário para vender.
    let ageModifier = 0;
    if (bmi > 25) ageModifier += (bmi - 25) * 1.5; // Cada ponto de IMC acima aumenta 1.5 anos
    if (bmi < 18.5) ageModifier += (18.5 - bmi) * 1;
    if (bmi >= 18.5 && bmi <= 25) ageModifier -= 3; // Recompensa por estar em forma

    // Ajuste por atividade (Sedentário envelhece, Ativo rejuvenesce)
    if (activityLevel === 1.2) ageModifier += 2;
    if (activityLevel >= 1.725) ageModifier -= 4;

    const metabolicAge = Math.round(age + ageModifier);
    const ageDifference = metabolicAge - age;

    // 5. Previsão de Futuro (Tempo para Meta)
    // Assumindo um déficit saudável de 500-750kcal/dia (~0.7kg por semana)
    const weightDiff = Math.abs(weight - goalWeight);
    const weeklyLoss = 0.6; // Conservador para ser verídico
    const weeksToGoal = Math.ceil(weightDiff / weeklyLoss);

    // Calcular data futura
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + (weeksToGoal * 7));
    
    const projectedDate = futureDate.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric' 
    });

    return {
      bmi: parseFloat(bmi.toFixed(1)),
      bmiClassification: bmiClass,
      bmiColor,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      metabolicAge,
      ageDifference,
      weeksToGoal,
      projectedDate,
      riskLevel: riskText
    };
  };

  // Funções auxiliares para Feedbacks Visuais Instantâneos (Para o Componente InteractiveInput)
  
  const getWeightFeedback = (currentWeight: number, height: number) => {
    if (!height) return '';
    const tempBmi = currentWeight / ((height / 100) ** 2);
    if (tempBmi > 30) return "Cuidado: Zona de risco elevada";
    if (tempBmi > 25) return "Atenção: Acima do ideal";
    if (tempBmi < 18.5) return "Atenção: Abaixo do ideal";
    return "Excelente: Dentro da faixa saudável";
  };

  return {
    calculate,
    getWeightFeedback
  };
}