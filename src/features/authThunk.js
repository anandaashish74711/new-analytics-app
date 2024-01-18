// authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUser, setError } from './authSlice';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { dispatch }) => {
  try {
    const response = await axios.post('http://localhost:4000/api/v1/login', credentials);
    dispatch(setUser(response.data));
  } catch (error) {
    // Check if error.response exists before accessing its properties
    if (error.response) {
      // Log the detailed error information
      console.error('Server error response:', error.response.data);
      dispatch(setError(error.response.data.message || 'An error occurred'));
    } else {
      // If there is no error.response, log the original error for further investigation
      console.error('Unexpected error:', error);
      dispatch(setError('An unexpected error occurred'));
    }
  }
});
