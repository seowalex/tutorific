import api from './base';
import type { Level, TutorListing } from '../types/listing';
import type { Gender } from '../types/profile';
import { constructQueryString } from '../app/utils';

export type GetTutorListingsQueryParams = Partial<{
  profileId: number;
  priceMin: number;
  priceMax: number;
  timeSlots: number[];
  subjects: string[];
  levels: Level[];
  gender: Gender;
  skip: number;
  limit: number;
}>;

type GetTutorListingsResponse = { listings: TutorListing[]; count: number };
type GetTutorListingResponse = TutorListing;
type CreateTutorListingRequest = Omit<
  TutorListing,
  'id' | 'tutor' | 'createdAt'
> & { tutorId: number };
type UpdateTutorListingRequest = Partial<
  Omit<TutorListing, 'tutor' | 'createdAt'>
>;

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTutorListings: builder.query<
      GetTutorListingsResponse,
      GetTutorListingsQueryParams
    >({
      query: (queryParams) => ({
        url: `tutor/${constructQueryString(queryParams)}`,
      }),
      transformResponse: (response: { data: GetTutorListingsResponse }) =>
        response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.listings.map(({ id }) => ({
                type: 'TutorListing' as const,
                id,
              })),
              { type: 'TutorListing', id: 'LIST' },
            ]
          : [{ type: 'TutorListing', id: 'LIST' }],
    }),
    getTutorListing: builder.query<GetTutorListingResponse, number>({
      query: (id) => ({
        url: `tutor/${id}`,
      }),
      transformResponse: (response: { data: GetTutorListingResponse }) =>
        response.data,
      providesTags: (result, error, id) => [{ type: 'TutorListing', id }],
    }),
    createTutorListing: builder.mutation<void, CreateTutorListingRequest>({
      query: (listing) => ({
        url: 'tutor',
        method: 'POST',
        body: listing,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'TutorListing', id: 'LIST' }] : [],
    }),
    updateTutorListing: builder.mutation<
      void,
      UpdateTutorListingRequest & Pick<TutorListing, 'id'>
    >({
      query: ({ id, ...update }) => ({
        url: `tutor/${id}`,
        method: 'PUT',
        body: update,
      }),
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: 'TutorListing', id: arg.id }] : [],
      async onQueryStarted({ id, ...body }, { dispatch }) {
        dispatch(
          extendedApi.util.updateQueryData('getTutorListings', {}, (draft) => {
            const pendingListing = draft.listings.find(
              (listing) => listing.id === id
            );

            if (pendingListing) {
              Object.assign(pendingListing, { ...pendingListing, ...body });
            }
          })
        );

        dispatch(
          extendedApi.util.updateQueryData('getTutorListing', id, (draft) => {
            Object.assign(draft, { ...draft, ...body });
          })
        );
      },
    }),
    deleteTutorListing: builder.mutation<void, number>({
      query: (id) => ({
        url: `tutor/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) =>
        result ? [{ type: 'TutorListing', id }] : [],
      async onQueryStarted(id, { dispatch }) {
        dispatch(
          extendedApi.util.updateQueryData('getTutorListings', {}, (draft) => {
            Object.assign(
              draft,
              draft.listings.filter((listing) => listing.id !== id)
            );
          })
        );
      },
    }),
  }),
});

export const {
  useGetTutorListingsQuery,
  useGetTutorListingQuery,
  useCreateTutorListingMutation,
  useUpdateTutorListingMutation,
  useDeleteTutorListingMutation,
  usePrefetch,
} = extendedApi;
