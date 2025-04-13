import { twMerge } from 'tailwind-merge';
import { ProgressIndicatorProps } from '../types';

/**
 * ProgressIndicator component displays a visual representation of progress
 * through the wizard questions using dots. The current question is highlighted.
 *
 * @component
 * @example
 * ```tsx
 * <ProgressIndicator
 *   totalQuestions={5}
 *   currentIndex={2}
 * />
 * ```
 */
export const ProgressIndicator = ({ totalQuestions, currentIndex }: ProgressIndicatorProps) => {
  return (
    <div className="flex justify-center mb-2 sm:mb-4">
      <div className="flex space-x-1 sm:space-x-2">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div
            key={index}
            className={twMerge(
              'w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300',
              index === currentIndex ? 'bg-indigo-600 scale-125' : 'bg-gray-300'
            )}
          />
        ))}
      </div>
    </div>
  );
};
