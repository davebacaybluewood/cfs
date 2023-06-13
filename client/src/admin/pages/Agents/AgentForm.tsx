import { Grid, Button as MUIButton } from "@mui/material";
import { Formik } from "formik";
import FormikTextInput from "library/Formik/FormikInput";
import React from "react";
import "./AgentForm.scss";
import * as Yup from "yup";
import Button from "library/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { CrumbTypes } from "../Dashboard/types";
import Spinner from "admin/components/Spinner/Spinner";
import Title from "admin/components/Title/Title";
import adminPaths from "admin/constants/routes";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: adminPaths.dashboard,
    isActive: false,
  },
  {
    title: "Agents",
    url: adminPaths.adminAgents,
    isActive: false,
  },
  {
    title: "Add Agent",
    url: adminPaths.adminAgentForm,
    isActive: true,
  },
];

const AgentForm: React.FC = () => {
  const navigate = useNavigate();
  const { action } = useParams();
  const dispatch = useDispatch();

  const initialValues = {
    fullName: "",
    position: "",
    bio: "",
    avatar: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    twitter: "",
    instagram: "",
    linkedIn: "",
    facebook: "",
    calendlyLink: "",
  };
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Fullname field is required."),
    position: Yup.string().required("Position field is required."),
    bio: Yup.string().required("Bio field is required."),
    avatar: Yup.string().required("avatar field is required."),
    phoneNumber: Yup.string().required("Phone Number field is required."),
    emailAddress: Yup.string().required("Email Address field is required."),
    address: Yup.string().required("Address field is required."),
    calendlyLink: Yup.string().required("Calendly Link field is required."),
  });

  const backHandler = () => {
    navigate(adminPaths.adminAgents);
  };

  return (
    <Wrapper
      className="agent-form-container"
      loading={false}
      error={false}
      breadcrumb={crumbs}
    >
      <Title
        title={action === "add" ? "Add Agent" : "Edit Agent"}
        subtitle="Fields with (*) are required."
      />
      <div className="agent-form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: any, actions) => {
            // dispatch(
            //   createAgent(
            //     values.fullName,
            //     values.position,
            //     values.bio,
            //     values.avatar,
            //     values.phoneNumber,
            //     values.emailAddress,
            //     values.address,
            //     values.twitter,
            //     values.instagram,
            //     values.linkedIn,
            //     values.facebook,
            //     values.calendlyLink
            //   ) as any
            // );
            actions.resetForm();
          }}
        >
          {({ values, errors, handleSubmit, setFieldValue, isSubmitting }) => {
            return (
              <React.Fragment>
                <ComponentValidator showNull={!isSubmitting}>
                  <div className="spinner-form-container">
                    <Spinner />
                  </div>
                </ComponentValidator>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormikTextInput
                      name="fullName"
                      label="Fullname *"
                      value={values.fullName}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormikTextInput
                      name="position"
                      label="Position *"
                      value={values.position}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormikTextInput
                      name="bio"
                      label="Bio *"
                      value={values.bio}
                      variant="filled"
                      isTextArea
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormikTextInput
                      name="calendlyLink"
                      label="Calendly Link *"
                      value={values.calendlyLink}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <h5 className="form-label">Agent avatar</h5>
                    <MUIButton variant="contained" component="label">
                      Upload File
                      <input
                        type="file"
                        hidden
                        name="avatar"
                        onChange={(event) => {
                          setFieldValue(
                            "avatar",
                            event.currentTarget.files![0]
                          );
                        }}
                      />
                    </MUIButton>
                    {errors.avatar ? (
                      <p className="form-error">Event avatar is required.</p>
                    ) : null}
                  </Grid>
                </Grid>
                <div className="label-sections">
                  <h2>Contact Information</h2>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                      <FormikTextInput
                        name="phoneNumber"
                        label="Phone Number *"
                        value={values.phoneNumber}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <FormikTextInput
                        name="emailAddress"
                        label="Email Address *"
                        value={values.emailAddress}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <FormikTextInput
                        name="address"
                        label="Address *"
                        value={values.address}
                        variant="filled"
                      />
                    </Grid>
                  </Grid>
                </div>
                <div className="label-sections">
                  <h2>Social Media Links</h2>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={3}>
                      <FormikTextInput
                        name="twitter"
                        label="Twitter (Optional)"
                        value={values.twitter}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <FormikTextInput
                        name="instagram"
                        label="Instagram (Optional)"
                        value={values.instagram}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <FormikTextInput
                        name="linkedIn"
                        label="LinkedIn (Optional)"
                        value={values.linkedIn}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <FormikTextInput
                        name="facebook"
                        label="Facebook (Optional)"
                        value={values.facebook}
                        variant="filled"
                      />
                    </Grid>
                  </Grid>
                </div>
                <div className="form-footer">
                  <Button variant="primary" onClick={backHandler}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </Button>
                </div>
              </React.Fragment>
            );
          }}
        </Formik>
      </div>
    </Wrapper>
  );
};

export default AgentForm;
