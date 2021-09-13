import api from './base';
import { AuthState } from '../reducers/authSlice';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  userId: number;
  jwtToken: string;
  refreshToken: string;
}

interface LogoutRequest {
  id: number;
  refreshToken: string;
}

interface RefreshTokenResponse {
  jwtToken: string;
}

type RegisterRequest = LoginRequest;
type RegisterResponse = LoginResponse;
type RefreshTokenRequest = LogoutRequest;

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthState, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: LoginResponse) => ({
        id: response.userId,
        token: response.jwtToken,
        refreshToken: response.refreshToken,
      }),
    }),
    logout: builder.mutation<void, LogoutRequest>({
      query: (credentials) => ({
        url: 'auth/logout',
        method: 'DELETE',
        body: {
          userId: credentials.id,
          refreshToken: credentials.refreshToken,
        },
      }),
    }),
    register: builder.mutation<AuthState, RegisterRequest>({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: RegisterResponse) => ({
        id: response.userId,
        token: response.jwtToken,
        refreshToken: response.refreshToken,
      }),
    }),
    refreshToken: builder.mutation<string, RefreshTokenRequest>({
      query: (credentials) => ({
        url: 'auth/refresh',
        method: 'POST',
        body: {
          userId: credentials.id,
          refreshToken: credentials.refreshToken,
        },
      }),
      // TODO: Update when backend is normalised
      transformResponse: (response: { data: RefreshTokenResponse }) =>
        response.data.jwtToken,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
} = extendedApi;
