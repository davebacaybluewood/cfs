import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ENDPOINTS from "constants/endpoints";
import { paths } from "constants/routes";
import US_STATES from "constants/statesAndLocation";
import { Formik } from "formik";
import Button from "library/Button/Button";
import FormikTextInput from "library/Formik/FormikInput";
import Spinner from "library/Spinner/Spinner";
import React, { useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const WebinarForm: React.FC = () => {
  const navigate = useNavigate();
  const { videoId, agentId } = useParams();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    emailAddress: "",
    fullName: "",
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
  const copyToClip = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.info(`URL Copied`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="submission-form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setLoading(true);
          fetch(
            ENDPOINTS.AGENT_WEBINAR_FORM.replace(
              ":webinarId",
              videoId ?? ""
            ).replace(":agentGuid", agentId ?? ""),
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: data.fullName,
                email: data.emailAddress,
                state: data.state,
                videoId,
                agentId,
              }),
            }
          )
            .then((response: any) => {
              return response.json();
            })
            .then((res) => {
              navigate(
                paths.webinarAppointment
                  .replace(":videoId", videoId ?? "")
                  .replace(":agentId", agentId ?? "")
                  .replace(":submissionId", res.submissionId ?? "")
              );
            })
            .catch((error) => console.log(error));
        }}
      >
        {({ handleSubmit, setFieldValue }) => {
          return (
            <React.Fragment>
              <div className="form-instructions">
                <h2>Learn More</h2>
                <p>Schedule with a consultant.</p>
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
                        onChange={(event: SelectChangeEvent) => {
                          setFieldValue("state", event.target.value);
                          setState(event.target.value as string);
                        }}
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
                <div className="webinar-btns-container">
                  <button type="submit" className="submit-btn">
                    Complete Webinar
                  </button>
                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                  <button
                    className="share-btn"
                    type="button"
                    onClick={() => copyToClip()}
                  >
                    <AiOutlineLink />
                    <span>Share Webinar</span>
                  </button>
                </div>
              </form>
              {loading ? <Spinner variant="relative" /> : null}
            </React.Fragment>
          );
        }}
      </Formik>
    </div>
  );
};

export default WebinarForm;
