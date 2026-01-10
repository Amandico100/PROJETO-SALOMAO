// src/tools/useFinancialCalculator.ts

export interface FinancialInput {
  currentValue: number; // Ex: Valor que paga hoje (Imposto, Parcela, Conta Luz)
  optimizedValue: number; // Ex: Valor que deveria pagar (Simulado)
  timeHorizonMonths: number; // Ex: 60 meses (5 anos)
  context: 'monthly' | 'total'; // Se o valor é recorrente ou fixo
}

export interface FinancialResult {
  monthlySavings: number;
  totalSavings: number;
  projectedLoss5Years: number; // O "Custo da Inação"
  comparisonData: {
    label: string;
    badScenario: number;
    goodScenario: number;
  }[];
  projectionGraph: {
    label: string; // "Ano 1", "Ano 2"
    value: number; // Valor acumulado da perda
    displayValue: string;
  }[];
  verdictTitle: string;
  verdictColor: 'red' | 'yellow' | 'green';
}

export function useFinancialCalculator() {

  const calculate = (data: FinancialInput): FinancialResult => {
    const { currentValue, optimizedValue, timeHorizonMonths } = data;
    
    // 1. Cálculos Básicos
    const monthlySavings = currentValue - optimizedValue;
    
    let totalSavings = 0;
    if (data.context === 'monthly') {
      totalSavings = monthlySavings * timeHorizonMonths;
    } else {
      totalSavings = currentValue - optimizedValue; // Ex: Dívida total vs Dívida Negociada
    }

    // 2. Projeção de Perda (Juros Compostos implícitos ou Linear)
    // Para simplificar e ser universal, usaremos projeção linear com correção básica
    const projectedLoss5Years = data.context === 'monthly' 
      ? monthlySavings * 60 
      : totalSavings; // Se for valor único, a perda é fixa (ou poderia ter juros)

    // 3. Dados para o Gráfico de Projeção (ProjectionLineChart)
    const projectionGraph = [];
    const steps = 5; // 5 anos ou 5 pontos
    for (let i = 1; i <= steps; i++) {
      const value = (projectedLoss5Years / steps) * i;
      projectionGraph.push({
        label: `Ano ${i}`,
        value: value,
        displayValue: `R$ ${(value / 1000).toFixed(0)}k`
      });
    }

    // 4. Veredito
    let verdictTitle = "Situação Estável";
    let verdictColor: FinancialResult['verdictColor'] = 'green';

    if (totalSavings > 10000) {
      verdictTitle = "Perda Financeira Grave Detectada";
      verdictColor = 'red';
    } else if (totalSavings > 1000) {
      verdictTitle = "Oportunidade de Otimização";
      verdictColor = 'yellow';
    }

    return {
      monthlySavings,
      totalSavings,
      projectedLoss5Years,
      comparisonData: [
        { label: data.context === 'monthly' ? "Custo Mensal" : "Custo Total", badScenario: currentValue, goodScenario: optimizedValue },
        { label: "Projeção 5 Anos", badScenario: currentValue * 60, goodScenario: optimizedValue * 60 }
      ],
      projectionGraph,
      verdictTitle,
      verdictColor
    };
  };

  return { calculate };
}