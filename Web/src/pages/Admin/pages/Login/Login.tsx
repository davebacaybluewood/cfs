import { Alert, Grid } from "@mui/material";
import { IMAGES } from "constants/constants";
import paths from "constants/routes";
import { Formik } from "formik";
import Button from "library/Button/Button";
import FormikTextInput from "library/Formik/FormikInput";
import Promt from "library/Prompt/Promt";
import Spinner from "library/Spinner/Spinner";
import { ILabeledInput } from "pages/Contact/components/Form/Form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "redux/actions/userActions";
import * as Yup from "yup";
import "./Login.scss";

type LoginValues = {
  emailAddress: string;
  password: string;
};
const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const initialValues: LoginValues = {
    emailAddress: "",
    password: "",
  };

  useEffect(() => {
    if (userInfo) {
      navigate(paths.adminDashboard);
    }
  }, [navigate, userInfo]);

  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email address field is required."),
    password: Yup.string().required("Password field is required."),
  });

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <img src={IMAGES.COMPANY_LOGOS.NEW} alt={IMAGES.COMPANY_LOGOS.NEW} />
        <div className="form-controls">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data: LoginValues, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              dispatch(login(data.emailAddress, data.password) as any);
              console.log(data);
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
                    <h2>ADMIN FORM</h2>
                    <p>(*) fields are required.</p>
                  </div>

                  {!!error && (
                    <Alert
                      variant="filled"
                      severity="error"
                      className="form-alert"
                    >
                      Invalid Credentials — Please check your username &
                      password.
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
                    <Spinner isVisible={isSubmitting || loading} />
                    <Button variation="dark" type="submit">
                      LOGIN
                    </Button>
                  </form>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
