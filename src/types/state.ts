import { store } from '../store/index';
import { TCamerasList, TCamera, TPromosList } from './cameras';
import { TReviews } from './reviews';
import { SortDirection, SortType } from '../const';


export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type CamerasData = {
  camera: TCamera | null;
  camerasList: TCamerasList;
  hasCameraError: boolean;
  isCameraDataLoading: boolean;
  isCameraListLoading: boolean;
  similarsList: TCamerasList;
  promoList: TPromosList;
  filteredCameras: TCamerasList;
}

export type Reviews = {
  reviews: TReviews;
  isReviewSending: boolean;
  hasReviewSendingError: boolean;
  isReviewSentSuccessfully: boolean;
}

export type TSort = {
  type: SortType;
  direction: SortDirection;
}


export type SortProcess = {
  sortType: TSort;
};
