import { render, screen, fireEvent } from '@testing-library/react';
import ButtonShowMoreReviews from './button-show-more-reviews';

describe('Component: ButtonShowMoreReviews', () => {
  it('should render button with text "Показать больше отзывов"', () => {
    const handleClick = () => {/* Intentionally empty for testing */};
    render(<ButtonShowMoreReviews onClick={handleClick} />);
    expect(screen.getByText('Показать больше отзывов')).toBeInTheDocument();
  });

  it('should trigger onClick handler when button is clicked', () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };
    render(<ButtonShowMoreReviews onClick={handleClick} />);
    fireEvent.click(screen.getByText('Показать больше отзывов'));
    expect(clicked).toBe(true);
  });
});

