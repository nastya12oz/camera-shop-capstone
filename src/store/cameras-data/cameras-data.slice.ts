import { createSlice } from '@reduxjs/toolkit';
import { CamerasData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchCamerasListAction, fetchCameraByIdAction, fetchSimilarListAction } from '../api-actions';

const initialState: CamerasData = {
  camerasList: [],
  hasCamerasListError: false,
  isCamerasListDataLoading: false,
  camera: null,
  hasCameraError: false,
  isCameraDataLoading: false,
  similarsList: [],
  hasSimilarsError: false,
  isSimilasDataLoading: false,
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasListAction.pending, (state) => {
        state.hasCamerasListError = false;
        state.isCamerasListDataLoading = true;
      })
      .addCase(fetchCamerasListAction.fulfilled, (state, action) => {
        state.camerasList = action.payload;
        state.hasCamerasListError = false;
        state.isCamerasListDataLoading = false;
      })
      .addCase(fetchCamerasListAction.rejected, (state) => {
        state.hasCameraError = true;
        state.isCameraDataLoading = false;
      })
      .addCase(fetchCameraByIdAction.pending, (state) => {
        state.hasCameraError = false;
        state.isCameraDataLoading = true;
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
      .addCase(fetchSimilarListAction.pending, (state) => {
        state.hasSimilarsError = false;
        state.isSimilasDataLoading = true;
      })
      .addCase(fetchSimilarListAction.fulfilled, (state, action) => {
        state.similarsList = action.payload;
        state.hasSimilarsError = false;
        state.isSimilasDataLoading = false;
      })
      .addCase(fetchSimilarListAction.rejected, (state) => {
        state.hasSimilarsError = true;
        state.isSimilasDataLoading = false;
      });
  }
});
