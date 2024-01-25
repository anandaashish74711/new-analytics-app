import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// Define a helper function to get the userID
const getUserId = (state) => state.auth._id;

export const getUser = createAsyncThunk("getUser", async (_, { getState }) => {
  // Get the userID from the Redux store using the helper function
  const userID = getUserId(getState());
  console.log(userID)

  const apiUrl = `http://localhost:4000/api/v1/userinfo/${userID}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching user data:", error);
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
      });
  },
});

export const { setloading } = userDetailSlice.actions;

export default userDetailSlice.reducer;
