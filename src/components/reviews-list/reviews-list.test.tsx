import { render, screen } from '@testing-library/react';
import { makeFakeReviews } from '../../mock/mock';
import ReviewsList from './reviews-list';
import { withStore, withHistory } from '../../mock/mock-components';

describe('Component: ReviewsList', () => {
  const fakeReviews = makeFakeReviews();
  const initialState = {
    REVIEWS: {
      reviews: fakeReviews.slice(0, 2),
      reviewSentSuccessfully: false,
      isReviewSending: false,
      hasReviewSendingError: false,
      isReviewSentSuccessfully: false,
    },
  };

  const { withStoreComponent } = withStore(<ReviewsList id={1} />, initialState);
  const componentWithHistory = withHistory(withStoreComponent);

  it('should render reviews list', () => {

    render(componentWithHistory);

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText(fakeReviews[0].review)).toBeInTheDocument();
    expect(screen.getByText(fakeReviews[1].review)).toBeInTheDocument();
  });
});
