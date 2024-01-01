import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "../features/FetchapiSlice"; // Correct import name

export const store = configureStore({
  reducer: {
    app: userDetailReducer, // Correct reference to the reducer
  },
});
