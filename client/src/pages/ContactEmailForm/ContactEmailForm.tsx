import { CircularProgress, Container, Grid } from "@mui/material"
import SimpleNavbar from "layout/SimpleNavbar/SimpleNavbar"
import React, { useState } from "react"
import "./ContactEmailForm.scss"
import { BsFillPinFill, BsFillTelephoneFill } from "react-icons/bs"
import { MdOutlineAlternateEmail } from "react-icons/md"
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai"
import { Formik } from "formik"
import FormikTextInput from "library/Formik/FormikInput"
import * as Yup from "yup"
import Button from "library/Button/Button"
import { toast } from "react-toastify"
import ENDPOINTS from "constants/endpoints"
import { useParams } from "react-router-dom"
import Spinner from "library/Spinner/Spinner"
import nameFallback from "helpers/nameFallback"
import InvalidRoute from "layout/InvalidRoute/InvalidRoute"
import useFetchUserProfile from "admin/hooks/useFetchProfile"
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter"

const ContactEmailForm: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const initialValues: any = {
    emailAddress: "",
    subject: "",
    content: "",
  }

  const validationSchema = Yup.object({
    content: Yup.string().required("Content field is required."),
    emailAddress: Yup.string()
    .required("Email Address field is required.")
    .test(
      "not-same-as-send-to",
      "Sender Email must be different from Send to",
      function (value) {
        return value !== agentInfo.email;
      }
    ),
    subject: Yup.string().required("Subject field is required."),
  })

  const { userGuid } = useParams()

  const { profile, loading: profileLoading } = useFetchUserProfile(
    userGuid ?? ""
  )

  const agentInfo = {
    name: nameFallback(profile?.name, profile?.firstName, profile?.lastName),
    bio: profile?.bio,
    contactNumber: profile?.phoneNumber,
    email: profile?.emailAddress,
    address: profile?.address,
    facebook: profile?.facebook,
    twitter: profile?.twitter,
    instagram: profile?.instagram,
    linkedIn: profile?.linkedIn,
  }

  if (!profile && !profileLoading) {
    return <InvalidRoute />
  }
  return (
    <div className="contact-form-container">
      <SimpleNavbar showAgentLink={true} />
      <DocumentTitleSetter title="Contact Email Form" />
      <Container className="form-main-container">
        <Grid container style={{ height: "100%" }}>
          <Grid sm={12} md={4} lg={4}>
            <div className="form-information">
              <img src="/assets/images/logos/small-logo.png" alt="small-cfs" />
              <h5>Comfort Financial Solutions</h5>

              {profileLoading ? (
                <Spinner variant="relative" />
              ) : (
                <div className="agent-info">
                  <h3>{agentInfo.name}</h3>
                  <p>{agentInfo.bio}</p>

                  <ul className="basic-info">
                    <li>
                      <MdOutlineAlternateEmail />
                      <span>{agentInfo.email}</span>
                    </li>
                    {agentInfo?.contactNumber ? (
                      <li>
                        <BsFillTelephoneFill />
                        <span>{agentInfo.contactNumber}</span>
                      </li>
                    ) : null}
                    {agentInfo?.address ? (
                      <li>
                        <BsFillPinFill />
                        <span>{agentInfo.address}</span>
                      </li>
                    ) : null}
                  </ul>

                  <ul className="social-medias">
                    {agentInfo.facebook ? (
                      <li>
                        <a
                          href={agentInfo.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiFillFacebook />
                        </a>
                      </li>
                    ) : null}
                    {agentInfo.instagram ? (
                      <li>
                        <a
                          href={agentInfo.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiFillInstagram />
                        </a>
                      </li>
                    ) : null}
                    {agentInfo.twitter ? (
                      <li>
                        <a
                          href={agentInfo.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiFillTwitterSquare />
                        </a>
                      </li>
                    ) : null}
                    {agentInfo.linkedIn ? (
                      <li>
                        <a
                          href={agentInfo.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiFillLinkedin />
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </div>
              )}
            </div>
          </Grid>
          <Grid sm={12} md={4} lg={6}>
            <div className="user-form">
              <h2>Contact Email Form</h2>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (data, actions) => {
                  // console.log(data.content)
                  setLoading(true)
                  try {
                    await fetch(
                      ENDPOINTS.CONTACT_EMAIL_FORM.replace(
                        ":agentId",
                        profile?._id ?? ""
                      ),
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          // data to be submitted
                          fromEmail: data.emailAddress,
                          toEmail: agentInfo.email,
                          subject: data.subject,
                          content: data.content,
                        }),
                      }
                    )
                    actions.resetForm()
                    setLoading(false)

                    toast.success(`Email Sent`, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    })
                  } catch (err) {
                    toast.error(`Error Occured`, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    })
                    setLoading(false)
                  }
                }}
              >
                {({ values, handleSubmit }) => {
                  return (
                    <React.Fragment>
                      <div className="form-control">
                        <h5>Sender Email *</h5>
                        <FormikTextInput
                          disabled={loading}
                          name="emailAddress"
                          placeholder="Enter your email address here"
                          value={values.emailAddress}
                          variant="outlined"
                        />
                      </div>
                      <div className="form-control">
                        <h5>Send to: *</h5>
                        <input
                          style={{
                            width: "95%",
                            padding: "16px 12px",
                            border: "1px solid lightgray",
                            borderRadius: "5px",
                          }}
                          disabled
                          value={
                            agentInfo.email
                              ? agentInfo.email
                              : "Receiver email address..."
                          }
                        />
                      </div>
                      <div className="form-control">
                        <h5>Subject *</h5>
                        <FormikTextInput
                          name="subject"
                          placeholder="Enter your subject here"
                          value={values.subject}
                          variant="outlined"
                          disabled={loading}
                        />
                      </div>
                      <div className="form-control">
                        <h5>Body *</h5>
                        <FormikTextInput
                          name="content"
                          placeholder="Enter your content here"
                          value={values.content}
                          variant="outlined"
                          isTextArea
                          disabled={loading}
                        />
                      </div>

                      <Button
                        disabled={loading}
                        variant="danger"
                        onClick={() => handleSubmit()}
                        type="submit"
                      >
                        {loading ? (
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            <CircularProgress color="inherit" size={"2rem"} />
                            <span>Sending...</span>
                          </div>
                        ) : (
                          "Send Email"
                        )}
                      </Button>
                    </React.Fragment>
                  )
                }}
              </Formik>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default ContactEmailForm
