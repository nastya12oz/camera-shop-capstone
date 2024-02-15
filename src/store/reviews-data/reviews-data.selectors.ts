import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TReviews } from '../../types/reviews';

export const getReviews = (state: Pick<State, NameSpace.Reviews>): TReviews => state[NameSpace.Reviews].reviews;
export const getReviewSendingStatus = (state: Pick<State, NameSpace.Reviews>): boolean => state[NameSpace.Reviews].isReviewSending;
export const getReviewSendingErrorStatus = (state: Pick<State, NameSpace.Reviews>): boolean => state[NameSpace.Reviews].hasReviewSendingError;
export const getReviewSentSuccessfullyStatus = (state: Pick<State, NameSpace.Reviews>): boolean => state[NameSpace.Reviews].isReviewSentSuccessfully;
