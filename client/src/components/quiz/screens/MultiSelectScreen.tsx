import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { MultiSelectScreen as MultiSelectScreenType } from '@/types/quiz';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  screen: MultiSelectScreenType;
}

export function MultiSelectScreen({ screen }: Props) {
  const { answerQuestion, nextScreen, answers } = useQuizStore();
  const existingAnswer = answers[screen.id];
  
  const [selected, setSelected] = useState<string[]>(
    existingAnswer ? (Array.isArray(existingAnswer.value) ? existingAnswer.value : [existingAnswer.value]) : []
  );

  useEffect(() => {
    if (existingAnswer) {
      setSelected(Array.isArray(existingAnswer.value) ? existingAnswer.value : [existingAnswer.value]);
    } else {
      setSelected([]);
    }
  }, [screen.id, existingAnswer]);

  const handleSelect = (optionId: string) => {
    if (screen.allowMultiple) {
      setSelected((prev) => {
        if (prev.includes(optionId)) {
          return prev.filter((id) => id !== optionId);
        }
        if (screen.maxSelections && prev.length >= screen.maxSelections) {
          return prev;
        }
        return [...prev, optionId];
      });
    } else {
      setSelected([optionId]);
      answerQuestion(screen.id, optionId);
      nextScreen();
    }
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      answerQuestion(screen.id, screen.allowMultiple ? selected : selected[0]);
      nextScreen();
    }
  };

  const canContinue = selected.length >= (screen.minSelections || 1);

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as unknown as Record<string, React.FC<{ className?: string }>>)[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3"
            style={{ fontFamily: 'Outfit, sans-serif' }}
            data-testid="text-question"
          >
            {screen.question}
          </h2>
          {screen.subtitle && (
            <p className="text-muted-foreground" data-testid="text-subtitle">
              {screen.subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {screen.options.map((option) => {
            const isSelected = selected.includes(option.id);
            return (
              <motion.div key={option.id} variants={itemVariants}>
                <Card
                  className={cn(
                    'relative p-5 cursor-pointer transition-all duration-200',
                    'backdrop-blur-sm',
                    isSelected
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                  )}
                  onClick={() => handleSelect(option.id)}
                  data-testid={`card-option-${option.id}`}
                >
                  <div className="flex items-start gap-4">
                    {option.icon && (
                      <div
                        className={cn(
                          'flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center transition-colors',
                          isSelected ? 'bg-primary text-primary-foreground' : 'bg-white/10'
                        )}
                      >
                        {getIcon(option.icon)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base mb-0.5">{option.label}</h3>
                      {option.description && (
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      )}
                    </div>
                    <div
                      className={cn(
                        'flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all',
                        isSelected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-white/30'
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {screen.allowMultiple && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Button
              variant="shiny"
              size="lg"
              onClick={handleContinue}
              disabled={!canContinue}
              className="px-8 py-5 text-base font-medium gap-2 group"
              data-testid="button-continue"
            >
              Continuar
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
