import { configureStore } from "@reduxjs/toolkit";
import { carApi } from "./carApi";
import { appointmentApi } from "./appointmentApi";

export const store = configureStore({
  reducer: {
    [carApi.reducerPath]: carApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carApi.middleware, appointmentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
