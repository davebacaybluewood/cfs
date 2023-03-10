import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import useFetchWebinars, {
  WebinarValuesType,
} from "AdminNew/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import useFetchAgent from "AdminNew/pages/Agents/hooks/useFetchAgent";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "AdminNew/context/UserProvider";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import Spinner from "library/Spinner/Spinner";
import { toast } from "react-toastify";

type AgentWebinarTypes = {
  title: string;
  webinarGuid: string;
  isDisplayed: boolean;
};
const VideoSettings = () => {
  const [agentFilteredWebinars, setAgentFilteredWebinars] = useState<
    AgentWebinarTypes[]
  >([]);
  const [loading, setLoading] = useState(false);

  const userCtx = useContext(UserContext) as any;
  const { webinars, loading: webinarLoading } = useFetchWebinars();
  const { agent, loading: agentLoading } = useFetchAgent(
    userCtx.user.userGuid
  ) as any;
  const agentWebinars = agent?.webinars;

  useEffect(() => {
    const newAgentWebinars = webinars?.map((webinar: WebinarValuesType) => {
      return {
        title: webinar.title,
        isDisplayed: agentWebinars?.includes(webinar?.webinarGuid) || false,
        webinarGuid: webinar.webinarGuid,
      };
    });
    setAgentFilteredWebinars(newAgentWebinars);
  }, [webinarLoading, agentWebinars]);

  const handleSwitchChange = (e: any, mode: boolean, webinarGuid: string) => {
    setLoading(true);
    const data = {
      mode: !mode,
    };
    const headers = {
      Authorization: `Bearer ${getUserToken()}`,
      "Content-Type": "application/json",
    };

    const updatedWebinars = agentFilteredWebinars?.map((webinar) => {
      return {
        title: webinar.title,
        isDisplayed:
          webinar.webinarGuid === webinarGuid ? !mode : webinar.isDisplayed,
        webinarGuid: webinar.webinarGuid,
      };
    });

    axios
      .put(
        ENDPOINTS.AGENT_WEBINAR_UPDATE.replace(
          ":webinarGuid",
          webinarGuid
        ).replace(":agentId", userCtx.user.userGuid?.toString()),
        data,
        { headers }
      )
      .then((response) => {
        setLoading(false);
        setAgentFilteredWebinars(updatedWebinars);
        toast.info(`Webinar ${!mode ? "Added" : "Removed"}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      className="toggle-settings"
    >
      <FormGroup>
        {agentFilteredWebinars?.map(
          (webinar: AgentWebinarTypes, index: number) => {
            return (
              <FormControlLabel
                control={
                  <Switch
                    checked={webinar.isDisplayed}
                    onChange={(e) =>
                      handleSwitchChange(
                        e,
                        webinar.isDisplayed,
                        webinar.webinarGuid
                      )
                    }
                    name={index.toString()}
                  />
                }
                label={webinar.title}
                key={index}
              />
            );
          }
        )}
        {/* <FormControlLabel
          control={
            <Switch
              checked={state.socmeds}
              onChange={handleChange}
              name="socmeds"
            />
          }
          label="Display Social Media"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.contactCard}
              onChange={handleChange}
              name="contactCard"
            />
          }
          label="Display Contact Card"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.testimonials}
              onChange={handleChange}
              name="testimonials"
            />
          }
          label="Display Testimonials"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.calendly}
              onChange={handleChange}
              name="calendly"
            />
          }
          label="Display Calendly"
        /> */}
      </FormGroup>
      <Spinner isVisible={loading || webinarLoading || agentLoading} />
    </FormControl>
  );
};

export default VideoSettings;
