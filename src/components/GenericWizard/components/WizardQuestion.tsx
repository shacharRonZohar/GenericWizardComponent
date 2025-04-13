import { WizardQuestionProps } from '../types';
import { WizardInput } from './WizardInput';

/**
 * WizardQuestion component displays a single question in the wizard flow.
 * It shows the question title, text and provides an input field for the answer.
 *
 * @component
 * @example
 * ```tsx
 * <WizardQuestion
 *   question={{
 *     title: "Personal Information",
 *     text: "What's your name?",
 *     validation: { type: 'minLength', value: 3 }
 *   }}
 *   answer="John"
 *   onAnswerChange={(answer) => console.log(answer)}
 * />
 * ```
 */
export const WizardQuestion = ({ question, answer, onAnswerChange }: WizardQuestionProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4 max-w-2xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 leading-tight">
          {question.title}
        </h1>
        <h2 className="text-xl sm:text-2xl font-medium text-gray-600">{question.text}</h2>
      </div>
      <div className="w-full max-w-md">
        <WizardInput value={answer} onChange={onAnswerChange} />
      </div>
    </div>
  );
};
