import adminPathsNew from "AdminNew/constants/routes";
import { APPOINTMENT_STATUS } from "AdminNew/pages/Appointments/Appointments";
import { formatISODateOnly } from "helpers/dateFormatter";
import Circle from "library/Icons/Circle";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AppointmentList.scss";

export type AppointmentListType = {
  title: string;
  date: Date;
  _id: string;
  status: string;
};
type AppointmentListProps = {
  appointment: AppointmentListType[];
};
const AppointmentList: React.FC<AppointmentListProps> = (props) => {
  const navigate = useNavigate();

  const viewMorehandler = (id: string) => {
    navigate(adminPathsNew.appointmentInformation.replace(":id", id));
  };
  return (
    <div className="appointment-list">
      {props.appointment.map((appointment) => {
        const status =
          appointment.status === APPOINTMENT_STATUS.ACTIVE
            ? "success"
            : appointment.status === APPOINTMENT_STATUS.CANCELLED
            ? "danger"
            : "warning";
        const statusLabel =
          appointment.status === APPOINTMENT_STATUS.ACTIVE
            ? "Active"
            : appointment.status === APPOINTMENT_STATUS.CANCELLED
            ? "Cancelled"
            : "Ongoing";

        return (
          <div className="appointment-list-item">
            <div className="information">
              <h4>{appointment.title}</h4>
              <p>{formatISODateOnly(appointment.date.toString())}</p>
              <div>
                <Circle variant={status}>Status: {statusLabel}</Circle>
              </div>
            </div>
            <div className="actions">
              <button onClick={() => viewMorehandler(appointment._id)}>
                View More Information
              </button>
              <button onClick={() => viewMorehandler(appointment._id)}>
                View Google Meet
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentList;
