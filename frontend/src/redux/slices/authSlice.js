import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Retrieve user data and token from localStorage if available
const userFromStorage = localStorage.getItem("user")
?JSON.parse(localStorage.getItem("user")):null;

//Check for an existing guest ID in the localStorage or genrate a new One
const initialGuestId = localStorage.getItem("guestId") || `guest_${Date.now()}`;
localStorage.setItem("guestId", initialGuestId);

// Initial state for the auth slice
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk("auth/loginUser",async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API_URL}/api/users/login`,
                userData
            );
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("userToken", response.data.token);
            return response.data.user;
        } catch (error) {
          console.error("Login Error:", error.response?.data || error.message);
            return rejectWithValue(error.response.data);
        }
});


// Async thunk for user registration
export const registerUser = createAsyncThunk("auth/registerUser",async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API_URL}/api/users/register`,
                userData
            );
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("userToken", response.data.token);
            return response.data.user;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
});

//Slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
      state.user = null;
      state.guestId = `guest_${Date.now()}`;
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${Date.now()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;

export default authSlice.reducer;