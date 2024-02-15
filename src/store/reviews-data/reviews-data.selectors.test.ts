import { getReviews, getReviewSendingStatus, getReviewSendingErrorStatus, getReviewSentSuccessfullyStatus } from './reviews-data.selectors';
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { makeFakeReviews } from '../../mock/mock';

describe('reviews data selectors', () => {
  const state: Pick<State, NameSpace.Reviews> = {
    [NameSpace.Reviews]: {
      reviews: makeFakeReviews(),
      isReviewSending: false,
      hasReviewSendingError: true,
      isReviewSentSuccessfully: true
    }
  };

  it('getReviews should return reviews', () => {
    const reviews = getReviews(state);
    expect(reviews).toEqual(state[NameSpace.Reviews].reviews);
  });

  it('getReviewSendingStatus should return isReviewSending status', () => {
    const isReviewSending = getReviewSendingStatus(state);
    expect(isReviewSending).toBe(state[NameSpace.Reviews].isReviewSending);
  });

  it('getReviewSendingErrorStatus should return hasReviewSendingError status', () => {
    const hasReviewSendingError = getReviewSendingErrorStatus(state);
    expect(hasReviewSendingError).toBe(state[NameSpace.Reviews].hasReviewSendingError);
  });

  it('getReviewSentSuccessfullyStatus should return isReviewSentSuccessfully status', () => {
    const isReviewSentSuccessfully = getReviewSentSuccessfullyStatus(state);
    expect(isReviewSentSuccessfully).toBe(state[NameSpace.Reviews].isReviewSentSuccessfully);
  });
});
