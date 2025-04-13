import { NavigationButton } from './NavigationButton';

interface WizardNavigationProps {
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  onNextClick: () => void;
  onPreviousClick: () => void;
  isCurrentQuestionValid: boolean;
}

export const WizardNavigation = ({
  isFirstQuestion,
  isLastQuestion,
  onNextClick,
  onPreviousClick,
  isCurrentQuestionValid,
}: WizardNavigationProps) => {
  return (
    <nav className="flex items-center justify-center min-h-[2.5rem] sm:min-h-[3rem]">
      <div className="flex gap-2 sm:gap-4 w-full sm:min-w-[16rem] justify-center">
        <NavigationButton
          variant="previous"
          onClick={onPreviousClick}
          isVisible={!isFirstQuestion}
        />
        <NavigationButton
          variant={isLastQuestion ? 'complete' : 'next'}
          onClick={onNextClick}
          disabled={!isCurrentQuestionValid}
          isValid={isCurrentQuestionValid}
        />
      </div>
    </nav>
  );
};
