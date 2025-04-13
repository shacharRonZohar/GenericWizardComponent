import { GenericWizardQuestion } from '../types/GenericWizard';
import { VALIDATION_RULES } from './validation';

export const mockQuestions = [
  {
    id: '1',
    title: 'Personal Information',
    text: 'What is your name?',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY, VALIDATION_RULES.MIN_LENGTH],
  },
  {
    id: '2',
    title: 'Age Verification',
    text: 'Are you over 18 years old? (yes/no)',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY],
  },
  {
    id: '3',
    title: 'Parental Information',
    text: 'Please provide your parent/guardian name',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY, VALIDATION_RULES.MIN_LENGTH],
    skipCondition: {
      dependsOn: '2',
      condition: answer => answer.toLowerCase() === 'yes',
    },
  },
  {
    id: '4',
    title: 'Contact Details',
    text: 'What is your email address?',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY],
  },
  {
    id: '5',
    title: 'Communication Preferences',
    text: 'Would you like to receive marketing emails? (yes/no)',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY],
  },
  {
    id: '6',
    title: 'Marketing Preferences',
    text: 'What type of marketing content interests you? (comma-separated)',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY],
    skipCondition: {
      dependsOn: '5',
      condition: answer => answer.toLowerCase() === 'no',
    },
  },
  {
    id: '7',
    title: 'Account Security',
    text: 'Create a password (minimum 8 characters)',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY, VALIDATION_RULES.MIN_LENGTH],
  },
  {
    id: '8',
    title: 'Account Type',
    text: 'Are you creating a personal or business account?',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY],
  },
  {
    id: '9',
    title: 'Business Details',
    text: 'Please provide your business name',
    answer: '',
    validationRules: [VALIDATION_RULES.NON_EMPTY],
    skipCondition: {
      dependsOn: '8',
      condition: answer => answer.toLowerCase().includes('business'),
    },
  },
] satisfies GenericWizardQuestion[];
