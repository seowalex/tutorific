import api from './base';

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  PNTS = 'Prefer not to say',
}

interface Profile {
  id: number;
  name: string;
  gender: Gender;
  description: string;
  createdAt: Date;
}

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, number>({
      query: (id) => ({
        url: `profile/${id}`,
      }),
      transformResponse: (response: { data: Profile }) => response.data,
      providesTags: (result, error, id) => [{ type: 'Profile', id }],
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
