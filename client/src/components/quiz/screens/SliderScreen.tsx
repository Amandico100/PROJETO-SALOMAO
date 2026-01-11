import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { SliderScreen as SliderScreenType } from '@/types/quiz';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    screen: SliderScreenType;
}

export function SliderScreen({ screen }: Props) {
    const { answerQuestion, nextScreen, answers } = useQuizStore();
    const existingAnswer = answers[screen.id];

    const defaultValue = screen.defaultValue ?? Math.floor((screen.min + screen.max) / 2);

    const [value, setValue] = useState<number>(
        existingAnswer ? (existingAnswer.value as number) : defaultValue
    );
    const [hasInteracted, setHasInteracted] = useState(!!existingAnswer);

    useEffect(() => {
        if (existingAnswer) {
            setValue(existingAnswer.value as number);
            setHasInteracted(true);
        } else {
            setValue(defaultValue);
            setHasInteracted(false);
        }
    }, [screen.id, existingAnswer, defaultValue]);

    const handleChange = (newValue: number[]) => {
        setValue(newValue[0]);
        setHasInteracted(true);
    };

    const handleContinue = () => {
        answerQuestion(screen.id, value);
        nextScreen();
    };

    // Formatar o valor com unidade
    const formattedValue = screen.unit
        ? `${value}${screen.unit}`
        : value.toString();

    // Calcular porcentagem para a cor do slider
    const percentage = ((value - screen.min) / (screen.max - screen.min)) * 100;

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

                {/* Value Display */}
                {screen.showValue !== false && (
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.span
                            key={value}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                        >
                            {formattedValue}
                        </motion.span>
                    </motion.div>
                )}

                {/* Slider Container */}
                <motion.div
                    className="w-full max-w-md mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {/* Progress Background */}
                    <div className="relative h-3 mb-6">
                        <div className="absolute inset-0 rounded-full bg-muted/30" />
                        <motion.div
                            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-primary/80"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        />
                    </div>

                    {/* Slider */}
                    <Slider
                        value={[value]}
                        onValueChange={handleChange}
                        min={screen.min}
                        max={screen.max}
                        step={screen.step ?? 1}
                        className="cursor-pointer"
                        data-testid="slider-input"
                    />

                    {/* Labels */}
                    <div className="flex justify-between mt-4">
                        <span className="text-sm text-muted-foreground">
                            {screen.minLabel ?? `${screen.min}${screen.unit ?? ''}`}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {screen.maxLabel ?? `${screen.max}${screen.unit ?? ''}`}
                        </span>
                    </div>
                </motion.div>

                {/* Quick Select Buttons (optional, for common values) */}
                <motion.div
                    className="flex gap-2 flex-wrap justify-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {[25, 50, 75].map((pct) => {
                        const quickValue = Math.round(screen.min + (screen.max - screen.min) * (pct / 100));
                        const isSelected = value === quickValue;
                        return (
                            <button
                                key={pct}
                                onClick={() => {
                                    setValue(quickValue);
                                    setHasInteracted(true);
                                }}
                                className={cn(
                                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                                    isSelected
                                        ? 'bg-primary/20 text-primary border border-primary/50'
                                        : 'bg-muted/20 text-muted-foreground border border-white/5 hover:border-white/20'
                                )}
                            >
                                {quickValue}{screen.unit ?? ''}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Continue Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                >
                    <Button
                        variant="shiny"
                        size="lg"
                        onClick={handleContinue}
                        disabled={!hasInteracted}
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
