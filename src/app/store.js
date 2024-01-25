import { configureStore } from '@reduxjs/toolkit';
import userDetailReducer, { getUser } from '../features/FetchapiSlice';
import authReducer from '../features/authSlice';

const store = configureStore({
  reducer: {
    app: userDetailReducer,
    auth: authReducer,
  },
});



export default store;
