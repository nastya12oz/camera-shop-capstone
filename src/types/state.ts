import { store } from '../store/index';
import { TCamerasList, TCamera } from './cameras';
import { TPromosList } from './promo';


export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type CamerasData = {
  camerasList: TCamerasList;
  hasCamerasListError: boolean;
  isCamerasListDataLoading: boolean;
  camera: TCamera | null;
  hasCameraError: boolean;
  isCameraDataLoading: boolean;
  similarsList: TCamerasList;
  hasSimilarsError: boolean;
  isSimilasDataLoading: boolean;
}

export type PromoData = {
  promoList: TPromosList;
  hasPromoListError: boolean;
  isPromoListDataLoading: boolean;
}
