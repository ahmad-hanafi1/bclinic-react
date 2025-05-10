import AppointmentForm from "./forms/AppointmentForm";
import DoctorForm from "./forms/DoctorForm";
import PatientForm from "./forms/PatientForm";

const modalContentMap: Record<
  string,
  React.ComponentType<{ props?: Record<string, unknown> }>
> = {
  appointment: AppointmentForm,
  patient: PatientForm,
  doctor: DoctorForm,
};

export default modalContentMap;
