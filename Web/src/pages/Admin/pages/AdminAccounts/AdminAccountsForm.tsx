import { Formik } from "formik";
import Title from "pages/Admin/components/Title/Title";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { ILabeledInput } from "pages/Contact/components/Form/Form";
import FormikTextInput from "library/Formik/FormikInput";
import { Alert, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminAccountsForm.scss";
import Button from "library/Button/Button";
import paths from "constants/routes";
import { USER_ADD_ACTION_TYPES } from "constants/redux-constants";
import { registerUser } from "redux/actions/userActions";

const AdminAccountsForm: React.FC = () => {
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Fullname field is required."),
    emailAddress: Yup.string().required("Email Address field is required."),
    password: Yup.string().required("Password field is required."),
    confirmPassword: Yup.string()
      .required("Confirm password field is required.")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitUserRegister = useSelector(
    (state: any) => state.userAdminRegister
  );
  useEffect(() => {
    if (submitUserRegister?.success) {
      dispatch({ type: USER_ADD_ACTION_TYPES.USER_ADD_RESET });
      navigate(paths.adminAccounts);
    }

    if (id !== "add") {
      // dispatch(listSingleEvent(id ?? "") as any);
    }
  }, [dispatch, navigate, submitUserRegister?.success, id]);

  const initialValues = {
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  };
  const headerLabel =
    id === "add" ? "Add Admin Account" : "Update Admin Account";

  if (submitUserRegister.loading) {
    return <p>Loading ...</p>;
  }

  const backHandler = () => {
    navigate(paths.adminAccounts);
  };

  return (
    <div className="page-form">
      <Title title={headerLabel} subtitle="Field with (*) is required." />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: any, actions) => {
          actions.setSubmitting(true);
          dispatch(
            registerUser(
              values.fullName,
              values.emailAddress,
              values.password
            ) as any
          );
        }}
      >
        {({ values, handleSubmit, errors }) => {
          const labeledInput: ILabeledInput[] = [
            {
              name: "fullName",
              label: "Fullname *",
              value: values.fullName,
              colDef: {
                xs: 12,
                md: 12,
                lg: 12,
              },
            },
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
                lg: 6,
              },
              type: "password",
            },
            {
              name: "confirmPassword",
              label: "Confirm Password *",
              value: values.confirmPassword,
              colDef: {
                xs: 12,
                md: 12,
                lg: 6,
              },
              type: "password",
            },
          ];
          return (
            <form
              onSubmit={handleSubmit}
              className="form"
              encType="multipart/form-data"
            >
              {!!submitUserRegister.error ? (
                <Alert variant="filled" severity="error" className="form-alert">
                  Email address already exist — Please enter a different email
                  address.
                </Alert>
              ) : null}

              <Grid container spacing={2}>
                {labeledInput.map((data, index: number) => (
                  <Grid item {...{ ...data.colDef }} key={index}>
                    <FormikTextInput
                      label={data.label}
                      isDate={data.isDate}
                      variant="filled"
                      fullWidth
                      className="filled-input"
                      name={data.name}
                      isTextArea={data.isTextArea}
                      disabled={data.disabled}
                      value={data.value}
                      type={data.type}
                    />
                  </Grid>
                ))}
              </Grid>
              <div className="form-footer">
                <Button variation="light" onClick={backHandler}>
                  Back
                </Button>
                <Button variation="dark" type="submit">
                  Submit
                </Button>
              </div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AdminAccountsForm;
