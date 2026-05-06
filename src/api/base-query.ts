import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
const appUrl = process.env.API_URL;
const rawBaseQuery = fetchBaseQuery({
  baseUrl: appUrl,
  prepareHeaders: (headers, { getState }) => {
    return headers;
  },
});

// 👇 Correctly type your wrapper as a BaseQueryFn
export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (
    (result as any)?.data?.errorMessage === 'Re-Login Required' ||
    (result as any)?.error?.data?.errorMessage === 'Re-Login Required'
  ) {
    window.location.href = '/login';
    return { error: { status: 401, data: 'Re-Login Required' } };
  }
  return result;
};
