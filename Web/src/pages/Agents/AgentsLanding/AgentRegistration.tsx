import Spinner from "AdminNew/components/Spinner/Spinner";
import { Formik } from "formik";
import Banner from "library/Banner/Banner";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import FormikTextInput from "library/Formik/FormikInput";
import PageTitle from "library/PageTitle/PageTitle";
import React, { Component } from "react";
import * as Yup from "yup";
import {
  Grid,
  Button as MUIButton,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
  useTheme,
  SelectChangeEvent,
  Theme,
} from "@mui/material";
import { Container } from "@mui/system";
import "./AgentRegistration.scss";
import Button from "library/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createAgent } from "redux/actions/agentActions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const langOptions = ["Chinese", "Spanish"];

function getStyles(name: string, language: readonly string[], theme: Theme) {
  return {
    fontWeight:
      language.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AgentRegistration = () => {
  const dispatch = useDispatch();
  const initialValues = {
    fullName: "",
    position: "",
    bio: "",
    avatar: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    twitter: "",
    instagram: "",
    linkedIn: "",
    facebook: "",
    telNumber: "",
    password: "",
    confirmPassword: "",
    languages: [],
  };
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Fullname field is required."),
    position: Yup.string().required("Position field is required."),
    bio: Yup.string().required("Bio field is required."),
    avatar: Yup.string().required("avatar field is required."),
    phoneNumber: Yup.string().required("Phone Number field is required."),
    languages: Yup.array()
      .min(1, "At least one language.")
      .required("At least one language."),
    emailAddress: Yup.string().required("Email Address field is required."),
    address: Yup.string().required("Address field is required."),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Your password is too short."),
    confirmPassword: Yup.string()
      .required("Confirm Password field is required.")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const theme = useTheme();
  const [languages, setLanguages] = React.useState<string[]>([]);
  return (
    <div className="agent-registration-wrapper">
      <PageTitle title="Agent Registration" />
      <Banner
        bigTitle="Agent Registration"
        title="BE PART OF US"
        hasBorder={true}
      />

      <Container>
        <div className="agent-form">
          <div className="form-header">
            <h2>Registration Form</h2>
            <p>All fields are required.</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: any, actions) => {
              console.log(values);
              const saveData = dispatch(
                createAgent(
                  values.fullName,
                  values.position,
                  values.bio,
                  values.avatar,
                  values.phoneNumber,
                  values.emailAddress,
                  values.address,
                  values.twitter,
                  values.instagram,
                  values.linkedIn,
                  values.facebook,
                  values.password,
                  values.telNumber,
                  values.role,
                  values.languages
                ) as any
              );
              if (saveData) {
                toast("Data has been submitted!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                actions.setSubmitting(false);
                actions.resetForm();
              }
            }}
          >
            {({
              values,
              errors,
              setFieldValue,
              isSubmitting,
              touched,
              setFieldTouched,
              handleSubmit,
              resetForm,
            }) => {
              return (
                <React.Fragment>
                  <ComponentValidator showNull={!isSubmitting}>
                    <div className="spinner-form-container">
                      <Spinner />
                    </div>
                  </ComponentValidator>
                  <div className="label-sections">
                    <h2>Account Information</h2>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={4}>
                        <FormikTextInput
                          name="emailAddress"
                          label="Email Address *"
                          value={values.emailAddress}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <FormikTextInput
                          name="password"
                          label="Password *"
                          value={values.password}
                          variant="outlined"
                          type="password"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <FormikTextInput
                          name="confirmPassword"
                          label="Confirm Password *"
                          value={values.confirmPassword}
                          variant="outlined"
                          type="password"
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className="label-sections">
                    <h2>Personal Information</h2>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12}>
                        <FormikTextInput
                          name="fullName"
                          label="Full Name *"
                          value={values.fullName}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <FormikTextInput
                          name="position"
                          label="Position *"
                          value={values.position}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <FormikTextInput
                          name="bio"
                          label="Bio *"
                          value={values.bio}
                          variant="outlined"
                          isTextArea
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          error={Boolean(
                            values.languages.length === 0 && touched.languages
                          )}
                        >
                          <InputLabel id="languages-label">
                            Languages
                          </InputLabel>
                          <Select
                            labelId="languages-label"
                            id="languages-chip"
                            multiple
                            value={values.languages}
                            onChange={(event) => {
                              setFieldValue("languages", event.target.value);
                              setFieldTouched("languages", true);
                            }}
                            variant="outlined"
                            name="languages"
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Chip"
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value: any) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {langOptions.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, languages, theme)}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      {values.languages.length === 0 && touched.languages ? (
                        <p className="form-error">
                          Languages field is required.
                        </p>
                      ) : null}
                      <Grid item xs={12} lg={12}>
                        <h5 className="form-label">Agent Profile Picture</h5>
                        <MUIButton variant="contained" component="label">
                          Upload File
                          <input
                            type="file"
                            hidden
                            name="avatar"
                            onChange={(event) => {
                              setFieldValue(
                                "avatar",
                                event.currentTarget.files![0]
                              );
                            }}
                          />
                        </MUIButton>
                        {/* {errors.avatar ? (
                          <p className="form-error">
                            Profile Picture is required.
                          </p>
                        ) : null} */}
                      </Grid>
                    </Grid>
                  </div>
                  <div className="label-sections">
                    <h2>Contact Information</h2>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={4}>
                        <FormikTextInput
                          name="phoneNumber"
                          label="Phone Number *"
                          value={values.phoneNumber}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <FormikTextInput
                          name="telNumber"
                          label="Telephone Number *"
                          value={values.telNumber}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <FormikTextInput
                          name="address"
                          label="Address *"
                          value={values.address}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className="label-sections">
                    <h2>Social Media Links</h2>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={3}>
                        <FormikTextInput
                          name="twitter"
                          label="Twitter (Optional)"
                          value={values.twitter}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <FormikTextInput
                          name="instagram"
                          label="Instagram (Optional)"
                          value={values.instagram}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <FormikTextInput
                          name="linkedIn"
                          label="LinkedIn (Optional)"
                          value={values.linkedIn}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <FormikTextInput
                          name="facebook"
                          label="Facebook (Optional)"
                          value={values.facebook}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <div className="form-actions">
                      <Button onClick={() => resetForm()}>CLEAR</Button>
                      <Button variation="dark" onClick={() => handleSubmit()}>
                        REGISTER
                      </Button>
                    </div>
                  </div>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                  />
                </React.Fragment>
              );
            }}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default AgentRegistration;
