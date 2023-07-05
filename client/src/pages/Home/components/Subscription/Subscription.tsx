import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import "./Subscription.scss";
import { Container } from "@mui/system";
import { Formik } from "formik";
import { toast } from "react-toastify";
import agent from "api/agent";
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

const Subscription: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    emailAddress: "",
  };

  return (
    <div className="subscription">
      <Container>
        <div className="subscription__content">
          <div className="form">
            <Typography variant="h4">
              Get free resources and get the latest <br /> updates. Subscribe to
              our newsletter.
            </Typography>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, { resetForm }) => {
                setLoading(true);
                if (!values.emailAddress) {
                  toast.info(`Email Address is required.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });

                  return;
                }

                try {
                  const res = await agent.Subscription.create(
                    values.emailAddress
                  );

                  setOpenModal(true);
                  setLoading(false);
                  resetForm();
                } catch (error) {
                  setLoading(false);
                  toast.error(`Email address is already registered.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              }}
            >
              {({ values, setFieldValue, handleSubmit }) => {
                return (
                  <React.Fragment>
                    <input
                      name="emailAddress"
                      value={values.emailAddress}
                      placeholder="Enter your email address here"
                      onChange={(e) =>
                        setFieldValue("emailAddress", e.target.value)
                      }
                    />
                    <button type="submit" onClick={() => handleSubmit()}>
                      Subscribe
                    </button>
                  </React.Fragment>
                );
              }}
            </Formik>
          </div>
          <div className="logo">
            <img src="\assets\images\logos\logo-white.png" alt="CFS logo" />
          </div>
        </div>
      </Container>
      {loading ? <Spinner variant="fixed" /> : null}
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
            <p>We've received your email address.</p>
            <p>
              Comfort Financial Solutions Team will be in touch and we will
              notify you if we have any new updates.
            </p>
          </div>
          <button onClick={() => setOpenModal(false)}>Close</button>
        </Box>
      </Modal>
    </div>
  );
};

export default Subscription;
