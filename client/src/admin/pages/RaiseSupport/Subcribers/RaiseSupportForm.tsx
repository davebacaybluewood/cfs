import { useState } from "react";
// formik
import { Formik } from "formik";
import FormikTextInput from "library/Formik/FormikInput";
// mui
import {
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// components
import Button from "library/Button/Button";
import ErrorText from "pages/PortalRegistration/components/ErrorText";
import AlertMessage from "./AlertMessage";
// reactquill
import ReactQuill from "react-quill";
import useQuillModules from "./useQuillModules";
// library
import * as Yup from "yup";
import axios from "axios";
// endpoints
import ENDPOINTS from "constants/endpoints";
// constants
import { SUPPORT_TYPE } from "constants/constants";

const RaiseSupportForm = () => {
  const [isIssueEmpty, setIsIssueEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  // shows alert message when state is true
  const [isFormSuccess, setIsFormSuccess] = useState(false);

  // Formik Types
  type RaiseSupportProps = {
    contactNumber: string;
    email: string;
    issue: string;
    name: string;
    subject: string;
    type: string;
    status: string;
  };

  // Formik initial values
  const initialValues = {
    contactNumber: "",
    email: "",
    issue: "",
    name: "",
    subject: "",
    type: "",
    status: "PENDING",
  };

  const realQuillModules = useQuillModules();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email().required("Email is required."),
    contactNumber: Yup.string().required("Contact number is required."),
    subject: Yup.string().required("Subject is required."),
    type: Yup.string().required("Type is required"),
  });

  return (
    <>
      {isFormSuccess && !loading ? (
        <AlertMessage />
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={async (data: RaiseSupportProps) => {
            // CONDITIONAL PURPOSE: issue field does not work YUP validation schema. Can't use name attribute inside react-quill
            if (data.issue !== "") {
              try {
                setLoading(true);
                const response = await axios.post(
                  ENDPOINTS.RAISE_SUPPORT_ROOT,
                  {
                    name: data.name,
                    email: data.email,
                    contactNumber: data.contactNumber,
                    subject: data.subject,
                    issue: data.issue,
                    status: "PENDING",
                    type: data.type,
                  }
                );
                setLoading(false);
                setIsFormSuccess(true);
                setIsIssueEmpty(false);
                return response.data;
              } catch (error) {
                console.error("Error posting data:", error);
              }
            } else {
              setIsIssueEmpty(true);
            }
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleSubmit,
            setFieldValue,
            handleChange,
            touched,
            errors,
            handleBlur,
          }) => {
            return (
              // form element handles submit when enter key is pressed
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Name Field */}
                  <Grid
                    item
                    sm={12}
                    md={12}
                    lg={12}
                    className="form-card-container"
                  >
                    <label htmlFor="">Name</label>
                    <FormikTextInput
                      disabled={loading && true}
                      placeholder={`Enter your name here`}
                      variant="outlined"
                      name="name"
                      value={values.name}
                    />
                  </Grid>
                  {/* Email Field */}
                  <Grid
                    item
                    sm={12}
                    md={12}
                    lg={12}
                    className="form-card-container"
                  >
                    <label htmlFor="">Email</label>
                    <FormikTextInput
                      disabled={loading && true}
                      placeholder={`Enter your email here`}
                      variant="outlined"
                      name="email"
                      value={values.email}
                      type="email"
                    />
                  </Grid>
                  {/* Contact Number Field */}
                  <Grid
                    item
                    sm={12}
                    md={12}
                    lg={12}
                    className="form-card-container"
                  >
                    <label htmlFor="">Contact Number</label>
                    <FormikTextInput
                      disabled={loading && true}
                      placeholder={`Enter your name here`}
                      variant="outlined"
                      name="contactNumber"
                      value={values.contactNumber}
                    />
                  </Grid>
                  {/* Subject Field */}
                  <Grid
                    item
                    sm={12}
                    md={12}
                    lg={12}
                    className="form-card-container"
                  >
                    <label htmlFor="">Subject</label>
                    <FormikTextInput
                      disabled={loading && true}
                      placeholder={`Enter subject here`}
                      variant="outlined"
                      name="subject"
                      value={values.subject}
                    />
                  </Grid>
                  {/* Type */}
                  <Grid
                    item
                    sm={12}
                    md={12}
                    lg={12}
                    className="form-card-container"
                  >
                    <FormControl fullWidth className="form-card-container">
                      <InputLabel id="demo-multiple-chip-label">
                        Type
                      </InputLabel>
                      <Select
                        disabled={loading}
                        onBlur={handleBlur}
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        label="type"
                        sx={{
                          fontSize: "12px",
                          background: loading ? "lightgray" : "",
                        }}
                      >
                        <MenuItem value={SUPPORT_TYPE.BUG}>
                          Select a type
                        </MenuItem>
                        <MenuItem value={SUPPORT_TYPE.BUG}>
                          Report a Bug
                        </MenuItem>
                        <MenuItem value={SUPPORT_TYPE.FEATURE}>
                          Suggest a Feature
                        </MenuItem>
                        <MenuItem value={SUPPORT_TYPE.OTHER}>Other</MenuItem>
                      </Select>
                      {/* Display an error message if the 'type' field has been touched and has an error */}
                      {touched.type && errors.type && (
                        <label
                          style={{
                            color: "#D32F2F",
                            marginTop: "10px",
                            marginLeft: "1rem",
                            fontSize: "13.4px",
                          }}
                        >
                          {errors.type}
                        </label>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Issue */}
                  <Grid item sm={12}>
                    <label htmlFor="">Issue (Required)</label>
                    <p className="react-quill-note">
                      Include as much detail as possible, such as what happened,
                      when it occurred. You can also upload images to help us
                      better understand the problem.
                    </p>
                    <ReactQuill
                      readOnly={loading && true}
                      style={{
                        border: isIssueEmpty ? "red solid 1px" : "none",
                        borderRadius: "5px",
                        background: loading ? "rgb(240, 240, 240)" : "",
                        cursor: loading ? "not-allowed" : "",
                      }}
                      value={values.issue}
                      modules={realQuillModules}
                      onChange={(value) => {
                        setFieldValue("issue", value);
                      }}
                      theme="snow"
                      placeholder="Please describe the issue here."
                    />
                    {/* custom validation error message because YUP doesn't validate ReactQuill */}
                    <ErrorText
                      isError={isIssueEmpty}
                      text="Issue cannot be empty"
                    />
                  </Grid>
                  {/* Submit Button */}
                  <Grid item>
                    <Button
                      onClick={() => {
                        handleSubmit();
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: loading ? "not-allowed" : "",
                      }}
                      type="button"
                      variant="primary"
                      disabled={loading && true}
                    >
                      {loading && (
                        <CircularProgress
                          color="info"
                          style={{ marginRight: "5px" }}
                          size={20}
                        />
                      )}
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default RaiseSupportForm;
