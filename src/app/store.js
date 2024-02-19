import { configureStore } from '@reduxjs/toolkit';
import userDetailReducer from '../features/FetchapiSlice';
import authReducer from '../features/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'; // Changed import
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: "root",
  version: 1,
  storage
};

const reducer = combineReducers({
  app: userDetailReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer); // Renamed variable

const store = configureStore({
  reducer: persistedReducer, 
});

export default store;
