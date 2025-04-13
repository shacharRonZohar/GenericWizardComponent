import { GenericWizardQuestion } from '../../types/GenericWizard';
import { useQuestionManager } from './hooks/useQuestionManager';
import { twMerge } from 'tailwind-merge';

interface GenericWizardProps {
  initialQuestions: GenericWizardQuestion[];
  onComplete: (questions: GenericWizardQuestion[]) => void;
  startingQuestionIndex?: number;
}

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
        <div className="flex justify-center mb-2 sm:mb-4">
          <div className="flex space-x-1 sm:space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={twMerge(
                  'w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300',
                  index === currentQuestionIndex ? 'bg-indigo-600 scale-125' : 'bg-gray-300'
                )}
              />
            ))}
          </div>
        </div>
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

interface WizardNavigationProps {
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  onNextClick: () => void;
  onPreviousClick: () => void;
  isCurrentQuestionValid: boolean;
}

const WizardNavigation = ({
  isFirstQuestion,
  isLastQuestion,
  onNextClick,
  onPreviousClick,
  isCurrentQuestionValid,
}: WizardNavigationProps) => {
  const baseButtonClasses =
    'min-w-[5rem] sm:min-w-[6rem] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap text-sm sm:text-base';

  const previousButtonClasses = twMerge(
    baseButtonClasses,
    'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-indigo-500',
    isFirstQuestion ? 'invisible' : 'visible'
  );

  const nextButtonClasses = twMerge(
    baseButtonClasses,
    isCurrentQuestionValid
      ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
  );

  return (
    <nav className="flex items-center justify-center min-h-[2.5rem] sm:min-h-[3rem]">
      <div className="flex gap-2 sm:gap-4 w-full sm:min-w-[16rem] justify-center">
        <button onClick={onPreviousClick} className={previousButtonClasses}>
          Previous
        </button>
        <button
          onClick={onNextClick}
          disabled={!isCurrentQuestionValid}
          className={nextButtonClasses}
        >
          {isLastQuestion ? 'Complete' : 'Next'}
        </button>
      </div>
    </nav>
  );
};

interface WizardQuestionProps {
  question: GenericWizardQuestion;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

const WizardQuestion = ({ question, answer, onAnswerChange }: WizardQuestionProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-3xl font-bold text-gray-800 text-center px-2">
        {question.text}
      </h2>
      <input
        type="text"
        value={answer}
        onChange={e => onAnswerChange(e.target.value)}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors duration-200"
        placeholder="Type your answer here..."
      />
    </div>
  );
};
