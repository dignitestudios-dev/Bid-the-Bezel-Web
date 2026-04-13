import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

import addProductReducer from "./slices/addproductSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    addProduct: addProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
