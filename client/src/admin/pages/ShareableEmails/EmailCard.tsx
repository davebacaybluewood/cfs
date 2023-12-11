import React from "react";
import "./EmailCard.scss";
import { FaRegShareSquare } from "react-icons/fa";

interface EmailCardProps {
  subject: string;
  createdBy?: string;
  onClick: () => void;
}
const EmailCard: React.FC<EmailCardProps> = (props) => {
  return (
    <div className="email-card">
      <div className="captions">
        <h2>{props.subject}</h2>
        <p>Created by: {props.createdBy}</p>
      </div>
      <div className="actions">
        <button onClick={() => props.onClick()}>
          <span>Share</span> <FaRegShareSquare />
        </button>
      </div>
    </div>
  );
};

export default EmailCard;
