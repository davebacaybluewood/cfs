import { Formik } from "formik";
import "./Form.scss";
import * as Yup from "yup";
import { Grid } from "@mui/material";
import FormikTextInput from "library/Formik/FormikInput";
import FormikRadio from "library/Formik/FormikRadio";
import Button from "library/Button/Button";
// import Promt from "library/Prompt/Promt"; future use
// import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import Spinner from "library/Spinner/Spinner";
import Toast from "library/Toast/Toast";
import { submitInquiry } from "redux/actions/inquiryActions";
import { useDispatch } from "react-redux";

type FormikData = {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  subject: string;
  message: string;
  inquiryType: string;
};

export interface ILabeledInput {
  name: string;
  label: string;
  value: string;
  colDef: {
    xs: number;
    md: number;
    lg: number;
  };
  disabled?: boolean;
  isTextArea?: boolean;
  type?: string;
  isAutoComplete?: boolean;
  isDate?: boolean;
}
const Form = () => {
  const [showToast, setShowToast] = useState(false);
  const initialValues = {
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    subject: "",
    message: "",
    inquiryType: "genInquiry",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name field is required."),
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email address field is required."),
    mobileNumber: Yup.string().required("Mobile Number field is required."),
    subject: Yup.string().required("Subject field is required."),
    message: Yup.string().required("Message field is required."),
  });

  const form = useRef<any>();
  const dispatch = useDispatch();

  const emailJSCredsAdmins = {
    service: "service_rs7qsgl",
    template: "template_86hqhae",
    publicKey: "HoGq2N35u7XA9JbtF",
  };

  const emailJSCredsUsers = {
    service: "service_0cqfh79",
    template: "template_86hqhae",
    publicKey: "HoGq2N35u7XA9JbtF",
  };
  return (
    <div className="contact-form">
      <div className="form-instructions">
        <h2>CONTACT FORM</h2>
        <p>All fields are required.</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data: FormikData, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          dispatch(
            submitInquiry(
              data.fullName,
              data.mobileNumber,
              data.emailAddress,
              data.subject,
              data.message,
              data.inquiryType
            ) as any
          );
          setSubmitting(false);
          setShowToast(true);
        }}
      >
        {({ values, handleSubmit, dirty, resetForm, isSubmitting, errors }) => {
          const labeledInput: ILabeledInput[] = [
            {
              name: "fullName",
              label: "Full Name",
              value: values.fullName,
              colDef: {
                xs: 12,
                md: 12,
                lg: 12,
              },
            },
            {
              name: "mobileNumber",
              label: "Mobile Number",
              value: values.mobileNumber,
              colDef: {
                xs: 12,
                md: 6,
                lg: 6,
              },
            },
            {
              name: "emailAddress",
              label: "Email Address",
              value: values.emailAddress,
              colDef: {
                xs: 12,
                md: 6,
                lg: 6,
              },
            },
            {
              name: "subject",
              label: "Subject",
              value: values.subject,
              colDef: {
                xs: 12,
                md: 6,
                lg: 12,
              },
            },
            {
              name: "message",
              label: "Message",
              value: values.message,
              colDef: {
                xs: 12,
                md: 6,
                lg: 12,
              },
              isTextArea: true,
            },
          ];
          return (
            <form onSubmit={handleSubmit} className="form" ref={form}>
              <Grid container spacing={2}>
                {labeledInput.map((data, index) => (
                  <Grid item {...{ ...data.colDef }} key={index}>
                    <FormikTextInput
                      label={data.label}
                      variant="filled"
                      fullWidth
                      className="filled-input"
                      name={data.name}
                    />
                  </Grid>
                ))}
                <Grid item md={12}>
                  <div className="radio-wrapper">
                    <h2>Type of Inquiry</h2>
                    <FormikRadio
                      name="inquiryType"
                      type="radio"
                      value="genInquiry"
                      label="General Inquiry"
                    />
                    <FormikRadio
                      name="inquiryType"
                      type="radio"
                      value="followAppointment"
                      label="Follow Up Appointment"
                    />
                    <FormikRadio
                      name="inquiryType"
                      type="radio"
                      value="initialInformation"
                      label="Initial Information"
                    />
                    <FormikRadio
                      name="inquiryType"
                      type="radio"
                      value="other"
                      label="Other"
                    />
                    {values.inquiryType === "other" && (
                      <FormikTextInput
                        label="Other"
                        variant="filled"
                        fullWidth
                        className="filled-input"
                        name="inquiryTypeOther"
                      />
                    )}
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="flex-end"
                className="button-container"
              >
                <Button onClick={() => resetForm()} className="reset-btn">
                  RESET
                </Button>
                <Button
                  onClick={() => handleSubmit()}
                  className="submit-btn"
                  disabled={Object.keys(errors).length !== 0}
                >
                  SUBMIT
                </Button>
              </Grid>
              <Spinner variant="relative" />
              <Toast setter={setShowToast} isVisible={showToast} />
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Form;
