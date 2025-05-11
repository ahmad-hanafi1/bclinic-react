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
import { fetchNationalities } from "../../../data/features/nationality/nationalitySlice";
import { useEffect, useMemo } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export interface CreatePatientInput {
  name: string;
  phone: string;
  gender: string;
  date_of_birth: Date | null;
  is_patient: boolean;
  nationality: { name: string; id: number } | null;

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

const PatientForm = () => {
  const dispatch = useAppDispatch();
  const { nationalities } = useAppSelector((state) => state.nationality);
  const { onSubmit, props } = useAppSelector((state) => state.modal);

  const patient = props?.patient as Partial<CreatePatientInput> | undefined;

  const nationalityDefault = useMemo(() => {
    if (
      !patient?.nationality &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Array.isArray((patient as any)?.nationality_id)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [id, name] = (patient as any).nationality_id;
      return { id: Number(id), name: String(name) };
    }
    return patient?.nationality || null;
  }, [patient]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePatientInput>({
    defaultValues: {
      name: patient?.name || "",
      phone: patient?.phone || "",
      gender: patient?.gender || "",
      date_of_birth: patient?.date_of_birth
        ? new Date(patient.date_of_birth)
        : null,
      is_patient: true,
      nationality: nationalityDefault,
      referral: patient?.referral || "",
      is_vip: patient?.is_vip || false,
      registration_date: patient?.registration_date || "",
      name_arabic: patient?.name_arabic || "",
      whatsapp: patient?.whatsapp || "",
      emergency_contact_person: patient?.emergency_contact_person || "",
      emergency_contact_no: patient?.emergency_contact_no || "",
      father_name: patient?.father_name || "",
      mother_name: patient?.mother_name || "",
      border_number: patient?.border_number || "",
      uid: patient?.uid || "",
    },
  });

  const submitForm = (data: CreatePatientInput) => {
    data.is_patient = true;
    data.date_of_birth = dayjs(data.date_of_birth).format(
      "YYYY-MM-DD"
    ) as unknown as Date;
    if (!patient) {
      data.registration_date = dayjs().format("YYYY-MM-DD");
    }

    if (onSubmit) onSubmit(data);
    dispatch(hideModal());
  };

  useEffect(() => {
    dispatch(fetchNationalities());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(submitForm)} id="modal-form">
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
          type="number"
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
                label="Nationality"
                value={field.value?.id ?? ""}
                onChange={(e) => {
                  const selected = nationalities.find(
                    (n) => n.id === Number(e.target.value)
                  );
                  field.onChange(selected ?? null);
                }}
              >
                {nationalities.map((nation) => (
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
              value={field.value}
              onChange={(date) => field.onChange(date)}
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

      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
        Other Details
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2} flexWrap="wrap">
        {[
          { name: "name_arabic", label: "Name (Arabic)" },
          { name: "whatsapp", label: "WhatsApp", type: "number" },
          { name: "emergency_contact_person", label: "Emergency Contact" },
          {
            name: "emergency_contact_no",
            label: "Emergency Contact No",
            type: "number",
          },
          { name: "father_name", label: "Father Name" },
          { name: "mother_name", label: "Mother Name" },
          { name: "border_number", label: "Border Number", type: "number" },
          { name: "uid", label: "UID", type: "number" },
          { name: "referral", label: "Referral" },
        ].map((field) => (
          <Box key={field.name} sx={{ width: { xs: "100%", md: "45%" } }}>
            <TextField
              label={field.label}
              type={field.type || "text"}
              fullWidth
              size="small"
              {...register(field.name as keyof CreatePatientInput)}
            />
          </Box>
        ))}

        <Box sx={{ width: { xs: "100%", md: "45%" } }}>
          <FormControlLabel
            control={<Checkbox {...register("is_vip")} />}
            label="VIP"
          />
        </Box>
      </Grid>
    </form>
  );
};

export default PatientForm;
