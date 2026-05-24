import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base-query';

export enum APIMethods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

interface RegularSignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timezone: string;
}

interface RegularLoginPayload {
  email: string;
}

interface VerifyOtpPayload {
  email: string;
  otp: string;
}

interface GoogleAuthPayload {
  code: string;
  state?: string;
}

export const authApiSlice = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQuery,
  tagTypes: ['Users', 'Auth'],
  endpoints: (builder) => ({
    // ✅ Optimistic update: new user is pushed to the Users cache immediately;
    //    rolled back if the server rejects (e.g. email already taken).
    regularSignUp: builder.mutation<any, RegularSignUpPayload>({
      query: (payload) => ({
        url: '/auth/signup',
        method: APIMethods.POST,
        body: payload,
      }),
      invalidatesTags: ['Users'],
      onQueryStarted: async (payload, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          authApiSlice.util.updateQueryData('getUsers', undefined, (draft) => {
            draft.push({
              firstName: payload.firstName,
              lastName: payload.lastName,
              email: payload.email,
              phone: payload.phone,
              timezone: payload.timezone,
              status: 'pending',
            });
          }),
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.error('Sign Up Error:', error);
        }
      },
    }),
    regularLogin: builder.mutation<any, RegularLoginPayload>({
      query: (payload) => ({
        url: '/auth/login',
        method: APIMethods.POST,
        body: payload,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Login Error:', error);
        }
      },
    }),
    verifyOtp: builder.mutation<any, VerifyOtpPayload>({
      query: (payload) => ({
        url: '/auth/verify-otp',
        method: APIMethods.POST,
        body: payload,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('OTP Verification Error:', error);
        }
      },
    }),
    getUsers: builder.query<any[], void>({
      query: () => ({
        url: '/auth/users',
        method: APIMethods.GET,
      }),
      providesTags: ['Users'],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Get Users Error:', error);
        }
      },
    }),
  }),
});

export const {
  useRegularSignUpMutation,
  useRegularLoginMutation,
  useVerifyOtpMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery,
} = authApiSlice;
