import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalType: null,
  data: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, actoin) => {
      state.isOpen = true;
      state.modalType = actoin.payload.modalType;
      state.data = actoin.payload.data || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
