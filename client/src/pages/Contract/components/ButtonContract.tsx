import React from "react";
import "./Button.scss";

interface ButtonContractProps {
  button: {
    text: string;
    onclick?: () => void;
    icon?: string | JSX.Element;
  };
}

const ButtonContract: React.FC<ButtonContractProps> = (props) => {
  return (
    <div className="button-contract-container">
      <button onClick={props.button.onclick}>
        {props.button.text} {props.button.icon}
      </button>
    </div>
  );
};

export default ButtonContract;
