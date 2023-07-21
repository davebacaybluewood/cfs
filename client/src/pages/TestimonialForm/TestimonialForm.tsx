import { Container, Grid } from "@mui/material";
import SimpleNavbar from "layout/SimpleNavbar/SimpleNavbar";
import React, { useState } from "react";
import "./TestimonialForm.scss";
import { BsFillPinFill, BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { Formik } from "formik";
import FormikTextInput from "library/Formik/FormikInput";
import * as Yup from "yup";
import useFetchUserProfile, {
  TestimonialType,
} from "admin/hooks/useFetchProfile";
import Button from "library/Button/Button";
import { toast } from "react-toastify";
import ENDPOINTS from "constants/endpoints";
import { useParams } from "react-router-dom";
import Spinner from "library/Spinner/Spinner";
import nameFallback from "helpers/nameFallback";
import InvalidRoute from "layout/InvalidRoute/InvalidRoute";

const TestimonialForm: React.FC = () => {
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

  const [loading, setLoading] = useState(false);
  const { userGuid } = useParams();

  const { profile, loading: profileLoading } = useFetchUserProfile(
    userGuid ?? ""
  );

  const agentInfo = {
    name: nameFallback(profile?.name, profile?.firstName, profile?.lastName),
    bio: profile?.bio,
    contactNumber: profile?.phoneNumber,
    email: profile?.emailAddress,
    address: profile?.address,
    facebook: profile?.facebook,
    twitter: profile?.twitter,
    instagram: profile?.instagram,
    linkedIn: profile?.linkedIn,
  };

  if (!profile && !profileLoading) {
    return <InvalidRoute />;
  }
  return (
    <div className="testimonial-form-container">
      <SimpleNavbar />

      <Container className="form-main-container">
        <Grid container style={{ height: "100%" }}>
          <Grid sm={12} md={4} lg={4}>
            <div className="form-information">
              <img src="/assets/images/logos/small-logo.png" alt="small-cfs" />
              <h5>Comfort Financial Solutions</h5>

              {profileLoading ? (
                <Spinner variant="relative" />
              ) : (
                <div className="agent-info">
                  <h3>{agentInfo.name}</h3>
                  <p>{agentInfo.bio}</p>

                  <ul className="basic-info">
                    <li>
                      <MdOutlineAlternateEmail />
                      <span>{agentInfo.email}</span>
                    </li>
                    {agentInfo?.contactNumber ? (
                      <li>
                        <BsFillTelephoneFill />
                        <span>{agentInfo.contactNumber}</span>
                      </li>
                    ) : null}
                    {agentInfo?.address ? (
                      <li>
                        <BsFillPinFill />
                        <span>{agentInfo.address}</span>
                      </li>
                    ) : null}
                  </ul>

                  <ul className="social-medias">
                    {agentInfo.facebook ? (
                      <li>
                        <a
                          href={agentInfo.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiFillFacebook />
                        </a>
                      </li>
                    ) : null}
                    {agentInfo.instagram ? (
                      <li>
                        <a
                          href={agentInfo.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiFillInstagram />
                        </a>
                      </li>
                    ) : null}
                    {agentInfo.twitter ? (
                      <li>
                        <a
                          href={agentInfo.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiFillTwitterSquare />
                        </a>
                      </li>
                    ) : null}
                    {agentInfo.linkedIn ? (
                      <li>
                        <a
                          href={agentInfo.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiFillLinkedin />
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </div>
              )}
            </div>
          </Grid>
          <Grid sm={12} md={4} lg={6}>
            <div className="user-form">
              <h2>Enter Details</h2>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (data, actions) => {
                  setLoading(true);
                  try {
                    await fetch(
                      ENDPOINTS.AGENT_TESTIMONIALS.replace(
                        ":agentId",
                        profile?._id ?? ""
                      ),
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          // data to be submitted
                          name: data.fullName,
                          title: data.title,
                          comment: data.testimonial,
                          emailAddress: data.emailAddress,
                        }),
                      }
                    );
                    actions.resetForm();
                    setLoading(false);

                    toast.success(`Testimonial Submitted`, {
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
                {({ values, handleSubmit }) => {
                  return (
                    <React.Fragment>
                      <div className="form-control">
                        <h5>Name *</h5>
                        <FormikTextInput
                          name="fullName"
                          placeholder="Enter your name here"
                          value={values.fullName}
                          variant="outlined"
                        />
                      </div>
                      <div className="form-control">
                        <h5>Email Address *</h5>
                        <FormikTextInput
                          name="emailAddress"
                          placeholder="Enter your email address here"
                          value={values.emailAddress}
                          variant="outlined"
                        />
                      </div>
                      <div className="form-control">
                        <h5>Title *</h5>
                        <FormikTextInput
                          name="title"
                          placeholder="Enter your title here"
                          value={values.title}
                          variant="outlined"
                        />
                      </div>
                      <div className="form-control">
                        <h5>Testimonial *</h5>
                        <FormikTextInput
                          name="testimonial"
                          placeholder="Enter your testimonial here"
                          value={values.testimonial}
                          variant="outlined"
                          isTextArea
                        />
                      </div>

                      <Button variant="danger" onClick={() => handleSubmit()}>
                        Submit Testimonial
                      </Button>
                    </React.Fragment>
                  );
                }}
              </Formik>
            </div>
          </Grid>
        </Grid>
      </Container>
      {loading ? <Spinner variant="fixed" /> : null}
    </div>
  );
};

export default TestimonialForm;
