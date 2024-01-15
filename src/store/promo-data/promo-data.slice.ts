import { createSlice } from '@reduxjs/toolkit';
import { PromoData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchPromoAction } from '../api-actions';

const initialState: PromoData = {
  promoList: [],
  hasPromoListError: false,
  isPromoListDataLoading: false,
};

export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.hasPromoListError = false;
        state.isPromoListDataLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promoList = action.payload;
        state.hasPromoListError = false;
        state.isPromoListDataLoading = false;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.hasPromoListError = true;
        state.isPromoListDataLoading = false;
      });
  }
});

