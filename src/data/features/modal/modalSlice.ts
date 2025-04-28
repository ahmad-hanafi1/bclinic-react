import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  open: boolean;
  type: string;
  title: string;
  onSubmit?: (data: any) => void;
  props?: Record<string, unknown>;
}

const initialState: ModalState = {
  open: false,
  title: "",
  type: "",
  props: {},
  onSubmit: () => {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (
      state,
      action: PayloadAction<{
        title: string;
        type: string;
        props?: Record<string, unknown>;
        onSubmit?: (data: any) => void;
      }>
    ) => {
      state.open = true;
      state.title = action.payload.title ?? "";
      state.props = action.payload.props ?? {};
      state.onSubmit = action.payload.onSubmit ?? (() => {});
      state.type = action.payload.type ?? "";
    },
    hideModal: (state) => {
      state.open = false;
      state.title = "";
      state.type = "";
      state.props = {};
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
