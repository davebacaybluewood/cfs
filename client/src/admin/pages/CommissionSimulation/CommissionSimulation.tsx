import React, { useState } from "react";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import Title from "admin/components/Title/Title";
import { Grid } from "@mui/material";
import Wrapper from "admin/components/Wrapper/Wrapper";
import "./CommissionSimulation.scss";
import Graph from "./components/Graph";
import FormikTextInput from "library/Formik/FormikInput";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import ErrorText from "pages/PortalRegistration/components/ErrorText";
import { PROFILE_ROLES } from "pages/PortalRegistration/constants";
import Button from "library/Button/Button";
import { BigBadgeProps } from "admin/components/BigBadge/BigBadge";
import formatter from "helpers/currencyFormatter";
import { FaExclamationCircle } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import HtmlTooltip from "library/HtmlTooltip/HtmlTooltip";
import AlertMessage from "library/AlertMessage/Alert";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Commission Simulation",
    url: paths.commissionSimulation,
    isActive: true,
  },
];
const AGENT_ROLES = [
  {
    value: PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
    label: PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.label,
    numberValue: 0,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
    label: PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.label,
    numberValue: 0.35,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.label,
    numberValue: 0.5,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.label,
    numberValue: 0.65,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.label,
    numberValue: 0.81,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.label,
    numberValue: 0.83,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.label,
    numberValue: 0.85,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
    label: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.label,
    numberValue: 0.86,
  },
];

