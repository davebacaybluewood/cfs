import React, { useState, useEffect } from "react"
// Formik
import { Formik } from "formik"
import FormikTextInput from "library/Formik/FormikInput"
// Material UI
import { Alert, AlertTitle, Grid } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

// Components
import Button from "library/Button/Button"
import Spinner from "library/Spinner/Spinner"
import ErrorText from "pages/PortalRegistration/components/ErrorText"
// Yup
import * as Yup from "yup"
// ReactQuill
import ReactQuill from "react-quill"
import useQuillModules from "./useQuillModules"
import AlertMessage from "./AlertMessage"

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

  useEffect(() => {
    console.log("FORM IS LOADING")
  }, [loading])

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email().required("Email is required."),
    contactNum: Yup.string().required("Contact number is required."),
    subject: Yup.string().required("Subject is required."),
  })

  return (
    <>
      {loading ? <Spinner variant="fixed" /> : null}
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
              }, 1500)
              setIsFormSuccess(true)
              console.log(data.issue)
              setIsIssueEmpty(false)
              console.log("ISSUES FILLED SUCCESS")
            } else {
              console.log("ISSUES FIELD ERROR")
              setIsIssueEmpty(true)
            }
            // handle empty issue field
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit, setFieldValue, touched, setTouched }) => {
            return (
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
                      style={{
                        border: isIssueEmpty ? "red solid 1px" : "none",
                        borderRadius: "5px",
                      }}
                      value={values.issue}
                      modules={realQuillModules}
                      onChange={(value) => {
                        setFieldValue("issue", value)
                        console.log(value)
                      }}
                      theme="snow"
                      placeholder="Please describe the issue here."
                    />
                    <ErrorText
                      isError={isIssueEmpty}
                      text="Issue cannot be empty"
                    />
                  </Grid>
                  {/* Submit Button */}
                  <Grid item>
                    <Button type="submit" variant="primary">
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
