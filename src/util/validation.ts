import { GenericWizardQuestion } from '../types/GenericWizard';

const minLength = 3;
const maxLength = 10;

export const VALIDATION_RULES = {
  NON_EMPTY: (value: string) => value.trim() !== '',
  MIN_LENGTH: (value: string) => value.length >= minLength,
  MAX_LENGTH: (value: string) => value.length <= maxLength,
} as const;

export type ValidationRule = keyof typeof VALIDATION_RULES;
export type ValidationRuleValue = (typeof VALIDATION_RULES)[ValidationRule];

export const validateQuestion = (question: GenericWizardQuestion, answer: string) => {
  const { validationRules } = question;
  if (!validationRules) return true;
  return validationRules.every(rule => rule(answer));
};
