import classNames from "classnames";
import React from "react";
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
  return (
    <div className={appointmentCardClassnames}>
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
