import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TReview, TReviews } from './types/reviews';

export const formatDate = (dateString: string): string =>
  dayjs(dateString).locale('ru').format('D MMMM');

export function sortByTop(reviewA: TReview, reviewB: TReview) {
  return dayjs(reviewB.createAt).diff(reviewA.createAt);
}

export const sortByDate = (reviews: TReviews) => [...reviews].sort(sortByTop);
