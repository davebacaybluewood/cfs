import React from "react";
import { CiCircleInfo } from "react-icons/ci";

interface DrawerConfirmationProps {
  title: string;
  handlers: {
    yes: () => void;
    no: () => void;
  };
  open: boolean;
}
const DrawerConfirmation: React.FC<DrawerConfirmationProps> = (props) => {
  if (!props.open) {
    return <React.Fragment />;
  }

  return (
    <div className="drawer-confirmation">
      <div className="confirmation-content">
        <CiCircleInfo />
        <h2>{props.title}</h2>
        <button onClick={props.handlers.no}>No</button>
        <button onClick={props.handlers.yes}>
          Yes, I want to delete this channel
        </button>
      </div>
    </div>
  );
};

export default DrawerConfirmation;
