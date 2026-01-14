import { useMemo } from 'react';

// --- TYPES ---
export interface MatchCategory {
    id: string;
    name: string;
    description: string;
    icon: string; // Nome do ícone Lucide
    keywords: string[]; // Palavras-chave para matching
}

export interface MatchResult {
    matchedCategory: MatchCategory;
    matchScore: number; // 0-100 (quão forte é o match)
    alternativeMatches: Array<{
        category: MatchCategory;
        score: number;
    }>;
    reasoning: string[]; // Lista de razões para o match
    recommendation: string;
}

export interface MatchConfig {
    categories: MatchCategory[];
    questionWeights: Record<string, Record<string, number>>; // { questionId: { categoryId: weight } }
}

// --- HOOK ---
export function useMatchEngine() {

    /**
     * Calcula qual categoria melhor combina com as respostas do usuário
     */
    const calculateMatch = (
        answers: Record<string, string | string[]>, // Respostas do quiz
        config: MatchConfig
    ): MatchResult => {

        const categoryScores: Record<string, number> = {};
        const reasonsPerCategory: Record<string, string[]> = {};

        // Inicializar scores
        config.categories.forEach(cat => {
            categoryScores[cat.id] = 0;
            reasonsPerCategory[cat.id] = [];
        });

        // Processar respostas
        Object.entries(answers).forEach(([questionId, answer]) => {
            const weights = config.questionWeights[questionId];
            if (!weights) return;

            // Normalizar resposta para array
            const answerArray = Array.isArray(answer) ? answer : [answer];

            // Aplicar pesos baseado nas respostas
            answerArray.forEach(ans => {
                Object.entries(weights).forEach(([categoryId, weight]) => {
                    // Verificar se a resposta contém keywords da categoria
                    const category = config.categories.find(c => c.id === categoryId);
                    if (category && category.keywords.some(kw =>
                        ans.toLowerCase().includes(kw.toLowerCase())
                    )) {
                        categoryScores[categoryId] += weight;
                        reasonsPerCategory[categoryId].push(ans);
                    } else {
                        // Peso base mesmo sem keyword
                        categoryScores[categoryId] += weight * 0.3;
                    }
                });
            });
        });

        // Encontrar melhor match
        const sortedCategories = Object.entries(categoryScores)
            .sort(([, a], [, b]) => b - a)
            .map(([id, score]) => ({
                category: config.categories.find(c => c.id === id)!,
                score: Math.min(100, Math.round(score * 10)) // Normalizar para 0-100
            }));

        const topMatch = sortedCategories[0];
        const alternatives = sortedCategories.slice(1, 4); // Top 3 alternativas

        // Gerar recomendação
        const recommendation = generateRecommendation(topMatch.category, topMatch.score);

        return {
            matchedCategory: topMatch.category,
            matchScore: topMatch.score,
            alternativeMatches: alternatives,
            reasoning: reasonsPerCategory[topMatch.category.id].slice(0, 5),
            recommendation
        };
    };

    /**
     * Gera uma recomendação personalizada baseada no match
     */
    const generateRecommendation = (category: MatchCategory, score: number): string => {
        if (score >= 90) {
            return `${category.name} é PERFEITO para você! Combinação de 90%+.`;
        } else if (score >= 70) {
            return `${category.name} é uma excelente escolha para o seu perfil.`;
        } else if (score >= 50) {
            return `${category.name} pode funcionar bem para você, mas considere também as alternativas.`;
        }
        return `Baseado nas suas respostas, sugerimos explorar ${category.name}.`;
    };

    /**
     * Cria uma configuração de match simples baseada em tipos
     */
    const createSimpleMatchConfig = (
        types: Array<{ id: string; name: string; description: string; icon: string; keywords: string[] }>
    ): MatchConfig => {
        return {
            categories: types.map(t => ({
                id: t.id,
                name: t.name,
                description: t.description,
                icon: t.icon,
                keywords: t.keywords
            })),
            questionWeights: {} // Será preenchido pelo quiz específico
        };
    };

    return {
        calculateMatch,
        generateRecommendation,
        createSimpleMatchConfig
    };
}
