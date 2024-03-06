import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortProcess } from '../../types/state';
import { NameSpace, SortDirection, SortType } from '../../const';
import { TSort } from '../../types/state';


const initialState: SortProcess = {
  sortType: {
    type: SortType.Default,
    direction: SortDirection.Default,
  }
};

export const sortProcess = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<TSort>) => {
      state.sortType = action.payload;
    },
  },
});

export const { setSortType } = sortProcess.actions;
