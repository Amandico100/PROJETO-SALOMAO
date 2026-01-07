import { motion } from 'framer-motion';
import type { InfoInterstitialScreen as InfoInterstitialScreenType } from '@/types/quiz';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface Props {
  screen: InfoInterstitialScreenType;
}

export function InfoInterstitialScreen({ screen }: Props) {
  const { nextScreen } = useQuizStore();

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as Record<string, React.FC<{ className?: string }>>)[iconName];
    return IconComponent ? <IconComponent className="w-16 h-16" /> : null;
  };

  return (
    <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {screen.icon && (
            <motion.div
              className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: 0.2,
              }}
            >
              {getIcon(screen.icon)}
            </motion.div>
          )}

          <motion.h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'Outfit, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            data-testid="text-headline"
          >
            {screen.headline}
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            data-testid="text-body"
          >
            {screen.body}
          </motion.p>

          {screen.fact && (
            <motion.p
              className="text-sm text-muted-foreground/70 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              data-testid="text-fact"
            >
              {screen.fact}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="pt-4"
          >
            <Button
              size="lg"
              onClick={nextScreen}
              className="px-8 py-6 text-lg rounded-full gap-2 group"
              data-testid="button-continue"
            >
              {screen.ctaText}
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
