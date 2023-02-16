import React from "react";
import "./Chip.scss";

interface IChip {
  description: string;
}

const Chip: React.FC<IChip> = (props) => {
  return (
    <div className="chip">
      <p>{props.description}</p>
    </div>
  );
};

export default Chip;
