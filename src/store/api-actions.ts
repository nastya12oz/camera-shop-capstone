import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TCamerasList, TCamera, TPromosList } from '../types/cameras';
import { AppDispatch, State } from '../types/state';
import { TReviews, TReviewSent } from '../types/reviews';
import { APIRoute } from '../const';
import { toast } from 'react-toastify';


export const fetchCamerasListAction = createAsyncThunk<TCamerasList, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchCamerasList',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<TCamerasList>(APIRoute.Products);
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
    const { data } = await api.get<TCamera>(`${APIRoute.Products}/${id}`);
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
    const {data} = await api.get<TCamerasList>(`${APIRoute.Products}/${id}/similar`);
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
    const {data} = await api.get<TPromosList>(APIRoute.Promo);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<TReviews, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchReviews',
  async (id: string, { extra: api }) => {
    const response = await api.get<TReviews>(APIRoute.Reviews.replace('id', id));
    return response.data;
  }
);


export const fetchSendReviewAction = createAsyncThunk<void, TReviewSent, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchSendReviewAction',
  async (data, { extra: api }) => {
    try {
      await api.post<void>(APIRoute.Review, data);
    } catch (error) {
      toast.error('Ошибка при загрузке комментария');
      throw error;
    }
  }
);
