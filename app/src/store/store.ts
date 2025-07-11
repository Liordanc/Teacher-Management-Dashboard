"use client";
import { configureStore } from "@reduxjs/toolkit";
import teacherReducer from "@/app/src/store/slices/teacherSlice";

export const store = configureStore({
  reducer: {
    teacher: teacherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
