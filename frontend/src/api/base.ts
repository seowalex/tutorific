import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../app/store';

const api = createApi({
  baseQuery: fetchBaseQuery({
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
  }),
  endpoints: () => ({}),
});

export default api;
