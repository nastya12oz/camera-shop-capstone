import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasData } from './cameras-data/cameras-data.slice';
import { promoData } from './promo-data/promo-data.slice';
import { reviewsData } from './reviews-data/reviews-data.slice';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasData.reducer,
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer
}
);
