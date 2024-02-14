import { store } from '../store/index';
import { TCamerasList, TCamera, TPromosList } from './cameras';
import { TReviews } from './reviews';


export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type CamerasData = {
  camera: TCamera | null;
  camerasList: TCamerasList;
  hasCameraError: boolean;
  isCameraDataLoading: boolean;
  similarsList: TCamerasList;
  promoList: TPromosList;
}

export type Reviews = {
  reviews: TReviews;
  isReviewSending: boolean;
  hasReviewSendingError: boolean;
  isReviewSentSuccessfully: boolean;
}
