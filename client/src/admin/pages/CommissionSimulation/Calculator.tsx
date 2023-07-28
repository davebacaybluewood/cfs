import React, { useEffect, useState } from "react";
import { Box, Grid, Modal } from "@mui/material";
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
import { Button as MuiButton } from "@mui/material";
import useAccountValidation from "admin/hooks/useAccountValidation";
import nameFallback from "helpers/nameFallback";
import "./Calculator.scss";

const AGENT_ROLES = [
  {
    value: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
    label: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.label,
    numberValue: 0.86,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.label,
    numberValue: 0.85,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.label,
    numberValue: 0.83,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.label,
    numberValue: 0.81,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.label,
    numberValue: 0.65,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.label,
    numberValue: 0.5,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
    label: PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.label,
    numberValue: 0.35,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
    label: PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.label,
    numberValue: 0,
  },
];
const standardInputStyles = {
  fontSize: "16px",
};

const formInitialValues = {
  personal: {
    position: [
      {
        label: "",
        value: "",
        numberValue: 0,
      },
    ],
    monthlyTargetPremium: "",
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
    numberOfDirectMembers1: 0,

    position2: {
      label: AGENT_ROLES[1].label,
      value: AGENT_ROLES[1].value,
      numberValue: AGENT_ROLES[1].numberValue,
    },
    monthlyTargetPremium2: 0,
    numberOfPremiumMembers2: 0,
    numberOfMembers2: 0,
    numberOfDirectMembers2: 0,

    position3: {
      label: AGENT_ROLES[2].label,
      value: AGENT_ROLES[2].value,
      numberValue: AGENT_ROLES[2].numberValue,
    },
    monthlyTargetPremium3: 0,
    numberOfPremiumMembers3: 0,
    numberOfMembers3: 0,
    numberOfDirectMembers3: 0,

    position4: {
      label: AGENT_ROLES[3].label,
      value: AGENT_ROLES[3].value,
      numberValue: AGENT_ROLES[3].numberValue,
    },
    monthlyTargetPremium4: 0,
    numberOfPremiumMembers4: 0,
    numberOfMembers4: 0,
    numberOfDirectMembers4: 0,

    position5: {
      label: AGENT_ROLES[4].label,
      value: AGENT_ROLES[4].value,
      numberValue: AGENT_ROLES[4].numberValue,
    },
    monthlyTargetPremium5: 0,
    numberOfPremiumMembers5: 0,
    numberOfMembers5: 0,
    numberOfDirectMembers5: 0,

    position6: {
      label: AGENT_ROLES[5].label,
      value: AGENT_ROLES[5].value,
      numberValue: AGENT_ROLES[5].numberValue,
    },
    monthlyTargetPremium6: 0,
    numberOfPremiumMembers6: 0,
    numberOfMembers6: 0,
    numberOfDirectMembers6: 0,

    position7: {
      label: AGENT_ROLES[6].label,
      value: AGENT_ROLES[6].value,
      numberValue: AGENT_ROLES[6].numberValue,
    },
    monthlyTargetPremium7: 0,
    numberOfPremiumMembers7: 0,
    numberOfMembers7: 0,
    numberOfDirectMembers7: 0,

    position8: {
      label: AGENT_ROLES[7].label,
      value: AGENT_ROLES[7].value,
      numberValue: AGENT_ROLES[7].numberValue,
    },
    monthlyTargetPremium8: 0,
    numberOfPremiumMembers8: 0,
    numberOfMembers8: 0,
    numberOfDirectMembers8: 0,
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
  /* Modal styles */
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const account: any = useAccountValidation();
  // Mock Date
  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  const [errorMessage, setErrorMessage] = useState("");
  const [initialValues, setInitialValues] = useState(formInitialValues);

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

  useEffect(() => {
    const onCalculate = (data = initialValues) => {
      /** Personal */
      const personalNumberValue = data.personal.position[0]?.numberValue;
      const personalMonthlyTargetPremium = Number(
        data.personal.monthlyTargetPremium
      );
      const personalTotal = personalMonthlyTargetPremium * personalNumberValue;

      /* Spread */

      /* Position 7 */
      /* Associate */
      const spreadNumberValue7 = data.spread.position7.numberValue;
      const spreadMonthlyTargetPremium7 = data.spread.monthlyTargetPremium7;
      const spreadNumberOfMembers7 = data.spread.numberOfMembers7;
      const spreadPremiumMember7 = data.spread.numberOfPremiumMembers7;
      const numberOfDirectMembers7 = data.spread.numberOfDirectMembers7;

      /* Formula 7 */

      const spread7Indirect =
        spreadMonthlyTargetPremium7 *
        spreadNumberOfMembers7 *
        spreadPremiumMember7 *
        (data.spread.position6.numberValue - spreadNumberValue7);

      const spread7Direct =
        spreadMonthlyTargetPremium7 *
        numberOfDirectMembers7 *
        spreadPremiumMember7 *
        (personalNumberValue - spreadNumberValue7);

      const spread7Total = spread7Direct + spread7Indirect;

      /* Position 6 */
      /* Senior Associate */
      const spreadNumberValue6 = data.spread.position6.numberValue;
      const spreadMonthlyTargetPremium6 = data.spread.monthlyTargetPremium6;
      const spreadNumberOfMembers6 = data.spread.numberOfMembers6;
      const spreadPremiumMember6 = data.spread.numberOfPremiumMembers6;
      const numberOfDirectMembers6 = data.spread.numberOfDirectMembers6;

      /* Formula 6 */

      const spread6Indirect =
        spreadMonthlyTargetPremium6 *
        spreadNumberOfMembers6 *
        spreadPremiumMember6 *
        (data.spread.position5.numberValue - spreadNumberValue6);

      const spread6Direct =
        spreadMonthlyTargetPremium6 *
        numberOfDirectMembers6 *
        spreadPremiumMember6 *
        (personalNumberValue - spreadNumberValue6);

      const spread6Total = spread6Direct + spread6Indirect;

      /* Position 5 */
      /* Marketing Director */
      const spreadNumberValue5 = data.spread.position5.numberValue;
      const spreadMonthlyTargetPremium5 = data.spread.monthlyTargetPremium5;
      const spreadNumberOfMembers5 = data.spread.numberOfMembers5;
      const spreadPremiumMember5 = data.spread.numberOfPremiumMembers5;
      const numberOfDirectMembers5 = data.spread.numberOfDirectMembers5;

      /* Formula 5 */

      const spread5Indirect =
        spreadMonthlyTargetPremium5 *
        spreadNumberOfMembers5 *
        spreadPremiumMember5 *
        (data.spread.position4.numberValue - spreadNumberValue5);

      const spread5Direct =
        spreadMonthlyTargetPremium5 *
        numberOfDirectMembers5 *
        spreadPremiumMember5 *
        (personalNumberValue - spreadNumberValue5);

      const spread5Total = spread5Direct + spread5Indirect;

      /* Position 4 */
      /*Senior Marketing Director */
      const spreadNumberValue4 = data.spread.position4.numberValue;
      const spreadMonthlyTargetPremium4 = data.spread.monthlyTargetPremium4;
      const spreadNumberOfMembers4 = data.spread.numberOfMembers4;
      const spreadPremiumMember4 = data.spread.numberOfPremiumMembers4;
      const numberOfDirectMembers4 = data.spread.numberOfDirectMembers4;

      /* Formula 4 */

      const spread4Indirect =
        spreadMonthlyTargetPremium4 *
        spreadNumberOfMembers4 *
        spreadPremiumMember4 *
        (data.spread.position3.numberValue - spreadNumberValue4);

      const spread4Direct =
        spreadMonthlyTargetPremium4 *
        numberOfDirectMembers4 *
        spreadPremiumMember4 *
        (personalNumberValue - spreadNumberValue4);

      const spread4Total = spread4Direct + spread4Indirect;

      /* Position 3 */
      /* Executive Marketing Director */
      const spreadNumberValue3 = data.spread.position3.numberValue;
      const spreadMonthlyTargetPremium3 = data.spread.monthlyTargetPremium3;
      const spreadNumberOfMembers3 = data.spread.numberOfMembers3;
      const spreadPremiumMember3 = data.spread.numberOfPremiumMembers3;
      const numberOfDirectMembers3 = data.spread.numberOfDirectMembers3;

      /* Formula 3 */

      const spread3Indirect =
        spreadMonthlyTargetPremium3 *
        spreadNumberOfMembers3 *
        spreadPremiumMember3 *
        (data.spread.position2.numberValue - spreadNumberValue3);

      const spread3Direct =
        spreadMonthlyTargetPremium3 *
        numberOfDirectMembers3 *
        spreadPremiumMember3 *
        (personalNumberValue - spreadNumberValue3);

      const spread3Total = spread3Direct + spread3Indirect;

      /* Position 2 */
      /*Senior Executive Marketing Director */
      const spreadNumberValue2 = data.spread.position2.numberValue;
      const spreadMonthlyTargetPremium2 = data.spread.monthlyTargetPremium2;
      const spreadNumberOfMembers2 = data.spread.numberOfMembers2;
      const spreadPremiumMember2 = data.spread.numberOfPremiumMembers2;
      const numberOfDirectMembers2 = data.spread.numberOfDirectMembers2;
      /* Formula 2 */

      const spread2Indirect =
        spreadMonthlyTargetPremium2 *
        spreadNumberOfMembers2 *
        spreadPremiumMember2 *
        (data.spread.position1.numberValue - spreadNumberValue2);

      const spread2Direct =
        spreadMonthlyTargetPremium2 *
        numberOfDirectMembers2 *
        spreadPremiumMember2 *
        (personalNumberValue - spreadNumberValue2);

      const spread2Total = spread2Direct + spread2Indirect;

      /* Spread Total Earnings */
      const spreadTotal =
        spread2Total +
        spread3Total +
        spread4Total +
        spread5Total +
        spread6Total +
        spread7Total;

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
      const numberOfMembers1 = data.generation.numberOfMembers1;
      const numberOfPremiumMembers1 = data.generation.numberOfPremMembers1;
      const monthlyTargetPremium1 = data.generation.monthlyTargetPremium1;

      /* Gen Total 1 */
      const gen1Total =
        monthlyTargetPremium1 *
        numberOfMembers1 *
        gen1NumberValue *
        numberOfPremiumMembers1;

      /*Gen 2 */
      const gen2NumberValue = data.generation.gen2NumberValue;
      const numberOfMembers2 = data.generation.numberOfMembers2;
      const numberOfPremiumMembers2 = data.generation.numberOfPremMembers2;
      const monthlyTargetPremium2 = data.generation.monthlyTargetPremium2;

      /* Gen Total 2 */
      const gen2Total =
        monthlyTargetPremium2 *
        numberOfMembers2 *
        gen2NumberValue *
        numberOfPremiumMembers2;

      /*Gen 3 */
      const gen3NumberValue = data.generation.gen3NumberValue;
      const numberOfMembers3 = data.generation.numberOfMembers3;
      const numberOfPremiumMembers3 = data.generation.numberOfPremMembers3;
      const monthlyTargetPremium3 = data.generation.monthlyTargetPremium3;

      /* Gen Total 3 */
      const gen3Total =
        monthlyTargetPremium3 *
        numberOfMembers3 *
        gen3NumberValue *
        numberOfPremiumMembers3;

      /*Gen 4 */
      const gen4NumberValue = data.generation.gen4NumberValue;
      const numberOfMembers4 = data.generation.numberOfMembers4;
      const numberOfPremiumMembers4 = data.generation.numberOfPremMembers4;
      const monthlyTargetPremium4 = data.generation.monthlyTargetPremium4;

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
        numberOfMembers4 +
        numberOfMembers3 +
        numberOfMembers2 +
        numberOfMembers1;

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

        if (
          data.personal.position[0].numberValue > AGENT_ROLES[3].numberValue
        ) {
          setIsPositionValid(true);
        } else {
          setIsPositionValid(false);
        }
      };

      if (isSeniorAssociate && spreadNumberOfMembers7 < 3) {
        setErrorMessage(
          "Minimum requirement for Senior Associate not met : 3 Associates."
        );
        setTotalEarnings(earningsInitialValue);
        earningsSetter();
        return;
      } else if (
        isMarketingDirector &&
        (spreadNumberOfMembers6 < 2 || spreadNumberOfMembers7 < 5)
      ) {
        setErrorMessage(
          "Minimum requirement for Marketing Director not met : 2 Senior Associates and 5 Associates."
        );
        setTotalEarnings(earningsInitialValue);
        earningsSetter();
        return;
      } else if (
        (isSeniorMarketingDirector &&
          spreadNumberOfMembers5 < 2 &&
          spreadNumberOfMembers6 < 5) ||
        (isSeniorMarketingDirector &&
          spreadNumberOfMembers6 < 5 &&
          spreadNumberOfMembers5 < 2)
      ) {
        setErrorMessage(
          "Minimum requirement for Senior Marketing Director not met : 2 Marketing Director or 5 Senior Associates"
        );
        setTotalEarnings(earningsInitialValue);
        earningsSetter();

        return;
      } else if (
        (isExecutiveMarketingDirector &&
          spreadNumberOfMembers6 < 2 &&
          spreadNumberOfMembers5 < 3) ||
        (isExecutiveMarketingDirector &&
          spreadNumberOfMembers5 < 3 &&
          spreadNumberOfMembers4 < 2)
      ) {
        setErrorMessage(
          "Minimum requirement for Executive Marketing Director not met : 2 Senior Marketing Director or 3 Marketing Director"
        );
        setTotalEarnings(earningsInitialValue);
        earningsSetter();

        return;
      } else if (
        (isSeniorExecutiveMarketingDirector &&
          spreadNumberOfMembers3 < 2 &&
          spreadNumberOfMembers4 < 2) ||
        (isSeniorExecutiveMarketingDirector &&
          spreadNumberOfMembers4 < 4 &&
          spreadNumberOfMembers3 < 2)
      ) {
        setErrorMessage(
          "Minimum requirement for Senior Executive Marketing Director not met : 2 Executive Marketing Director or 4 Senior Marketing Director"
        );
        setTotalEarnings(earningsInitialValue);
        earningsSetter();

        return;
      } else if (
        (isVicePresident &&
          spreadNumberOfMembers2 < 2 &&
          spreadNumberOfMembers4 < 6) ||
        (isVicePresident &&
          spreadNumberOfMembers4 < 6 &&
          spreadNumberOfMembers2 < 2)
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

    onCalculate(initialValues);
  }, [initialValues]);

  const submitHandler = (data) => {};

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
                <Grid item xs={12} md={12} lg={7}>
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
                                  // if (values.personal.position[0].value) {
                                  //   resetForm();
                                  //   setIsPositionValid(false);
                                  //   setErrorMessage("");
                                  //   setTotalEarnings(earningsInitialValue);
                                  // }
                                  onChangePositionHandler(e, setFieldValue);
                                  setInitialValues((prevState): any => {
                                    return {
                                      ...initialValues,
                                      personal: {
                                        position: [
                                          {
                                            label: e?.label,
                                            numberValue: e?.numberValue,
                                            value: e?.value,
                                          },
                                        ],
                                        monthlyTargetPremium:
                                          prevState.personal
                                            .monthlyTargetPremium,
                                      },
                                    };
                                  });
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
                                value={
                                  values.personal.monthlyTargetPremium === ""
                                    ? ""
                                    : values.personal.monthlyTargetPremium
                                }
                                style={standardInputStyles}
                                placeholder={formatter.format(0)}
                                variant="outlined"
                                label=""
                                error={!!errors.personal?.monthlyTargetPremium}
                                onBlur={(e) => {
                                  setInitialValues((prevState): any => {
                                    return {
                                      ...initialValues,
                                      personal: {
                                        position: [
                                          {
                                            label:
                                              prevState?.personal.position[0]
                                                .label,
                                            numberValue:
                                              prevState?.personal.position[0]
                                                .numberValue,
                                            value:
                                              prevState?.personal.position[0]
                                                .value,
                                          },
                                        ],
                                        monthlyTargetPremium: e.target?.value,
                                      },
                                    };
                                  });
                                }}
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
                            <label>
                              Monthly Target Premium <br /> per Policy
                            </label>
                          </Grid>
                          <Grid item xs={12} md={12} lg={2}>
                            <label>
                              No.of <br /> Total Members
                            </label>
                          </Grid>
                          <Grid item xs={12} md={12} lg={2}>
                            <label style={{ textAlign: "center" }}>
                              No. of <br /> Direct Members
                            </label>
                          </Grid>
                          <Grid item xs={12} md={12} lg={2}>
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
                                      <Grid item xs={12} md={12} lg={10}>
                                        <h3 style={{ textAlign: "left" }}>
                                          {data.label}
                                        </h3>
                                      </Grid>
                                      <Grid item xs={12} md={12} lg={2}>
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
                                    value={
                                      values.personal.position[0].numberValue <=
                                      data.numberValue
                                        ? 0
                                        : values.spread[
                                            `monthlyTargetPremium${sumIndex}`
                                          ] === 0 || ""
                                        ? ""
                                        : values.spread[
                                            `monthlyTargetPremium${sumIndex}`
                                          ]
                                    }
                                    variant="outlined"
                                    placeholder={formatter.format(0)}
                                    label=""
                                    disabled={
                                      values.personal.position[0].numberValue <=
                                      data.numberValue
                                    }
                                    onBlur={(e) => {
                                      setInitialValues((prevState) => {
                                        return {
                                          ...initialValues,
                                          spread: {
                                            ...prevState.spread,
                                            [`monthlyTargetPremium${sumIndex}`]:
                                              e.target?.value,
                                          },
                                        };
                                      });
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12} md={12} lg={2}>
                                  <FormikTextInput
                                    type="number"
                                    name={`spread.numberOfMembers${sumIndex}`}
                                    value={
                                      values.personal.position[0].numberValue <=
                                      data.numberValue
                                        ? 0
                                        : values.spread[
                                            `numberOfMembers${sumIndex}`
                                          ] === 0
                                        ? ""
                                        : values.spread[
                                            `numberOfMembers${sumIndex}`
                                          ]
                                    }
                                    placeholder="0"
                                    variant="outlined"
                                    label=""
                                    disabled={
                                      values.personal.position[0].numberValue <=
                                      data.numberValue
                                    }
                                    onBlur={(e) => {
                                      setInitialValues((prevState) => {
                                        return {
                                          ...initialValues,
                                          spread: {
                                            ...prevState.spread,
                                            [`numberOfMembers${sumIndex}`]:
                                              e.target?.value,
                                          },
                                        };
                                      });
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12} md={12} lg={2}>
                                  <FormikTextInput
                                    type="number"
                                    name={`spread.numberOfDirectMembers${sumIndex}`}
                                    value={
                                      values.personal.position[0].numberValue <=
                                      data.numberValue
                                        ? 0
                                        : values.spread[
                                            `spread.numberOfDirectMembers${sumIndex}`
                                          ] === 0
                                        ? ""
                                        : values.spread[
                                            `spread.numberOfDirectMembers${sumIndex}`
                                          ]
                                    }
                                    placeholder="0"
                                    variant="outlined"
                                    label=""
                                    disabled={
                                      values.personal.position[0].numberValue <=
                                      data.numberValue
                                    }
                                    onBlur={(e) => {
                                      setInitialValues((prevState) => {
                                        return {
                                          ...initialValues,
                                          spread: {
                                            ...prevState.spread,
                                            [`numberOfDirectMembers${sumIndex}`]:
                                              e.target?.value,
                                          },
                                        };
                                      });
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12} md={12} lg={2}>
                                  <FormikTextInput
                                    type="number"
                                    name={`spread.numberOfPremiumMembers${sumIndex}`}
                                    value={
                                      values.personal.position[0].numberValue <=
                                      data.numberValue
                                        ? 0
                                        : values.spread[
                                            `spread.numberOfPremiumMembers${sumIndex}`
                                          ] === 0
                                        ? ""
                                        : values.spread[
                                            `spread.numberOfPremiumMembers${sumIndex}`
                                          ]
                                    }
                                    placeholder="0"
                                    variant="outlined"
                                    label=""
                                    disabled={
                                      values.personal.position[0].numberValue <=
                                      data.numberValue
                                    }
                                    onBlur={(e) => {
                                      setInitialValues((prevState) => {
                                        return {
                                          ...initialValues,
                                          spread: {
                                            ...prevState.spread,
                                            [`numberOfPremiumMembers${sumIndex}`]:
                                              e.target?.value,
                                          },
                                        };
                                      });
                                    }}
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
                <Grid item xs={12} md={12} lg={5}>
                  <div className="right-col-calculator">
                    <div className="top-section">
                      <div className="top-section-captions">
                        <span>Hello, </span>
                        <h2 style={{ display: "inline-block" }}>
                          {" "}
                          {nameFallback(account?.name, account?.firstName)}!
                        </h2>
                        <h4>Welcome to your CFS Calculator</h4>
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
                                {/*  */}
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
                          <label>
                            Monthly Target <br /> Premium per Policy
                          </label>
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
                            !values.personal.position.length;

                          return (
                            <React.Fragment>
                              <Grid item sm={12} md={9} lg={3}>
                                <div className="calcu-form-control">
                                  <h3>{data} Generation</h3>
                                </div>
                              </Grid>
                              <Grid item sm={12} md={9} lg={3}>
                                <div className="calcu-form-control">
                                  <p></p>
                                  <FormikTextInput
                                    type="number"
                                    name={`generation.monthlyTargetPremium${sumIndex}`}
                                    value={
                                      values.generation[
                                        `monthlyTargetPremium${sumIndex}`
                                      ] === 0
                                        ? ""
                                        : values.generation[
                                            `monthlyTargetPremium${sumIndex}`
                                          ]
                                    }
                                    placeholder={formatter.format(0)}
                                    variant="outlined"
                                    label=""
                                    disabled={inputValidity}
                                    onBlur={(e) => {
                                      setInitialValues((prevState) => {
                                        return {
                                          ...initialValues,
                                          generation: {
                                            ...prevState.generation,
                                            [`monthlyTargetPremium${sumIndex}`]:
                                              e.target?.value,
                                          },
                                        };
                                      });
                                    }}
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
                                      ] === 0
                                        ? ""
                                        : values.generation[
                                            `numberOfMembers${sumIndex}`
                                          ]
                                    }
                                    placeholder="0"
                                    variant="outlined"
                                    label=""
                                    disabled={inputValidity}
                                    onBlur={(e) => {
                                      setInitialValues((prevState) => {
                                        return {
                                          ...initialValues,
                                          generation: {
                                            ...prevState.generation,
                                            [`numberOfMembers${sumIndex}`]:
                                              e.target?.value,
                                          },
                                        };
                                      });
                                    }}
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
                                      ] === 0
                                        ? ""
                                        : values.generation[
                                            `numberOfPremMembers${sumIndex}`
                                          ]
                                    }
                                    placeholder="0"
                                    variant="outlined"
                                    label=""
                                    disabled={inputValidity}
                                    onBlur={(e) => {
                                      setInitialValues((prevState) => {
                                        return {
                                          ...initialValues,
                                          generation: {
                                            ...prevState.generation,
                                            [`numberOfPremMembers${sumIndex}`]:
                                              e.target?.value,
                                          },
                                        };
                                      });
                                    }}
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
                        variant="danger"
                        onClick={() => {
                          resetForm();
                          setTotalEarnings(earningsInitialValue);
                        }}
                      >
                        Reset
                      </Button>
                      <MuiButton
                        className="disclaimer-btn"
                        onClick={() => setOpen(true)}
                      >
                        Disclaimer
                      </MuiButton>
                    </div>
                  </div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <div
                        className="disclaimer-container"
                        style={{
                          borderRadius: "10px",
                          fontSize: "1.5rem",
                          textAlign: "center",
                        }}
                      >
                        <h2 style={{ marginBottom: "1.5rem" }}>Disclaimer </h2>
                        <div
                          className="disclaimer-description"
                          style={{
                            marginBottom: "1.5rem",
                            lineHeight: "2rem",
                            fontWeight: "300",
                          }}
                        >
                          The Insurance Earnings Calculator is designed for
                          projection purposes only. The results provided are
                          based on user-inputted data and assumptions and should
                          not be considered as definitive results. Actual
                          earnings may vary.
                        </div>
                        <div
                          className="disclaimer-description"
                          style={{
                            marginBottom: "1.5rem",
                            lineHeight: "2rem",
                            fontWeight: "300",
                          }}
                        >
                          To use this calculator, enter details such as Personal
                          position, Personal monthly target premium,and details
                          in the Spread and Generation Override section. Click
                          anywhere outside the field to get results and{" "}
                          <span
                            style={{
                              color: "#ED3E4B",
                              fontWeight: "700",
                            }}
                          >
                            Reset
                          </span>{" "}
                          button to start over.
                        </div>
                      </div>
                    </Box>
                  </Modal>
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
