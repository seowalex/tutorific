import api from './base';
import { TutorListing } from '../app/types';
import { TutorFiltersState } from '../reducers/tutorFilters';
import { constructQueryString } from '../app/utils';

type GetTutorListingsQueryParams = Partial<TutorFiltersState>;
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
      providesTags: ['TutorListing'],
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
      invalidatesTags: ['TutorListing'],
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
      invalidatesTags: (result, error, arg) => [
        { type: 'TutorListing', id: arg.id },
      ],
    }),
    deleteTutorListing: builder.mutation<void, number>({
      query: (id) => ({
        url: `tutor/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TutorListing'],
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
