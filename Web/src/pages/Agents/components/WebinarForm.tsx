import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import paths from "constants/routes";
import US_STATES from "constants/states-and-location";
import { Formik } from "formik";
import FormikDropdown from "library/Formik/FormikDropdown";
import FormikTextInput from "library/Formik/FormikInput";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const WebinarForm: React.FC = () => {
  const navigate = useNavigate();
  const { videoId, agentId } = useParams();
  const submissionId = "639ce557061e6ed3a75acf64";
  const initialValues = {
    emailAddress: "",
    name: "",
    state: "",
  };

  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email address field is required."),
    fullName: Yup.string().required("Name field is required."),
    // state: Yup.string().required("State field is required."),
  });

  const [state, setState] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
  };

  return (
    <div className="submission-form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) =>
          navigate(
            paths.webinarAppointment
              .replace(":videoId", videoId ?? "")
              .replace(":agentId", agentId ?? "")
              .replace(":submissionId", submissionId ?? "")
          )
        }
      >
        {({ values, handleSubmit, dirty, isSubmitting }) => {
          return (
            <React.Fragment>
              <div className="form-instructions">
                <h2>WEBINAR FORM</h2>
                <p>Fill out the form below to view the free webinar.</p>
              </div>

              <form onSubmit={handleSubmit} className="form">
                <Grid container spacing={1}>
                  <Grid item sm={12} md={12} lg={12}>
                    <FormikTextInput
                      label="Full Name"
                      variant="filled"
                      fullWidth
                      className="filled-input"
                      name="fullName"
                      type="text"
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <FormikTextInput
                      label="Email Address"
                      variant="filled"
                      fullWidth
                      className="filled-input"
                      name="emailAddress"
                      type="text"
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <FormControl variant="filled" fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        State
                      </InputLabel>
                      <Select
                        value={state}
                        name="state"
                        label="State"
                        onChange={handleChange}
                      >
                        {US_STATES.map((usState) => (
                          <MenuItem value={usState.name}>
                            {usState.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button variant="contained" type="submit">
                  VIEW WEBINER
                </Button>
              </form>
            </React.Fragment>
          );
        }}
      </Formik>
    </div>
  );
};

export default WebinarForm;
