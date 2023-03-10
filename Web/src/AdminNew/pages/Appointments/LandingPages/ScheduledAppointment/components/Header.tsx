import { SCHEDULE_TYPES } from "AdminNew/constants/constants";
import adminPathsNew from "AdminNew/constants/routes";
import ENDPOINTS from "constants/endpoints";
import { formatISODateToDate } from "helpers/dateFormatter";
import getUserToken from "helpers/getUserToken";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import Spinner from "library/Spinner/Spinner";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Header.scss";

export type HeaderLabeledValueProps = {
  label: string;
  value: string;
};

type HeaderTypeProps = {
  title: string;
  typeOfAppointment?: {
    code: string;
    text: string;
  };
  appointmentId?: string;
  agent?: string;
  createdAt?: Date;
  wayOfAppointment?: string;
  cols?: HeaderLabeledValueProps[];
  hasActions?: boolean;
  agentGuid?: string;
  webinarGuid?: string;
  id?: string;
};
const HeaderLabeledValue: React.FC<HeaderLabeledValueProps> = (props) => {
  return (
    <div className="description-item">
      <h3>{props.label}</h3>
      <p>{props.value}</p>
    </div>
  );
};
const Header: React.FC<HeaderTypeProps> = (props) => {
  console.log(props.webinarGuid);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cancelAppointment = (id: string) => {
    const pawPath = adminPathsNew.agentAppointments
      .replace(":agentId", props.agentGuid ?? "")
      .replace(":typeId", SCHEDULE_TYPES.PAW.toLowerCase());
    const webinarPath = adminPathsNew.scheduledAppointments
      .replace(":agentGuid", props.agentGuid ?? "")
      .replace(":typeId", SCHEDULE_TYPES.WEBINAR.toLowerCase())
      .replace(":webinarGuid", props.webinarGuid ?? "");
    setLoading(true);
    fetch(ENDPOINTS.APPOINTMENT_SINGLE.replace(":appointmentId", id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getUserToken(),
      },
    })
      .then((response) => {
        toast.info(`Appointment Cancelled.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(
          props.typeOfAppointment?.code.toLowerCase() ===
            SCHEDULE_TYPES.PAW.toLowerCase()
            ? pawPath
            : webinarPath
        );
      })
      .then((result) => {
        console.log(result);
        setLoading(false);
      });
  };
  return (
    <div className="appointment-header-parent">
      <Spinner isVisible={loading} />
      <div className="appointment-header">
        <h2>{props.title}</h2>

        <div className="appointment-description">
          {props.cols?.length !== 0 ? (
            props.cols?.map((col) => {
              return <HeaderLabeledValue label={col.label} value={col.value} />;
            })
          ) : (
            <React.Fragment>
              <div className="description-item">
                <h3>Title</h3>
                <p>{props.title}</p>
              </div>
              <div className="description-item">
                <h3>Type of Appointment</h3>
                <p>{props.typeOfAppointment?.text}</p>
              </div>
              <div className="description-item">
                <h3>Appointment ID</h3>
                <p>{props.appointmentId}</p>
              </div>
              <div className="description-item">
                <h3>Agent</h3>
                <p>{props.agent}</p>
              </div>
              <div className="description-item">
                <h3>Way of Appointment</h3>
                <p>{props.wayOfAppointment}</p>
              </div>
              <div className="description-item">
                <h3>Appointment Date Created</h3>
                <p>{formatISODateToDate(props.createdAt?.toString() ?? "")}</p>
              </div>
              <ComponentValidator showNull={!props.hasActions}>
                <div className="description-item">
                  <h3>Actions</h3>
                  <button
                    className="cancel-btn"
                    onClick={() => cancelAppointment(props.id ?? "")}
                  >
                    Cancel Appointment
                  </button>
                </div>
              </ComponentValidator>
            </React.Fragment>
          )}
        </div>
      </div>
      {/* <div className="header-tabs">
        <ul>
          <li className="active">Schedule Appointments</li>
          <li>Calendar</li>
          <li>Agents</li>
        </ul>
      </div> */}
    </div>
  );
};

Header.defaultProps = {
  cols: [],
};
export default Header;
