import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    search: searchReducer,
  },
});

export default store;
