import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import type { Level } from '../types/listing';
import type { Gender } from '../types/profile';

export interface TutorFiltersState {
  priceMin?: number;
  priceMax?: number;
  timeSlots?: number[];
  subjects?: string[];
  levels?: Level[];
  gender?: Gender;
  skip?: number;
  limit?: number;
}

const initialState: TutorFiltersState = {};

const slice = createSlice({
  name: 'tutorFilters',
  initialState,
  reducers: {
    setTutorListingFilters: (_, action: PayloadAction<TutorFiltersState>) =>
      action.payload,
    incrementTutorListingPagination: (state) => {
      if (state.skip) {
        state.skip += 10;
      } else {
        state.skip = 10;
      }
    },
    resetTutorListingPagination: (state) => {
      state.skip = 0;
      state.limit = 10;
    },
    unsetTutorListingFilters: () => initialState,
  },
});

export const {
  setTutorListingFilters,
  incrementTutorListingPagination,
  resetTutorListingPagination,
  unsetTutorListingFilters,
} = slice.actions;

export const selectTutorFilters = (state: RootState) => state.tutorFilters;

export default slice.reducer;
