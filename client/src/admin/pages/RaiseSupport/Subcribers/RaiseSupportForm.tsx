import React, { useState } from "react"
// Formik
import { Formik } from "formik"
import FormikTextInput from "library/Formik/FormikInput"
// Material UI
import { Grid, CircularProgress } from "@mui/material"
// Components
import Button from "library/Button/Button"
import ErrorText from "pages/PortalRegistration/components/ErrorText"
import AlertMessage from "./AlertMessage"
// Yup
import * as Yup from "yup"
// ReactQuill
import ReactQuill from "react-quill"
import useQuillModules from "./useQuillModules"

const RaiseSupportForm = () => {
  const [isIssueEmpty, setIsIssueEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFormSuccess, setIsFormSuccess] = useState(false)
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    contactNum: "",
    subject: "",
    issue: "",
  })
  const realQuillModules = useQuillModules()

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email().required("Email is required."),
    contactNum: Yup.string().required("Contact number is required."),
    subject: Yup.string().required("Subject is required."),
  })

  return (
    <>
      {isFormSuccess && !loading ? (
        <AlertMessage />
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={async (data) => {
            if (data.issue) {
              setLoading(true)
              // test loading
              setTimeout(() => {
                setLoading(false)
              }, 2000)
              setIsFormSuccess(true)
              setIsIssueEmpty(false)
            } else {
              setIsIssueEmpty(true)
            }
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit, setFieldValue }) => {
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
                    <label htmlFor="">Name (Required)</label>
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
                    <label htmlFor="">Email (Required)</label>
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
                    <label htmlFor="">Contact Number (Required)</label>
                    <FormikTextInput
                      disabled={loading && true}
                      placeholder={`Enter your name here`}
                      variant="outlined"
                      name="contactNum"
                      value={values.contactNum}
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
                    <label htmlFor="">Subject (Required)</label>
                    <FormikTextInput
                      disabled={loading && true}
                      placeholder={`Enter subject here`}
                      variant="outlined"
                      name="subject"
                      value={values.subject}
                    />
                  </Grid>
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
                        setFieldValue("issue", value)
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
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: loading ? "not-allowed" : "",
                      }}
                      type="submit"
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
            )
          }}
        </Formik>
      )}
    </>
  )
}

export default RaiseSupportForm
