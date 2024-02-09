import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Reviews } from '../../types/state';
import { fetchReviewsAction } from '../api-actions';

const initialState: Reviews = {
  reviews: [],
  review: null,
  isReviewsLoading: false,
  hasReviewsError: false,
  isReviewSending: false,
  hasReviewSendingError: false
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.hasReviewsError = false;
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.hasReviewsError = false;
        state.isReviewsLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.hasReviewsError = true;
        state.isReviewsLoading = false;
      });
  }
});
