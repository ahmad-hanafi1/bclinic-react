import AddAppointmentForm from "./forms/addAppointmentForm";

const modalContentMap: Record<
  string,
  React.ComponentType<{ props?: Record<string, unknown> }>
> = {
  "add-appointment": AddAppointmentForm,

};


export default modalContentMap;