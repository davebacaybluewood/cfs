import { Grid } from "@mui/material";
import { Formik } from "formik";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useContext, useState } from "react";
import { UserContext } from "admin/context/UserProvider";
import { useNavigate } from "react-router-dom";
import getUserToken from "helpers/getUserToken";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { toast } from "react-toastify";
import FixedSpinner from "library/Spinner/Spinner";
import { paths } from "constants/routes";
import * as Yup from "yup";
import Button from "library/Button/Button";
import { ProfileData } from "admin/hooks/useFetchProfile";
import Spinner from "library/Spinner/Spinner";

interface MainFormProps {
  profile: ProfileData | undefined;
}
const MainForm: React.FC<MainFormProps> = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Current password field is required"),
    newPassword: Yup.string()
      .required("New password field is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must contain 8 characters, one Uppercase, one lowercase, one number and one special case character."
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null as any], "Passwords must match")
      .required("Confirm password field is required"),
  });

  const { user } = useContext(UserContext);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setLoading(true);
        const config = {
          headers: {
            Authorization: "Bearer " + getUserToken(),
          },
        };

        axios
          .put(
            ENDPOINTS.PROFILE_CHANGE_PASSWORD.replace(
              ":userGuid",
              user?.userGuid ?? ""
            ),
            values,
            config
          )
          .then((response) => {
            navigate(paths.profile);
            setLoading(false);
            toast.info(`Password Updated`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((err) => {
            toast.error(`Invalid Password`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setLoading(false);
          });
      }}
    >
      {({ values, handleSubmit, resetForm, isSubmitting }) => {
        return (
          <React.Fragment>
            {loading ? <Spinner variant="fixed" /> : null}
            <div className="label-sections">
              <h2>Fill up the required fields</h2>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormikTextInput
                    name="password"
                    label="Current Password *"
                    value={values.password}
                    variant="filled"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormikTextInput
                    name="newPassword"
                    label="New Password *"
                    value={values.newPassword}
                    variant="filled"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormikTextInput
                    name="confirmPassword"
                    label="Confirm Password *"
                    value={values.confirmNewPassword}
                    variant="filled"
                    type="password"
                  />
                </Grid>
              </Grid>
              <div className="form-actions">
                <Button onClick={() => resetForm()}>CLEAR</Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                  UPDATE MY PASSWORD
                </Button>
              </div>
            </div>
          </React.Fragment>
        );
      }}
    </Formik>
  );
};

export default MainForm;
