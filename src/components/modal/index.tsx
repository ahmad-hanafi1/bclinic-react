import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { hideModal } from "../../data/features/modal/modalSlice";

import { ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  const { open, onSubmit, title } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => dispatch(hideModal())}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: onSubmit,
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
