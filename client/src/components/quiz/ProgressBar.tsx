import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/quizStore';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProgressBar() {
  const { getProgress, prevScreen, history, getCurrentScreen } = useQuizStore();
  const { current, total, percentage } = getProgress();
  const currentScreen = getCurrentScreen();

  const canGoBack = history.length > 1 && currentScreen?.type !== 'welcome' && currentScreen?.type !== 'loading_calculated';

  if (currentScreen?.type === 'welcome') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 mt-4 pt-2 bg-background/60 backdrop-blur-md">
      <div className="h-1 mx-6 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          data-testid="progress-bar-fill"
        />
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="w-20">
          {canGoBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={prevScreen}
              className="gap-1"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar</span>
            </Button>
          )}
        </div>
        <span className="text-xs font-medium text-muted-foreground" data-testid="text-progress">
          {current} de {total}
        </span>
        <div className="w-20" />
      </div>
    </div>
  );
}
