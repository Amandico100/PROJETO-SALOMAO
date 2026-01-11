import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ScaleScreen as ScaleScreenType } from '@/types/quiz';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    screen: ScaleScreenType;
}

export function ScaleScreen({ screen }: Props) {
    const { answerQuestion, nextScreen, answers } = useQuizStore();
    const existingAnswer = answers[screen.id];

    const [selected, setSelected] = useState<number | null>(
        existingAnswer ? (existingAnswer.value as number) : null
    );

    useEffect(() => {
        if (existingAnswer) {
            setSelected(existingAnswer.value as number);
        } else {
            setSelected(null);
        }
    }, [screen.id, existingAnswer]);

    const handleSelect = (value: number) => {
        setSelected(value);
    };

    const handleContinue = () => {
        if (selected !== null) {
            answerQuestion(screen.id, selected);
            nextScreen();
        }
    };

    // Gerar array de valores da escala
    const scaleValues = Array.from(
        { length: screen.scaleMax - screen.scaleMin + 1 },
        (_, i) => screen.scaleMin + i
    );

    return (
        <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
            <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
                <motion.div
                    className="text-center mb-10"
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

                {/* Scale Labels */}
                {(screen.minLabel || screen.maxLabel) && (
                    <motion.div
                        className="flex justify-between w-full max-w-md mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="text-sm text-muted-foreground">{screen.minLabel}</span>
                        <span className="text-sm text-muted-foreground">{screen.maxLabel}</span>
                    </motion.div>
                )}

                {/* Scale Buttons */}
                <motion.div
                    className="flex gap-2 md:gap-3 flex-wrap justify-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {scaleValues.map((value, index) => {
                        const isSelected = selected === value;

                        return (
                            <motion.button
                                key={value}
                                onClick={() => handleSelect(value)}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    'w-12 h-12 md:w-14 md:h-14 rounded-xl font-bold text-lg md:text-xl transition-all duration-200',
                                    'border-2 flex items-center justify-center',
                                    isSelected
                                        ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30'
                                        : 'bg-muted/30 text-muted-foreground border-white/10 hover:border-white/30 hover:bg-muted/50'
                                )}
                                data-testid={`scale-button-${value}`}
                            >
                                {screen.showNumbers !== false && value}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Selected Value Feedback */}
                <AnimatePresence>
                    {selected !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center mb-8"
                        >
                            <span className="text-4xl font-bold text-primary">{selected}</span>
                            <span className="text-muted-foreground ml-2">
                                de {screen.scaleMax}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Continue Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                >
                    <Button
                        variant="shiny"
                        size="lg"
                        onClick={handleContinue}
                        disabled={selected === null}
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
