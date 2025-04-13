import { useCallback, useEffect, useState } from 'react';
import { GenericWizardQuestion } from '../../../types/GenericWizard';
import { validateQuestion } from '../../../util/validation';

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

  const isCurrentQuestionValid = validateQuestion(currentQuestion, currentAnswer);

  const shouldSkipQuestion = useCallback(
    (question: GenericWizardQuestion, questionsList: GenericWizardQuestion[]) => {
      if (!question.skipCondition) return false;

      const { dependsOn, condition } = question.skipCondition;
      const dependentQuestion = questionsList.find(q => q.id === dependsOn);

      if (!dependentQuestion) return false;

      return condition(dependentQuestion.answer || '');
    },
    []
  );

  const handleAnswerConfirmed = (questionId: string, answer: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => (q.id === questionId ? { ...q, answer } : q))
    );
  };

  const handleNextQuestion = () => {
    if (!isCurrentQuestionValid) {
      return;
    }

    // Create updated questions list with current answer
    const updatedQuestions = questions.map(q =>
      q.id === currentQuestion.id ? { ...q, answer: currentAnswer } : q
    );

    if (isLastQuestion) {
      handleComplete();
      return;
    }

    // Find the next non-skipped question using the updated questions list
    let nextIndex = currentQuestionIndex + 1;
    while (
      nextIndex < updatedQuestions.length &&
      shouldSkipQuestion(updatedQuestions[nextIndex], updatedQuestions)
    ) {
      nextIndex++;
    }

    if (nextIndex < updatedQuestions.length) {
      setQuestions(updatedQuestions);
      setCurrentQuestionIndex(nextIndex);
    } else {
      handleComplete();
    }
  };

  const handlePreviousQuestion = () => {
    if (isFirstQuestion) return;

    // Find the previous non-skipped question
    let prevIndex = currentQuestionIndex - 1;
    while (prevIndex >= 0 && shouldSkipQuestion(questions[prevIndex], questions)) {
      prevIndex--;
    }

    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
      handleCurrentQuestionChange();
    }
  };

  const handleCurrentQuestionChange = useCallback(() => {
    setCurrentAnswer(currentQuestion.answer || '');
  }, [currentQuestion]);

  const handleChangeCurrentAnswer = useCallback((answer: string) => {
    setCurrentAnswer(answer.trim().toLowerCase());
  }, []);

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
    isCurrentQuestionValid,
    handleChangeCurrentAnswer,
    handleAnswerConfirmed,
    handleNextQuestion,
    handlePreviousQuestion,
  };
};
