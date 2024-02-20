import { configureStore } from '@reduxjs/toolkit';
import userDetailReducer from '../features/FetchapiSlice';
import authReducer, { logoutUser } from '../features/authSlice'; // Import logoutUser action creator
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: "root",
  version: 1,
  storage
};

const appReducer = combineReducers({
  app: userDetailReducer,
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logoutUser') { 
    storage.removeItem('persist:root');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
