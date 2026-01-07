import { useState } from 'react';
import { motion } from 'framer-motion';
import type { EmailCaptureScreen as EmailCaptureScreenType } from '@/types/quiz';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Check, ChevronRight, Lock, Quote, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';

interface Props {
  screen: EmailCaptureScreenType;
}

export function EmailCaptureScreen({ screen }: Props) {
  const { setEmail, nextScreen, quizConfig, answers } = useQuizStore();
  const [emailValue, setEmailValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(emailValue)) {
      setError('Por favor, insira um email válido');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/leads', {
        email: emailValue,
        quizId: quizConfig?.id || 'unknown',
        answers: answers,
      });
      
      setEmail(emailValue);
      nextScreen();
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError('Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm text-primary w-fit mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Exclusivo Para Você</span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
              data-testid="text-headline"
            >
              {screen.headline}
            </h2>

            {screen.subtitle && (
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-subtitle">
                {screen.subtitle}
              </p>
            )}

            {screen.benefits && screen.benefits.length > 0 && (
              <ul className="space-y-3 mb-8">
                {screen.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            )}

            {screen.testimonial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Card className="p-4 bg-muted/50">
                  <div className="flex gap-3">
                    <Quote className="w-8 h-8 text-primary/30 flex-shrink-0" />
                    <div>
                      <p className="text-sm italic text-muted-foreground mb-2">
                        "{screen.testimonial.quote}"
                      </p>
                      <p className="text-sm font-medium">— {screen.testimonial.author}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="w-full max-w-md p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Seu melhor email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className={cn(
                      'h-14 text-lg bg-white/5 border-white/20 focus:border-primary',
                      error && 'border-destructive focus-visible:ring-destructive'
                    )}
                    data-testid="input-email"
                  />
                  {error && (
                    <motion.p
                      className="text-sm text-destructive"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="shiny"
                  size="lg"
                  className="w-full h-14 text-base font-medium gap-2"
                  disabled={isSubmitting}
                  data-testid="button-submit"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Enviando...</span>
                    </>
                  ) : (
                    <>
                      {screen.ctaText}
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </Button>

                {screen.privacyText && (
                  <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    {screen.privacyText}
                  </p>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
