import { Container, Typography } from "@mui/material";
import Button from "library/Button/Button";
import React from "react";
import "./QuestionForm.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikTextInput from "library/Formik/FormikInput";

const QuestionForm: React.FC = () => {
  const initialValues = {
    fullName: "",
    emailAddress: "",
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
      <div className="question-form-container">
        <div className="question-form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data) => console.log(data)}
          >
            {({ values, handleSubmit }) => {
              return (
                <Container>
                  <div className="form">
                    <div className="form-input">
                      <h6>Name*</h6>
                      <FormikTextInput
                        placeholder="Enter your fullname here ..."
                        variant="outlined"
                        name="fullName"
                        value={values.fullName}
                      />
                    </div>
                    <div className="form-input">
                      <h6>Email address*</h6>
                      <FormikTextInput
                        placeholder="Enter your email address here ..."
                        variant="outlined"
                        name="emailAddress"
                        value={values.emailAddress}
                      />
                    </div>
                    <div className="form-input">
                      <h6>Message*</h6>
                      <FormikTextInput
                        placeholder="Enter your message here ..."
                        variant="outlined"
                        name="message"
                        value={values.message}
                        isTextArea
                      />
                    </div>
                    <div className="questionForm-btn">
                      <Button
                        variant="danger"
                        onClick={() => handleSubmit()}
                        type="submit"
                      >
                        Schedule Event
                      </Button>
                    </div>
                  </div>
                </Container>
              );
            }}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default QuestionForm;
