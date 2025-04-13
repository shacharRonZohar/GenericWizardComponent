import { useCallback, useEffect, useState } from 'react';
import { GenericWizardQuestion } from '../../../types/GenericWizard';

interface UseQuestionManagerParams {
  initialQuestions: GenericWizardQuestion[];
  onComplete: (questions: GenericWizardQuestion[]) => void;
  startingQuestionIndex?: number;
}

export const useQuestionManager = ({
  initialQuestions,
  onComplete,
  startingQuestionIndex = 0,
}: UseQuestionManagerParams) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(startingQuestionIndex);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerConfirmed = (questionId: string, answer: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => (q.id === questionId ? { ...q, answer } : q))
    );
  };

  const handleNextQuestion = () => {
    handleAnswerConfirmed(currentQuestion.id, currentAnswer);

    if (isLastQuestion) {
      handleComplete();
      return;
    }
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (isFirstQuestion) return;

    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    handleCurrentQuestionChange();
  };

  const handleCurrentQuestionChange = useCallback(() => {
    setCurrentAnswer(currentQuestion.answer || '');
  }, [currentQuestion]);

  const handleComplete = () => {
    onComplete(questions);
  };

  useEffect(() => {
    handleCurrentQuestionChange();
  }, [currentQuestionIndex, handleCurrentQuestionChange]);

  return {
    questions,
    currentQuestionIndex,
    currentAnswer,
    isFirstQuestion,
    isLastQuestion,
    setCurrentAnswer,
    handleAnswerConfirmed,
    handleNextQuestion,
    handlePreviousQuestion,
  };
};
