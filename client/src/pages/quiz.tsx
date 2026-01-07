import { useEffect, useState } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { QuizRenderer } from '@/components/quiz/QuizRenderer';
import { exampleQuiz } from '@/data/example-quiz';

export default function QuizPage() {
  const { quizConfig, currentScreenId, history } = useQuizStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const store = useQuizStore.getState();
    
    if (!store.quizConfig) {
      if (store.currentScreenId && store.history.length > 0) {
        useQuizStore.setState({
          quizConfig: exampleQuiz,
        });
      } else {
        store.setQuizConfig(exampleQuiz);
      }
    }
    
    setIsReady(true);
  }, []);

  if (!isReady || !quizConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Carregando quiz...</div>
      </div>
    );
  }

  return <QuizRenderer />;
}
