import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { InputScreen as InputScreenType } from '@/types/quiz';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight } from 'lucide-react';

interface Props {
  screen: InputScreenType;
}

export function InputScreen({ screen }: Props) {
  const { answerQuestion, nextScreen, answers } = useQuizStore();
  const existingAnswer = answers[screen.id];
  
  const [value, setValue] = useState(
    existingAnswer ? String(existingAnswer.value) : ''
  );
  const [error, setError] = useState('');

  useEffect(() => {
    if (existingAnswer) {
      setValue(String(existingAnswer.value));
    } else {
      setValue('');
    }
  }, [screen.id, existingAnswer]);

  const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    if (screen.inputType === 'tel') {
      newValue = formatPhoneNumber(newValue);
    }
    
    setValue(newValue);
    setError('');
  };

  const validate = (): boolean => {
    const validation = screen.validation || {};
    
    if (validation.required !== false && !value.trim()) {
      setError('Este campo é obrigatório');
      return false;
    }

    if (screen.inputType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError('Por favor, insira um email válido');
        return false;
      }
    }

    if (screen.inputType === 'number') {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        setError('Por favor, insira um número válido');
        return false;
      }
      if (validation.min !== undefined && numValue < validation.min) {
        setError(`O valor mínimo é ${validation.min}`);
        return false;
      }
      if (validation.max !== undefined && numValue > validation.max) {
        setError(`O valor máximo é ${validation.max}`);
        return false;
      }
    }

    if (validation.minLength && value.length < validation.minLength) {
      setError(`Mínimo de ${validation.minLength} caracteres`);
      return false;
    }

    if (validation.maxLength && value.length > validation.maxLength) {
      setError(`Máximo de ${validation.maxLength} caracteres`);
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (validate()) {
      answerQuestion(screen.id, value);
      nextScreen();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContinue();
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full">
        <motion.div
          className="text-center mb-8 w-full"
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
          className="w-full mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Input
            type={screen.inputType === 'tel' ? 'text' : screen.inputType}
            inputMode={
              screen.inputType === 'number' ? 'numeric' :
              screen.inputType === 'tel' ? 'tel' :
              screen.inputType === 'email' ? 'email' : 'text'
            }
            placeholder={screen.placeholder || ''}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="text-center text-xl py-6 h-auto"
            data-testid="input-value"
            autoFocus
          />
          {error && (
            <motion.p
              className="text-destructive text-sm mt-2 text-center"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              data-testid="text-error"
            >
              {error}
            </motion.p>
          )}
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
            className="px-8 py-6 text-lg rounded-full gap-2 group"
            data-testid="button-continue"
          >
            {screen.ctaText || 'Continuar'}
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
