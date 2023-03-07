import { Grid, Paper } from "@mui/material";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import { CrumbTypes } from "AdminNew/pages/Dashboard/types";
import paths from "constants/routes";
import DashboardCard from "pages/Admin/pages/Dashboard/components/DashboardCard";
import React from "react";
import Header from "./components/Header";
import "./AppointmentInformation.scss";
import LabeledValue from "library/LabeledValue/LabeledValue";
import {
  FaCalendarAlt,
  FaClock,
  FaExternalLinkAlt,
  FaGlobeEurope,
  FaLink,
  FaRegClock,
  FaRegEnvelope,
  FaRegStickyNote,
  FaUserAlt,
} from "react-icons/fa";
import { formatISODateOnly } from "helpers/dateFormatter";
import Circle from "library/Icons/Circle";
import { useParams } from "react-router-dom";
import useGetAppointmentInformation from "../../hooks/useGetAppointmentInformation";
import useFetchAgent from "AdminNew/pages/Agents/hooks/useFetchAgent";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { APPOINTMENT_STATUSES } from "AdminNew/constants/constants";

const AppointmentInformation: React.FC = () => {
  const invisibleObj = {
    title: "",
    value: "",
    icon: "",
    cols: {
      sm: 6,
      md: 6,
      lg: 3,
    },
  };
  const { appointmentId } = useParams();
  const { appointmentInfo, loading } = useGetAppointmentInformation(
    appointmentId ?? ""
  );
  const { agent } = useFetchAgent(appointmentInfo?.agentGuid ?? "");
  const appoinment_type =
    appointmentInfo?.appointment_type === "WEBINAR"
      ? "Webinar"
      : "Personal Agent Website";

  const appointmentStatus =
    appointmentInfo?.calendly_status?.toLowerCase() ===
    APPOINTMENT_STATUSES.CANCELLED.toLowerCase()
      ? "danger"
      : appointmentInfo?.calendly_status?.toLowerCase() ===
        APPOINTMENT_STATUSES.ACTIVE.toLowerCase()
      ? "success"
      : "warning";

  const appointmentCols = [
    {
      title: "Name",
      value: appointmentInfo?.name,
      icon: <FaUserAlt />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Email Address",
      value: appointmentInfo?.email,
      icon: <FaUserAlt />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Date Created",
      value: formatISODateOnly(appointmentInfo?.createdAt ?? ""),
      icon: <FaCalendarAlt />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    invisibleObj,
    {
      title: "Appointment Date",
      value: formatISODateOnly(appointmentInfo?.calendly_end_time ?? ""),
      icon: <FaCalendarAlt />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Appointment Start Time",
      value: new Date(
        appointmentInfo?.calendly_start_time ?? ""
      ).toLocaleTimeString(),
      icon: <FaClock />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Appointment End Time",
      value: new Date(
        appointmentInfo?.calendly_end_time ?? ""
      ).toLocaleTimeString(),
      icon: <FaRegClock />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Timezone",
      value: appointmentInfo?.calendly_timezone,
      icon: <FaGlobeEurope />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Appointment Status",
      value: appointmentInfo?.calendly_status?.toLocaleUpperCase(),
      icon: <Circle variant={appointmentStatus} />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    {
      title: "Appointment Link",
      value: (
        <a
          href={appointmentInfo?.meeting_link}
          target="_blank"
          className="link-info"
        >
          {appointmentInfo?.meeting_link} <FaExternalLinkAlt />
        </a>
      ),
      icon: <FaLink />,
      cols: {
        sm: 6,
        md: 6,
        lg: 3,
      },
    },
    invisibleObj,
    invisibleObj,
    {
      title: "Appointment Note",
      value: appointmentInfo?.calendly_notes,
      icon: <FaRegStickyNote />,
      cols: {
        sm: 12,
        md: 12,
        lg: 12,
      },
    },
  ];

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Appointments",
      url: paths.appointments,
      isActive: false,
    },
    {
      title: "Scheduled Appointments",
      url: paths.scheduledAppointments,
      isActive: false,
    },
    {
      title: appointmentInfo?.name + " - " + appoinment_type,
      url: paths.scheduledAppointments,
      isActive: true,
    },
  ];

  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <Header
        title={appointmentInfo?.name ?? ""}
        agent={agent?.name}
        appointmentId={appointmentInfo?._id}
        createdAt={new Date(appointmentInfo?.createdAt ?? "")}
        typeOfAppointment={{
          code: appointmentInfo?.appointment_type ?? "",
          text: appoinment_type,
        }}
        wayOfAppointment="Google Meet"
        hasActions={
          appointmentInfo?.calendly_status !==
          APPOINTMENT_STATUSES.CANCELLED.toLowerCase()
        }
        agentGuid={agent?.userGuid}
        webinarGuid={appointmentInfo?.webinarGuid}
        id={appointmentInfo?._id}
      />
      <div className="appointment-container">
        <Grid container spacing={2}>
          <Grid item sm={12} lg={12}>
            <div className="appointment-information">
              <Grid container spacing={2}>
                {appointmentCols.map((col, index) => {
                  return (
                    <Grid
                      item
                      sm={col.cols.sm}
                      md={col.cols.md}
                      lg={col.cols.lg}
                      marginBottom={index < 9 ? 3 : 0}
                    >
                      <LabeledValue
                        title={col.title}
                        icon={col.icon}
                        subTitle={col.value as string}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </Grid>
          <Grid item sm={12} lg={12}>
            <div className="appointment-information">
              <FullCalendar
                height="75vh"
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: "",
                  center: "title",
                  right: "",
                }}
                initialView="timeGridDay"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={(event) => console.log(event)}
                eventClick={(event) => console.log(event)}
                displayEventTime={false}
                eventTextColor="#FFFFFF"
                initialEvents={[
                  {
                    title: "event 1",
                    date: "2023-03-02T03:02:05.678123Z",
                  },
                  { title: "event 2", date: "2023-03-02T03:04:05.678123Z" },
                ]}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};

DashboardCard.defaultProps = {
  linkLabel: "View All",
};

export default AppointmentInformation;
