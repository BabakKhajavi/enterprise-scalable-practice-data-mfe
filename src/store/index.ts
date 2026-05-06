import { configureStore, Reducer } from '@reduxjs/toolkit';
import { createRootReducer, apiMiddlewares } from './root-reducer';

import type { Middleware } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: createRootReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Often needed for MFE cross-boundary data
    }).concat(apiMiddlewares as Middleware[]),
});

// Logic for dynamic injection (Keep this for future flexibility)
(store as any).asyncReducers = {};
(store as any).injectReducer = (key: string, asyncReducer: Reducer) => {
  (store as any).asyncReducers[key] = asyncReducer;
  store.replaceReducer(createRootReducer((store as any).asyncReducers));
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
