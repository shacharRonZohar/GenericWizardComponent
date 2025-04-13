import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GenericWizard } from './GenericWizard';
import { mockQuestions } from '../../util/mockData';

describe('GenericWizard', () => {
  it('renders the first question correctly', () => {
    const onComplete = vi.fn();
    render(<GenericWizard initialQuestions={mockQuestions} onComplete={onComplete} />);

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('What is your name?')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('disables Next button when input is invalid', () => {
    const onComplete = vi.fn();
    render(<GenericWizard initialQuestions={mockQuestions} onComplete={onComplete} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('enables Next button when input is valid', async () => {
    const onComplete = vi.fn();
    render(<GenericWizard initialQuestions={mockQuestions} onComplete={onComplete} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'John Doe' } });

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).not.toBeDisabled();
  });

  it('navigates to next question when Next is clicked', async () => {
    const onComplete = vi.fn();
    render(<GenericWizard initialQuestions={mockQuestions} onComplete={onComplete} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'John Doe' } });

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Age Verification')).toBeInTheDocument();
    });
  });

  it('skips questions based on conditions', async () => {
    const onComplete = vi.fn();
    render(<GenericWizard initialQuestions={mockQuestions} onComplete={onComplete} />);

    // Answer first question
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    // Answer age question with "yes"
    const ageInput = screen.getByRole('textbox');
    fireEvent.change(ageInput, { target: { value: 'yes' } });
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    // Should skip parental information and go to contact details
    await waitFor(() => {
      expect(screen.getByText('Contact Details')).toBeInTheDocument();
    });
  });

  it('shows Done button on last question', async () => {
    const onComplete = vi.fn();
    render(<GenericWizard initialQuestions={mockQuestions} onComplete={onComplete} />);

    // Navigate to last question
    for (let i = 0; i < mockQuestions.length - 1; i++) {
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
    }

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /complete/i })).toBeInTheDocument();
    });
  });
});
