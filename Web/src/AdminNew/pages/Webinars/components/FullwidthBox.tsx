import { formatISODateOnly } from "helpers/dateFormatter";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import React from "react";
import { FaCheck, FaRegCalendarAlt, FaUserAlt } from "react-icons/fa";
import "./FullwidthBox.scss";

export type FullwidthBoxData = {
  title: string;
  _id: string;
  onClick: any;
  name: string;
  date: string;
  status: string;
};

type FullwidthBoxProps = {
  data: FullwidthBoxData[];
  hideAction?: boolean;
};

const FullwidthBox: React.FC<FullwidthBoxProps> = (props) => {
  return (
    <React.Fragment>
      {props.data.map((data) => {
        return (
          <div className="fullwidth-box">
            <div className="captions">
              <h2>{data.title}</h2>
              <p>
                <FaUserAlt /> {data.name}
              </p>
              <p>
                <FaRegCalendarAlt /> {formatISODateOnly(data.title)}
              </p>
            </div>
            <ComponentValidator showNull={props.hideAction ?? true}>
              <div className="actions">
                <button onClick={data.onClick}>
                  <FaCheck />
                </button>
              </div>
            </ComponentValidator>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default FullwidthBox;
