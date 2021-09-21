import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import type { Gender, Level, Town } from '../app/types';

export interface TuteeFiltersState {
  priceMin?: number;
  priceMax?: number;
  timeSlots?: number[];
  subjects?: string[];
  levels?: Level[];
  locations?: Town[];
  gender?: Gender;
  skip?: number;
  limit?: number;
}

const initialState: TuteeFiltersState = {};

const slice = createSlice({
  name: 'tuteeFilters',
  initialState,
  reducers: {
    setTuteeListingFilters: (_, action: PayloadAction<TuteeFiltersState>) =>
      action.payload,
    incrementTuteeListingPagination: (state) => {
      if (state.skip) {
        state.skip += 10;
      } else {
        state.skip = 10;
      }
    },
    resetTuteeListingPagination: (state) => {
      state.skip = 0;
      state.limit = 10;
    },
    unsetTuteeListingFilters: () => initialState,
  },
});

export const {
  setTuteeListingFilters,
  incrementTuteeListingPagination,
  resetTuteeListingPagination,
  unsetTuteeListingFilters,
} = slice.actions;

export const selectTuteeFilters = (state: RootState) => state.tuteeFilters;

export default slice.reducer;
