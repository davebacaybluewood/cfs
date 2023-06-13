import adminPathsNew from "admin/constants/routes";
import { APPOINTMENT_STATUS } from "admin/pages/Appointments/Appointments";
import { formatISODateOnly } from "helpers/dateFormatter";
import Circle from "library/Icons/Circle";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AppointmentList.scss";

export type AppointmentListType = {
  title: string;
  date: string;
  _id: string;
  status: string;
  meeting_link: string;
};
type AppointmentListProps = {
  appointment: AppointmentListType[];
};
const AppointmentList: React.FC<AppointmentListProps> = (props) => {
  const navigate = useNavigate();

  const viewMorehandler = (id: string) => {
    navigate(
      adminPathsNew.appointmentInformation.replace(":appointmentId", id)
    );
  };

  return (
    <div className="appointment-list">
      {props.appointment?.map((appointment) => {
        const status =
          appointment.status === APPOINTMENT_STATUS.ACTIVE.toLowerCase()
            ? "success"
            : appointment.status === APPOINTMENT_STATUS.CANCELLED.toLowerCase()
            ? "danger"
            : "warning";
        const statusLabel =
          appointment.status === APPOINTMENT_STATUS.ACTIVE.toLowerCase()
            ? "Active"
            : appointment.status === APPOINTMENT_STATUS.CANCELLED.toLowerCase()
            ? "Cancelled"
            : "Ongoing";

        return (
          <div className="appointment-list-item">
            <div className="information">
              <h4>{appointment.title}</h4>
              <p>{formatISODateOnly(appointment.date?.toString())}</p>
              <div>
                <Circle variant={status}>Status: {statusLabel}</Circle>
              </div>
            </div>
            <div className="actions">
              <button onClick={() => viewMorehandler(appointment._id)}>
                View More Information
              </button>
              <button
                onClick={() => window.open(appointment.meeting_link, "_blank")}
              >
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
