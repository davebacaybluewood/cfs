import { Box, Container, Grid, Modal, Typography } from "@mui/material";
import { Formik } from "formik";
import Button from "library/Button/Button";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useState } from "react";
import * as Yup from "yup";
import "./Form.scss";
import Spinner from "library/Spinner/Spinner";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Form: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    fullName: "",
    emailAddress: "",
    address: "",
    phoneNumber: "",
    message: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required."),
    emailAddress: Yup.string()
      .email("Invalid Email Address")
      .required("Email address is required."),
    message: Yup.string().required("Please fill this in with your message."),
  });

  return (
    <Container>
      {loading ? <Spinner variant="fixed" /> : null}
      <div className="form-main-container">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setOpenModal(true);
              resetForm();
            }, 3000);
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit }) => {
            return (
              <React.Fragment>
                <Grid container spacing={2}>
                  <Grid
                    item
                    sm={12}
                    md={12}
                    lg={6}
                    className="form-card-container"
                  >
                    <label>Your name * </label>
                    <FormikTextInput
                      placeholder="Enter your full name here"
                      variant="outlined"
                      name="fullName"
                      value={values.fullName}
                    />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    md={12}
                    lg={6}
                    className="form-card-container"
                  >
                    <label>Contact Email Address *</label>
                    <FormikTextInput
                      placeholder="Enter your email address here"
                      variant="outlined"
                      name="emailAddress"
                      value={values.emailAddress}
                    />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    md={12}
                    lg={6}
                    className="form-card-container"
                  >
                    <label>Address (optional) </label>
                    <FormikTextInput
                      placeholder=" "
                      variant="outlined"
                      name="address"
                      value={values.address}
                    />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    md={12}
                    lg={6}
                    className="form-card-container"
                  >
                    <label>Phone Number (optional) </label>
                    <FormikTextInput
                      placeholder=" "
                      variant="outlined"
                      name="phoneNumber"
                      value={values.phoneNumber}
                    />
                  </Grid>

                  <Grid
                    item
                    sm={12}
                    md={12}
                    lg={12}
                    className="form-card-container"
                  >
                    <label>Your Message * </label>
                    <FormikTextInput
                      className="form-message"
                      placeholder="Enter your message here"
                      variant="outlined"
                      name="message"
                      value={values.message}
                      isTextArea
                    />
                  </Grid>
                </Grid>

                <p className="submission-text">
                  By submitting this form you agree to our terms and conditions
                  and our Privacy Policy which explains how we may collect, use
                  and disclose your personal information including to third
                  parties.
                </p>

                <Button variant="danger" onClick={() => handleSubmit()}>
                  Send Message
                </Button>
              </React.Fragment>
            );
          }}
        </Formik>

        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="modal-box-container">
            <div className="modal-image">
              <img src="\assets\images\modal-message.png" alt="" />
            </div>
            <div className="modal-title">
              <h2>High Five!</h2>
            </div>
            <div className="modal-text">
              <p>We've received your message, and we'll contact you shortly.</p>
              <p>
                Comfort Financial Solutions Team will be in touch and we will
                notify you if we have any other questions to your request.
              </p>
            </div>
            <button onClick={() => setOpenModal(false)}>Close</button>
          </Box>
        </Modal>
      </div>
    </Container>
  );
};

export default Form;
