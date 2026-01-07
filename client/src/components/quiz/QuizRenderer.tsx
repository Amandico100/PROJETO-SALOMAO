import { AnimatePresence, motion } from 'framer-motion';
import { useQuizStore } from '@/store/quizStore';
import { ProgressBar } from './ProgressBar';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { MultiSelectScreen } from './screens/MultiSelectScreen';
import { ImageSelectScreen } from './screens/ImageSelectScreen';
import { InfoInterstitialScreen } from './screens/InfoInterstitialScreen';
import { LoadingCalculatedScreen } from './screens/LoadingCalculatedScreen';
import { EmailCaptureScreen } from './screens/EmailCaptureScreen';
import { VSLSalesScreen } from './screens/VSLSalesScreen';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const slideTransition = {
  x: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

export function QuizRenderer() {
  const { getCurrentScreen, history } = useQuizStore();
  const currentScreen = getCurrentScreen();

  if (!currentScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No quiz loaded</p>
      </div>
    );
  }

  const direction = 1;

  const renderScreen = () => {
    switch (currentScreen.type) {
      case 'welcome':
        return <WelcomeScreen screen={currentScreen} />;
      case 'multi_select':
        return <MultiSelectScreen screen={currentScreen} />;
      case 'image_select':
        return <ImageSelectScreen screen={currentScreen} />;
      case 'info_interstitial':
        return <InfoInterstitialScreen screen={currentScreen} />;
      case 'loading_calculated':
        return <LoadingCalculatedScreen screen={currentScreen} />;
      case 'email_capture':
        return <EmailCaptureScreen screen={currentScreen} />;
      case 'vsl_sales':
        return <VSLSalesScreen screen={currentScreen} />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-muted-foreground">Unknown screen type</p>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <ProgressBar />
      
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentScreen.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          className="w-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
