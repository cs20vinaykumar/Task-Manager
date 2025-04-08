import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalType: null, // 'ADD_TASK' or 'UPDATE_TASK'
  selectedTask: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalType = action.payload.type;
      state.selectedTask = action.payload.task || null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
      state.selectedTask = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
