import { ValidationRuleValue } from '../util/validation';

export interface GenericWizardQuestion {
  id: string;
  title: string;
  text: string;
  answer: string;
  validationRules?: ValidationRuleValue[];
}
