import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import ENDPOINTS from "constants/endpoints";
import { Formik } from "formik";
import Banner from "library/Banner/Banner";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Spinner from "library/Spinner/Spinner";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";

type TestimonialProps = {
  testimonials: {
    title: string;
    name: string;
    comment: string;
  }[];
  agentId: string;
};
type TestimonialType = {
  emailAddress: string;
  fullName: string;
  title: string;
  testimonial: string;
};
const Testimonials: React.FC<TestimonialProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);

  const initialValues: TestimonialType = {
    emailAddress: "",
    fullName: "",
    title: "",
    testimonial: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Fullname field is required."),
    testimonial: Yup.string().required("Testimonial field is required."),
    emailAddress: Yup.string().required("Email Address field is required."),
    title: Yup.string().required("Title field is required."),
  });
  return (
    <div className="testimonials">
      <Spinner isVisible={loading} />
      <Banner
        bigTitle="What Clients Says To Me"
        title="Testimonials"
        hasBorder={true}
      ></Banner>

      <ComponentValidator showNull={props.testimonials?.length === 0}>
        <Grid container spacing={3}>
          {props.testimonials?.map((t: any, index: number) => (
            <Grid item md={6} key={index}>
              <div className="item">
                {/* <div className="abosolute-icon">
                <FaQuoteRight />
              </div> */}
                <p className="testimonial">{t.comment}</p>
                <div className="client-from">
                  <h5>{t.name}</h5>
                  <p>{t.title}</p>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </ComponentValidator>

      <div className="testimonial-actions">
        <button onClick={handleOpen}>Add Testimonials</button>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            setLoading(true);
            try {
              await fetch(
                ENDPOINTS.AGENT_TESTIMONIALS.replace(":agentId", props.agentId),
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    // data to be submitted
                    name: values.fullName,
                    title: values.title,
                    comment: values.testimonial,
                    emailAddress: values.emailAddress,
                  }),
                }
              );
              actions.resetForm();
              setOpen(false);
              setLoading(false);

              toast.success(`Testimonial submitted!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } catch (err) {
              toast.error(`Error Occured`, {
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
            }
          }}
        >
          {({ values, handleSubmit }) => (
            <Dialog
              open={open}
              onClose={handleClose}
              disableScrollLock
              className="testimonial-dialog"
            >
              <DialogTitle className="dialog-title">
                Add Testimonial
              </DialogTitle>
              <DialogContent>
                <DialogContentText className="dialog-description">
                  To submit a testimonial to this agent, please enter your
                  details. We will send updates if the testimonial approves.
                </DialogContentText>
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={12}>
                    <FormikTextInput
                      name="fullName"
                      label="Fullname *"
                      value={values.fullName}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <FormikTextInput
                      name="emailAddress"
                      label="Email Address *"
                      value={values.emailAddress}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <FormikTextInput
                      name="title"
                      label="Title *"
                      value={values.title}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <FormikTextInput
                      name="testimonial"
                      label="Testimonial *"
                      value={values.testimonial}
                      variant="standard"
                      isTextArea
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleSubmit()}>Submit</Button>
              </DialogActions>
            </Dialog>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Testimonials;
