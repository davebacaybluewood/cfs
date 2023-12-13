import React, { useState } from "react";
import { Formik } from "formik";
import SubscribeAccountDetails from "./SubscribeAccountDetails";
import Spinner from "library/Spinner/Spinner";
import { Alert } from "@mui/material";
import { ValuesType } from "./models";
import validationSchema from "./validationSchema";
import classNames from "classnames";
import { MAIN_IMAGES } from "constants/constants";
import agent from "api/agent";
import "./Subscribe.scss";
import { useLocation } from "react-router-dom";

interface SubscribeProps {
  isAdmin?: boolean;
}
const Subscribe: React.FC<SubscribeProps> = (props) => {
  const [stage, setStage] = useState(1);
  const [invalid, setInvalid] = useState({
    isInvalid: false,
    text: "",
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
    confirmationUserCode: "",
    templateId: '',
    eventId: ''
  };

  const search = useLocation().search;
  const userGuid = new URLSearchParams(search).get("userGuid");
  const templateId = new URLSearchParams(search).get("templateId");
  const eventId = new URLSearchParams(search).get("eventId");


  return (
    <div className="portal-registration-container">
      <div className="left-col">
        <div className="captions">
          {stage === 6 ? (
            <h1 style={{ fontSize: "6rem" }}>Congratulations!</h1>
          ) : (
            <h1 className={classNames({ "left-header": props.isAdmin })}>
              {props.isAdmin ? (
                <React.Fragment>
                  CFS <br /> Registration
                </React.Fragment>
              ) : (
                <React.Fragment>
                  Welcome <br /> to CFS
                </React.Fragment>
              )}
            </h1>
          )}
          {!props.isAdmin ? (
            <React.Fragment>
              {stage === 1 ? (
                <p>
                  Start your journey <br /> with us today.
                </p>
              ) : stage === 6 ? (
                <p>Registration Completed</p>
              ) : (
                <p>
                  Please provide your <br /> personal information.
                </p>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {stage === 1 ? (
                <p>
                  Please provide the agent <br /> information.
                </p>
              ) : stage === 6 ? (
                <p>Registration Completed</p>
              ) : (
                <p>
                  Please provide the agent <br /> information.
                </p>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="right-col">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={async (data: ValuesType) => {
            setLoading(true);
            if (currentPage === 1) {
              const req = await agent.Subscriber.emailConfirmation(
                data.email,
                data.password,
                data.firstName,
                data.lastName,
                data.phoneNumber,
                userGuid ?? "",
                templateId ?? '',
                eventId ?? ''
              );

              if (req) {
                setLoading(false);
                setCurrentPage(2);
                setInvalid({
                  text: "",
                  isInvalid: false,
                });
              } else {
                setLoading(false);
                setInvalid({
                  text: "Email Address already taken.",
                  isInvalid: true,
                });
              }
            } else if (currentPage === 2) {
              const req = await agent.Subscriber.subscriberRegistration(
                data.email,
                data.password,
                data.firstName,
                data.lastName,
                data.phoneNumber,
                data.confirmationUserCode,
                userGuid ?? "",
                templateId ?? '',
              );

              if (req) {
                setLoading(false);
                setCurrentPage(3);
              } else {
                setLoading(false);
                setInvalid({
                  text: "Invalid Verification Code",
                  isInvalid: true,
                });
              }
            }
          }}
          validationSchema={
            currentPage === 1
            && validationSchema.validationSchemaEmail
            // : validationSchema.validationSchemaCode
          }
        >
          {({ values, errors, handleSubmit }) => {
            const subscribeAccountDetailsValidity =
              errors.confirmPassword ||
                errors.password ||
                errors.email ||
                errors.firstName ||
                errors.lastName
                ? false
                : true;

            return (
              <div className="portal-form">
                {loading ? <Spinner variant="fixed" /> : null}
                {currentPage !== 3 ? (
                  <React.Fragment>
                    <div className="image-holder">
                      <img
                        src={MAIN_IMAGES.MAIN_LOGO}
                        alt={MAIN_IMAGES.MAIN_LOGO}
                        style={{
                          width: 200,
                          margin: "auto",
                          display: "block",
                          marginBottom: 40,
                        }}
                      />
                    </div>
                    <div className="form-header">
                      <h2 style={{ fontFamily: "Montserrat" }}>
                        Subscriber Registration
                      </h2>
                      <h2
                        style={{
                          fontWeight: "300",
                          fontFamily: "Montserrat",
                        }}
                      >
                        Signup to continue
                      </h2>

                      {invalid.isInvalid ? (
                        <Alert
                          variant="filled"
                          severity="error"
                          className="error-alert"
                        >
                          {invalid.text}
                        </Alert>
                      ) : null}
                    </div>
                  </React.Fragment>
                ) : null}

                <SubscribeAccountDetails
                  confirmPassword={values.confirmPassword}
                  email={values.email}
                  firstName={values.firstName}
                  lastName={values.lastName}
                  phoneNumber={values.phoneNumber}
                  password={values.password}
                  confirmationUserCode={values.confirmationUserCode}
                  isValid={subscribeAccountDetailsValidity}
                  onSubmit={() => handleSubmit()}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Subscribe;
