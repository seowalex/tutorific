import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';

interface ProfileListingsState {
  tutor: {
    skip?: number;
    limit?: number;
  };
  tutee: {
    skip?: number;
    limit?: number;
  };
}

const initialState: ProfileListingsState = {
  tutor: {},
  tutee: {},
};

const slice = createSlice({
  name: 'profileListings',
  initialState,
  reducers: {
    incrementProfileTutorsPagination: (state) => {
      if (state.tutor.skip) {
        state.tutor.skip += 10;
      } else {
        state.tutor.skip = 10;
      }
    },
    incrementProfileTuteesPagination: (state) => {
      if (state.tutee.skip) {
        state.tutee.skip += 10;
      } else {
        state.tutee.skip = 10;
      }
    },
    resetProfileTutorsPagination: (state) => {
      state.tutor.skip = 0;
      state.tutor.limit = 10;
    },
    resetProfileTuteesPagination: (state) => {
      state.tutee.skip = 0;
      state.tutee.limit = 10;
    },
  },
});

export const {
  incrementProfileTutorsPagination,
  incrementProfileTuteesPagination,
  resetProfileTutorsPagination,
  resetProfileTuteesPagination,
} = slice.actions;

export const selectProfileTutorPagination = (state: RootState) =>
  state.profileListings.tutor;
export const selectProfileTuteePagination = (state: RootState) =>
  state.profileListings.tutee;

export default slice.reducer;
