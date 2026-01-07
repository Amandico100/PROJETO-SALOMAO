import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LoadingCalculatedScreen as LoadingCalculatedScreenType } from '@/types/quiz';
import { useQuizStore } from '@/store/quizStore';
import { Check, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Props {
  screen: LoadingCalculatedScreenType;
}

export function LoadingCalculatedScreen({ screen }: Props) {
  const { nextScreen } = useQuizStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const totalDuration = screen.steps.reduce((acc, step) => acc + step.duration, 0);
  const completedDuration = screen.steps
    .filter((step) => completedSteps.includes(step.id))
    .reduce((acc, step) => acc + step.duration, 0);
  const progressPercentage = (completedDuration / totalDuration) * 100;

  useEffect(() => {
    if (currentStepIndex >= screen.steps.length) {
      setIsComplete(true);
      const timeout = setTimeout(() => {
        nextScreen();
      }, 1500);
      return () => clearTimeout(timeout);
    }

    const currentStep = screen.steps[currentStepIndex];
    const timeout = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, currentStep.id]);
      setCurrentStepIndex((prev) => prev + 1);
    }, currentStep.duration);

    return () => clearTimeout(timeout);
  }, [currentStepIndex, screen.steps, nextScreen]);

  return (
    <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <motion.div
          className="w-full space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center"
            style={{ fontFamily: 'Outfit, sans-serif' }}
            data-testid="text-headline"
          >
            {isComplete ? screen.completionText || 'Concluído!' : screen.headline}
          </motion.h2>

          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-muted-foreground text-center">
              {Math.round(progressPercentage)}% completo
            </p>
          </div>

          <div className="space-y-4">
            {screen.steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = index === currentStepIndex;
              const isPending = index > currentStepIndex;

              return (
                <motion.div
                  key={step.id}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-lg border border-white/10 transition-colors',
                    isCompleted && 'bg-primary/5',
                    isCurrent && 'bg-white/5',
                    isPending && 'opacity-50'
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isPending ? 0.5 : 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  data-testid={`step-${step.id}`}
                >
                  <div
                    className={cn(
                      'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all',
                      isCompleted && 'bg-primary text-primary-foreground',
                      isCurrent && 'bg-primary/20 text-primary',
                      isPending && 'bg-muted text-muted-foreground'
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {isCompleted ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        >
                          <Check className="w-5 h-5" />
                        </motion.div>
                      ) : isCurrent ? (
                        <motion.div
                          key="loading"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Loader2 className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <motion.span key="number" className="text-sm font-medium">
                          {index + 1}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <span
                    className={cn(
                      'font-medium transition-colors',
                      isCompleted && 'text-primary',
                      isPending && 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {isComplete && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-primary">
                <Check className="w-5 h-5" />
                <span className="font-medium">Análise Concluída</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
