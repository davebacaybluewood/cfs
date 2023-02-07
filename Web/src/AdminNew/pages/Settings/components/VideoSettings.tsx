import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

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

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      className="toggle-settings"
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={state.gilad}
              onChange={handleChange}
              name="gilad"
            />
          }
          label="Video 1"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.jason}
              onChange={handleChange}
              name="jason"
            />
          }
          label="Video 2"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.antoine}
              onChange={handleChange}
              name="antoine"
            />
          }
          label="Video 3"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.socmeds}
              onChange={handleChange}
              name="socmeds"
            />
          }
          label="Display Social Medias"
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
