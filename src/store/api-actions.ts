import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { TCamerasList, TCamera } from '../types/cameras';
import { TPromosList } from '../types/promo';
import { AppDispatch, State } from '../types/state';

export const fetchCamerasListAction = createAsyncThunk<TCamerasList, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchCamerasList',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<TCamerasList>('https://camera-shop.accelerator.pages.academy/cameras');
    return data;
  },
);

export const fetchCameraByIdAction = createAsyncThunk<TCamera, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchCameraById',
  async (id, { extra: api }) => {
    const { data } = await api.get<TCamera>(`${APIRoute.Camera}`.replace('{cameraId}', id));
    return data;
  },
);

export const fetchSimilarListAction = createAsyncThunk<TCamerasList, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchSimilarList',
  async (id, { extra: api}) => {
    const {data} = await api.get<TCamerasList>(APIRoute.Similar.replace('{cameraId}', id));
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<TPromosList, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchPromo',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<TPromosList>('https://camera-shop.accelerator.pages.academy/promo');
    return data;
  },
);
