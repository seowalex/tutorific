import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

export interface AuthState {
  id: number | null;
  profileId: number | null;
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  id: null,
  profileId: null,
  token: null,
  refreshToken: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (_, action: PayloadAction<AuthState>) => action.payload,
    unsetCredentials: () => initialState,
    setProfileId: (state, action: PayloadAction<number>) => {
      state.profileId = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setCredentials, unsetCredentials, setProfileId, setToken } =
  slice.actions;

export const selectCurrentUser = (state: RootState) => state.auth;
export const selectCurrentUserId = (state: RootState) => state.auth.profileId;

export default slice.reducer;
