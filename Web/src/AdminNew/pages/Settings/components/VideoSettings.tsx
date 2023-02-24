import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import useFetchWebinars, {
  WebinarValuesType,
} from "AdminNew/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import useFetchAgent from "AdminNew/pages/Agents/hooks/useFetchAgent";
import { useContext } from "react";
import { UserContext } from "AdminNew/context/UserProvider";

const VideoSettings = () => {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: true,
    socmeds: true,
    testimonials: true,
    contactCard: true,
    calendly: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const userCtx = useContext(UserContext) as any;
  const { webinars } = useFetchWebinars();
  const { agent } = useFetchAgent(userCtx.userGuid) as any;
  const agentWebinars = agent?.webinars;

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      className="toggle-settings"
    >
      <FormGroup>
        {webinars.map((webinar: WebinarValuesType, index: number) => {
          console.log(webinar.webinarGuid);
          return (
            <FormControlLabel
              control={
                <Switch
                  checked={
                    agentWebinars?.includes(webinar?.webinarGuid) || false
                  }
                  onChange={handleChange}
                  name={index.toString()}
                />
              }
              label={webinar.title}
            />
          );
        })}
        <FormControlLabel
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
        />
      </FormGroup>
    </FormControl>
  );
};

export default VideoSettings;
