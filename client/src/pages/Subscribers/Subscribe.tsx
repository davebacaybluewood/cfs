import React, { useState } from "react";
import { Formik } from "formik";
import SubscribeAccountDetails from "./SubscribeAccountDetails";
import Spinner from "library/Spinner/Spinner";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { Alert } from "@mui/material";
import SuccessPage from "./SubscribeSuccess";
import { ValuesType } from "./models";
import validationSchema from "./validationSchema";
import "./Subscribe.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";

interface SubscribeProps {
  isAdmin?: boolean;
}
const Subscribe: React.FC<SubscribeProps> = (props) => {
  const [stage, setStage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<ValuesType>({
    email: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
    confirmationUserCode: 0,
  });

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
          onSubmit={async (values: ValuesType) => {
            setLoading(true);
            try {
              const config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              };

              setLoading(false);
              setStage(6);

              if (props.isAdmin) {
                navigate(paths.users);
              }
            } catch (error) {
              setLoading(false);
            }
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            setFieldValue,
            touched,
            errors,
            handleSubmit,
            isSubmitting,
            setErrors,
            setTouched,
          }) => {
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
                <div className="form-header">
                  <React.Fragment>
                    <h2>Subscriber Registration</h2>
                  </React.Fragment>

                  {error ? (
                    <Alert
                      variant="filled"
                      severity="error"
                      className="error-alert"
                    >
                      Email Address already taken.
                    </Alert>
                  ) : null}
                </div>

                <SubscribeAccountDetails
                  confirmPassword={values.confirmPassword}
                  email={values.email}
                  firstName={values.firstName}
                  lastName={values.lastName}
                  phoneNumber={values.phoneNumber}
                  password={values.password}
                  confirmationUserCode={values.confirmationUserCode}
                  isValid={subscribeAccountDetailsValidity}
                  setFieldValue={setFieldValue}
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
