import React from "react";
import {
  FaBookOpen,
  FaCalendarDay,
  FaGlobe,
  FaRegAddressBook,
  FaUserCheck,
} from "react-icons/fa";
import "./Overview.scss";

type OverviewProps = {
  numberOfVisits: number;
  numberOfAppointments: number;
  numberOfLeads: number;
  numberOfTestimonials: number;
  numberOfContacts: number;
};
const Overview: React.FC<OverviewProps> = (props) => {
  return (
    <div className="about-wrapper">
      <div className="about-info">
        <h2>Overview</h2>
        <ul>
          <li>
            <span className="list-label">
              <FaCalendarDay />
              Number of Appointments:{" "}
            </span>
            <span className="list-value">{props.numberOfAppointments} </span>
          </li>
          <li>
            <span className="list-label">
              <FaGlobe />
              Number of Visits:{" "}
            </span>
            <span className="list-value">{props.numberOfVisits} </span>
          </li>
          <li>
            <span className="list-label">
              <FaUserCheck />
              Number of Leads:{" "}
            </span>
            <span className="list-value">{props.numberOfLeads} </span>
          </li>
          <li>
            <span className="list-label">
              <FaBookOpen />
              Number of Testimonials:{" "}
            </span>
            <span className="list-value">{props.numberOfTestimonials} </span>
          </li>
          <li>
            <span className="list-label">
              <FaRegAddressBook />
              Number of Contacts:{" "}
            </span>
            <span className="list-value">{props.numberOfContacts} </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
