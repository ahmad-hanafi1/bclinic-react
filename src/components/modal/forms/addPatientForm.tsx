import {
  TextField,
  Grid,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { hideModal } from "../../../data/features/modal/modalSlice";
import { createPatient } from "../../../data/features/patient/patientSlice";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";
import { fetchNationalities } from "../../../data/features/nationality/nationalitySlice";
import dayjs from "dayjs";

interface CreatePatientInput {
  name: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  is_patient: boolean;
  nationality: { name: string; id: number };

  referral?: string;
  is_vip?: boolean;
  registration_date?: string;
  name_arabic?: string;
  whatsapp?: string;
  emergency_contact_person?: string;
  emergency_contact_no?: string;
  father_name?: string;
  mother_name?: string;
  border_number?: string;
  uid?: string;
}

const AddPatientForm = () => {
  const dispatch = useAppDispatch();
  const { nationalities } = useAppSelector((state) => state.nationality);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePatientInput>({
    defaultValues: {
      name: "",
      phone: "",
      gender: "",
      date_of_birth: "",
      is_patient: true,

      nationality: { name: "", id: 0 },
      referral: "",
      is_vip: false,
      registration_date: "",
      name_arabic: "",
      whatsapp: "",
      emergency_contact_person: "",
      emergency_contact_no: "",
      father_name: "",
      mother_name: "",
      border_number: "",
      uid: "",
    },
  });
  const submitForm = (data: CreatePatientInput) => {
    data.is_patient = true;
    data.registration_date = dayjs().format("YYYY-MM-DD");
   
    dispatch(createPatient(data));
    dispatch(hideModal());
  };

  useEffect(() => {
    dispatch(fetchNationalities());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(submitForm)} id="modal-form">
      {/* === Main Information Section === */}
      <Typography variant="h6" gutterBottom>
        Main Information
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexDirection: "column",
        }}
      >
        <TextField
          label="Name"
          fullWidth
          required
          {...register("name", { required: true })}
          error={!!errors.name}
          helperText={errors.name && "Name is required"}
          size="small"
        />

        <TextField
          label="Phone"
          fullWidth
          required
          {...register("phone", { required: true })}
          error={!!errors.phone}
          helperText={errors.phone && "Phone is required"}
          size="small"
        />

        <FormControl fullWidth margin="dense" error={!!errors.gender}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <Select
                labelId="gender-label"
                label="Gender"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{errors.gender?.message}</FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="dense" error={!!errors.nationality}>
          <InputLabel id="nationality-label">Nationality</InputLabel>
          <Controller
            name="nationality"
            control={control}
            rules={{ required: "Nationality is required" }}
            render={({ field }) => (
              <Select
                labelId="nationality-label"
                id="nationality"
                label="Nationality"
                value={field.value.id}
                onChange={(e) => {
                  const selected = nationalities.find(
                    (p) => p.id === Number(e.target.value)
                  );
                  console.log(selected);
                  field.onChange(selected || null);
                }}
              >
                {nationalities?.map((nation) => (
                  <MenuItem key={nation.id} value={nation.id}>
                    {nation.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.nationality?.message}</FormHelperText>
        </FormControl>

        <Controller
          name="date_of_birth"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              label="Date of Birth"
              {...field}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  error: !!errors.date_of_birth,
                  helperText: errors.date_of_birth
                    ? "Date of birth is required"
                    : "",
                },
              }}
            />
          )}
        />
      </Box>

      {/* === Other Details Section === */}
      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
        Other Details
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2} flexWrap="wrap">
        {/* <Box sx={{ width: { xs: "100%", sm: "100%", md: "45%" } }}>
          <Controller
            name="registration_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Registration Date"
                {...field}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
            )}
          />
        </Box> */}

        <Box sx={{ width: { xs: "100%", sm: "100%", md: "45%" } }}>
          <TextField
            label="Name (Arabic)"
            fullWidth
            {...register("name_arabic")}
            size="small"
          />
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "100%", md: "45%" } }}>
          <TextField
            label="WhatsApp"
            fullWidth
            {...register("whatsapp")}
            size="small"
          />
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "100%", md: "45%" } }}>
          <TextField
            label="Emergency Contact"
            fullWidth
            {...register("emergency_contact_person")}
            size="small"
          />
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "100%", md: "45%" } }}>
          <TextField
            label="Emergency Contact No"
            fullWidth
            {...register("emergency_contact_no")}
            size="small"
          />
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "100%", md: "45%" } }}>
          <TextField
            label="Father Name"
            fullWidth
            {...register("father_name")}
            size="small"
          />
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "100%", md: "45%" } }}>
          <TextField
            label="Mother Name"
            fullWidth
            {...register("mother_name")}
            size="small"
          />
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "100%", md: "45%" } }}>
          <TextField
            label="Border Number"
            fullWidth
            {...register("border_number")}
            size="small"
          />
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "100%", md: "45%" } }}>
          <TextField label="UID" fullWidth {...register("uid")} size="small" />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "100%", md: "45%" } }}>
          <TextField
            label="Referral"
            fullWidth
            {...register("referral")}
            size="small"
          />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "100%", md: "45%" } }}>
          <FormControlLabel
            control={<Checkbox {...register("is_vip")} />}
            label="VIP"
          />
        </Box>
      </Grid>
    </form>
  );
};

export default AddPatientForm;
