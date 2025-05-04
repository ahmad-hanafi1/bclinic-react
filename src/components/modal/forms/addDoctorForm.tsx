import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../utils/hooks";
import { hideModal } from "../../../data/features/modal/modalSlice";
import { createDoctor } from "../../../data/features/doctor/doctorSlice";

interface AddDoctorFormInputs {
  name: string;
  is_doctor: boolean; // always true
}

const AddDoctorForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDoctorFormInputs>({
    defaultValues: {
      name: "",
      is_doctor: true,
    },
  });

  const submitForm = (data: AddDoctorFormInputs) => {
    data.is_doctor = true;
    dispatch(createDoctor(data));
    dispatch(hideModal());
  };

  return (
    <form
      id="modal-form"
      onSubmit={handleSubmit(submitForm)}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <TextField
        label="Name"
        fullWidth
        required
        {...register("name", { required: true })}
        error={!!errors.name}
        helperText={errors.name ? "Doctor name is required" : ""}
      />
    </form>
  );
};

export default AddDoctorForm;
