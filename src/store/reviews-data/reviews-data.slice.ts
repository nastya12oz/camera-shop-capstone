import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Reviews } from '../../types/state';
import { fetchReviewsAction, fetchSendReviewAction } from '../api-actions';

const initialState: Reviews = {
  reviews: [],
  isReviewSending: false,
  hasReviewSendingError: false,
  isReviewSentSuccessfully: false
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    resetReviewSentSuccess(state) {
      state.isReviewSentSuccessfully = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchSendReviewAction.pending, (state)=> {
        state.hasReviewSendingError = false;
        state.isReviewSending = true;
        state.isReviewSentSuccessfully = false;
      })
      .addCase(fetchSendReviewAction.fulfilled, (state)=> {
        state.hasReviewSendingError = false;
        state.isReviewSending = false;
        state.isReviewSentSuccessfully = true;
      })
      .addCase(fetchSendReviewAction.rejected, (state) => {
        state.hasReviewSendingError = true;
        state.isReviewSending = false;
        state.isReviewSentSuccessfully = false;
      });
  }
});

export const { resetReviewSentSuccess } = reviewsData.actions;
