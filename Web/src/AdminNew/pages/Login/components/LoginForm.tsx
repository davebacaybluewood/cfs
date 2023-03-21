import React, { Dispatch, SetStateAction } from "react";
import { login } from "redux/actions/userActions";
import * as Yup from "yup";
import { Alert, Grid } from "@mui/material";
import { Formik } from "formik";
import Button from "library/Button/Button";
import FormikTextInput from "library/Formik/FormikInput";
import Spinner from "library/Spinner/Spinner";
import { ILabeledInput } from "pages/Contact/components/Form/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type LoginValues = {
  emailAddress: string;
  password: string;
};

type LoginFormProps = {
  loading: boolean;
  error: boolean;
  setCheckEmail: Dispatch<SetStateAction<any | undefined>>;
};
const LoginForm: React.FC<LoginFormProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email address field is required."),
    password: Yup.string().required("Password field is required."),
  });

  const initialValues: LoginValues = {
    emailAddress: "",
    password: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data: LoginValues, { setSubmitting }) => {
        setSubmitting(true);
        dispatch(login(data.emailAddress, data.password) as any);
        setSubmitting(false);
      }}
    >
      {({ values, handleSubmit, dirty, isSubmitting }) => {
        const labeledInput: ILabeledInput[] = [
          {
            name: "emailAddress",
            label: "Email Address *",
            value: values.emailAddress,
            colDef: {
              xs: 12,
              md: 12,
              lg: 12,
            },
          },
          {
            name: "password",
            label: "Password *",
            value: values.password,
            colDef: {
              xs: 12,
              md: 12,
              lg: 12,
            },
            type: "password",
          },
        ];
        return (
          <div>
            <div className="form-instructions">
              <h2>
                Welcome to CFS Portal <br /> Sign In to continue.
              </h2>
              <p>Lorem ipsum dolor sit amet, consectetur.</p>
            </div>

            {!!props.error && (
              <Alert variant="filled" severity="error" className="form-alert">
                Invalid Email & Password
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="form">
              <Grid container spacing={1}>
                {labeledInput.map((data, index) => (
                  <Grid item {...{ ...data.colDef }} key={index}>
                    <FormikTextInput
                      label={data.label}
                      variant="filled"
                      fullWidth
                      className="filled-input"
                      name={data.name}
                      isTextArea={data.isTextArea}
                      disabled={data.disabled}
                      type={data.type}
                    />
                  </Grid>
                ))}
              </Grid>
              <Spinner isVisible={isSubmitting || props.loading} />
              <div className="forgot-btn">
                <button type="button" onClick={() => props.setCheckEmail(true)}>
                  Forgot Password?
                </button>
              </div>

              <Button variation="dark" type="submit" className="login-btn">
                LOGIN
              </Button>
              <div className="register-btn">
                <button type="button">Create an Account</button>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
