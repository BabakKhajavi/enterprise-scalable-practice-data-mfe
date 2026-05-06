import { createApi } from '@reduxjs/toolkit/query/react';
import { APIMethods } from '../auth/auth-api-slice';
import { baseQuery } from '../base-query';
import { Brand } from '../../types/brand';
import { CacheTags } from '../../types/generic';
type CreateBrandPayload = Pick<
  Brand,
  'slug' | 'colors' | 'fontFamily' | 'tenantId'
>;
type UpdateBrandPayload = Partial<
  Pick<Brand, 'slug' | 'colors' | 'fontFamily' | 'tenantId'>
>;
export const brandApiSlice = createApi({
  reducerPath: 'brandApi',
  baseQuery: baseQuery,
  tagTypes: [CacheTags.BRAND_CONFIG],
  endpoints: (builder) => ({
    getBrandBySlug: builder.query<any, string>({
      query: (slug: string) => ({
        url: `/brands/slug/${slug}`,
        method: APIMethods.GET,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      // providesTags: [CacheTags.BRAND_CONFIG],
      onQueryStarted: async (_: any, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Get Brand Config Error:', error);
        }
      },
      transformResponse: (response: any) => response,
    }),
    getBrandById: builder.query<any, string>({
      query: (id: string) => ({
        url: `/brands/${id}`,
        method: APIMethods.GET,
      }),
      onQueryStarted: async (_: any, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Get Brand Config Error:', error);
        }
      },
      transformResponse: (response: any) => response,
    }),
    getBrands: builder.query<any, string>({
      query: (payload: any) => ({
        url: `/brands?page=${payload?.page || 1}&perPage=${payload?.perPage || 20}`,
        method: APIMethods.GET,
      }),
      onQueryStarted: async (_: any, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Get Brand Config Error:', error);
        }
      },
      transformResponse: (response: any) => response,
    }),
    createBrand: builder.mutation<any, CreateBrandPayload>({
      query: (payload) => ({
        url: '/brands',
        method: APIMethods.POST,
        body: payload,
      }),
      onQueryStarted: async (_: any, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Create Brand Error:', error);
        }
      },
    }),
    updateBrand: builder.mutation<any, UpdateBrandPayload>({
      query: (payload) => ({
        url: '/brands',
        method: APIMethods.PUT,
        body: payload,
      }),
      invalidatesTags: [CacheTags.BRAND_CONFIG],
      onQueryStarted: async (_: any, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Update Brand Error:', error);
        }
      },
    }),
    deleteBrand: builder.mutation<any, string>({
      query: (id: string) => ({
        url: `/brands/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [CacheTags.BRAND_CONFIG],
      onQueryStarted: async (_: any, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Delete Brand Error:', error);
        }
      },
    }),
  }),
});

export const {
  useGetBrandBySlugQuery,
  useLazyGetBrandBySlugQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetBrandByIdQuery,
  useLazyGetBrandByIdQuery,
} = brandApiSlice;
