import { GenericWizardQuestion } from '../../types/GenericWizard';
import { useQuestionManager } from './hooks/useQuestionManager';

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
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <WizardNavigation
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        onNextClick={handleNextQuestion}
        onPreviousClick={handlePreviousQuestion}
        isCurrentQuestionValid={isCurrentQuestionValid}
      />
      <WizardQuestion
        question={questions[currentQuestionIndex]}
        answer={currentAnswer}
        onAnswerChange={answer => setCurrentAnswer(answer)}
      />
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
  return (
    <nav className="flex items-center justify-center">
      {!isFirstQuestion && <button onClick={onPreviousClick}>Previous</button>}
      {
        <button onClick={onNextClick} disabled={!isCurrentQuestionValid}>
          {isLastQuestion ? 'Done' : 'Next'}
        </button>
      }
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
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">{question.text}</h2>
      <input type="text" value={answer} onChange={e => onAnswerChange(e.target.value)} />
    </div>
  );
};
