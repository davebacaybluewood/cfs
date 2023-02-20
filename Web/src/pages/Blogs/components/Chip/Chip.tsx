import React from "react";
import "./Chip.scss";

export type ChipTypes = {
  description: string;
  link?: string;
};
interface IChip {
  tags: ChipTypes[];
  children?: React.ReactNode;
}

const Chip: React.FC<IChip> = (props) => {
  return (
    <div className="tags-container">
      {props.tags.map((tag) => (
        <div className="chip">
          <span>{tag.description}</span>
        </div>
      ))}
    </div>
  );
};

export default Chip;
