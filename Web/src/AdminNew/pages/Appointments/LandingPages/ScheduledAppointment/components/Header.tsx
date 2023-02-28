import { formatISODateToDate } from "helpers/dateFormatter";
import React from "react";
import "./Header.scss";

type HeaderTypeProps = {
  title: string;
  typeOfAppointment: string;
  appointmentId: string;
  agent: string;
  createdAt: Date;
  wayOfAppointment: string;
};

type HeaderLabeledValueProps = {
  label: string;
  value: string;
};
const HeaderLabeledValue: React.FC<HeaderLabeledValueProps> = (props) => {
  return (
    <div className="description-item">
      <h3>Title</h3>
      <p>Appointment Title</p>
    </div>
  );
};
const Header: React.FC<HeaderTypeProps> = (props) => {
  return (
    <div className="appointment-header-parent">
      <div className="appointment-header">
        <h2>{props.title}</h2>
        <div className="appointment-description">
          <div className="description-item">
            <h3>Title</h3>
            <p>Appointment Title</p>
          </div>
          <div className="description-item">
            <h3>Type of Appointment</h3>
            <p>{props.typeOfAppointment}</p>
          </div>
          <div className="description-item">
            <h3>Appointment ID</h3>
            <p>{props.appointmentId}</p>
          </div>
          <div className="description-item">
            <h3>Agent</h3>
            <p>{props.agent}</p>
          </div>
          <div className="description-item">
            <h3>Way of Appointment</h3>
            <p>{props.wayOfAppointment}</p>
          </div>
          <div className="description-item">
            <h3>Appointment Date Created</h3>
            <p>{formatISODateToDate(props.createdAt.toString())}</p>
          </div>
        </div>
      </div>
      {/* <div className="header-tabs">
        <ul>
          <li className="active">Schedule Appointments</li>
          <li>Calendar</li>
          <li>Agents</li>
        </ul>
      </div> */}
    </div>
  );
};

export default Header;
