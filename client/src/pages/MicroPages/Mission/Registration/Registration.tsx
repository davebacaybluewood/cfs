import React, { useState } from "react";
import MissionPage from "library/MissionPage/MissionPage";
import { Grid } from "@mui/material";
import DatePicker from "library/DatePicker/DatePicker";
import FormikTextInput from "library/Formik/FormikInput";
import { Formik } from "formik";
import * as yup from "yup";
import Select, { GroupBase, StylesConfig } from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "./Registration.scss";
import { CFS_STATES } from "constants/constants";
import { Button as MUIButton } from "@mui/material";

const Registration: React.FC = () => {
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    emailAddress: "",
    state: CFS_STATES[0].value,
    zipCode: "",
    birthDate: "",
    profileImage:
      "https://images.pexels.com/photos/1851243/pexels-photo-1851243.jpeg?auto=compress&cs=tinysrgb&w=1600",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const validationSchema = yup.object({
    fullName: yup.string().required("This field is required."),
    emailAddress: yup
      .string()
      .required("This field is required.")
      .email("Please input a valid email address."),
    state: yup.string().required("This field is required."),
    zipCode: yup.number().required("This field is required."),
    birthDate: yup.string().required("This field is required."),
    profileImage: yup.string().required("This field is required"),
  });

  const submitHandler = (data: any) => {
    console.log("submit", data);
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

  return (
    <MissionPage contentTitle="">
      <div className="registration-container">
        <Formik
          initialValues={initialValues}
          onSubmit={(data: any) => {
            console.log("submit: ", data);
          }}
          validationSchema={validationSchema}
        >
          {({ errors, values, setFieldValue }) => (
            <React.Fragment>
              <div className="form-container">
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item md={7}>
                    <div className="left-col-content">
                      <h2>Registration</h2>
                      <div className="form-control">
                        <label htmlFor="">Full Name</label>
                        <FormikTextInput
                          name="fullName"
                          placeholder="Enter Full Name"
                        />
                      </div>
                      <div className="form-control">
                        <label htmlFor="">Email Address</label>
                        <FormikTextInput
                          name="emailAddress"
                          placeholder="Enter Email Address"
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
                        disabled={
                          !values.fullName ||
                          !values.emailAddress ||
                          !values.state ||
                          !values.zipCode ||
                          !values.birthDate
                        }
                      >
                        Join the Mission
                      </button>
                    </div>
                  </Grid>
                  <Grid item md={5}>
                    <div className="right-col-content">
                      {/* <div className="profile-image-holder">
                        <img
                          src={values.profileImage}
                          alt={values.profileImage}
                        />
                      </div> */}
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
                          <>
                            <img
                              src="https://images.pexels.com/photos/1851243/pexels-photo-1851243.jpeg?auto=compress&cs=tinysrgb&w=1600"
                              alt="https://images.pexels.com/photos/1851243/pexels-photo-1851243.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            />
                          </>
                        )}
                        <MUIButton
                          variant="contained"
                          component="label"
                          className="upload-btn"
                        >
                          Upload File
                          <input
                            type="file"
                            hidden
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
                              fileReader.readAsDataURL(event.target.files![0]);
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
              </div>
              {/* Commented for debugging */}
              {/* <pre> {JSON.stringify(values, null, 2)} </pre>
              <pre> {JSON.stringify(errors, null, 2)} </pre> */}
            </React.Fragment>
          )}
        </Formik>
      </div>
    </MissionPage>
  );
};

export default Registration;
