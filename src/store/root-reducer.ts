import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasData } from './cameras-data/cameras-data.slice';
import { reviewsData } from './reviews-data/reviews-data.slice';
import { sortProcess } from './sort-process/sort-process.slice';


export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.Sort]:sortProcess.reducer
}
);
