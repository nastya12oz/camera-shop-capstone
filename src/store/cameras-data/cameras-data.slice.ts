import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CamerasData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchCamerasListAction, fetchCameraByIdAction, fetchSimilarListAction, fetchPromoAction } from '../api-actions';
import { TCamerasList } from '../../types/cameras';

const initialState: CamerasData = {
  camerasList: [],
  camera: null,
  hasCameraError: false,
  isCameraDataLoading: false,
  isCameraListLoading: false,
  similarsList: [],
  promoList: [],
  filteredCameras: []
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    setFilteredCamerass: (state, action: PayloadAction<TCamerasList>) => {
      state.filteredCameras = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasListAction.fulfilled, (state, action) => {
        state.camerasList = action.payload;
        state.isCameraListLoading = false;
      })
      .addCase(fetchCamerasListAction.rejected, (state) => {
        state.isCameraListLoading = false;
        toast.error('Произошла ошибка при загрузке товаров');
      })
      .addCase(fetchCamerasListAction.pending, (state) => {
        state.isCameraListLoading = true;
      })
      .addCase(fetchCameraByIdAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.hasCameraError = false;
        state.isCameraDataLoading = false;
      })
      .addCase(fetchCameraByIdAction.rejected, (state) => {
        state.hasCameraError = true;
        state.isCameraDataLoading = false;
        toast.error('Произошла ошибка при загрузке товара');
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
