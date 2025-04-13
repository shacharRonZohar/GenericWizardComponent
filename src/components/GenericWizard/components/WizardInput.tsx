import { twMerge } from 'tailwind-merge';

interface WizardInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const WizardInput = ({
  value,
  onChange,
  placeholder = 'Type your answer here...',
  className,
}: WizardInputProps) => {
  const baseClasses =
    'w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors duration-200';

  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={twMerge(baseClasses, className)}
    />
  );
};
