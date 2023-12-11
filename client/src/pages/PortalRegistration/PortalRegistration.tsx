import React, { useState } from "react";
import { Formik } from "formik";
import AccountDetails from "./components/AccountDetails";
import PersonalInfo from "./components/PersonalInfo";
import ContactInfo from "./components/ContactInfo";
import SocialMediaLinks from "./components/SocialMediaLinks";
import Spinner from "library/Spinner/Spinner";
import axios from "axios";
import AccountSummary from "./components/AccountSummary";
import ENDPOINTS from "constants/endpoints";
import { Alert } from "@mui/material";
import SuccessPage from "./components/SuccessPage";
import { ValuesType } from "./models";
import validationSchema from "./helpers/validationSchema";
import "./PortalRegistration.scss";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "constants/routes";
import { PROFILE_POSITIONS, PROFILE_ROLES } from "./constants";

interface PortalRegistrationProps {
  isAdmin?: boolean;
}
const PortalRegistration: React.FC<PortalRegistrationProps> = (props) => {
  const [stage, setStage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const search = useLocation().search;
  const recruiterUserGuid = new URLSearchParams(search).get("userGuid");
  const templateId = new URLSearchParams(search).get("templateId");
  const [initialValues, setInitialValues] = useState<ValuesType>({
    emailAddress: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    position: [],
    roles: [],
    bio: "",
    languages: [
      {
        label: "English",
        value: "English",
        keyword: "English",
      } as any,
    ],
    specialties: [],
    avatar: "",
    licenseNumber: "",
    phoneNumber: "",
    address: "",
    address1: "",
    address2: "",
    facebook: "",
    twitter: "",
    linkedIn: "",
    instagram: "",
    weChat: "",
    discordId: "",
    state: "",
    zipCode: "",
    firstName: "",
    nationality: "",
    birthDate: "",
  });

  const stageHeader =
    stage === 1
      ? "Create an account"
      : stage === 2
        ? "Personal Information"
        : stage === 3
          ? "Contact Information"
          : stage === 4
            ? "Social Media Links"
            : "Confirm Account Information";

  const changeStage = (newStage: number) => {
    setStage(newStage);
  };

  /** First Stage */
  const createPreProfileHandler = async (
    emailAddress: string | undefined,
    password: string | undefined,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    setLoading(true);
    try {
      const { data } = await axios.post(ENDPOINTS.CREATE_PRE_PROFILE, {
        emailAddress: emailAddress,
        password: password,
        position: [
          {
            value: PROFILE_POSITIONS.FREE_30DAYS_TRIAL.value,
            label: PROFILE_POSITIONS.FREE_30DAYS_TRIAL.label,
          },
        ],
        roles: [
          {
            value: PROFILE_ROLES.FREE_30DAYS_TRIAL.ROLE_FREE_30DAYS_TRIAL.value,
            label: PROFILE_ROLES.FREE_30DAYS_TRIAL.ROLE_FREE_30DAYS_TRIAL.label,
          },
        ],
        languages: ["English"],
      });

      Object.keys(initialValues).map((dataValue) => {
        setFieldValue(dataValue, data[dataValue]);
      });
      setFieldValue("confirmPassword", data.password);
      setError(false);
      setStage(2);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  /** Second Stage */
  const updatePreProfile = async (values: ValuesType, nextStage: number) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    setLoading(true);

    try {
      const { data } = await axios.put(
        ENDPOINTS.CREATE_PRE_PROFILE,
        values,
        config
      );
      setError(false);
      setStage(nextStage);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

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

              const { data } = await axios.post(
                ENDPOINTS.AGENTS,
                {
                  emailAddress: values.emailAddress,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  position: values.position,
                  roles: values.roles,
                  bio: values.bio,
                  languages: values.languages,
                  specialties: values.specialties,
                  avatar: values.avatar,
                  licenseNumber: values.licenseNumber,
                  phoneNumber: values.phoneNumber,
                  address: values.address,
                  facebook: values.facebook,
                  twitter: values.twitter,
                  linkedIn: values.linkedIn,
                  instagram: values.instagram,
                  weChat: values.weChat,
                  discordId: values.discordId,
                  state: values.state,
                  nationality: values.nationality,
                  birthDate: values.birthDate,
                  zipCode: values.zipCode,
                  recruiterUserGuid: recruiterUserGuid,
                  templateId: templateId
                },
                config
              );

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
            const accountDetailsValidity =
              errors.confirmPassword || errors.password || errors.emailAddress
                ? false
                : true;

            const personalInfoValidity =
              errors.firstName ||
                errors.lastName ||
                errors.position ||
                errors.roles ||
                errors.bio ||
                errors.nationality
                ? true
                : false;

            const contactInfoValidity = errors.phoneNumber ? true : false;
            return (
              <div className="portal-form">
                {loading ? <Spinner variant="fixed" /> : null}
                <div className="form-header">
                  {stage !== 6 && (
                    <React.Fragment>
                      <h2>STEP {stage}</h2>
                      <h2>{stageHeader}</h2>
                    </React.Fragment>
                  )}

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
                {stage === 1 && (
                  <AccountDetails
                    confirmPassword={values.confirmPassword}
                    email={values.emailAddress}
                    password={values.password}
                    changeStage={changeStage}
                    isValid={accountDetailsValidity}
                    onSubmit={createPreProfileHandler}
                    setFieldValue={setFieldValue}
                    isAdmin={props.isAdmin}
                  />
                )}
                {stage === 2 && (
                  <PersonalInfo
                    values={values}
                    changeStage={changeStage}
                    setFieldValue={setFieldValue}
                    isValid={personalInfoValidity}
                    touched={touched}
                    setTouched={setTouched}
                    onSubmit={updatePreProfile}
                  />
                )}
                {stage === 3 && (
                  <ContactInfo
                    changeStage={changeStage}
                    isValid={contactInfoValidity}
                    values={values}
                    onSubmit={updatePreProfile}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    setTouched={setTouched}
                  />
                )}
                {stage === 4 && (
                  <SocialMediaLinks
                    changeStage={changeStage}
                    isValid={true}
                    values={values}
                    onSubmit={updatePreProfile}
                  />
                )}
                {stage === 5 && (
                  <AccountSummary
                    values={values}
                    changeStage={changeStage}
                    isValid={true}
                    onSubmit={handleSubmit}
                  />
                )}
                {stage === 6 && <SuccessPage />}
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                {/* <pre>{JSON.stringify(initialValues, null, 2)}</pre>  */}
                {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                {/* <pre>{JSON.stringify(touched, null, 2)}</pre> */}
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default PortalRegistration;
