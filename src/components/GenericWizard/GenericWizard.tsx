import { GenericWizardQuestion } from '../../types/GenericWizard';
import { useQuestionManager } from './hooks/useQuestionManager';
import { ProgressIndicator } from './components/ProgressIndicator';
import { WizardNavigation } from './components/WizardNavigation';
import { WizardQuestion } from './components/WizardQuestion';
import { GenericWizardProps } from './types';

/**
 * GenericWizard is a flexible wizard component that guides users through a series of questions.
 * It manages the question flow, navigation, and state management internally.
 *
 * @component
 * @example
 * ```tsx
 * const questions = [
 *   { text: "What's your name?" },
 *   { text: "What's your email?" }
 * ];
 *
 * <GenericWizard
 *   initialQuestions={questions}
 *   onComplete={(answers) => console.log(answers)}
 * />
 * ```
 */
export const GenericWizard = ({
  initialQuestions,
  onComplete,
  startingQuestionIndex = 0,
}: GenericWizardProps) => {
  const {
    questions,
    currentQuestionIndex,
    currentAnswer,
    isFirstQuestion,
    isLastQuestion,
    setCurrentAnswer,
    handleNextQuestion,
    handlePreviousQuestion,
    isCurrentQuestionValid,
  } = useQuestionManager({
    initialQuestions,
    onComplete,
    startingQuestionIndex,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-2xl shadow-xl p-4 sm:p-8 space-y-6 sm:space-y-8 transform transition-all duration-300 hover:shadow-2xl">
        <ProgressIndicator totalQuestions={questions.length} currentIndex={currentQuestionIndex} />
        <WizardQuestion
          question={questions[currentQuestionIndex]}
          answer={currentAnswer}
          onAnswerChange={answer => setCurrentAnswer(answer)}
        />
        <WizardNavigation
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastQuestion}
          onNextClick={handleNextQuestion}
          onPreviousClick={handlePreviousQuestion}
          isCurrentQuestionValid={isCurrentQuestionValid}
        />
      </div>
    </div>
  );
};
