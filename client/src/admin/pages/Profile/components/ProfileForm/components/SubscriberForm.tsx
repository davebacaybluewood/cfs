import { Grid } from "@mui/material";
import { Formik } from "formik";
import Button from "library/Button/Button";
import FormikTextInput from "library/Formik/FormikInput";
import React from "react";
import getUserToken from "helpers/getUserToken";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { toast } from "react-toastify";
import { ProfileData, profileInitialValues } from "admin/hooks/useFetchProfile";
import Spinner from "library/Spinner/Spinner";
import * as Yup from "yup";

interface SubscriberFormProps {
  profile: ProfileData | undefined;
}
const SubscriberForm: React.FC<SubscriberFormProps> = (props) => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name field is required."),
    lastName: Yup.string().required("Last name field is required."),
    phoneNumber: Yup.string().required("Phone Number field is required."),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={props.profile ?? profileInitialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const config = {
          headers: {
            Authorization: "Bearer " + getUserToken(),
            "Content-Type": "multipart/form-data",
          },
        };

        axios
          .put(
            ENDPOINTS.PROFILE.replace(
              ":userGuid",
              props.profile?.userGuid ?? ""
            ),
            values,
            config
          )
          .then((response) => {
            toast.info(`Profile Updated`, {
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
          .then((result) => {
            setSubmitting(false);
            // navigate(paths.profile);
          })
          .catch((err) => setSubmitting(false));
      }}
    >
      {({ values, handleSubmit, resetForm, isSubmitting }) => {
        return (
          <React.Fragment>
            {isSubmitting ? <Spinner variant="fixed" /> : null}
            <div className="label-sections">
              <h2>Personal Information</h2>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <FormikTextInput
                    name="firstName"
                    label="First Name *"
                    value={values.firstName}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormikTextInput
                    name="lastName"
                    label="Last Name *"
                    value={values.lastName}
                    variant="filled"
                  />
                </Grid>
              </Grid>
            </div>
            <div className="label-sections">
              <h2>Contact Information</h2>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormikTextInput
                    name="phoneNumber"
                    label="Phone Number *"
                    value={values.phoneNumber}
                    variant="filled"
                  />
                </Grid>
              </Grid>
              <div className="form-actions">
                <Button onClick={() => resetForm()} variant="primary">
                  CLEAR
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                  UPDATE MY PROFILE
                </Button>
              </div>
            </div>
          </React.Fragment>
        );
      }}
    </Formik>
  );
};

export default SubscriberForm;
