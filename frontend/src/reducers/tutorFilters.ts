import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Gender, Level } from '../app/types';

export interface TutorFiltersState {
  priceMin?: number;
  priceMax?: number;
  timeSlots?: number[];
  subjects?: string[];
  levels?: Level[];
  gender?: Gender;
}

const initialState: TutorFiltersState = {
  timeSlots: [],
  subjects: [],
  levels: []
};

const slice = createSlice({
  name: 'tutorFilters',
  initialState,
  reducers: {
    setTutorListingFilters: (_, action: PayloadAction<TutorFiltersState>) => action.payload,
    unsetTutorListingFilters: () => initialState,
  },
});

export const { setTutorListingFilters, unsetTutorListingFilters } = slice.actions;

export const selectTutorFilters = (state: RootState) => state.tutorFilters;

export default slice.reducer;
