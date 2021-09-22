import api from './base';
import { Gender, Level, Town, TuteeListing } from '../app/types';
import { constructQueryString } from '../app/utils';

export type GetTuteeListingsQueryParams = Partial<{
  profileId: number;
  priceMin: number;
  priceMax: number;
  timeSlots: number[];
  subjects: string[];
  levels: Level[];
  locations: Town[];
  gender: Gender;
  skip: number;
  limit: number;
}>;
type GetTuteeListingsResponse = { listings: TuteeListing[]; count: number };
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
    getTuteeListings: builder.query<
      GetTuteeListingsResponse,
      GetTuteeListingsQueryParams
    >({
      query: (queryParams) => ({
        url: `tutee/${constructQueryString(queryParams)}`,
      }),
      transformResponse: (response: { data: GetTuteeListingsResponse }) =>
        response.data,
      providesTags: ['TuteeListing'],
    }),
    getTuteeListing: builder.query<GetTuteeListingResponse, number>({
      query: (id) => ({
        url: `tutee/${id}`,
      }),
      transformResponse: (response: { data: GetTuteeListingResponse }) =>
        response.data,
      providesTags: (result, error, id) => [{ type: 'TuteeListing', id }],
    }),
    createTuteeListing: builder.mutation<void, CreateTuteeListingRequest>({
      query: (listing) => ({
        url: 'tutee',
        method: 'POST',
        body: listing,
      }),
      invalidatesTags: ['TuteeListing'],
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
      invalidatesTags: (result, error, arg) => [
        { type: 'TuteeListing', id: arg.id },
      ],
    }),
    deleteTuteeListing: builder.mutation<void, number>({
      query: (id) => ({
        url: `tutee/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TuteeListing'],
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
