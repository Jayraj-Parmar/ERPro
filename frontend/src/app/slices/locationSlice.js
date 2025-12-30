import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getDistricts,
  getSubdistrictsByDistrictId,
  getVillagesBySubdistrictId,
} from "../../api/location";

export const fetchLocation = createAsyncThunk(
  "fetch/location",
  async (payload, { rejectWithValue }) => {
    try {
      let res;

      switch (payload.type) {
        case "village":
          res = await getVillagesBySubdistrictId(payload.subDistrictId);
          break;

        case "subdistrict":
          res = await getSubdistrictsByDistrictId(payload.districtId);
          break;

        case "district":
          res = await getDistricts();
          break;

        default:
          return rejectWithValue("Invalid location type");
      }

      return { type: payload.type, resData: res?.data ?? [] };
    } catch (error) {
      return rejectWithValue({ type: payload.type, error: error });
    }
  }
);

const initialState = {
  data: {
    district: [],
    subdistrict: [],
    village: [],
  },
  loading: false,
  error: {
    district: null,
    subdistrict: null,
    village: null,
  },
};

const locationSlice = createSlice({
  name: "location",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.error = null;
        const { type, resData } = action.payload;
        if (type === "district") {
          state.data.subdistrict = [];
          state.data.village = [];
        }
        if (type === "subdistrict") {
          state.data.village = [];
        }
        state.data[type] = resData;
        state.loading = false;
      })

      .addCase(fetchLocation.rejected, (state, action) => {
        state.loading = false;
        const { type, error } = action.payload;
        state.error[type] = error;
      });
  },
});

export default locationSlice.reducer;
