import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface ModalState {
  open: boolean;
  type: string | null;
  title: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  props?: Record<string, unknown>;
}

const initialState: ModalState = {
  open: false,
  type: null,
  title: "",
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
        type: string;
        title?: string;
        props?: Record<string, unknown>;
        onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
      }>
    ) => {
      state.open = true;
      state.type = action.payload.type;
      state.title = action.payload.title ?? "";
      state.props = action.payload.props ?? {};
    },
    hideModal: (state) => {
      state.open = false;
      state.type = null;
      state.title = "";
      state.props = {};
    },
  },
});


export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;