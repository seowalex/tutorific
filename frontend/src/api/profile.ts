import api from './base';
import { Profile } from '../types/profile';

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, number>({
      query: (id) => ({
        url: `profile/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Profile', id: arg }],
      transformResponse: (response: { data: Profile }) => response.data,
    }),
    updateProfile: builder.mutation<
      void,
      Partial<Profile> & Pick<Profile, 'id'>
    >({
      query: ({ id, ...body }) => ({
        url: `profile/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Profile', id: arg.id },
      ],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = extendedApi;
