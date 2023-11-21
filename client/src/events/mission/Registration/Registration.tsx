import React, { useEffect, useState } from "react";
import MissionWrapper from "library/MissionWrapper/MissionWrapper";
import { Grid } from "@mui/material";
import DatePicker from "library/DatePicker/DatePicker";
import FormikTextInput from "library/Formik/FormikInput";
import { Formik } from "formik";
import * as yup from "yup";
import Select, { GroupBase, StylesConfig } from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "./Registration.scss";
import { CFS_STATES, DEFAULT_AA_AVATAR } from "constants/constants";
import { Button as MUIButton } from "@mui/material";
import agent from "api/agent";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import Spinner from "library/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";
import { toast } from "react-toastify";

const Registration: React.FC = () => {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    state: CFS_STATES[0].value,
    zipCode: "",
    birthDate: "",
    profileImage: DEFAULT_AA_AVATAR,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const userGuid = "c29875fc-d064-46ca-8b00-507ef315c62f"; // Testing purposes only, this is not the final approach.

  const { profile } = useFetchUserProfile(userGuid);

  useEffect(() => {
    setLoading(true);
    const checkRegistration = async () => {
      const res = await agent.Mission.checkMissionRegistration(userGuid);

      if (res.status === "SUCCESS") {
        navigate(paths.missions);
      }

      setLoading(false);
    };

    checkRegistration();
  }, [userGuid]);

  const validationSchema = yup.object({
    state: yup.string().required("This field is required."),
    zipCode: yup.number().required("This field is required."),
    birthDate: yup.string().required("This field is required."),
  });

  const submitHandler = async (data: any) => {
    setLoading(true);
    try {
      await agent.Mission.createMissionAgent(
        data.emailAddress,
        data.state,
        data.zipCode,
        data.birthDate,
        data.profileImage
      );
      setLoading(false);
      navigate(paths.missions);
    } catch (error) {
      setLoading(false);
      toast.error("Invalid Data.");
    }
  };
  // React Select
  const reactSelectStyle:
    | StylesConfig<
        {
          value: string;
          label: string;
        },
        false,
        GroupBase<{
          value: string;
          label: string;
        }>
      >
    | undefined = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      fontWeight: "400",
      fontFamily: '"Montserrat", sans-serif',
      padding: ".2rem .5rem",
      fontSize: "1.5rem",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "#fff",
        color: "black",
        fontWeight: "600",
        fontSize: "1.4rem",
        fontFamily: '"Montserrat", sans-serif',

        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
    placeholder: (styles) => ({
      ...styles,
      fontSize: "1.5rem",
      color: "#5a7184",
      fontWeight: "400",
      opacity: "0.7",
      fontFamily: '"Montserrat", sans-serif',
    }),
  };

  /* Profile Image */
  const handleFocusBack = () => {
    setThumbnailPreview("");
    window.removeEventListener("focus", handleFocusBack);
  };
  const clickedFileInput = () => {
    window.addEventListener("focus", handleFocusBack);
  };

  const navigate = useNavigate();
  return (
    <MissionWrapper contentTitle="">
      <div className="registration-container">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={async (data: any) => {
            setLoading(true);
            await agent.Mission.createMissionAgent(
              data.emailAddress,
              data.state,
              data.zipCode,
              data.birthDate,
              data.profileImage
            );
            setLoading(false);
            navigate(paths.missions);
          }}
          validationSchema={validationSchema}
        >
          {({ errors, values, setFieldValue }) => (
            <React.Fragment>
              <div className="form-container">
                {loading ? (
                  <Spinner variant="fixed" />
                ) : (
                  <React.Fragment>
                    <Grid container spacing={2} alignItems={"center"}>
                      <Grid item md={7}>
                        <div className="left-col-content">
                          <h2>Registration</h2>
                          <div className="form-control">
                            <Grid container spacing={2}>
                              <Grid item md={6}>
                                <div className="two-col-form-content ">
                                  <label htmlFor="">First Name</label>
                                  <FormikTextInput
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    value={profile?.firstName}
                                    disabled
                                  />
                                </div>
                              </Grid>
                              <Grid item md={6}>
                                <div className="two-col-form-content">
                                  <label htmlFor="">Last Name</label>
                                  <FormikTextInput
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                    value={profile?.lastName}
                                    disabled
                                  />
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                          <div className="form-control">
                            <label htmlFor="">Email Address</label>
                            <FormikTextInput
                              name="emailAddress"
                              placeholder="Enter Email Address"
                              value={profile?.emailAddress}
                              disabled
                            />
                          </div>
                          <div className="form-control ">
                            <Grid container spacing={2}>
                              <Grid item md={7}>
                                <div className="two-col-form-content ">
                                  <label htmlFor="">State</label>
                                  <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    name="state"
                                    styles={reactSelectStyle}
                                    defaultValue={CFS_STATES[0]}
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={true}
                                    isSearchable={true}
                                    options={CFS_STATES}
                                    placeholder="Select a state"
                                    onChange={(value) =>
                                      setFieldValue("state", value?.value)
                                    }
                                  />
                                </div>
                              </Grid>
                              <Grid item md={5}>
                                <div className="two-col-form-content">
                                  <label htmlFor="">Zip Code</label>
                                  <FormikTextInput
                                    name="zipCode"
                                    type="number"
                                    placeholder="Enter Zip Code"
                                  />
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                          <div className="form-control">
                            <label htmlFor="">Birth Date</label>
                            <div className="date-picker-container">
                              <DatePicker name="birthDate" />
                            </div>
                          </div>
                          <button
                            onClick={() => submitHandler(values)}
                            disabled={!!Object.keys(errors).length}
                          >
                            Join the Mission
                          </button>
                        </div>
                      </Grid>
                      <Grid item md={5}>
                        <div className="right-col-content">
                          <div className="form-actions">
                            {thumbnailPreview ||
                            (typeof values.profileImage === "string" &&
                              values.profileImage) ? (
                              <div className="profile-image-holder">
                                <img
                                  src={
                                    typeof values.profileImage === "string"
                                      ? values.profileImage
                                      : thumbnailPreview
                                  }
                                  alt="user-license-pic"
                                ></img>
                              </div>
                            ) : (
                              <div className="profile-image-holder">
                                <img
                                  src={
                                    profile?.avatar !== DEFAULT_AA_AVATAR
                                      ? profile?.avatar
                                      : DEFAULT_AA_AVATAR
                                  }
                                />
                              </div>
                            )}
                            <MUIButton
                              variant="contained"
                              component="label"
                              className="upload-btn"
                            >
                              Upload an Image
                              <input
                                type="file"
                                hidden
                                accept="image/*"
                                name="profileImage"
                                onChange={(event) => {
                                  setFieldValue(
                                    "profileImage",
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
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                )}
              </div>
              {/* Commented for debugging */}
              {/* <pre> {JSON.stringify(values, null, 2)} </pre>
              <pre> {JSON.stringify(errors, null, 2)} </pre> */}
            </React.Fragment>
          )}
        </Formik>
      </div>
    </MissionWrapper>
  );
};

export default Registration;
