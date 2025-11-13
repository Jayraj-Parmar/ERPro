import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create, getAll, remove, update } from "./../../api/crudApi";

export const fetchData = createAsyncThunk(
  "fetchAll",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await getAll(payload);
      return { payload, data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createData = createAsyncThunk(
  "create",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await create(payload.endpoint, payload.payload);
      if (res.success) await dispatch(fetchData(payload.endpoint));
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteData = createAsyncThunk(
  "delete",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await remove(payload.endpoint, payload.id);
      if (res.success) await dispatch(fetchData(payload.endpoint));
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateData = createAsyncThunk(
  "update",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await update(payload.endpoint, payload.id, payload.payload);
      if (res.success) await dispatch(fetchData(payload.endpoint));
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  data: {},
  error: null,
  success: null,
  fetchLoading: false,
  createOrUpdateLoading: false,
  removeLoading: false,
};

const crudSlice = createSlice({
  name: "crud",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchData.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { payload: endpoint, data } = action.payload;
        state.data[endpoint] = data;
        state.fetchLoading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.payload;
        state.fetchLoading = false;
      })

      // Create
      .addCase(createData.pending, (state) => {
        state.createOrUpdateLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createData.fulfilled, (state, action) => {
        state.createOrUpdateLoading = false;
        state.error = null;
        state.success = action.payload;
      })
      .addCase(createData.rejected, (state, action) => {
        state.createOrUpdateLoading = false;
        state.success = null;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteData.pending, (state) => {
        state.removeLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.removeLoading = false;
        state.error = null;
        state.success = action.payload;
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.removeLoading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateData.pending, (state) => {
        state.createOrUpdateLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.createOrUpdateLoading = false;
        state.error = null;
        state.success = action.payload;
      })
      .addCase(updateData.rejected, (state, action) => {
        state.createOrUpdateLoading = false;
        state.error = action.payload;
      });
  },
});

export default crudSlice.reducer;
