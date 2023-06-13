import axios from "axios";
import { useEffect, useState } from "react";

const useGetAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const calendlyEndpoints =
    "https://api.calendly.com/event_types?organization=https://api.calendly.com/organizations/51e21000-eb0f-42b9-8b7f-07820d977b74";
  const auth =
    "Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjcxMTU0MjIzLCJqdGkiOiI2ZWRiMDMwMC04ZWI3LTRkZjUtOTE3ZS1kMzRkOTg4Njc4YmQiLCJ1c2VyX3V1aWQiOiI2YjU3ZmQ3Yy1kMDc3LTQ3MWQtYTgzYS0wMzI2MjQwNGJiNjcifQ.YfgK0p_G3pgCiWWlLFVs1aWfK8Q-hYxIRUKIcZGx8xYEIK-vu8E8H3cim0k6kO8HAjEFPjp6WefW7QeNCW-bFQ";

  const fetchAppointments = async () => {
    setIsLoading(true);
    let res = await axios({
      method: "get",
      url: calendlyEndpoints,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
    });

    setAppointments(res.data.collection);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    isLoading,
  };
};

export default useGetAppointments;
