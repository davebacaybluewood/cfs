import Spinner from "AdminNew/components/Spinner/Spinner";
import { Formik, useFormikContext } from "formik";
import Banner from "library/Banner/Banner";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import FormikTextInput from "library/Formik/FormikInput";
import PageTitle from "library/PageTitle/PageTitle";
import React, { useEffect } from "react";
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
  Alert,
} from "@mui/material";
import { Container } from "@mui/system";
import "./AgentRegistration.scss";
import Button from "library/Button/Button";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { createAgent } from "redux/actions/agentActions";
import agentRegisterValidationSchema from "./helpers/validationSchema";
import getStyles from "./helpers/getStyles";
import { langOptions, MenuProps } from "./utils";
import { useNavigate } from "react-router-dom";
import paths from "constants/routes";
import { ValuesTypes } from "./types";
import { ROLES } from "AdminNew/constants/constants";

const AgentRegistration = () => {
  const initialValues: Omit<ValuesTypes, "role"> = {
    fullName: "",
    position: "",
    bio: "",
    avatar: "",
    phoneNumber: "",
    emailAddress: "",
    address: "B",
    twitter: "",
    instagram: "",
    linkedIn: "",
    facebook: "",
    telNumber: "",
    password: "",
    confirmPassword: "",
    languages: [],
  };

  const validationSchema = agentRegisterValidationSchema();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { error, success, loading, agent } = useSelector(
    (state: any) => state.agentAdd
  );

  useEffect(() => {
    if (success) {
      navigate(paths.agentRegistrationSuccess.replace(":agentId", agent._id));
    }
  }, [success, navigate]);

  return (
    <div className="agent-registration-wrapper">
      <PageTitle title="Agent Registration" />
      <Banner
        bigTitle="Agent Registration"
        title="BE PART OF US"
        hasBorder={true}
        backgroundImage="https://demo.casethemes.net/itfirm/wp-content/uploads/2021/09/bg-pagetitle.jpg"
      />

      <div className="container-wrapper">
        <Container>
          <div className="agent-form">
            <div className="form-header">
              <h2>Registration Form</h2>
              <p>All fields are required.</p>
            </div>
            <ComponentValidator showNull={!error}>
              <Alert variant="filled" severity="error" className="form-alert">
                Email Already Exist
              </Alert>
            </ComponentValidator>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values: Omit<ValuesTypes, "role">, actions) => {
                dispatch(
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
                    ROLES.ROLE_AGENT,
                    values.languages
                  ) as any
                );
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
                    <ComponentValidator showNull={!loading}>
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
                                  style={getStyles(
                                    name,
                                    values.languages,
                                    theme
                                  )}
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

                    {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                    <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                  </React.Fragment>
                );
              }}
            </Formik>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AgentRegistration;
