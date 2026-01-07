import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ImageSelectScreen as ImageSelectScreenType } from '@/types/quiz';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  screen: ImageSelectScreenType;
}

export function ImageSelectScreen({ screen }: Props) {
  const { answerQuestion, nextScreen, answers } = useQuizStore();
  const existingAnswer = answers[screen.id];
  
  const [selected, setSelected] = useState<string | null>(
    existingAnswer ? (existingAnswer.value as string) : null
  );

  useEffect(() => {
    if (existingAnswer) {
      setSelected(existingAnswer.value as string);
    } else {
      setSelected(null);
    }
  }, [screen.id, existingAnswer]);

  const handleSelect = (optionId: string) => {
    setSelected(optionId);
    answerQuestion(screen.id, optionId);
    nextScreen();
  };

  const handleContinue = () => {
    if (selected) {
      answerQuestion(screen.id, selected);
      nextScreen();
    }
  };

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
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
          className={cn('grid gap-4 w-full mb-8', gridCols[screen.columns || 3])}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {screen.options.map((option) => {
            const isSelected = selected === option.id;
            return (
              <motion.div
                key={option.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={cn(
                    'relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer transition-all duration-200',
                    'border-2',
                    isSelected ? 'border-primary/60 shadow-lg shadow-primary/20' : 'border-white/10 hover:border-white/20'
                  )}
                  onClick={() => handleSelect(option.id)}
                  data-testid={`card-image-${option.id}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    {option.image ? (
                      <img
                        src={option.image}
                        alt={option.label}
                        className={cn(
                          'w-full h-full object-cover transition-all duration-200',
                          isSelected ? '' : 'grayscale opacity-80 hover:grayscale-0 hover:opacity-100'
                        )}
                      />
                    ) : (
                      <User className="w-24 h-24 text-muted-foreground/30" />
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">{option.label}</h3>
                    {option.description && (
                      <p className="text-white/70 text-sm">{option.description}</p>
                    )}
                  </div>

                  {isSelected && (
                    <motion.div
                      className="absolute top-3 right-3 w-7 h-7 rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Button
            variant="shiny"
            size="lg"
            onClick={handleContinue}
            disabled={!selected}
            className="px-8 py-5 text-base font-medium gap-2 group"
            data-testid="button-continue"
          >
            Continuar
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
