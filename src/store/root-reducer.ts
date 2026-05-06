import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { brandApiSlice } from '../api/brand/brand-api-slice';
import { authApiSlice } from '../api/auth/auth-api-slice';

// 1. Non-negotiable reducers
export const staticReducers = {
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [brandApiSlice.reducerPath]: brandApiSlice.reducer,
};

// 2. Export the list of middlewares for the store
export const apiMiddlewares = [
  authApiSlice.middleware,
  brandApiSlice.middleware,
];

export const createRootReducer = (asyncReducers?: any) => {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
};
