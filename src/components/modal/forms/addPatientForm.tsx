import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../utils/hooks";
import { hideModal } from "../../../data/features/modal/modalSlice";
import { createPatient } from "../../../data/features/patient/patientSlice";

interface AddPatientFormInputs {
  name: string;
  phone: string;
  is_patient: boolean; // always true
}

const AddPatientForm = () => {
  const dispatch = useAppDispatch();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPatientFormInputs>({
    defaultValues: {
      name: "",
      phone: "",
      is_patient: true,
    },
  });

  const submitForm = (data: AddPatientFormInputs) => {
    // Ensure is_patient is always true
    data.is_patient = true;
    console.log(data);
    dispatch(createPatient(data));
    // if (onSubmit) {
    //   onSubmit(data);
    // }
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
        helperText={errors.name ? "Patient name is required" : ""}
      />

      <TextField
        label="Phone Number"
        fullWidth
        required
        {...register("phone", { required: true })}
        error={!!errors.phone}
        helperText={errors.phone ? "Phone number is required" : ""}
      />
    </form>
  );
};

export default AddPatientForm;
