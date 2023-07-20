import React, { useState } from "react";
import { Grid } from "@mui/material";
import FormikTextInput from "library/Formik/FormikInput";
import { Formik } from "formik";
import Select from "react-select";
import ErrorText from "pages/PortalRegistration/components/ErrorText";
import { PROFILE_ROLES } from "pages/PortalRegistration/constants";
import formatter from "helpers/currencyFormatter";
import { FaExclamationCircle } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import HtmlTooltip from "library/HtmlTooltip/HtmlTooltip";
import AlertMessage from "library/AlertMessage/Alert";
import Button from "library/Button/Button";
import "./Calculator.scss";

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

  spread: {
    position1: {
      label: AGENT_ROLES[0].label,
      value: AGENT_ROLES[0].value,
      numberValue: AGENT_ROLES[0].numberValue,
    },
    monthlyTargetPremium1: 0,
    numberOfPremiumMembers1: 0,
    numberOfMembers1: 0,
    position2: {
      label: AGENT_ROLES[1].label,
      value: AGENT_ROLES[1].value,
      numberValue: AGENT_ROLES[1].numberValue,
    },
    monthlyTargetPremium2: 0,
    numberOfPremiumMembers2: 0,
    numberOfMembers2: 0,
    position3: {
      label: AGENT_ROLES[2].label,
      value: AGENT_ROLES[2].value,
      numberValue: AGENT_ROLES[2].numberValue,
    },
    monthlyTargetPremium3: 0,
    numberOfPremiumMembers3: 0,
    numberOfMembers3: 0,
    position4: {
      label: AGENT_ROLES[3].label,
      value: AGENT_ROLES[3].value,
      numberValue: AGENT_ROLES[3].numberValue,
    },
    monthlyTargetPremium4: 0,
    numberOfPremiumMembers4: 0,
    numberOfMembers4: 0,
    position5: {
      label: AGENT_ROLES[4].label,
      value: AGENT_ROLES[4].value,
      numberValue: AGENT_ROLES[4].numberValue,
    },
    monthlyTargetPremium5: 0,
    numberOfPremiumMembers5: 0,
    numberOfMembers5: 0,
    position6: {
      label: AGENT_ROLES[5].label,
      value: AGENT_ROLES[5].value,
      numberValue: AGENT_ROLES[5].numberValue,
    },
    monthlyTargetPremium6: 0,
    numberOfPremiumMembers6: 0,
    numberOfMembers6: 0,
    position7: {
      label: AGENT_ROLES[6].label,
      value: AGENT_ROLES[6].value,
      numberValue: AGENT_ROLES[6].numberValue,
    },
    monthlyTargetPremium7: 0,
    numberOfPremiumMembers7: 0,
    numberOfMembers7: 0,
    position8: {
      label: AGENT_ROLES[7].label,
      value: AGENT_ROLES[7].value,
      numberValue: AGENT_ROLES[7].numberValue,
    },
    monthlyTargetPremium8: 0,
    numberOfPremiumMembers8: 0,
    numberOfMembers8: 0,
  },
  generation: {
    gen1: "",
    monthlyTargetPremium1: 0,
    numberOfMembers1: 0,
    numberOfPremMembers1: 0,
    gen1NumberValue: 0.1,
    gen2: "",
    monthlyTargetPremium2: 0,
    numberOfMembers2: 0,
    numberOfPremMembers2: 0,
    gen2NumberValue: 0.05,
    gen3: "",
    monthlyTargetPremium3: 0,
    numberOfMembers3: 0,
    numberOfPremMembers3: 0,
    gen3NumberValue: 0.04,
    gen4: "",
    monthlyTargetPremium4: 0,
    numberOfMembers4: 0,
    numberOfPremMembers4: 0,
    gen4NumberValue: 0.03,
  },
};

