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
  tagTypes: ['OnboardingSteps'],
  endpoints: (builder) => ({
    regularSignUp: builder.query<any, RegularSignUpPayload>({
      query: (payload: any) => ({
        url: '/auth/signup',
        method: APIMethods.POST,
        body: payload,
      }),
      onQueryStarted: async (_: any, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Sign Up Error:', error);
        }
      },
    }),
    regularLogin: builder.query<any, RegularLoginPayload>({
      query: (payload: any) => ({
        url: '/auth/login',
        method: APIMethods.POST,
        body: payload,
      }),
      onQueryStarted: async (_: any, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Login Error:', error);
        }
      },
    }),
    verifyOtp: builder.query<any, VerifyOtpPayload>({
      query: (payload: any) => ({
        url: '/auth/verify-otp',
        method: APIMethods.POST,
        body: payload,
      }),
      onQueryStarted: async (_: any, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('OTP Verification Error:', error);
        }
      },
    }),
    getUsers: builder.query<any, VerifyOtpPayload>({
      query: (payload: any) => ({
        url: '/auth/users',
        method: APIMethods.POST,
        body: payload,
      }),
      onQueryStarted: async (_: any, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Get Users Error:', error);
        }
      },
    }),
    getGoogleAuthUrl: builder.query<any, void>({
      query: () => ({
        url: '/auth/google-auth-url',
        method: APIMethods.GET,
      }),
      onQueryStarted: async (_: any, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Get Google Auth URL Error:', error);
        }
      },
    }),
    googleCallback: builder.mutation<any, GoogleAuthPayload>({
      query: (payload) => ({
        url: '/auth/google-auth',
        method: APIMethods.POST,
        body: payload,
      }),
      onQueryStarted: async (_: any, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Google Callback Error:', error);
        }
      },
    }),
  }),
});

export const {
  useLazyRegularSignUpQuery,
  useLazyRegularLoginQuery,
  useLazyVerifyOtpQuery,
  useLazyGetUsersQuery,
  useVerifyOtpQuery,
  useGetUsersQuery,
  useLazyGetGoogleAuthUrlQuery,
  useGoogleCallbackMutation,
} = authApiSlice;
