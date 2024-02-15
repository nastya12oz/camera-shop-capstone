import { createSlice } from '@reduxjs/toolkit';
import { CamerasData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchCamerasListAction, fetchCameraByIdAction, fetchSimilarListAction, fetchPromoAction } from '../api-actions';

const initialState: CamerasData = {
  camerasList: [],
  camera: null,
  hasCameraError: false,
  isCameraDataLoading: false,
  similarsList: [],
  promoList: [],
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasListAction.fulfilled, (state, action) => {
        state.camerasList = action.payload;
      })
      .addCase(fetchCameraByIdAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.hasCameraError = false;
        state.isCameraDataLoading = false;
      })
      .addCase(fetchCameraByIdAction.rejected, (state) => {
        state.hasCameraError = true;
        state.isCameraDataLoading = false;
      })
      .addCase(fetchCameraByIdAction.pending, (state) => {
        state.hasCameraError = false;
        state.isCameraDataLoading = true;
      })
      .addCase(fetchSimilarListAction.fulfilled, (state, action) => {
        state.similarsList = action.payload;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promoList = action.payload;
      });
  }
});
