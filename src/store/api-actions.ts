import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
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
    const {data} = await api.get<TCamerasList>('https://camera-shop.accelerator.htmlacademy.pro/cameras');
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
    const { data } = await api.get<TCamera>(`https://camera-shop.accelerator.htmlacademy.pro/cameras/${id}`);
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
    const {data} = await api.get<TCamerasList>(`https://camera-shop.accelerator.htmlacademy.pro/cameras/${id}/similar`);
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
    const {data} = await api.get<TPromosList>('https://camera-shop.accelerator.htmlacademy.pro/promo');
    return data;
  },
);
