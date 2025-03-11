// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // Added auth reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
});

// Correcting types for RootState and AppDispatch
export const RootState = () => store.getState(); // Fixed to return the function call
export const AppDispatch = () => store.dispatch; // Fixed to return the function call
