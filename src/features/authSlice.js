// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      // Ensure that action.payload is defined and contains 'user' and 'token' properties
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload; // Ensure that action.payload is defined
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
