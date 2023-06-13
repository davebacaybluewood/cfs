import React from "react";

type AppointmentCardProps = {
  title: string;
  description: string;
  id: string;
};
const AppointmentCard: React.FC<AppointmentCardProps> = (props) => {
  return (
    <div className="appointment-card-v2">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
};

export default AppointmentCard;
