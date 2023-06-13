import Spinner from "admin/components/Spinner/Spinner";
import { Formik } from "formik";
import Banner from "library/Banner/Banner";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import FormikTextInput from "library/Formik/FormikInput";
import PageTitle from "library/PageTitle/PageTitle";
import React, { useEffect, useState } from "react";
import { Grid, Button as MUIButton, useTheme, Alert } from "@mui/material";
import { Container } from "@mui/system";
import Button from "library/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createAgent } from "redux/actions/agentActions";
import agentRegisterValidationSchema from "./helpers/validationSchema";
import { langOptions } from "./utils";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";
import { ValuesTypes } from "./types";
import { ROLES } from "admin/constants/constants";
import { AGENT_SPECIALTIES } from "constants/constants";
import MultiSelectInputV2 from "library/MultiSelectInput/MultiSelectInputV2";
import MultiSelectInputWithCreate from "library/MultiSelectInput/MultiSelectInputWithCreate";
import Select from "react-select";
import US_STATES from "constants/statesAndLocation";
import "./AgentRegistration.scss";

const AgentRegistration = () => {
  const initialValues: Omit<ValuesTypes, "role"> = {
    firstName: "",
    lastName: "",
    state: "",
    licenseNumber: "",
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
    specialties: [],
  };
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const validationSchema = agentRegisterValidationSchema();
  const [state, setState] = React.useState("");
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { error, success, loading, agent } = useSelector(
    (state: any) => state.agentAdd
  );

  useEffect(() => {
    if (success) {
      navigate(
        paths.agentRegistrationSuccess.replace(":agentId", agent.userGuid)
      );
    }
  }, [success, navigate]);

  const handleFocusBack = () => {
    setThumbnailPreview("");
    window.removeEventListener("focus", handleFocusBack);
  };
  const clickedFileInput = () => {
    window.addEventListener("focus", handleFocusBack);
  };

  return (
    <div className="agent-registration-wrapper">
      <PageTitle title="Portal Registration" />
      <Banner
        bigTitle="Portal Registration"
        title="BE PART OF US"
        hasBorder={true}
        backgroundImage="https://demo.casethemes.net/itfirm/wp-content/uploads/2021/09/bg-pagetitle.jpg"
      />

      <div className="container-wrapper">
        <Container>
          <div className="agent-form">
            <div className="form-header">
              <h2>Registration Form</h2>
              <p>(*) fields are required.</p>
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
                    values.firstName,
                    values.lastName,
                    values.state,
                    values.licenseNumber,
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
                    values.languages,
                    values.specialties
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
                const filledInputStyles = {
                  background: "rgba(0, 0, 0, 0.06)",
                  border: "none",
                  borderBottom:
                    values.state?.length === 0 && touched.state
                      ? "1px solid #d32f2f"
                      : "1px solid #333",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0",
                };

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
                        <Grid item xs={12} sm={12} md={6}>
                          <FormikTextInput
                            name="firstName"
                            label="First Name *"
                            value={values.firstName}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <FormikTextInput
                            name="lastName"
                            label="Last Name *"
                            value={values.lastName}
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
                            name="licenseNumber"
                            label="License Number *"
                            value={values.licenseNumber}
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
                          <h5 className="form-label">
                            Languages (You can choose more than one)
                          </h5>
                          <MultiSelectInputWithCreate
                            options={langOptions.map((language) => {
                              return {
                                keyword: language,
                                label: language,
                                value: language,
                              };
                            })}
                            onChange={(e) => {
                              const modifiedValue = e?.map(
                                (val) => val.keyword
                              );
                              setFieldValue("languages", modifiedValue);
                            }}
                            onCreate={(e) => {
                              const modifiedValue = e?.map(
                                (val) => val.keyword
                              );
                              console.log(e);
                              setFieldValue("languages", modifiedValue);
                            }}
                            placeholder="Select an item to add"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <h5 className="form-label">
                            Specialties (You can choose more than one)
                          </h5>
                          <MultiSelectInputV2
                            options={AGENT_SPECIALTIES.map((specialty) => {
                              return {
                                keyword: specialty,
                                label: specialty,
                                value: specialty,
                              };
                            })}
                            onChange={(e) => {
                              const modifiedValue = e?.map(
                                (val) => val.keyword
                              );
                              setFieldValue("specialties", modifiedValue);
                            }}
                            error={
                              values.specialties.length === 0 &&
                              touched.specialties
                                ? true
                                : false
                            }
                            placeholder="Select an item to add"
                          />
                        </Grid>
                        {values.specialties.length === 0 &&
                        touched.specialties ? (
                          <p className="form-error">
                            Specialties field is required.
                          </p>
                        ) : null}
                        <Grid item xs={12} lg={12}>
                          <h5 className="form-label">
                            Agent Profile Picture (Optional)
                          </h5>
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
                                const fileReader = new FileReader();
                                fileReader.onload = () => {
                                  if (fileReader.readyState === 2) {
                                    setThumbnailPreview(
                                      fileReader.result?.toString() ?? ""
                                    );
                                  }
                                };
                                fileReader.readAsDataURL(
                                  event.target.files![0]
                                );
                                window.removeEventListener(
                                  "focus",
                                  handleFocusBack
                                );
                              }}
                              onClick={clickedFileInput}
                            />
                          </MUIButton>
                          <ComponentValidator showNull={!thumbnailPreview}>
                            <div className="user-img-container">
                              <img
                                src={thumbnailPreview}
                                alt="user-profile-pic"
                              ></img>
                            </div>
                          </ComponentValidator>
                        </Grid>
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
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                          <FormikTextInput
                            name="telNumber"
                            label="Telephone Number (Optional)"
                            value={values.telNumber}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                          <FormikTextInput
                            name="address"
                            label="Business Address (Optional)"
                            value={values.address}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            onChange={(event: any) => {
                              setFieldValue("state", event!.value);
                            }}
                            isSearchable={true}
                            name="color"
                            styles={{
                              placeholder: (defaultStyles) => {
                                return {
                                  ...defaultStyles,
                                  color:
                                    values.state?.length === 0 && touched.state
                                      ? "#d32f2f"
                                      : "hsl(0, 0%, 50%)",
                                };
                              },
                              control: (baseStyles, state) => {
                                return {
                                  ...baseStyles,
                                  fontSize: "15px",
                                  paddingTop: "7px",
                                  paddingBottom: "7px",
                                  borderColor:
                                    values.state?.length === 0 && touched.state
                                      ? "#d32f2f"
                                      : "hsl(0, 0%, 80%)",
                                };
                              },
                            }}
                            options={US_STATES.map((st) => {
                              return {
                                label: st.name,
                                value: st.name,
                              };
                            })}
                          />
                          {values.state.length === 0 && touched.state ? (
                            <p
                              className="form-error"
                              style={{ marginLeft: 10 }}
                            >
                              State field is required.
                            </p>
                          ) : null}
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
                        <Button
                          variant="primary"
                          onClick={() => handleSubmit()}
                        >
                          REGISTER
                        </Button>
                      </div>
                    </div>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                    <pre>{JSON.stringify(errors, null, 2)}</pre>
                    {/* <pre>{JSON.stringify(touched, null, 2)}</pre> */}
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
