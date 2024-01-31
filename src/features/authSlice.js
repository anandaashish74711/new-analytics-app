// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { dispatch }) => {
 
  try {
    const response = await axios.post('http://localhost:4000/api/v1/login', credentials);
    dispatch(authSlice.actions.setUser(response.data.user));
    console.log(response.data.user);
    return true;
  } catch (error) {
    if (error.response) {
      console.error('Server error response:', error.response.data);
      dispatch(authSlice.actions.setError(error.response.data.message || 'An error occurred'));
      return false;
    } else {
      console.error('Unexpected error:', error);
      dispatch(authSlice.actions.setError('An unexpected error occurred'));
      return false;
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
