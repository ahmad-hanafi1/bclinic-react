import AddAppointmentForm from "./forms/addAppointmentForm";
import AddDoctorForm from "./forms/addDoctorForm";
import AddPatientForm from "./forms/addPatientForm";

const modalContentMap: Record<
  string,
  React.ComponentType<{ props?: Record<string, unknown> }>
> = {
  "add-appointment": AddAppointmentForm,
  "add-patient": AddPatientForm,
  "add-doctor": AddDoctorForm,

};


export default modalContentMap;