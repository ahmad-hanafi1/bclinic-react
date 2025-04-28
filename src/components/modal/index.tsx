import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { hideModal } from "../../data/features/modal/modalSlice";
import modalContent from "./modalContentsMap";

const Modal = () => {
  const { open, title, type } = useAppSelector((state) => state.modal);

  const ContentComponent = type ? modalContent[type] : null;

  const dispatch = useAppDispatch();
  return (
    <Dialog fullWidth open={open} onClose={() => dispatch(hideModal())}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ padding: 2 }}>
        {ContentComponent && <ContentComponent />}
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={() => dispatch(hideModal())} variant="outlined">
          Cancel
        </Button>
        <Button form="modal-form" type="submit" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
