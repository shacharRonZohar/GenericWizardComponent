import { ValidationRuleValue } from '../util/validation';

export interface SkipCondition {
  dependsOn: string;
  condition: (answer: string) => boolean;
}

export interface GenericWizardQuestion {
  id: string;
  title: string;
  text: string;
  answer: string;
  validationRules?: ValidationRuleValue[];
  skipCondition?: SkipCondition;
}
