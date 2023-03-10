import adminPathsNew from "AdminNew/constants/routes";
import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AppointmentCards.scss";

type AppointmentCardsProps = {
  title: string;
  description: string;
  borderColor: string;
  id: string;
  className?: string;
  link: string;
};

const AppointmentCards: React.FC<AppointmentCardsProps> = (props) => {
  const appointmentCardClassnames = classNames(props.className);
  const navigate = useNavigate();

  const cardClickHandler = (id: string) => {
    navigate(adminPathsNew.scheduledAppointments.replace(":appointmentId", id));
  };

  return (
    <div
      className={appointmentCardClassnames}
      onClick={() => cardClickHandler(props.title)}
    >
      <div className="card-captions">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <p>No. of appointments: 10</p>
        <a href={props.link} target="_blank">
          View Booking Page
        </a>
      </div>
    </div>
  );
};

export default AppointmentCards;
