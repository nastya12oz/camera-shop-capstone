import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TReview, TReviews } from './types/reviews';
import { TCamerasList } from './types/cameras';
import { MIN_SEARCHED_VALUE } from './const';

export const formatDate = (dateString: string): string =>
  dayjs(dateString).locale('ru').format('D MMMM');

export function sortByTop(reviewA: TReview, reviewB: TReview) {
  return dayjs(reviewB.createAt).diff(reviewA.createAt);
}

export const sortByDate = (reviews: TReviews) => [...reviews].sort(sortByTop);

export function getSearchedCameras(cameras: TCamerasList, value: string) {
  return cameras.filter((camera) => {
    if (value.length >= MIN_SEARCHED_VALUE) {
      return camera.name.toLowerCase().includes(value.toLocaleLowerCase());
    }
  });
}
