import { GenericWizardQuestion } from '../../types/GenericWizard';

export interface ProgressIndicatorProps {
  totalQuestions: number;
  currentIndex: number;
}

export interface NavigationButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant: 'previous' | 'next' | 'complete';
  isVisible?: boolean;
  isValid?: boolean;
}

export interface WizardNavigationProps {
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  onNextClick: () => void;
  onPreviousClick: () => void;
  isCurrentQuestionValid: boolean;
}

export interface WizardQuestionProps {
  question: GenericWizardQuestion;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

export interface GenericWizardProps {
  initialQuestions: GenericWizardQuestion[];
  onComplete: (questions: GenericWizardQuestion[]) => void;
  startingQuestionIndex?: number;
}
