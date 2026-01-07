import { motion } from 'framer-motion';
import type { WelcomeScreen as WelcomeScreenType } from '@/types/quiz';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles } from 'lucide-react';

interface Props {
  screen: WelcomeScreenType;
}

export function WelcomeScreen({ screen }: Props) {
  const { nextScreen, quizConfig } = useQuizStore();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{
        background: screen.backgroundGradient || 'transparent',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-secondary/5 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        className="max-w-2xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {quizConfig?.globalSettings.logo && (
          <motion.img
            src={quizConfig.globalSettings.logo}
            alt="Logo"
            className="h-12 mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        )}

        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Quiz Personalizado</span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          style={{ fontFamily: 'Outfit, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          data-testid="text-headline"
        >
          {screen.headline}
        </motion.h1>

        {screen.subtitle && (
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            data-testid="text-subtitle"
          >
            {screen.subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            size="lg"
            onClick={nextScreen}
            className="px-8 py-6 text-lg rounded-full gap-2 group"
            data-testid="button-start"
          >
            {screen.ctaText}
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Leva apenas 2 minutos
        </motion.p>
      </motion.div>
    </div>
  );
}
