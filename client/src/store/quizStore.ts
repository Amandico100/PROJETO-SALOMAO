import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuizConfig, Screen } from '@/types/quiz';

interface QuizAnswer {
  screenId: string;
  value: string | string[];
  timestamp: number;
}

interface QuizState {
  quizConfig: QuizConfig | null;
  currentScreenId: string | null;
  answers: Record<string, QuizAnswer>;
  history: string[];
  email: string | null;
  isCompleted: boolean;
  setQuizConfig: (config: QuizConfig) => void;
  answerQuestion: (screenId: string, value: string | string[]) => void;
  nextScreen: () => void;
  prevScreen: () => void;
  goToScreen: (screenId: string) => void;
  setEmail: (email: string) => void;
  resetQuiz: () => void;
  getCurrentScreen: () => Screen | null;
  getProgress: () => { current: number; total: number; percentage: number };
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      quizConfig: null,
      currentScreenId: null,
      answers: {},
      history: [],
      email: null,
      isCompleted: false,

      setQuizConfig: (config) => {
        const firstScreen = config.screens[0];
        set({
          quizConfig: config,
          currentScreenId: firstScreen?.id || null,
          answers: {},
          history: firstScreen ? [firstScreen.id] : [],
          isCompleted: false,
        });
      },

      answerQuestion: (screenId, value) => {
        set((state) => ({
          answers: {
            ...state.answers,
            [screenId]: {
              screenId,
              value,
              timestamp: Date.now(),
            },
          },
        }));
      },

      nextScreen: () => {
        const state = get();
        if (!state.quizConfig || !state.currentScreenId) return;

        const currentScreen = state.quizConfig.screens.find(
          (s) => s.id === state.currentScreenId
        );
        if (!currentScreen) return;

        let nextScreenId = currentScreen.nextScreenId;

        if (state.quizConfig.logicRules) {
          for (const rule of state.quizConfig.logicRules) {
            const answer = state.answers[rule.condition.screenId];
            if (answer) {
              const answerValue = answer.value;
              let conditionMet = false;

              switch (rule.condition.operator) {
                case 'equals':
                  conditionMet = answerValue === rule.condition.value ||
                    (Array.isArray(answerValue) && answerValue.includes(rule.condition.value as string));
                  break;
                case 'contains':
                  conditionMet = Array.isArray(answerValue) &&
                    (Array.isArray(rule.condition.value)
                      ? rule.condition.value.some((v) => answerValue.includes(v))
                      : answerValue.includes(rule.condition.value));
                  break;
                case 'not_equals':
                  conditionMet = answerValue !== rule.condition.value &&
                    !(Array.isArray(answerValue) && answerValue.includes(rule.condition.value as string));
                  break;
              }

              if (conditionMet) {
                nextScreenId = rule.targetScreenId;
                break;
              }
            }
          }
        }

        if (!nextScreenId) {
          const currentIndex = state.quizConfig.screens.findIndex(
            (s) => s.id === state.currentScreenId
          );
          const nextScreen = state.quizConfig.screens[currentIndex + 1];
          nextScreenId = nextScreen?.id;
        }

        if (nextScreenId) {
          set((prevState) => ({
            currentScreenId: nextScreenId,
            history: [...prevState.history, nextScreenId!],
          }));
        } else {
          set({ isCompleted: true });
        }
      },

      prevScreen: () => {
        const state = get();
        if (state.history.length <= 1) return;

        const newHistory = [...state.history];
        newHistory.pop();
        const previousScreenId = newHistory[newHistory.length - 1];

        set({
          currentScreenId: previousScreenId,
          history: newHistory,
        });
      },

      goToScreen: (screenId) => {
        set((state) => ({
          currentScreenId: screenId,
          history: [...state.history, screenId],
        }));
      },

      setEmail: (email) => {
        set({ email });
      },

      resetQuiz: () => {
        const state = get();
        if (state.quizConfig) {
          const firstScreen = state.quizConfig.screens[0];
          set({
            currentScreenId: firstScreen?.id || null,
            answers: {},
            history: firstScreen ? [firstScreen.id] : [],
            email: null,
            isCompleted: false,
          });
        }
      },

      getCurrentScreen: () => {
        const state = get();
        if (!state.quizConfig || !state.currentScreenId) return null;
        return state.quizConfig.screens.find((s) => s.id === state.currentScreenId) || null;
      },

      getProgress: () => {
        const state = get();
        if (!state.quizConfig) return { current: 0, total: 0, percentage: 0 };

        const total = state.quizConfig.screens.length;
        const currentIndex = state.quizConfig.screens.findIndex(
          (s) => s.id === state.currentScreenId
        );
        const current = currentIndex + 1;
        const percentage = (current / total) * 100;

        return { current, total, percentage };
      },
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        answers: state.answers,
        currentScreenId: state.currentScreenId,
        history: state.history,
        email: state.email,
      }),
    }
  )
);
