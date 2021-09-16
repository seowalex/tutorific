import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Gender, Level } from '../app/types';

export interface TutorFiltersState {
  priceMin: number | null;
  priceMax: number | null;
  timeSlots: number[];
  subjects: string[];
  levels: Level[];
  gender: Gender | null;
}

const initialState: TutorFiltersState = {
  priceMin: null,
  priceMax: null,
  timeSlots: [],
  subjects: [],
  levels: [],
  gender: null,
};

const slice = createSlice({
  name: 'tutorFilters',
  initialState,
  reducers: {
    setFilters: (_, action: PayloadAction<TutorFiltersState>) => action.payload,
    unsetFilters: () => initialState,
  },
});

export const { setFilters, unsetFilters } = slice.actions;

export const selectTutorFilters = (state: RootState) => state.tutorFilters;

export default slice.reducer;
