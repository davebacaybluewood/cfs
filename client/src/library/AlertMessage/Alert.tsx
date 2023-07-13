import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import "./Alert.scss";

interface AlertMessageProps {
  message: string;
  icon: string | JSX.Element;
}
const AlertMessage: React.FC<AlertMessageProps> = (props) => {
  return (
    <div className="alert-wrapper">
      <div className="message">
        <div className="message-icon">
          <FaExclamationCircle />
        </div>
        <h3>{props.message}</h3>
      </div>
    </div>
  );
};

export default AlertMessage;
