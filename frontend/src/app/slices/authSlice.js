import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, logout as apiLogout } from "../../api/authApi";
import { startLoading, stopLoading } from "./loadingSlice";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(startLoading());
      const res = await getUser();
      dispatch(stopLoading());
      return res.data.user;
    } catch (err) {
      dispatch(stopLoading());
      return rejectWithValue({
        status: err.status,
        message: err.message,
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await apiLogout();
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  userData: null,
  isLoggedin: false,
  error: null,
  isChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isLoggedin = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoggedin = true;
        state.userData = action.payload;
        state.isChecked = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoggedin = false;
        state.userData = null;
        state.error = action.payload;
        state.isChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedin = false;
        state.userData = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;
