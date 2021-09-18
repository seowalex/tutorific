import api from './base';
import { TuteeListing } from '../app/types';

type GetTuteeListingsResponse = TuteeListing[];
type GetTuteeListingResponse = TuteeListing;
type CreateTuteeListingRequest = Omit<
  TuteeListing,
  'id' | 'tutee' | 'createdAt'
>;
type UpdateTuteeListingRequest = Partial<
  Omit<TuteeListing, 'tutee' | 'createdAt'>
>;

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTuteeListings: builder.query<GetTuteeListingsResponse, void>({
      query: () => ({
        url: 'tutee',
      }),
      transformResponse: (response: { data: GetTuteeListingsResponse }) =>
        response.data,
    }),
    getTuteeListing: builder.query<GetTuteeListingResponse, number>({
      query: (id) => ({
        url: `tutee/${id}`,
      }),
      transformResponse: (response: { data: GetTuteeListingResponse }) =>
        response.data,
    }),
    createTuteeListing: builder.mutation<void, CreateTuteeListingRequest>({
      query: (listing) => ({
        url: 'tutee',
        method: 'POST',
        body: listing,
      }),
    }),
    updateTuteeListing: builder.mutation<
      void,
      UpdateTuteeListingRequest & Pick<TuteeListing, 'id'>
    >({
      query: ({ id, ...update }) => ({
        url: `tutee/${id}`,
        method: 'PUT',
        body: update,
      }),
    }),
    deleteTuteeListing: builder.mutation<void, number>({
      query: (id) => ({
        url: `tutee/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTuteeListingsQuery,
  useGetTuteeListingQuery,
  useCreateTuteeListingMutation,
  useUpdateTuteeListingMutation,
  useDeleteTuteeListingMutation,
  usePrefetch,
} = extendedApi;
