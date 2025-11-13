import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import loadingReducer from "./slices/loadingSlice";
import modalReducer from "./slices/modalSlice";
import crudReducer from "./slices/CrudSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    modal: modalReducer,
    crud: crudReducer,
  },
});
