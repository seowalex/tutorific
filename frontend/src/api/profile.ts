import api from './base';
import type { AuthState } from '../reducers/auth';

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

interface AddProfileResponse {
  profileId: number;
  jwtToken: string;
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
    addProfile: builder.mutation<Partial<AuthState>, Partial<Profile>>({
      query: (body) => ({
        url: `profile`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: AddProfileResponse) => ({
        profileId: response.profileId,
        token: response.jwtToken,
      }),
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
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: 'Profile', id: arg.id }] : [],
      // async onQueryStarted({ id, ...body }, { dispatch, queryFulfilled }) {
      //   dispatch(
      //     extendedApi.util.updateQueryData('getProfile', id, (draft) => {
      //       Object.assign(draft, body);
      //     })
      //   );

      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     console.log({ id, ...body });
      //   }
      // },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useAddProfileMutation,
  useUpdateProfileMutation,
  usePrefetch,
} = extendedApi;
