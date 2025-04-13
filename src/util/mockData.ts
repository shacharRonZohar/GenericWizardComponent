import { GenericWizardQuestion } from '../types/GenericWizard';
import { VALIDATION_RULES } from './validation';

export const mockQuestions = [
  {
    id: '1',
    title: 'What is your name?',
    text: 'Please enter your name',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY, VALIDATION_RULES.MIN_LENGTH],
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
    title: 'What is your favorite color?',
    text: 'Please enter your favorite color',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY, VALIDATION_RULES.MAX_LENGTH],
  },
] satisfies GenericWizardQuestion[];
