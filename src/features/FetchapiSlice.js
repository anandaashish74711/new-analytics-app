import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("getUser", async ({ userId, userType }) => {
  let apiUrl;
  
  // Determine the API endpoint based on the userType
  switch (userType) {
    case 'doctor':
      apiUrl = `http://localhost:4000/api/v1/doctorInfo/${userId}`;
      break;
    case 'nurse':
      apiUrl = `http://localhost:4000/api/v1/nurse/${userId}`;
      break;
    case 'patient':
      apiUrl = `http://localhost:4000/api/v1/patientInfo/${userId}`;
      break;
    default:
      throw new Error('Invalid userType provided');
  }
  
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error; // Throw the error to indicate a failure
  }
});

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    users: null,
    isloading: false,
    error: null,
  },
  reducers: {
    setloading: (state, action) => {
      state.isloading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isloading = false;
        state.users = action.payload;
        console.log("Received user data:", action.payload);
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
        console.error("Error fetching user data:", action.error);
      });
  },
});

export const { setloading } = userDetailSlice.actions;

export default userDetailSlice.reducer;
