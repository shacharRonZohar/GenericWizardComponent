import { twMerge } from 'tailwind-merge';
import { NavigationButtonProps } from '../types';

const baseButtonClasses =
  'min-w-[5rem] sm:min-w-[6rem] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap text-sm sm:text-base';

/**
 * NavigationButton component provides styled buttons for wizard navigation.
 * It supports different variants (previous, next, complete) and states (disabled, visible, valid).
 *
 * @component
 * @example
 * ```tsx
 * <NavigationButton
 *   variant="next"
 *   onClick={() => console.log('Next clicked')}
 *   isValid={true}
 * />
 * ```
 */
export const NavigationButton = ({
  onClick,
  disabled = false,
  variant,
  isVisible = true,
  isValid = true,
}: NavigationButtonProps) => {
  const getButtonClasses = () => {
    switch (variant) {
      case 'previous':
        return twMerge(
          baseButtonClasses,
          'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-indigo-500',
          !isVisible && 'invisible'
        );
      case 'next':
      case 'complete':
        return twMerge(
          baseButtonClasses,
          isValid
            ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        );
    }
  };

  const getButtonText = () => {
    switch (variant) {
      case 'previous':
        return 'Previous';
      case 'next':
        return 'Next';
      case 'complete':
        return 'Complete';
    }
  };

  return (
    <button onClick={onClick} disabled={disabled} className={getButtonClasses()}>
      {getButtonText()}
    </button>
  );
};
