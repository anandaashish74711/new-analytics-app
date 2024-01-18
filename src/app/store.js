import userDetailReducer from "../features/FetchapiSlice"; 
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import { loginUser } from '../features/authThunk';

const store = configureStore({
  reducer: {
    app: userDetailReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: { loginUser } },
    }),
});

export default store;
