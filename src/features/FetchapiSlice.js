import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Assuming you have a URL for your API endpoint
const apiUrl = "http://localhost:4000/api/v1//patientinfo/659d3da859a99be651d75836";

// Create an asynchronous thunk for getting user data
export const getUser = createAsyncThunk("getUser", async () => {
  try {
    // Make the API call using fetch
    const response = await fetch(apiUrl);

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTT uP error! Status: ${response.status}`);
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
    users:null,
    isloading: false,
  },
  reducers: {
    setloading:(state,action)=>{
      state.isloading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isloading = true;
      })
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.isloading = false;
        state.users = action.payload;
      })
      builder.addCase(getUser.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
       
      });
  },
});

export const {setloading} = userDetailSlice.actions

export default userDetailSlice.reducer;
