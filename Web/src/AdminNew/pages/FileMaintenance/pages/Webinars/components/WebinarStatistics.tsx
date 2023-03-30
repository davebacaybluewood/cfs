import { Grid } from "@mui/material";
import Spinner from "AdminNew/components/Spinner/Spinner";
import ENDPOINTS from "constants/endpoints";
import paths from "constants/routes";
import getUserToken from "helpers/getUserToken";
import DashboardCard from "pages/Admin/pages/Dashboard/components/DashboardCard";
import React, { useEffect, useState } from "react";
import {
  FaEnvelopeOpenText,
  FaFly,
  FaSnowman,
  FaUserShield,
} from "react-icons/fa";

type WebinarStatisticsProps = {
  webinarGuid: string;
};
const WebinarStatistics: React.FC<WebinarStatisticsProps> = (props) => {
  const [scheduledAppointmentCount, setScheduledAppointmentCount] = useState({
    loading: false,
    count: 0,
  });
  const [webinarVisitsCount, setWebinarVisitsCount] = useState({
    loading: false,
    count: 0,
  });

  const [webinarShortVideoCount, setWebinarShortVideoCount] = useState({
    loading: false,
    count: 0,
  });

  const [webinarLongVideoCount, setWebinarLongVideoCount] = useState({
    loading: false,
    count: 0,
  });

  useEffect(() => {
    const fetchAppointmentCount = async () => {
      const response = await fetch(
        ENDPOINTS.APPOINTMENT_COUNT_WEBINAR.replace(
          ":webinarGuid",
          props.webinarGuid
        ),
        {
          headers: {
            Authorization: "Bearer " + getUserToken(),
          },
        }
      );
      const data = await response.json();
      setScheduledAppointmentCount({
        loading: false,
        count: data,
      });
    };

    fetchAppointmentCount();
  }, [props.webinarGuid]);

  useEffect(() => {
    const fetchAppointmentCount = async () => {
      const response = await fetch(
        ENDPOINTS.WEBINAR_VISITS_COUNT_ADMIN.replace(
          ":webinarGuid",
          props.webinarGuid
        ),
        {
          headers: {
            Authorization: "Bearer " + getUserToken(),
          },
        }
      );
      const data = await response.json();
      setWebinarVisitsCount({
        loading: false,
        count: data,
      });
    };

    fetchAppointmentCount();
  }, [props.webinarGuid]);

  useEffect(() => {
    const fetchAppointmentCount = async () => {
      const response = await fetch(
        ENDPOINTS.WEBINAR_VIEWS_PER_PAGE.replace(
          ":webinarGuid",
          props.webinarGuid
        ).replace(":page", "SHORT_VIDEO"),
        {
          headers: {
            Authorization: "Bearer " + getUserToken(),
          },
        }
      );
      const data = await response.json();
      setWebinarShortVideoCount({
        loading: false,
        count: data | 0,
      });
    };

    fetchAppointmentCount();
  }, [props.webinarGuid]);

  useEffect(() => {
    const fetchAppointmentCount = async () => {
      const response = await fetch(
        ENDPOINTS.WEBINAR_VIEWS_PER_PAGE.replace(
          ":webinarGuid",
          props.webinarGuid
        ).replace(":page", "LONG_VIDEO"),
        {
          headers: {
            Authorization: "Bearer " + getUserToken(),
          },
        }
      );
      const data = await response.json();
      setWebinarLongVideoCount({
        loading: false,
        count: data | 0,
      });
    };

    fetchAppointmentCount();
  }, [props.webinarGuid]);

  const statistics = [
    {
      countText: "Scheduled Appointment",
      count: scheduledAppointmentCount.loading ? (
        <Spinner />
      ) : (
        scheduledAppointmentCount.count
      ),
      url: paths.login,
      icon: <FaSnowman />,
    },
    {
      countText: "Short Video View",
      count: webinarShortVideoCount.count,
      url: paths.login,
      icon: <FaEnvelopeOpenText />,
    },
    {
      countText: "Long Video View",
      count: webinarLongVideoCount.count,
      url: paths.login,
      icon: <FaFly />,
    },
    {
      countText: "Webinar Visits",
      count: webinarVisitsCount.loading ? (
        <Spinner />
      ) : (
        webinarVisitsCount.count
      ),
      url: paths.login,
      icon: <FaUserShield />,
    },
  ];

  return (
    <Grid container spacing={2} marginBottom={2}>
      {statistics.map((statistic: any, index: number) => (
        <Grid item xs={12} sm={12} md={6} lg={3} key={index}>
          <DashboardCard {...statistic} />
        </Grid>
      ))}
    </Grid>
  );
};

export default WebinarStatistics;
