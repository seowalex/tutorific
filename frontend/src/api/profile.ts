import api from './base';
import type { AuthState } from '../reducers/auth';
import type { Profile } from '../types/profile';

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
    addProfile: builder.mutation<
      Pick<AuthState, 'profileId' | 'token'>,
      Omit<Profile, 'id'>
    >({
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
    updateProfile: builder.mutation<void, Profile>({
      query: ({ id, ...body }) => ({
        url: `profile/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: 'Profile', id: arg.id }] : [],
      async onQueryStarted({ id, ...body }, { dispatch }) {
        dispatch(
          extendedApi.util.updateQueryData('getProfile', id, (draft) => {
            Object.assign(draft, body);
          })
        );
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useAddProfileMutation,
  useUpdateProfileMutation,
  usePrefetch,
} = extendedApi;
