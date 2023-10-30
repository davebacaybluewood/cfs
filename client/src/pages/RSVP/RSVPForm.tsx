import { Container, Grid } from "@mui/material";
import SimpleNavbar from "layout/SimpleNavbar/SimpleNavbar";
import React, { useState } from "react";
import { Formik } from "formik";
import FormikTextInput from "library/Formik/FormikInput";
import * as Yup from "yup";
import Button from "library/Button/Button";
import Spinner from "library/Spinner/Spinner";
import "./RSVPForm.scss";
import { FaClock } from "react-icons/fa";
import agent from "api/agent";
import { useParams } from "react-router-dom";

const RSVPForm: React.FC = () => {
  const { eventId } = useParams();
  const initialValues = {
    emailAddress: "",
    firstName: "",
    lastName: "",
    remarks: "",
    phoneNumber: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name field is required."),
    lastName: Yup.string().required("Last name field is required."),
    emailAddress: Yup.string().required("Email Address field is required."),
    phoneNumber: Yup.string().required("Phone Number field is required."),
  });

  const [loading, setLoading] = useState(false);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  return (
    <div className="rsvp-form-container">
      <SimpleNavbar />

      <Container className="form-main-container">
        <Grid container style={{ height: "100%" }}>
          <Grid sm={12} md={4} lg={4}>
            <div className="form-information">
              <img src="/assets/images/logos/small-logo.png" alt="small-cfs" />
              <h5>Comfort Financial Solutions</h5>
              <h2>National Life Product Training</h2>

              <ul className="basic-info">
                <li>
                  <FaClock />
                  <span>30mins</span>
                </li>
              </ul>

              <p>
                Join us on Tuesday, October 24, 2023, at 10:00 AM for an
                exclusive National Life Product Training Webinar designed
                especially for our dedicated agents. Discover how to master the
                National Life product portfolio, provide tailored solutions to
                your clients, and excel in your role. Elevate your skills, boost
                your performance, and become the go-to National Life expert.
              </p>
            </div>
          </Grid>
          <Grid sm={12} md={4} lg={6}>
            <div className="user-form">
              {isDataSubmitted ? (
                <div className="success-message">
                  <img src="\assets\images\modal-message.png" />
                  <h2>Your RSVP has been submitted</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              ) : (
                <React.Fragment>
                  <h2>Enter Details</h2>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (data) => {
                      setLoading(true);
                      const req = await agent.RSVP.submitRSVP(
                        data.firstName,
                        data.lastName,
                        data.emailAddress,
                        data.phoneNumber,
                        data.remarks,
                        eventId ?? ""
                      );

                      setLoading(false);
                      setIsDataSubmitted(true);
                    }}
                  >
                    {({ values, handleSubmit }) => {
                      return (
                        <React.Fragment>
                          <Grid container spacing={2}>
                            <Grid item sm={12} md={6} lg={6}>
                              <div className="form-control">
                                <h5>First Name (Required)</h5>
                                <FormikTextInput
                                  name="firstName"
                                  placeholder="Enter your first name here"
                                  value={values.firstName}
                                  variant="outlined"
                                />
                              </div>
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} paddingTop={0}>
                              <div className="form-control">
                                <h5>Last Name (Required)</h5>
                                <FormikTextInput
                                  name="lastName"
                                  placeholder="Enter your last name here"
                                  value={values.lastName}
                                  variant="outlined"
                                />
                              </div>
                            </Grid>
                            <Grid item sm={12} lg={12} paddingTop={0}>
                              <div className="form-control">
                                <h5>Email Address (Required)</h5>
                                <FormikTextInput
                                  name="emailAddress"
                                  placeholder="Enter your email address here"
                                  value={values.emailAddress}
                                  variant="outlined"
                                />
                              </div>
                            </Grid>
                            <Grid item sm={12} lg={12} paddingTop={0}>
                              <div className="form-control">
                                <h5>Phone Number (Required)</h5>
                                <FormikTextInput
                                  name="phoneNumber"
                                  placeholder="Enter your phone number here"
                                  value={values.phoneNumber}
                                  variant="outlined"
                                />
                              </div>
                            </Grid>
                            <Grid item sm={12} lg={12}>
                              <div className="form-control">
                                <h5>Remarks</h5>
                                <FormikTextInput
                                  name="remarks"
                                  placeholder="Enter your remarks here"
                                  value={values.remarks}
                                  variant="outlined"
                                  isTextArea
                                />
                              </div>
                            </Grid>
                          </Grid>
                          <Button
                            variant="danger"
                            onClick={() => handleSubmit()}
                          >
                            Submit RSVP
                          </Button>
                        </React.Fragment>
                      );
                    }}
                  </Formik>
                </React.Fragment>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
      {loading ? <Spinner variant="fixed" /> : null}
    </div>
  );
};

export default RSVPForm;
