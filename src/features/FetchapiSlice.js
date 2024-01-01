import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Assuming you have a URL for your API endpoint
const apiUrl = "http://localhost:4000/api/v1//patientinfo/6564c248b30f32776ed6270a";

// Create an asynchronous thunk for getting user data
export const getUser = createAsyncThunk("getUser", async () => {
  try {
    // Make the API call using fetch
    const response = await fetch(apiUrl);

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response JSON
    const result = await response.json();

    // Return the result, which will be accessible in the Redux store
    return result;
  } catch (error) {
    console.error("Error fetching user data:", error);
    // You can throw an error or return an object indicating an error state
    throw error;
  }
});

// Create userDetail slice
const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userDetailSlice.reducer;
