import { createApi } from '@reduxjs/toolkit/query/react';
import { APIMethods } from '../auth/auth-api-slice';
import { baseQuery } from '../base-query';
import { Brand } from '../../types/brand';
import { CacheTags } from '../../types/generic';

type CreateBrandPayload = Pick<
  Brand,
  'slug' | 'colors' | 'fontFamily' | 'tenantId'
>;

type UpdateBrandPayload = { brandId: string } & Partial<
  Pick<Brand, 'slug' | 'colors' | 'fontFamily' | 'tenantId'>
>;

interface GetBrandsParams {
  page?: number;
  perPage?: number;
}

export const brandApiSlice = createApi({
  reducerPath: 'brandApi',
  baseQuery: baseQuery,
  tagTypes: [CacheTags.BRAND, CacheTags.BRANDS],
  endpoints: (builder) => ({
    getBrandBySlug: builder.query<Brand, string>({
      query: (slug) => ({
        url: `/brands/slug/${slug}`,
        method: APIMethods.GET,
      }),
      providesTags: [CacheTags.BRAND],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Get Brand By Slug Error:', error);
        }
      },
      transformResponse: (response: any) => response,
    }),
    getBrandByTenantId: builder.query<Brand, string>({
      query: (id) => ({
        url: `/brands/${id}`,
        method: APIMethods.GET,
      }),
      providesTags: [CacheTags.BRAND],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Get Brand By Id Error:', error);
        }
      },
      transformResponse: (response: any) => response,
    }),
    getBrands: builder.query<any, GetBrandsParams>({
      query: ({ page = 1, perPage = 20 } = {}) => ({
        url: `/brands?page=${page}&perPage=${perPage}`,
        method: APIMethods.GET,
      }),
      providesTags: [CacheTags.BRANDS],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Get Brands Error:', error);
        }
      },
      transformResponse: (response: any) => response,
    }),

    createBrand: builder.mutation<Brand, CreateBrandPayload>({
      query: (payload) => ({
        url: '/brands',
        method: APIMethods.POST,
        body: payload,
      }),
      invalidatesTags: [CacheTags.BRANDS],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Create Brand Error:', error);
        }
      },
    }),
    // ✅ Optimistic update: we know all the new field values, so we patch
    //    getBrandById immediately and roll back if the server rejects.
    updateBrand: builder.mutation<Brand, UpdateBrandPayload>({
      query: ({ brandId, ...body }) => ({
        url: `/brands/${brandId}`,
        method: APIMethods.PUT,
        body,
      }),
      invalidatesTags: [CacheTags.BRAND, CacheTags.BRANDS],
      async onQueryStarted(
        { brandId, ...changes },
        { dispatch, queryFulfilled },
      ) {
        const patch = dispatch(
          brandApiSlice.util.updateQueryData(
            'getBrandByTenantId',
            brandId,
            (draft) => {
              Object.assign(draft, changes);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),

    deleteBrand: builder.mutation<void, string>({
      query: (id) => ({
        url: `/brands/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [CacheTags.BRAND, CacheTags.BRANDS],
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        // We don't know which page args are active, so patch all cached getBrands pages.
        const patchList = dispatch(
          brandApiSlice.util.updateQueryData(
            'getBrands',
            undefined as any,
            (draft) => {
              if (Array.isArray(draft)) {
                return draft.filter((b: Brand) => b.brandId !== id);
              }
              if (Array.isArray(draft?.data)) {
                draft.data = draft.data.filter((b: Brand) => b.brandId !== id);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchList.undo();
          console.error('Delete Brand Error:', error);
        }
      },
    }),
  }),
});

export const {
  useGetBrandBySlugQuery,
  useLazyGetBrandBySlugQuery,
  useGetBrandByTenantIdQuery,
  useLazyGetBrandByTenantIdQuery,
  useGetBrandsQuery,
  useLazyGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApiSlice;
