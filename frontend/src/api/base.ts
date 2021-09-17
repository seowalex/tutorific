import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '../app/store';
import { setToken, unsetCredentials } from '../reducers/auth';

interface RefreshResponse {
  jwtToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${
    process.env.REACT_APP_BACKEND_HOST
  }:${process.env.REACT_APP_BACKEND_PORT}/api/`,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const state = api.getState() as RootState;
    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh',
        method: 'POST',
        body: { userId: state.auth.id, refreshToken: state.auth.refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      api.dispatch(setToken((refreshResult.data as RefreshResponse).jwtToken));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(unsetCredentials());
    }
  }

  return result;
};

const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile'],
  endpoints: () => ({}),
});

export default api;
