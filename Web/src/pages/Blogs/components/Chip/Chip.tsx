import React from "react";
import "./Chip.scss";

export type ChipTypes = {
  description: string;
  link?: string;
};
interface IChip {
  tags: ChipTypes[];
  children?: React.ReactNode;
  tagsLimit?: number;
  hideOtherChip?: boolean;
}

const Chip: React.FC<IChip> = (props) => {
  return (
    <div className="tags-container">
      {props.tags.length > 2 ? props.tags.slice(0, props.tagsLimit).map((tag) => (
        <React.Fragment>
          <div className="chip">
            <span>{tag.description}</span>
          </div>
        </React.Fragment>
      )) : props.tags.map((tag) => (
        <div className="chip">
          <span>{tag.description}</span>
        </div>
      ))}

      {props.tags.length > 2 && !props.hideOtherChip && <div className="chip">
        <span>{props.tags.length - 2} others</span>
      </div>}
    </div>
  );
};

export default Chip;
