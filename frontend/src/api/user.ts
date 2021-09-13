import api from './base';

enum Gender {
  Male,
  Female,
  PNTS,
}

interface User {
  id: number;
  name: string;
  gender: Gender;
  description: string;
  createdAt: Date;
}

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, number>({
      query: (id) => ({
        url: `profile/${id}`,
        // transformResponse: (response: { data: User }) => response.data,
      }),
    }),
    updateUser: builder.mutation<void, Partial<User> & Pick<User, 'id'>>({
      query: ({ id, ...update }) => ({
        url: `profile/${id}`,
        method: 'POST',
        body: update,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = extendedApi;
