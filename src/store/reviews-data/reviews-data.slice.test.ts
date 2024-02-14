import { reviewsData, resetReviewSentSuccess } from './reviews-data.slice';
import { fetchReviewsAction, fetchSendReviewAction } from '../api-actions';
import { makeFakeReviews } from '../../mock/mock';

describe('reviews data slice', () => {
  const initialState = {
    reviews: [],
    isReviewSending: false,
    hasReviewSendingError: false,
    isReviewSentSuccessfully: false
  };

  it('should return the initial state on first run', () => {
    const result = reviewsData.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle "fetchReviewsAction.fulfilled" action', () => {
    const reviews = makeFakeReviews();
    const action = fetchReviewsAction.fulfilled(reviews, '', '');
    const expectedState = {
      ...initialState,
      reviews: reviews
    };
    const result = reviewsData.reducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should handle "fetchSendReviewAction.pending" action', () => {
    const action = fetchSendReviewAction.pending;
    const expectedState = {
      ...initialState,
      hasReviewSendingError: false,
      isReviewSending: true,
      isReviewSentSuccessfully: false
    };
    const result = reviewsData.reducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should handle "fetchSendReviewAction.fulfilled" action', () => {
    const action = fetchSendReviewAction.fulfilled;
    const expectedState = {
      ...initialState,
      hasReviewSendingError: false,
      isReviewSending: false,
      isReviewSentSuccessfully: true
    };
    const result = reviewsData.reducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should handle "fetchSendReviewAction.rejected" action', () => {
    const action = fetchSendReviewAction.rejected;
    const expectedState = {
      ...initialState,
      hasReviewSendingError: true,
      isReviewSending: false,
      isReviewSentSuccessfully: false
    };
    const result = reviewsData.reducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should handle "resetReviewSentSuccess" action', () => {
    const action = resetReviewSentSuccess();
    const modifiedState = {
      ...initialState,
      isReviewSentSuccessfully: true
    };
    const expectedState = {
      ...initialState,
      isReviewSentSuccessfully: false
    };
    const result = reviewsData.reducer(modifiedState, action);
    expect(result).toEqual(expectedState);
  });
});
