import api from './base';
import type { AuthState } from '../reducers/auth';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  userId: number;
  profileId: number | null;
  jwtToken: string;
  refreshToken: string;
}

interface LogoutRequest {
  id: number;
  refreshToken: string;
  subscriptionJson: PushSubscription | null;
}

type RegisterRequest = LoginRequest;
type RegisterResponse = LoginResponse;

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
        profileId: response.profileId,
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
          subscriptionJson: credentials.subscriptionJson,
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
        profileId: response.profileId,
        token: response.jwtToken,
        refreshToken: response.refreshToken,
      }),
    }),
    subscribe: builder.mutation<void, PushSubscription>({
      query: (subscription) => ({
        url: 'subscription',
        method: 'POST',
        body: subscription,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useSubscribeMutation,
} = extendedApi;