const Calculator: React.FC = () => {
  // Mock Date
  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  const [errorMessage, setErrorMessage] = useState("");

  const onChangePositionHandler = (value: any, setFieldValue: any) => {
    setFieldValue("personal.position", [value]);
  };
  const [isPositionValid, setIsPositionValid] = useState(false);

  const genNum = ["1st", "2nd", "3rd", "4th"];
  const earningsInitialValue = [
    {
      personal: 0,
      spread: 0,
      generationOverride: 0,
    },
  ];
  const [totalEarnings, setTotalEarnings] = useState(earningsInitialValue);

  const submitHandler = (data: any) => {
    /** Personal */
    const personalNumberValue = data.personal.position[0]?.numberValue;
    const personalMonthlyTargetPremium = data.personal.monthlyTargetPremium;
    const personalTotal = personalMonthlyTargetPremium * personalNumberValue;

    /* Spread */
    /* Position 1 */
    /* Training Associate */
    const spreadNumberValue1 = data.spread.position1.numberValue;
    const spreadMonthlyTargetPremium1 = parseInt(
      data.spread.monthlyTargetPremium1
    );
    const spreadPremiumMember1 = data.spread.numberOfPremiumMembers1;
    const spreadNumberOfMembers1 = parseInt(data.spread.numberOfMembers1);

    /* Formula 1 */
    /* Training Associate */
    const spread1Total =
      spreadMonthlyTargetPremium1 *
      spreadNumberOfMembers1 *
      spreadPremiumMember1 *
      (personalNumberValue - spreadNumberValue1);

    /* Position 2 */
    /* Associate */
    const spreadPremiumMember2 = data.spread.numberOfPremiumMembers2;
    const spreadNumberValue2 = data.spread.position2.numberValue;
    const spreadMonthlyTargetPremium2 = parseInt(
      data.spread.monthlyTargetPremium2
    );
    const spreadNumberOfMembers2 = parseInt(data.spread.numberOfMembers2);

    /* Formula 2 */
    const spread2Total =
      spreadMonthlyTargetPremium2 *
      spreadNumberOfMembers2 *
      spreadPremiumMember2 *
      (personalNumberValue - spreadNumberValue2);

    /* Position 3 */
    /* Senior Associate */
    const spreadNumberValue3 = data.spread.position3.numberValue;
    const spreadPremiumMember3 = data.spread.numberOfPremiumMembers3;
    const spreadMonthlyTargetPremium3 = parseInt(
      data.spread.monthlyTargetPremium3
    );
    const spreadNumberOfMembers3 = parseInt(data.spread.numberOfMembers3);

    /* Formula 3 */
    const spread3Total =
      spreadMonthlyTargetPremium3 *
      spreadNumberOfMembers3 *
      spreadPremiumMember3 *
      (personalNumberValue - spreadNumberValue3);

    /* Position 4 */
    /* Marketing Director */
    const spreadNumberValue4 = data.spread.position4.numberValue;
    const spreadMonthlyTargetPremium4 = parseInt(
      data.spread.monthlyTargetPremium4
    );
    const spreadNumberOfMembers4 = parseInt(data.spread.numberOfMembers4);
    const spreadPremiumMember4 = data.spread.numberOfPremiumMembers4;

    /* Formula 4 */
    const spread4Total =
      spreadMonthlyTargetPremium4 *
      spreadNumberOfMembers4 *
      spreadPremiumMember4 *
      (personalNumberValue - spreadNumberValue4);

    /* Position 5 */
    /*Senior Marketing Director */
    const spreadNumberValue5 = data.spread.position5.numberValue;
    const spreadMonthlyTargetPremium5 = parseInt(
      data.spread.monthlyTargetPremium5
    );
    const spreadNumberOfMembers5 = parseInt(data.spread.numberOfMembers5);
    const spreadPremiumMember5 = data.spread.numberOfPremiumMembers5;

    /* Formula 5 */
    const spread5Total =
      (personalNumberValue - spreadNumberValue5) *
      (spreadMonthlyTargetPremium5 *
        spreadNumberOfMembers5 *
        spreadPremiumMember5) *
      (personalNumberValue - spreadNumberValue5);

    /* Position 6 */
    /* Executive Marketing Director */
    const spreadNumberValue6 = data.spread.position6.numberValue;
    const spreadMonthlyTargetPremium6 = parseInt(
      data.spread.monthlyTargetPremium6
    );
    const spreadNumberOfMembers6 = parseInt(data.spread.numberOfMembers6);
    const spreadPremiumMember6 = data.spread.numberOfPremiumMembers6;

    /* Formula 6 */
    const spread6Total =
      spreadMonthlyTargetPremium6 *
      spreadNumberOfMembers6 *
      spreadPremiumMember6 *
      (personalNumberValue - spreadNumberValue6);

    /* Position 7 */
    /*Senior Executive Marketing Director */
    const spreadNumberValue7 = data.spread.position7.numberValue;
    const spreadMonthlyTargetPremium7 = parseInt(
      data.spread.monthlyTargetPremium7
    );
    const spreadNumberOfMembers7 = parseInt(data.spread.numberOfMembers7);
    const spreadPremiumMember7 = data.spread.numberOfPremiumMembers7;

    /* Formula 7 */
    const spread7Total =
      spreadMonthlyTargetPremium7 *
      spreadNumberOfMembers7 *
      spreadPremiumMember7 *
      (personalNumberValue - spreadNumberValue7);

    /* Position 8 */
    /* Executive Vice President */
    const spreadNumberValue8 = data.spread.position8.numberValue;
    const spreadMonthlyTargetPremium8 = parseInt(
      data.spread.monthlyTargetPremium8
    );
    const spreadNumberOfMembers8 = parseInt(data.spread.numberOfMembers8);
    const spreadPremiumMember8 = data.spread.numberOfPremiumMembers8;

    /* Formula 8 */
    const spread8Total =
      spreadMonthlyTargetPremium8 *
      spreadNumberOfMembers8 *
      spreadPremiumMember8 *
      (personalNumberValue - spreadNumberValue8);
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

    // /* Spread  Total Members*/
    // const spreadMembersTotal =
    //   spreadNumberOfMembers8 +
    //   spreadNumberOfMembers7 +
    //   spreadNumberOfMembers6 +
    //   spreadNumberOfMembers5 +
    //   spreadNumberOfMembers4 +
    //   spreadNumberOfMembers3 +
    //   spreadNumberOfMembers2 +
    //   spreadNumberOfMembers1;
    /* Hidden for future use */

    /** Generation Overrride */
    /*Gen 1 */
    const gen1NumberValue = data.generation.gen1NumberValue;
    const numberOfMembers1 = parseInt(data.generation.numberOfMembers1);
    const numberOfPremiumMembers1 = data.generation.numberOfPremMembers1;
    const monthlyTargetPremium1 = parseInt(
      data.generation.monthlyTargetPremium1
    );

    /* Gen Total 1 */
    const gen1Total =
      monthlyTargetPremium1 *
      numberOfMembers1 *
      gen1NumberValue *
      numberOfPremiumMembers1;

    /*Gen 2 */
    const gen2NumberValue = data.generation.gen2NumberValue;
    const numberOfMembers2 = parseInt(data.generation.numberOfMembers2);
    const numberOfPremiumMembers2 = data.generation.numberOfPremMembers2;
    const monthlyTargetPremium2 = parseInt(
      data.generation.monthlyTargetPremium2
    );

    /* Gen Total 2 */
    const gen2Total =
      monthlyTargetPremium2 *
      numberOfMembers2 *
      gen2NumberValue *
      numberOfPremiumMembers2;

    /*Gen 3 */
    const gen3NumberValue = data.generation.gen3NumberValue;
    const numberOfMembers3 = parseInt(data.generation.numberOfMembers3);
    const numberOfPremiumMembers3 = data.generation.numberOfPremMembers3;
    const monthlyTargetPremium3 = parseInt(
      data.generation.monthlyTargetPremium3
    );

    /* Gen Total 3 */
    const gen3Total =
      monthlyTargetPremium3 *
      numberOfMembers3 *
      gen3NumberValue *
      numberOfPremiumMembers3;

    /*Gen 4 */
    const gen4NumberValue = data.generation.gen4NumberValue;
    const numberOfMembers4 = parseInt(data.generation.numberOfMembers4);
    const numberOfPremiumMembers4 = data.generation.numberOfPremMembers4;
    const monthlyTargetPremium4 = parseInt(
      data.generation.monthlyTargetPremium4
    );

    /* Gen Total 4 */
    const gen4Total =
      monthlyTargetPremium4 *
      numberOfMembers4 *
      gen4NumberValue *
      numberOfPremiumMembers4;

    /* Override Total */
    const generationTotal = gen1Total + gen2Total + gen3Total + gen4Total;
    const formattedGenerationTotal = parseInt(generationTotal.toFixed(2));

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

      if (data.personal.position[0].numberValue > AGENT_ROLES[3].numberValue) {
        setIsPositionValid(true);
      } else {
        setIsPositionValid(false);
      }
    };

    if (isSeniorAssociate && spreadNumberOfMembers2 < 3) {
      setErrorMessage(
        "Minimum requirement for Senior Associate not met : 3 Associates."
      );
      setTotalEarnings(earningsInitialValue);
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
      earningsSetter();
      return;
    } else if (
      (isSeniorMarketingDirector &&
        spreadNumberOfMembers4 < 2 &&
        spreadNumberOfMembers3 < 5) ||
      (isSeniorMarketingDirector &&
        spreadNumberOfMembers3 < 5 &&
        spreadNumberOfMembers4 < 2)
    ) {
      setErrorMessage(
        "Minimum requirement for Senior Marketing Director not met : 2 Marketing Director or 5 Senior Associates"
      );
      setTotalEarnings(earningsInitialValue);
      earningsSetter();

      return;
    } else if (
      (isExecutiveMarketingDirector &&
        spreadNumberOfMembers5 < 2 &&
        spreadNumberOfMembers4 < 3) ||
      (isExecutiveMarketingDirector &&
        spreadNumberOfMembers4 < 3 &&
        spreadNumberOfMembers5 < 2)
    ) {
      setErrorMessage(
        "Minimum requirement for Executive Marketing Director not met : 2 Senior Marketing Director or 3 Marketing Director"
      );
      setTotalEarnings(earningsInitialValue);
      earningsSetter();

      return;
    } else if (
      (isSeniorExecutiveMarketingDirector &&
        spreadNumberOfMembers6 < 2 &&
        spreadNumberOfMembers5 < 2) ||
      (isSeniorExecutiveMarketingDirector &&
        spreadNumberOfMembers5 < 4 &&
        spreadNumberOfMembers6 < 2)
    ) {
      setErrorMessage(
        "Minimum requirement for Senior Executive Marketing Director not met : 2 Executive Marketing Director or 4 Senior Marketing Director"
      );
      setTotalEarnings(earningsInitialValue);
      earningsSetter();

      return;
    } else if (
      (isVicePresident &&
        spreadNumberOfMembers7 < 2 &&
        spreadNumberOfMembers5 < 6) ||
      (isVicePresident &&
        spreadNumberOfMembers5 < 6 &&
        spreadNumberOfMembers7 < 2)
    ) {
      setErrorMessage(
        "Minimum requirement for Executive Vice President not met : 2 Senior Executive Marketing Director or 6 Senior Marketing Director"
      );
      setTotalEarnings(earningsInitialValue);
      earningsSetter();

      return;
    }

    // /*Total Members  */
    // const totalMembersOverall = overrideMembersTotal + spreadMembersTotal;
    // setMembers(totalMembersOverall); /* Hidden for future use */
    setErrorMessage("");
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

    if (data.personal.position[0].numberValue > AGENT_ROLES[3].numberValue) {
      setIsPositionValid(true);
    } else {
      setIsPositionValid(false);
    }
  };

  const totalEarningMonthly =
    totalEarnings[0].personal +
    totalEarnings[0].spread +
    (isPositionValid ? totalEarnings[0].generationOverride : 0);

  const totalEarningAnually = totalEarningMonthly * 12;

  const formattedearnings = {
    totalEarningAnually: formatter.format(totalEarningAnually || 0),
    totalEarningMonthly: formatter.format(totalEarningMonthly || 0),
  };

  return (
    <div className="admin-calculator">
      <Formik
        initialValues={initialValues}
        // validationSchema={validateYupSchema}
        onSubmit={(data) => submitHandler(data)}
      >
        {({
          values,
          errors,
          handleSubmit,
          setFieldValue,
          resetForm,
          touched,
        }) => {
          return (
            <div className="two-col">
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={6}>
                  <div className="left-col-calculator">
                    <div className="overall-earnings-container">
                      <Grid container spacing={0} alignItems="center">
                        <Grid item xs={12} md={12} lg={7}>
                          <div className="left-col-total">
                            <div className="overall-earnings-captions">
                              <h2>Total Earnings</h2>
                              <h1>{formattedearnings.totalEarningMonthly}</h1>
                              <h3>Month to Date</h3>
                            </div>
                            <div className="top-left-col-btn">
                              <button>{date}</button>
                              <button className="download-btn">
                                Download Report
                              </button>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={12} lg={5}>
                          <div className="right-col-total">
                            <h2>{formattedearnings.totalEarningAnually}</h2>
                            <p>Potential Annual Earning</p>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="form-calculator-wrapper">
                      <div className="calculator-input-container-personal">
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={12} lg={6}>
                            <div className="form-left-col-personal">
                              <label className="personal-label">
                                Personal Position
                              </label>
                              <Select
                                classNamePrefix="select"
                                onChange={(e) => {
                                  if (values.personal.position[0].value) {
                                    resetForm();
                                    setIsPositionValid(false);
                                    setErrorMessage("");
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
                            </div>
                          </Grid>
                          <Grid item xs={12} md={12} lg={6}>
                            <div className="form-right-col-personal">
                              <label className="personal-label">
                                Personal Monthly Target Premium
                              </label>
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
                      <div className="calculator-input-container-spread">
                        <h2>Spread</h2>
                        {errorMessage ? (
                          <div className="alert-message">
                            <AlertMessage
                              message={errorMessage}
                              icon={<AiOutlineWarning />}
                            />
                          </div>
                        ) : (
                          <div style={{ height: "3.9vh" }}></div>
                        )}
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={12} lg={3}>
                            <label style={{ textAlign: "left" }}>
                              Position
                            </label>
                          </Grid>
                          <Grid item xs={12} md={12} lg={3}>
                            <label>Monthly Target Premium per Policy</label>
                          </Grid>
                          <Grid item xs={12} md={12} lg={3}>
                            <label>
                              No.of <br /> Members
                            </label>
                          </Grid>
                          <Grid item xs={12} md={12} lg={3}>
                            <label>
                              No. of Premium <br /> per Member
                            </label>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center">
                          {AGENT_ROLES.map((data, index) => {
                            const sumIndex = index + 1;
                            return (
                              <React.Fragment>
                                <Grid item xs={12} md={12} lg={3}>
                                  <div className="perosonal-tooltip">
                                    <Grid
                                      container
                                      spacing={0}
                                      alignItems="center"
                                      justifyContent="space-between"
                                    >
                                      <Grid item xs={12} md={12} lg={9}>
                                        <label style={{ textAlign: "left" }}>
                                          {data.label}
                                        </label>
                                      </Grid>
                                      <Grid item xs={12} md={12} lg={3}>
                                        {values.personal.position[0]!
                                          .numberValue <= data.numberValue ||
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
                                                    ? "You must choose a personal position first."
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
                                      </Grid>
                                    </Grid>
                                  </div>
                                </Grid>
                                <Grid item xs={12} md={12} lg={3}>
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
                                      values.personal.position[0].numberValue <=
                                        data.numberValue ||
                                      !values.personal.monthlyTargetPremium
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} md={12} lg={3}>
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
                                      values.personal.position[0].numberValue <=
                                        data.numberValue ||
                                      !values.personal.monthlyTargetPremium
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} md={12} lg={3}>
                                  <FormikTextInput
                                    type="number"
                                    name={`spread.numberOfPremiumMembers${sumIndex}`}
                                    value={0}
                                    variant="outlined"
                                    label=""
                                    disabled={
                                      values.personal.position[0].numberValue <=
                                        data.numberValue ||
                                      !values.personal.monthlyTargetPremium
                                    }
                                  />
                                </Grid>
                              </React.Fragment>
                            );
                          })}
                        </Grid>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <div className="right-col-calculator">
                    <div className="top-section">
                      <div className="top-section-captions">
                        <span>Hello, </span>
                        <h2 style={{ display: "inline-block" }}>
                          {" "}
                          First Name!
                        </h2>
                        <h4>Welcome to your CFS Calculator</h4>
                      </div>
                    </div>
                    <div className="disclaimer-container">
                      <h2>Disclaimer: </h2>
                      <div className="disclaimer-description">
                        The Insurance Earnings Calculator is designed for
                        projection purposes only. The results provided are based
                        on user-inputted data and assumptions and should not be
                        considered as definitive results. Actual earnings may
                        vary.
                      </div>
                      <div className="disclaimer-description">
                        To use this calculator, enter details such as Personal
                        position, Personal monthly target premium,and details in
                        the Spread and Generation Override section. Click the{" "}
                        <span
                          style={{
                            color: "#0057B7",
                            fontWeight: "700",
                          }}
                        >
                          'Calculate'
                        </span>{" "}
                        button to get results and{" "}
                        <span
                          style={{
                            color: "#ED3E4B",
                            fontWeight: "700",
                          }}
                        >
                          'Reset'
                        </span>{" "}
                        button to start over.
                      </div>
                    </div>
                    <div className="tri-col-container">
                      <Grid
                        container
                        spacing={12}
                        justifyContent="space-between"
                      >
                        <Grid item xs={12} md={12} lg={4}>
                          <div className="tri-col-section-captions">
                            <div className="earnings-title">
                              <h2>Personal Earnings</h2>
                            </div>
                            <div className="earnings-label">Monthly</div>
                            <div className="earnings-value1-block">
                              <h2>
                                {formatter.format(totalEarnings[0].personal)}
                              </h2>
                            </div>
                            <div className="earnings-label">Annual</div>
                            <div className="earnings-value2-block">
                              <h2 className="sky">
                                {formatter.format(
                                  totalEarnings[0].personal * 12
                                )}
                              </h2>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={12} lg={4}>
                          <div className="tri-col-section-captions">
                            <div className="earnings-title">
                              <h2>Spread Earnings</h2>
                            </div>
                            <div className="earnings-label">Monthly</div>
                            <div className="earnings-value1-block">
                              <h2>
                                {formatter.format(totalEarnings[0].spread)}
                              </h2>
                            </div>
                            <div className="earnings-label">Annual</div>
                            <div className="earnings-value2-block">
                              <h2 className="navy">
                                {formatter.format(totalEarnings[0].spread * 12)}
                              </h2>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={12} lg={4}>
                          <div className="tri-col-section-captions">
                            <div className="earnings-title">
                              <h2>Override Earnings</h2>
                            </div>
                            <div className="earnings-label">Monthly</div>
                            <div className="earnings-value1-block">
                              <h2>
                                {formatter.format(
                                  totalEarnings[0].generationOverride
                                )}
                              </h2>
                            </div>
                            <div className="earnings-label">Annual</div>
                            <div className="earnings-value2-block">
                              <h2 className="light">
                                {formatter.format(
                                  totalEarnings[0].generationOverride * 12
                                )}
                              </h2>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="calculator-input-container-override">
                      <h2>Generation Override</h2>

                      <div className="alert-message">
                        {values.personal.position[0].numberValue < 0.81 ? (
                          <AlertMessage
                            message="Only Senior Marketing Director and above can earn override."
                            icon={<AiOutlineWarning />}
                          />
                        ) : null}
                      </div>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={12} lg={3}>
                          <label
                            style={{ textAlign: "left", marginLeft: "3rem" }}
                          >
                            Tier
                          </label>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                          <label>Monthly Target Premium per Policy</label>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                          <label>
                            No.of <br /> Members
                          </label>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                          <label>
                            No. of Premium <br /> per Member
                          </label>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} alignItems="center">
                        {genNum.map((data, index) => {
                          const sumIndex = index + 1;
                          const inputValidity =
                            !values.personal.position.length ||
                            !values.personal.monthlyTargetPremium;

                          return (
                            <React.Fragment>
                              <Grid item sm={12} md={9} lg={3}>
                                <div className="calcu-form-control">
                                  <h3>{data} Generation</h3>
                                </div>
                              </Grid>
                              <Grid item sm={12} md={9} lg={3}>
                                <div className="calcu-form-control">
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
                              <Grid item sm={12} md={9} lg={3}>
                                <div className="calcu-form-control">
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
                              <Grid item sm={12} md={9} lg={3}>
                                <div className="calcu-form-control">
                                  <FormikTextInput
                                    name={`generation.numberOfPremMembers${sumIndex}`}
                                    type="number"
                                    value={
                                      values.generation[
                                        `numberOfPremMembers${sumIndex}`
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
                    <div className="calculator-buttons">
                      <Button
                        variant="primary"
                        onClick={() => handleSubmit()}
                        type="submit"
                      >
                        Calculate
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          resetForm();
                          setTotalEarnings(earningsInitialValue);
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Calculator;
