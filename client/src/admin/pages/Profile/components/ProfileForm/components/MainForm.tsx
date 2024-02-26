import {
  Autocomplete,
  Box,
  Grid,
  Button as MUIButton,
  TextField,
} from "@mui/material";
import { AGENT_SPECIALTIES } from "constants/constants";
import { Formik } from "formik";
import Button from "library/Button/Button";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import FormikTextInput from "library/Formik/FormikInput";
import MultiSelectInputV2 from "library/MultiSelectInput/MultiSelectInputV2";
import MultiSelectInputWithCreate from "library/MultiSelectInput/MultiSelectInputWithCreate";
import { langOptions } from "pages/Agents/AgentsLanding/utils";
import React, { useEffect, useState } from "react";
import profileValidationSchema from "../profileValidationSchema";
import getUserToken from "helpers/getUserToken";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { toast } from "react-toastify";
import US_STATES from "constants/statesAndLocation";
import Select from "react-select";
import { ProfileData, profileInitialValues } from "admin/hooks/useFetchProfile";
import ErrorText from "pages/PortalRegistration/components/ErrorText";
import Spinner from "library/Spinner/Spinner";
import AlertMessage from "library/AlertMessage/Alert";
import { AiOutlineWarning } from "react-icons/ai";

interface MainFormProps {
  profile: ProfileData | undefined;
}
const MainForm: React.FC<MainFormProps> = (props) => {
  const validationSchema = profileValidationSchema();
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [state, setState] = React.useState("");

  const handleFocusBack = () => {
    setThumbnailPreview("");
    window.removeEventListener("focus", handleFocusBack);
  };
  const clickedFileInput = () => {
    window.addEventListener("focus", handleFocusBack);
  };

  useEffect(() => {
    setThumbnailPreview(props.profile?.avatar ?? "");
    setState(props.profile?.state ?? "");
  }, [props.profile]);

  return (
    <Formik
      enableReinitialize
      initialValues={props.profile ?? profileInitialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const config = {
          headers: {
            Authorization: "Bearer " + getUserToken(),
            "Content-Type": "multipart/form-data",
          },
        };

        axios
          .put(
            ENDPOINTS.PROFILE.replace(
              ":userGuid",
              props.profile?.userGuid ?? ""
            ),
            values,
            config
          )
          .then((response) => {
            toast.info(`Profile Updated`, {
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
          .then((result) => {
            setSubmitting(false);
            // navigate(paths.profile);
          })
          .catch((err) => setSubmitting(false));
      }}
    >
      {({
        values,
        setFieldValue,
        touched,
        handleSubmit,
        resetForm,
        isSubmitting,
        errors,
        setTouched,
      }) => {
        return (
          <React.Fragment>
            {isSubmitting ? <Spinner variant="fixed" /> : null}
            <div className="label-sections">
              <Grid item xs={12} lg={12}>
                <h5 className="form-label">Agent Profile Picture (Optional)</h5>
                <MUIButton variant="contained" component="label">
                  Upload File
                  <input
                    type="file"
                    hidden
                    name="avatar"
                    onChange={(event) => {
                      setFieldValue("avatar", event.currentTarget.files![0]);
                      const fileReader = new FileReader();
                      fileReader.onload = () => {
                        if (fileReader.readyState === 2) {
                          setThumbnailPreview(
                            fileReader.result?.toString() ?? ""
                          );
                        }
                      };
                      fileReader.readAsDataURL(event.target.files![0]);
                      window.removeEventListener("focus", handleFocusBack);
                    }}
                    onClick={clickedFileInput}
                  />
                </MUIButton>
                <ComponentValidator showNull={!thumbnailPreview}>
                  <div className="user-img-container">
                    <img src={thumbnailPreview} alt="user-profile-pic"></img>
                  </div>
                </ComponentValidator>
              </Grid>
            </div>
            <div className="label-sections">
              <h2>Personal Information</h2>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <FormikTextInput
                    name="firstName"
                    label="First Name *"
                    value={values.firstName}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormikTextInput
                    name="lastName"
                    label="Last Name *"
                    value={values.lastName}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormikTextInput
                    name="licenseNumber"
                    label="License Number *"
                    value={values.licenseNumber}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormikTextInput
                    name="emailAddress"
                    label="Email Address *"
                    value={values.emailAddress}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormikTextInput
                    name="bio"
                    label="Bio *"
                    value={values.bio}
                    variant="filled"
                    isTextArea
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <h2 className="form-label">
                    Languages (You can choose more than one)
                  </h2>
                  <MultiSelectInputWithCreate
                    value={values.languages?.map((data) => {
                      return {
                        keyword: data,
                        label: data,
                        value: data,
                      };
                    })}
                    variant="filled"
                    options={langOptions?.map((language) => {
                      return {
                        keyword: language,
                        label: language,
                        value: language,
                      };
                    })}
                    onChange={(e) => {
                      const modifiedValue = e?.map((val) => val.keyword);
                      setFieldValue("languages", modifiedValue);
                    }}
                    onCreate={(e) => {
                      const modifiedValue = e?.map((val) => val.keyword);
                      setFieldValue("languages", modifiedValue);
                    }}
                    placeholder="Select an item to add"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <h2 className="form-label">
                    Specialties (You can choose more than one)
                  </h2>
                  <MultiSelectInputV2
                    variant="filled"
                    value={values.specialties?.map((data) => {
                      return {
                        keyword: data,
                        label: data,
                        value: data,
                      };
                    })}
                    options={AGENT_SPECIALTIES.map((specialty) => {
                      return {
                        keyword: specialty,
                        label: specialty,
                        value: specialty,
                      };
                    })}
                    onChange={(e) => {
                      const modifiedValue = e?.map((val) => val.keyword);
                      setFieldValue("specialties", modifiedValue);
                    }}
                    error={
                      values.specialties?.length === 0 && touched.specialties
                        ? true
                        : false
                    }
                    closeMenuOnSelect={true}
                    placeholder="Select an item to add"
                  />
                </Grid>
                {values.specialties?.length === 0 && touched.specialties ? (
                  <p className="form-error">Specialties field is required.</p>
                ) : null}
              </Grid>
            </div>
            <div className="label-sections">
              <h2>Contact Information</h2>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3}>
                  <FormikTextInput
                    name="phoneNumber"
                    label="Phone Number *"
                    value={values.phoneNumber}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <FormikTextInput
                    name="address"
                    label="Business Address (Optional)"
                    value={values.address}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <FormikTextInput
                    name="calendlyLink"
                    label="PAW Calendly Link (Optional)"
                    value={values.calendlyLink}
                    variant="filled"
                  />
                  <div className="info-message">
                    <AlertMessage
                      message="This link will be provided by the admin."
                      icon={<AiOutlineWarning />}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Autocomplete
                    id="select-state"
                    sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: "0",
                        },
                      background: "rgba(0, 0, 0, 0.06)",
                    }}
                    options={US_STATES.map((st) => {
                      return st.name;
                    })}
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        {option}
                      </Box>
                    )}
                    onChange={(event: any, newValue: any | null) => {
                      setFieldValue("state", newValue);
                    }}
                    value={values.state}
                    // inputValue={values.state}
                    onInputChange={(event, newInputValue) => {
                      setFieldValue("state", newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State"
                        onBlur={(e) => {
                          if (!values.state) {
                            setTouched({ ...touched, state: true });
                          }
                        }}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  <ErrorText
                    isError={!values.state && !!touched.state}
                    text="State field is required."
                  />
                </Grid>
              </Grid>
            </div>
            <div className="label-sections">
              <h2>Social Media Links</h2>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={2}>
                  <FormikTextInput
                    name="twitter"
                    label="Twitter (Optional)"
                    value={values.twitter}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <FormikTextInput
                    name="instagram"
                    label="Instagram (Optional)"
                    value={values.instagram}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <FormikTextInput
                    name="linkedIn"
                    label="LinkedIn (Optional)"
                    value={values.linkedIn}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <FormikTextInput
                    name="facebook"
                    label="Facebook (Optional)"
                    value={values.facebook}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <FormikTextInput
                    name="discordId"
                    label="Discord ID (Optional)"
                    value={values.discordId}
                    variant="filled"
                  />
                </Grid>
              </Grid>
              <div className="form-actions">
                <Button onClick={() => resetForm()} variant="primary">
                  CLEAR
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                  UPDATE MY PROFILE
                </Button>
              </div>
            </div>
          </React.Fragment>
        );
      }}
    </Formik>
  );
};

export default MainForm;
