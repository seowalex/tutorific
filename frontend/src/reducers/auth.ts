import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

export interface AuthState {
  id: number | null;
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  id: null,
  token: null,
  refreshToken: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (_, action: PayloadAction<AuthState>) => action.payload,
    unsetCredentials: () => initialState,
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setCredentials, unsetCredentials, setToken } = slice.actions;

export const selectCurrentUser = (state: RootState) => state.auth;
export const selectCurrentUserId = (state: RootState) => state.auth.id;

export default slice.reducer;
