import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import LoginPromotions from "library/LogInPromotions/LoginPromotions";
import HtmlTooltip from "library/HtmlTooltip/HtmlTooltip";
import { FaQuestionCircle } from "react-icons/fa";
import { paths } from "constants/routes";

interface SubscribeProps {
  isAdmin?: boolean;
}
const Subscribe: React.FC<SubscribeProps> = (props) => {
  const [invalid, setInvalid] = useState({
    isInvalid: false,
    text: "",
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const successPgUrl = `${paths.regSuccessPage
      .replace(":regSrc", "subscriber")
      .replace(":userGuid", userGuid ?? "userGuid=?")}`;

    navigate(successPgUrl);
  }, []);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
    confirmationUserCode: "",
    templateId: "",
    eventId: "",
  };

  const search = useLocation().search;
  const userGuid = new URLSearchParams(search).get("userGuid");
  const templateId = new URLSearchParams(search).get("templateId");
  const eventId = new URLSearchParams(search).get("eventId");

  return (
    <div className="portal-registration-container">
      <div className="left-col">
        <LoginPromotions />
      </div>
      <div
        className={`right-col ${
          currentPage === 3 ? "success-stage subscriber" : ""
        }`}
      >
        <div className="light-bulb">
          <HtmlTooltip
            title={
              <div
                style={{
                  fontSize: "1.3rem",
                  lineHeight: "1.5rem",
                }}
              >
                <h2 style={{ fontSize: "1.5rem", margin: "1rem 0" }}>
                  Why you should subscribe in CFS?
                </h2>
                <p>
                  Subscribing to CFS can offer several benefits and rewards
                  which includes understaning the types of coverage that best
                  suit your situation and tailored approaches specific to your
                  needs .
                </p>
              </div>
            }
          >
            <div>
              <FaQuestionCircle />
            </div>
          </HtmlTooltip>
        </div>
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
                templateId ?? "",
                eventId ?? ""
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
                data.lastName,
                data.firstName,
                data.phoneNumber,
                data.confirmationUserCode,
                userGuid ?? "",
                templateId ?? ""
              );

              if (req) {
                setLoading(false);
                const successPgUrl = `${paths.regSuccessPage
                  .replace(":regSrc", "subscriber")
                  .replace(":userGuid", userGuid ?? "no-recruit")}`;

                navigate(successPgUrl);
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
            currentPage === 1 && validationSchema.validationSchemaEmail
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
              <div
                className={`portal-form ${
                  currentPage === 3 ? "success-stage" : ""
                }`}
              >
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
