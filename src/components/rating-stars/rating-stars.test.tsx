import { render, screen } from '@testing-library/react';
import RatingStars from './rating-stars';
describe('Component: Star Rating', () => {
  it('should render correctly', () => {
    const expectedCount = 5;
    const starItemTestId = 'star-item';

    render(<RatingStars rating={expectedCount} />);
    const starItem = screen.getAllByTestId(starItemTestId);

    expect(starItem.length).toBe(expectedCount);
  });
});
