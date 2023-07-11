import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import Title from "admin/components/Title/Title";
import { Grid } from "@mui/material";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { PieChart, Pie } from "recharts";
import "./CommissionSimulation.scss";
import FormikTextInput from "library/Formik/FormikInput";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import ErrorText from "pages/PortalRegistration/components/ErrorText";
import { PROFILE_ROLES } from "pages/PortalRegistration/constants";
import Button from "library/Button/Button";

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
    numberValue: 0,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.label,
    numberValue: 0,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.label,
    numberValue: 0,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.label,
    numberValue: 0,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.label,
    numberValue: 0,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.label,
    numberValue: 0,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
    label: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.label,
    numberValue: 0,
  },
];

const standardInputStyles = {
  fontSize: "16px",
};
const CommissionSimulation: React.FC = () => {
  // Sample data
  const data = [
    { name: "Personal Earnings", revenue: 500 },
    { name: "Spread Earnings", revenue: 500 },
    { name: "Override Earnings", revenue: 500 },
  ];

  const onChangePositionHandler = (event: any) => {
    console.log("test");
  };

  const initialValues = {
    personal: {
      position: {
        label: "",
        value: "",
        numberValue: 0,
      },
      monthlyTargetPremium: 0,
    },
    generation: {
      gen1: "",
      monthlyTargetPremium1: 0,
      numberOfMembers1: 0,
      gen2: "",
      monthlyTargetPremium2: 0,
      numberOfMembers2: 0,
      gen3: "",
      monthlyTargetPremium3: 0,
      numberOfMembers3: 0,
      gen4: "",
      monthlyTargetPremium4: 0,
      numberOfMembers4: 0,
    },
    spread: {
      position1: {
        label: AGENT_ROLES[0].label,
        value: AGENT_ROLES[0].value,
        numberValue: 0,
      },
      monthlyTargetPremium1: 0,
      numberOfMembers1: 0,
      position2: {
        label: AGENT_ROLES[1].label,
        value: AGENT_ROLES[1].value,
        numberValue: 0,
      },
      monthlyTargetPremium2: 0,
      numberOfMembers2: 0,
      position3: {
        label: AGENT_ROLES[2].label,
        value: AGENT_ROLES[2].value,
        numberValue: 0,
      },
      monthlyTargetPremium3: 0,
      numberOfMembers3: 0,
      position4: {
        label: AGENT_ROLES[3].label,
        value: AGENT_ROLES[3].value,
        numberValue: 0,
      },
      monthlyTargetPremium4: 0,
      numberOfMembers4: 0,
      position5: {
        label: AGENT_ROLES[4].label,
        value: AGENT_ROLES[4].value,
        numberValue: 0,
      },
      monthlyTargetPremium5: 0,
      numberOfMembers5: 0,
      position6: {
        label: AGENT_ROLES[5].label,
        value: AGENT_ROLES[5].value,
        numberValue: 0,
      },
      monthlyTargetPremium6: 0,
      numberOfMembers6: 0,
      position7: {
        label: AGENT_ROLES[6].label,
        value: AGENT_ROLES[6].value,
        numberValue: 0,
      },
      monthlyTargetPremium7: 0,
      numberOfMembers7: 0,
      position8: {
        label: AGENT_ROLES[7].label,
        value: AGENT_ROLES[7].value,
        numberValue: 0,
      },
      monthlyTargetPremium8: 0,
      numberOfMembers8: 0,
    },
  };

  const validationSchema = Yup.object({
    personal: Yup.object().shape({
      position: Yup.object().shape({
        value: Yup.string().required("Position field is required."),
      }),
      monthlyTargetPremium: Yup.number()
        .required("Monthly Target field is required.")
        .typeError("A number is required."),
    }),
    spread: Yup.object().shape({
      position1: Yup.string().required("Position field is required."),
      monthlyTargetPremium1: Yup.number()
        .required("Monthly Target field is required.")
        .typeError("A number is required."),
      position2: Yup.string().required("Position field is required."),
      monthlyTargetPremium2: Yup.number()
        .required("Monthly Target field is required.")
        .typeError("A number is required."),
      position3: Yup.string().required("Position field is required."),
      monthlyTargetPremium3: Yup.number()
        .required("Monthly Target field is required.")
        .typeError("A number is required."),
      position4: Yup.string().required("Position field is required."),
      monthlyTargetPremium4: Yup.number()
        .required("Monthly Target field is required.")
        .typeError("A number is required."),
      position5: Yup.string().required("Position field is required."),
      monthlyTargetPremium5: Yup.number()
        .required("Monthly Target field is required.")
        .typeError("A number is required."),
      position6: Yup.string().required("Position field is required."),
      monthlyTargetPremium6: Yup.number()
        .required("Monthly Target field is required.")
        .typeError("A number is required."),
      position7: Yup.string().required("Position field is required."),
      monthlyTargetPremium7: Yup.number()
        .required("Monthly Target field is required.")
        .typeError("A number is required."),
      position8: Yup.string().required("Position field is required."),
      monthlyTargetPremium8: Yup.number()
        .required("Monthly Target field is required.")
        .typeError("A number is required."),
    }),
    generation: Yup.object().shape({
      monthlyTargetPremium1: Yup.number()
        .required("Monthly Target field is required.")
        .typeError("A number is required."),
      numberOfMembers1: Yup.number()
        .required("Number of members field is required.")
        .typeError("A number is required."),
      monthlyTargetPremium2: Yup.number()
        .required("Monthly Target field is required.")
        .typeError("A number is required."),
      numberOfMembers2: Yup.number()
        .required("Number of members field is required.")
        .typeError("A number is required."),
      monthlyTargetPremium3: Yup.number()
        .required("Monthly Target field is required.")
        .typeError("A number is required."),
      numberOfMembers3: Yup.number()
        .required("Number of members field is required.")
        .typeError("A number is required."),
      monthlyTargetPremium4: Yup.number()
        .required("Monthly Target field is required.")
        .typeError("A number is required."),
      numberOfMembers4: Yup.number()
        .required("Number of members field is required.")
        .typeError("A number is required."),
    }),
  });

  const genNum = ["1st", "2nd", "3rd", "4th"];

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
                  <p>$0</p>
                </div>
                <div className="result-title">
                  <h2>ANNUALY</h2>
                  <p>$0</p>
                </div>
              </div>
            </div>
            <div className="number-members">
              <h5>{`0 members`}</h5>
            </div>
            <div className="form-calculator">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(data) => {
                  console.log(data);
                }}
              >
                {({
                  values,
                  errors,
                  setTouched,
                  touched,
                  setFieldValue,
                  resetForm,
                }) => {
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
                              onChange={onChangePositionHandler}
                              isSearchable={true}
                              name="position"
                              placeholder="Choose a position"
                              options={AGENT_ROLES.map((st) => {
                                return {
                                  label: st.label,
                                  value: st.value,
                                  numberValue: st.numberValue,
                                };
                              })}
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
                          </Grid>
                          <Grid item sm={12} md={9} lg={4}>
                            <div className="calcu-form-control">
                              <label>Monthly Target Premium</label>
                              <FormikTextInput
                                name="personal.monthlyTargetPremium"
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
                        </div>
                        <Grid container spacing={2}>
                          {AGENT_ROLES.map((data, index) => {
                            const sumIndex = index + 1;
                            console.log(
                              values.spread[`monthlyTargetPremium${sumIndex}`]
                            );
                            return (
                              <React.Fragment>
                                <Grid item sm={12} md={9} lg={8}>
                                  <label>Position</label>
                                  <FormikTextInput
                                    name={`spread.position${sumIndex}`}
                                    value={data.label}
                                    disabled
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid item sm={12} md={9} lg={4}>
                                  <div className="calcu-form-control">
                                    <label>Monthly Target Premium</label>
                                    <FormikTextInput
                                      name={`spread.monthlyTargetPremium${sumIndex}`}
                                      value={
                                        values.spread[
                                          `monthlyTargetPremium${sumIndex}`
                                        ]
                                      }
                                      variant="outlined"
                                      label=""
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
                        </div>
                        <Grid container spacing={2}>
                          {genNum.map((data, index) => {
                            const sumIndex = index + 1;
                            return (
                              <React.Fragment>
                                <Grid item sm={12} md={9} lg={4}>
                                  <label>Gen#</label>
                                  <FormikTextInput
                                    disabled
                                    name={`generation.position${sumIndex}`}
                                    value={data}
                                    variant="outlined"
                                    label=""
                                  />
                                </Grid>
                                <Grid item sm={12} md={9} lg={4}>
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
                                    />
                                  </div>
                                </Grid>
                                <Grid item sm={12} md={9} lg={4}>
                                  <div className="calcu-form-control">
                                    <label># of members</label>
                                    <FormikTextInput
                                      name={`generation.numberOfMembers${sumIndex}`}
                                      value={
                                        values.generation[
                                          `numberOfMembers${sumIndex}`
                                        ]
                                      }
                                      variant="outlined"
                                      label=""
                                    />
                                  </div>
                                </Grid>
                              </React.Fragment>
                            );
                          })}
                        </Grid>
                      </div>
                      <div className="form-actions">
                        <Button variant="primary">Calculate</Button>
                      </div>
                      {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                      <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                    </React.Fragment>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <PieChart width={800} height={500}>
            <Pie data={data} dataKey="revenue" outerRadius={250} fill="green" />
          </PieChart>
          {/* This is where the actual total values should Display */}
          <div style={{ textAlign: "center" }}>Values</div> {/*Remove  */}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CommissionSimulation;
