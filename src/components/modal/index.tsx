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
  const { open, onSubmit, title, type } = useAppSelector(
    (state) => state.modal
  );

  const ContentComponent = type ? modalContent[type] : null;

  const dispatch = useAppDispatch();
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => dispatch(hideModal())}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            if (onSubmit) onSubmit(event);
            dispatch(hideModal());
          },
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{ padding: 2, display: "flex", gap: 2, flexDirection: "column" }}
      >
        {ContentComponent && <ContentComponent />}
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={() => dispatch(hideModal())} variant="outlined">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            transition: "color 0.3s ease, background-color 0.3s ease",
            color: "white",
            "&:hover": {
              color: "black",
            },
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
