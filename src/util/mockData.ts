import { GenericWizardQuestion } from '../types/GenericWizard';
import { VALIDATION_RULES } from './validation';

export const mockQuestions = [
  {
    id: '1',
    title: 'What is your name?',
    text: 'Please enter your name',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY],
  },
  {
    id: '2',
    title: 'What is your age?',
    text: 'Please enter your age',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY],
  },
  {
    id: '3',
    title: 'What is your email?',
    text: 'Please enter your email',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY],
  },
] satisfies GenericWizardQuestion[];
