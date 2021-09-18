import api from './base';
import { TutorListing } from '../app/types';

type GetTutorListingsResponse = TutorListing[];
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
    getTutorListings: builder.query<GetTutorListingsResponse, void>({
      query: () => ({
        url: 'tutor',
      }),
      transformResponse: (response: { data: GetTutorListingsResponse }) =>
        response.data,
    }),
    getTutorListing: builder.query<GetTutorListingResponse, number>({
      query: (id) => ({
        url: `tutor/${id}`,
      }),
      transformResponse: (response: { data: GetTutorListingResponse }) =>
        response.data,
    }),
    createTutorListing: builder.mutation<void, CreateTutorListingRequest>({
      query: (listing) => ({
        url: 'tutor',
        method: 'POST',
        body: listing,
      }),
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
    }),
    deleteTutorListing: builder.mutation<void, number>({
      query: (id) => ({
        url: `tutor/${id}`,
        method: 'DELETE',
      }),
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