const standardInputStyles = {
  fontSize: "16px",
};
const CommissionSimulation: React.FC = () => {
  const onChangePositionHandler = (value: any, setFieldValue: any) => {
    setFieldValue("personal.position", [value]);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    personal: {
      position: [
        {
          label: "",
          value: "",
          numberValue: 0,
        },
      ],
      monthlyTargetPremium: 0,
    },
    generation: {
      gen1: "",
      monthlyTargetPremium1: 0,
      numberOfMembers1: 0,
      gen1NumberValue: 0.1,
      gen2: "",
      monthlyTargetPremium2: 0,
      numberOfMembers2: 0,
      gen2NumberValue: 0.05,
      gen3: "",
      monthlyTargetPremium3: 0,
      numberOfMembers3: 0,
      gen3NumberValue: 0.04,
      gen4: "",
      monthlyTargetPremium4: 0,
      numberOfMembers4: 0,
      gen4NumberValue: 0.03,
    },
    spread: {
      position1: {
        label: AGENT_ROLES[0].label,
        value: AGENT_ROLES[0].value,
        numberValue: AGENT_ROLES[0].numberValue,
      },
      monthlyTargetPremium1: 0,
      numberOfMembers1: 0,
      position2: {
        label: AGENT_ROLES[1].label,
        value: AGENT_ROLES[1].value,
        numberValue: AGENT_ROLES[1].numberValue,
      },
      monthlyTargetPremium2: 0,
      numberOfMembers2: 0,
      position3: {
        label: AGENT_ROLES[2].label,
        value: AGENT_ROLES[2].value,
        numberValue: AGENT_ROLES[2].numberValue,
      },
      monthlyTargetPremium3: 0,
      numberOfMembers3: 0,
      position4: {
        label: AGENT_ROLES[3].label,
        value: AGENT_ROLES[3].value,
        numberValue: AGENT_ROLES[3].numberValue,
      },
      monthlyTargetPremium4: 0,
      numberOfMembers4: 0,
      position5: {
        label: AGENT_ROLES[4].label,
        value: AGENT_ROLES[4].value,
        numberValue: AGENT_ROLES[4].numberValue,
      },
      monthlyTargetPremium5: 0,
      numberOfMembers5: 0,
      position6: {
        label: AGENT_ROLES[5].label,
        value: AGENT_ROLES[5].value,
        numberValue: AGENT_ROLES[5].numberValue,
      },
      monthlyTargetPremium6: 0,
      numberOfMembers6: 0,
      position7: {
        label: AGENT_ROLES[6].label,
        value: AGENT_ROLES[6].value,
        numberValue: AGENT_ROLES[6].numberValue,
      },
      monthlyTargetPremium7: 0,
      numberOfMembers7: 0,
      position8: {
        label: AGENT_ROLES[7].label,
        value: AGENT_ROLES[7].value,
        numberValue: AGENT_ROLES[7].numberValue,
      },
      monthlyTargetPremium8: 0,
      numberOfMembers8: 0,
    },
  };

  const validationSchema = Yup.object({
    // personal: Yup.object().shape({
    //   position: Yup.object().shape({
    //     value: Yup.string().required("Position field is required."),
    //   }),
    //   monthlyTargetPremium: Yup.number()
    //     .required("Monthly Target field is required.")
    //     .typeError("A number is required."),
    // }),
    // spread: Yup.object().shape({
    //   position1: Yup.string().required("Position field is required."),
    //   monthlyTargetPremium1: Yup.number()
    //     .required("Monthly Target field is required.")
    //     .typeError("A number is required."),
    //   position2: Yup.string().required("Position field is required."),
    //   monthlyTargetPremium2: Yup.number()
    //     .required("Monthly Target field is required.")
    //     .typeError("A number is required."),
    //   position3: Yup.string().required("Position field is required."),
    //   monthlyTargetPremium3: Yup.number()
    //     .required("Monthly Target field is required.")
    //     .typeError("A number is required."),
    //   position4: Yup.string().required("Position field is required."),
    //   monthlyTargetPremium4: Yup.number()
    //     .required("Monthly Target field is required.")
    //     .typeError("A number is required."),
    //   position5: Yup.string().required("Position field is required."),
    //   monthlyTargetPremium5: Yup.number()
    //     .required("Monthly Target field is required.")
    //     .typeError("A number is required."),
    //   position6: Yup.string().required("Position field is required."),
    //   monthlyTargetPremium6: Yup.number()
    //     .required("Monthly Target field is required.")
    //     .typeError("A number is required."),
    //   position7: Yup.string().required("Position field is required."),
    //   monthlyTargetPremium7: Yup.number()
    //     .required("Monthly Target field is required.")
    //     .typeError("A number is required."),
    //   position8: Yup.string().required("Position field is required."),
    //   monthlyTargetPremium8: Yup.number()
    //     .required("Monthly Target field is required.")
    //     .typeError("A number is required."),
    // }),
    // generation: Yup.object().shape({
    //   monthlyTargetPremium1: Yup.number()
    //     .required("Monthly Target field is required.")
    //     .typeError("A number is required."),
    //   numberOfMembers1: Yup.number()
    //     .required("Number of members field is required.")
    //     .typeError("A number is required."),
    //   monthlyTargetPremium2: Yup.number()
    //     .required("Monthly Target field is required.")
    //     .typeError("A number is required."),
    //   numberOfMembers2: Yup.number()
    //     .required("Number of members field is required.")
    //     .typeError("A number is required."),
    //   monthlyTargetPremium3: Yup.number()
    //     .required("Monthly Target field is required.")
    //     .typeError("A number is required."),
    //   numberOfMembers3: Yup.number()
    //     .required("Number of members field is required.")
    //     .typeError("A number is required."),
    //   monthlyTargetPremium4: Yup.number()
    //     .required("Monthly Target field is required.")
    //     .typeError("A number is required."),
    //   numberOfMembers4: Yup.number()
    //     .required("Number of members field is required.")
    //     .typeError("A number is required."),
    // }),
  });

  const genNum = ["1st", "2nd", "3rd", "4th"];
  const earningsInitialValue = [
    {
      personal: 0,
      spread: 0,
      generationOverride: 0,
    },
  ];
  const [totalEarnings, setTotalEarnings] = useState(earningsInitialValue);

  const [members, setMembers] = useState(0);
  const [showGraph, setShowGraph] = useState(false);

  const submitHandler = (data: any) => {
    /** Personal */
    const personalNumberValue = data.personal.position[0]?.numberValue;
    const personalMonthlyTargetPremium = data.personal.monthlyTargetPremium;
    const personalTotal = personalMonthlyTargetPremium * personalNumberValue;

    /* Spread */
    /* Position 1 */
    const spreadNumberValue1 = data.spread.position1.numberValue;
    const spreadMonthlyTargetPremium1 = parseInt(
      data.spread.monthlyTargetPremium1
    );
    const spreadNumberOfMembers1 = parseInt(data.spread.numberOfMembers1);
    const spread1Total =
      (personalNumberValue - spreadNumberValue1) *
      spreadMonthlyTargetPremium1 *
      spreadNumberOfMembers1;

    /* Position 2 */
    const spreadNumberValue2 = data.spread.position2.numberValue;
    const spreadMonthlyTargetPremium2 = parseInt(
      data.spread.monthlyTargetPremium2
    );
    const spreadNumberOfMembers2 = parseInt(data.spread.numberOfMembers2);
    const spread2Total =
      (personalNumberValue - spreadNumberValue2) *
      spreadMonthlyTargetPremium2 *
      spreadNumberOfMembers2;

    /* Position 3 */
    const spreadNumberValue3 = data.spread.position3.numberValue;
    const spreadMonthlyTargetPremium3 = parseInt(
      data.spread.monthlyTargetPremium3
    );
    const spreadNumberOfMembers3 = parseInt(data.spread.numberOfMembers3);
    const spread3Total =
      (personalNumberValue - spreadNumberValue3) *
      spreadMonthlyTargetPremium3 *
      spreadNumberOfMembers3;

    /* Position 4 */
    const spreadNumberValue4 = data.spread.position4.numberValue;
    const spreadMonthlyTargetPremium4 = parseInt(
      data.spread.monthlyTargetPremium4
    );
    const spreadNumberOfMembers4 = parseInt(data.spread.numberOfMembers4);
    const spread4Total =
      (personalNumberValue - spreadNumberValue4) *
      spreadMonthlyTargetPremium4 *
      spreadNumberOfMembers4;

    /* Position 5 */
    const spreadNumberValue5 = data.spread.position5.numberValue;
    const spreadMonthlyTargetPremium5 = parseInt(
      data.spread.monthlyTargetPremium5
    );
    const spreadNumberOfMembers5 = parseInt(data.spread.numberOfMembers5);
    const spread5Total =
      (personalNumberValue - spreadNumberValue5) *
      spreadMonthlyTargetPremium5 *
      spreadNumberOfMembers5;

    /* Position 6 */
    const spreadNumberValue6 = data.spread.position6.numberValue;
    const spreadMonthlyTargetPremium6 = parseInt(
      data.spread.monthlyTargetPremium6
    );
    const spreadNumberOfMembers6 = parseInt(data.spread.numberOfMembers6);
    const spread6Total =
      (personalNumberValue - spreadNumberValue6) *
      spreadMonthlyTargetPremium6 *
      spreadNumberOfMembers6;

    /* Position 7 */
    const spreadNumberValue7 = data.spread.position7.numberValue;
    const spreadMonthlyTargetPremium7 = parseInt(
      data.spread.monthlyTargetPremium7
    );
    const spreadNumberOfMembers7 = parseInt(data.spread.numberOfMembers7);
    const spread7Total =
      (personalNumberValue - spreadNumberValue7) *
      spreadMonthlyTargetPremium7 *
      spreadNumberOfMembers7;

    /* Position 8 */
    const spreadNumberValue8 = data.spread.position8.numberValue;
    const spreadMonthlyTargetPremium8 = parseInt(
      data.spread.monthlyTargetPremium8
    );
    const spreadNumberOfMembers8 = parseInt(data.spread.numberOfMembers8);
    const spread8Total =
      (personalNumberValue - spreadNumberValue8) *
      spreadMonthlyTargetPremium8 *
      spreadNumberOfMembers8;

    /* Spread Total Earnings */
    const spreadTotal =
      spread8Total +
      spread7Total +
      spread6Total +
      spread5Total +
      spread4Total +
      spread3Total +
      spread2Total +
      spread1Total;

    /** Generation Overrride */
    /*Gen 1 */
    const gen1NumberValue = data.generation.gen1NumberValue;
    const numberOfMembers1 = parseInt(data.generation.numberOfMembers1);
    const monthlyTargetPremium1 = parseInt(
      data.generation.monthlyTargetPremium1
    );
    const gen1Total =
      monthlyTargetPremium1 * numberOfMembers1 * gen1NumberValue;
    /*Gen 2 */
    const gen2NumberValue = data.generation.gen2NumberValue;
    const numberOfMembers2 = parseInt(data.generation.numberOfMembers2);
    const monthlyTargetPremium2 = parseInt(
      data.generation.monthlyTargetPremium2
    );
    const gen2Total =
      monthlyTargetPremium2 * numberOfMembers2 * gen2NumberValue;
    /*Gen 3 */
    const gen3NumberValue = data.generation.gen3NumberValue;
    const numberOfMembers3 = parseInt(data.generation.numberOfMembers3);
    const monthlyTargetPremium3 = parseInt(
      data.generation.monthlyTargetPremium3
    );
    const gen3Total =
      monthlyTargetPremium3 * numberOfMembers3 * gen3NumberValue;
    /*Gen 4 */
    const gen4NumberValue = data.generation.gen4NumberValue;
    const numberOfMembers4 = parseInt(data.generation.numberOfMembers4);
    const monthlyTargetPremium4 = parseInt(
      data.generation.monthlyTargetPremium4
    );
    const gen4Total =
      monthlyTargetPremium4 * numberOfMembers4 * gen4NumberValue;

    /* Override Total */
    const generationTotal = gen1Total + gen2Total + gen3Total + gen4Total;
    const formattedGenerationTotal = parseInt(generationTotal.toFixed(2));

    /* Spread  Total Members*/
    const spreadMembersTotal =
      spreadNumberOfMembers8 +
      spreadNumberOfMembers7 +
      spreadNumberOfMembers6 +
      spreadNumberOfMembers5 +
      spreadNumberOfMembers4 +
      spreadNumberOfMembers3 +
      spreadNumberOfMembers2 +
      spreadNumberOfMembers1;

    /* Override Total Members */
    const overrideMembersTotal =
      numberOfMembers4 + numberOfMembers3 + numberOfMembers2 + numberOfMembers1;

    /** Validation */

    const isSeniorAssociate =
      data.personal.position[0].value ===
      PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value;

    const isMarketingDirector =
      data.personal.position[0].value ===
      PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value;

    const isSeniorMarketingDirector =
      data.personal.position[0].value ===
      PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value;

    const isExecutiveMarketingDirector =
      data.personal.position[0].value ===
      PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value;

    const isSeniorExecutiveMarketingDirector =
      data.personal.position[0].value ===
      PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value;

    const isVicePresident =
      data.personal.position[0].value ===
      PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value;

    const earningsSetter = () => {
      console.log(data.personal.position[0].numberValue);
      console.log(AGENT_ROLES[4].numberValue.toString());
      if (
        parseInt(data.personal.position[0].numberValue) >=
        parseInt(AGENT_ROLES[4].numberValue.toString())
      ) {
        setIsPositionValid(true);
      } else {
        setIsPositionValid(false);
      }
      setTotalEarnings((prevState) => {
        const filteredPrevState = prevState.map((data) => {
          return {
            personal: personalTotal,
            spread: 0,
            generationOverride: formattedGenerationTotal,
          };
        });
        return filteredPrevState;
      });
    };

    if (isSeniorAssociate && spreadNumberOfMembers2 < 3) {
      setErrorMessage(
        "Minimum requirement for Senior Associate not met : 3 Associates."
      );
      setTotalEarnings(earningsInitialValue);
      setShowGraph(false);
      earningsSetter();
      return;
    } else if (
      isMarketingDirector &&
      (spreadNumberOfMembers3 < 2 || spreadNumberOfMembers2 < 5)
    ) {
      setErrorMessage(
        "Minimum requirement for Marketing Director not met : 2 Senior Associates and 5 Associates."
      );
      setTotalEarnings(earningsInitialValue);
      setShowGraph(false);
      earningsSetter();
      return;
    } else if (
      (isSeniorMarketingDirector && spreadNumberOfMembers4 < 2) ||
      (isSeniorMarketingDirector && spreadNumberOfMembers3 < 5)
    ) {
      setErrorMessage(
        "Minimum requirement for Senior Marketing Director not met : 2 Marketing Director or 5 Senior Associates"
      );
      setTotalEarnings(earningsInitialValue);
      setShowGraph(false);
      earningsSetter();

      return;
    } else if (
      (isExecutiveMarketingDirector && spreadNumberOfMembers5 < 2) ||
      (isExecutiveMarketingDirector && spreadNumberOfMembers4 < 3)
    ) {
      setErrorMessage(
        "Minimum requirement for Executive Marketing Director not met : 2 Senior Marketing Director or 3 Marketing Director"
      );
      setTotalEarnings(earningsInitialValue);
      setShowGraph(false);
      earningsSetter();

      return;
    } else if (
      (isSeniorExecutiveMarketingDirector && spreadNumberOfMembers6 < 2) ||
      (isSeniorExecutiveMarketingDirector && spreadNumberOfMembers5 < 4)
    ) {
      setErrorMessage(
        "Minimum requirement for Senior Executive Marketing Director not met : 2 Executive Marketing Director or 4 Senior Marketing Director"
      );
      setTotalEarnings(earningsInitialValue);
      setShowGraph(false);
      earningsSetter();

      return;
    } else if (
      (isVicePresident && spreadNumberOfMembers7 < 2) ||
      (isVicePresident && spreadNumberOfMembers5 < 6)
    ) {
      setErrorMessage(
        "Minimum requirement for Executive Vice President not met : 2 Senior Executive Marketing Director or 6 Senior Marketing Director"
      );
      setTotalEarnings(earningsInitialValue);
      setShowGraph(false);
      earningsSetter();

      return;
    }

    /*Total Members  */
    const totalMembersOverall = overrideMembersTotal + spreadMembersTotal;
    setMembers(totalMembersOverall);
    setErrorMessage("");
    setShowGraph(true);
    setTotalEarnings((prevState) => {
      const filteredPrevState = prevState.map((data) => {
        return {
          personal: personalTotal,
          spread: spreadTotal,
          generationOverride: formattedGenerationTotal,
        };
      });
      return filteredPrevState;
    });
    if (
      parseInt(data.personal.position[0].numberValue) >=
      parseInt(AGENT_ROLES[4].numberValue.toString())
    ) {
      setIsPositionValid(true);
    } else {
      setIsPositionValid(false);
    }
  };

  const earningsData = [
    ["Task", "Hours per Day"],
    ["Personal Earnings", totalEarnings[0].personal],
    ["Spread Earnings", totalEarnings[0].spread],
    ["Generation Override", totalEarnings[0].generationOverride],
  ];

  const badgeData: BigBadgeProps[] = [
    {
      color: "#45bf94",
      title: "Personal Earnings",
      label1: "MONTHLY",
      value1: totalEarnings[0].personal,
      label2: "ANNUALY",
      value2: totalEarnings[0].personal * 12,
    },
    {
      color: "#ecc10c",
      title: "Spread Earnings",
      label1: "MONTHLY",
      value1: totalEarnings[0].spread,
      label2: "ANNUALY",
      value2: totalEarnings[0].spread * 12,
    },
    {
      color: "#3f7ec0",
      title: "Override Earnings",
      label1: "MONTHLY",
      value1: totalEarnings[0].generationOverride,
      label2: "ANNUALY",
      value2: totalEarnings[0].generationOverride * 12,
    },
  ];

  const [isPositionValid, setIsPositionValid] = useState(false);
  const totalEarningMonthly =
    totalEarnings[0].personal +
    totalEarnings[0].spread +
    (isPositionValid ? totalEarnings[0].generationOverride : 0);

  const totalEarningAnually = totalEarningMonthly * 12;

  const formattedearnings = {
    totalEarningAnually: formatter.format(totalEarningAnually || 0),
    totalEarningMonthly: formatter.format(totalEarningMonthly || 0),
  };

  console.log(isPositionValid);

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="commision-simulation-container"
    >
      <Title
        title="Commission Simulation"
        subtitle="Compute your commission."
      />
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} lg={6}>
          <div className="admin-calculator">
            <div className="total-block">
              <div className="total-block-heading">
                <h3>Total Earnings</h3>
              </div>
              <div className="total-block-result">
                <div className="result-title">
                  <h2>MONTHLY</h2>
                  <p>{formattedearnings.totalEarningMonthly}</p>
                </div>
                <div className="result-title">
                  <h2>ANNUALY</h2>
                  <p>{formattedearnings.totalEarningAnually}</p>
                </div>
              </div>
            </div>
            <div className="number-members">
              <h5>{`${members.toLocaleString()} members`}</h5>
            </div>
            <div className="form-calculator">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(data) => {
                  submitHandler(data);
                }}
              >
                {({
                  values,
                  errors,
                  setTouched,
                  touched,
                  setFieldValue,
                  resetForm,
                  handleSubmit,
                }) => {
                  const inputValidity =
                    !values.personal.position.length ||
                    !values.personal.monthlyTargetPremium;
                  return (
                    <React.Fragment>
                      <div className="form-card">
                        <div className="card-captions-top">
                          <h3>Personal</h3>
                          <p>Lorem ipsum dolor sit.</p>
                        </div>
                        <Grid container spacing={2}>
                          <Grid item sm={12} md={9} lg={8}>
                            <label>Position</label>
                            <Select
                              classNamePrefix="select"
                              onChange={(e) => {
                                if (values.personal.position[0].value) {
                                  resetForm();
                                  setIsPositionValid(false);
                                  setErrorMessage("");
                                  setShowGraph(false);
                                  setTotalEarnings(earningsInitialValue);
                                }
                                onChangePositionHandler(e, setFieldValue);
                              }}
                              isSearchable={true}
                              name="position"
                              placeholder="Choose a position"
                              options={
                                AGENT_ROLES.map((st) => {
                                  return {
                                    label: st.label,
                                    value: st.value,
                                    numberValue: st.numberValue,
                                  };
                                }) as any
                              }
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  fontSize: "13px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                }),

                                placeholder: (baseStyles) => ({
                                  ...baseStyles,
                                  color: "rgba(0, 0, 0, 0.3)",
                                }),
                              }}
                              value={values.personal.position![0]}
                            />
                            <ErrorText
                              isError={
                                !values.personal.position &&
                                !!touched.personal?.position
                              }
                              text="Position field is required."
                            />
                            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                          </Grid>
                          <Grid item sm={12} md={9} lg={4}>
                            <div className="calcu-form-control">
                              <label>Monthly Target Premium</label>
                              <FormikTextInput
                                name="personal.monthlyTargetPremium"
                                type="number"
                                value={values.personal.monthlyTargetPremium}
                                style={standardInputStyles}
                                variant="outlined"
                                label=""
                                error={!!errors.personal?.monthlyTargetPremium}
                              />
                            </div>
                          </Grid>
                        </Grid>
                      </div>

                      <div className="form-card">
                        <div className="card-captions-top">
                          <h3>Spread</h3>
                          <p>Lorem ipsum dolor sit.</p>
                          {errorMessage ? (
                            <div className="alert-message">
                              <AlertMessage
                                message={errorMessage}
                                icon={<AiOutlineWarning />}
                              />
                            </div>
                          ) : null}
                        </div>
                        <Grid container spacing={2} alignItems="center">
                          {AGENT_ROLES.map((data, index) => {
                            const sumIndex = index + 1;

                            return (
                              <React.Fragment>
                                <Grid item sm={12} md={9} lg={4}>
                                  <div className="position-label">
                                    <h3>{data.label}</h3>
                                    {values.personal.position[0]!.numberValue <=
                                      data.numberValue ||
                                    !values.personal.position[0].value ? (
                                      <HtmlTooltip
                                        title={
                                          <div
                                            style={{
                                              fontSize: "1.3rem",
                                              color: "#ed3e4b",
                                              textAlign: "center",
                                            }}
                                          >
                                            <span>
                                              {!values.personal.position[0]
                                                .value
                                                ? "You must choose a position"
                                                : "This position can only be lower than your own position."}
                                            </span>
                                          </div>
                                        }
                                      >
                                        <span>
                                          <FaExclamationCircle />
                                        </span>
                                      </HtmlTooltip>
                                    ) : null}
                                  </div>
                                </Grid>
                                <Grid item sm={12} md={9} lg={4}>
                                  <div className="calcu-form-control">
                                    <label>Monthly Target Premium</label>
                                    <FormikTextInput
                                      name={`spread.monthlyTargetPremium${sumIndex}`}
                                      type="number"
                                      value={
                                        values.spread[
                                          `monthlyTargetPremium${sumIndex}`
                                        ]
                                      }
                                      variant="outlined"
                                      label=""
                                      disabled={
                                        values.personal.position[0]
                                          .numberValue <= data.numberValue ||
                                        !values.personal.monthlyTargetPremium
                                      }
                                    />
                                  </div>
                                </Grid>
                                <Grid item sm={12} md={9} lg={4}>
                                  <div className="calcu-form-control">
                                    <label># of members</label>
                                    <FormikTextInput
                                      type="number"
                                      name={`spread.numberOfMembers${sumIndex}`}
                                      value={
                                        values.spread[
                                          `numberOfMembers${sumIndex}`
                                        ]
                                      }
                                      variant="outlined"
                                      label=""
                                      disabled={
                                        values.personal.position[0]
                                          .numberValue <= data.numberValue ||
                                        !values.personal.monthlyTargetPremium
                                      }
                                    />
                                  </div>
                                </Grid>
                              </React.Fragment>
                            );
                          })}
                        </Grid>
                      </div>

                      <div className="form-card">
                        <div className="card-captions-top">
                          <h3>Generation Override</h3>
                          <p>Lorem ipsum dolor sit.</p>

                          {values.personal.position[0].numberValue < 0.81 ? (
                            <div className="alert-message">
                              <AlertMessage
                                message="Only Senior Marketing Director and above can earn override."
                                icon={<AiOutlineWarning />}
                              />
                            </div>
                          ) : null}
                        </div>
                        <Grid container spacing={2} alignItems="center">
                          {genNum.map((data, index) => {
                            const sumIndex = index + 1;

                            return (
                              <React.Fragment>
                                <Grid item sm={12} md={9} lg={2}>
                                  <h3>{data}</h3>
                                </Grid>
                                <Grid item sm={12} md={9} lg={5}>
                                  <div className="calcu-form-control">
                                    <label>Monthly Target Premium</label>
                                    <FormikTextInput
                                      type="number"
                                      name={`generation.monthlyTargetPremium${sumIndex}`}
                                      value={
                                        values.generation[
                                          `monthlyTargetPremium${sumIndex}`
                                        ]
                                      }
                                      variant="outlined"
                                      label=""
                                      disabled={inputValidity}
                                    />
                                  </div>
                                </Grid>
                                <Grid item sm={12} md={9} lg={5}>
                                  <div className="calcu-form-control">
                                    <label># of members</label>
                                    <FormikTextInput
                                      name={`generation.numberOfMembers${sumIndex}`}
                                      type="number"
                                      value={
                                        values.generation[
                                          `numberOfMembers${sumIndex}`
                                        ]
                                      }
                                      variant="outlined"
                                      label=""
                                      disabled={inputValidity}
                                    />
                                  </div>
                                </Grid>
                              </React.Fragment>
                            );
                          })}
                        </Grid>
                      </div>
                      <pre>{JSON.stringify(values, null, 2)}</pre>
                      <pre>{JSON.stringify(errors, null, 2)}</pre>
                      <div className="form-actions">
                        <Button variant="default" onClick={() => resetForm()}>
                          Reset
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => handleSubmit()}
                          type="submit"
                        >
                          Calculate
                        </Button>
                      </div>
                    </React.Fragment>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Graph
            data={earningsData}
            badgeData={badgeData}
            showChart={showGraph}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CommissionSimulation;
