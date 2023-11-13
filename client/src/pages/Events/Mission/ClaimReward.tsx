import React, { useContext, useEffect, useState } from "react";

import Container from "events/mission/Rewards/components/Container";
import { Button, Grid } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikTextInput from "library/Formik/FormikInput";
import Select from "react-select";
import US_STATES from "constants/statesAndLocation";
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter";
import { useParams } from "react-router-dom";
import { UserContext } from "admin/context/UserProvider";
import agent from "api/agent";
import Spinner from "library/Spinner/Spinner";
import ErrorText from "pages/PortalRegistration/components/ErrorText";
import { rewardItems } from "events/mission/Rewards/contants/Items";
import "./main.scss";

const ClaimReward: React.FC = () => {
  const userGuid = "242123bb-831a-4833-ba47-6af569a7e913"; //to apply => useContext(UserContext)?.user?.userGuid;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [product, setProduct] = useState<{
    id: string;
    name: string;
    path: string;
  }>({
    id: "",
    name: "",
    path: "",
  });

  const initialValues = {
    addressLine1: "",
    addressLine2: "",
    state: "",
    zipCode: "",
    notes: "",
  };

  const { rewardId } = useParams();

  const validationSchema = Yup.object({
    addressLine1: Yup.string().required("Address Line1 is required"),
    addressLine2: Yup.string().required("Address Line2 is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip Code is required"),
  });

  useEffect(() => {
    let item = rewardItems.filter((item) => item.id === rewardId)[0];
    setProduct(item);
  }, [rewardId]);

  return (
    <>
      <Container>
        <DocumentTitleSetter title={"Agent of Agents | Claim Reward"} />
        <div className="container-wrapper">
          <h1>Agent of Agents</h1>
          <div className="container-contents">
            <Grid container className="container-reward">
              <Grid item xs={8}>
                <h2 className="container-reward-title">Claim Reward</h2>
              </Grid>
              <Grid item xs={6}>
                <Grid container className="container-reward-form">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (data) => {
                      setLoading(true);
                      const req: any = await agent.Mission.claimReward(
                        rewardId!,
                        {
                          userGuid: userGuid,
                          addressLine1: data.addressLine1,
                          addressLine2: data.addressLine2,
                          state: data.state,
                          zipCode: data.zipCode,
                          notes: data.notes,
                        }
                      );

                      if (req.status === "error") {
                        setError(req.message);
                      } else {
                        setError("");
                        console.log("success");
                      }

                      setLoading(false);
                    }}
                  >
                    {({
                      values,
                      setFieldValue,
                      touched,
                      setTouched,
                      handleSubmit,
                    }) => {
                      return (
                        <Grid container>
                          <Grid item xs={12}>
                            <div className="form-control">
                              <h2>Address Line 1</h2>
                              <FormikTextInput
                                name="addressLine1"
                                value={values.addressLine1}
                                placeholder="Enter Address Line 1"
                                variant="outlined"
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div className="form-control">
                              <h2>Address Line 2</h2>
                              <FormikTextInput
                                name="addressLine2"
                                value={values.addressLine2}
                                placeholder="Enter Address Line 2"
                                variant="outlined"
                              />
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <div className="form-control">
                              <h2>State</h2>
                              <Select
                                className="select-state"
                                classNamePrefix="select"
                                onChange={(event) => {
                                  setFieldValue("state", event!.value);
                                }}
                                onBlur={(e) => {
                                  if (!values.state) {
                                    setTouched({ ...touched, state: true });
                                  }
                                }}
                                placeholder="Select a state"
                                isSearchable={true}
                                name="state"
                                options={US_STATES.map((st) => {
                                  return {
                                    label: st.name,
                                    value: st.name,
                                  };
                                })}
                                styles={{
                                  placeholder: (defaultStyles) => {
                                    return {
                                      ...defaultStyles,
                                      color:
                                        !values.state && !!touched.state
                                          ? "#d32f2f"
                                          : "hsl(0, 0%, 50%)",
                                    };
                                  },

                                  menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                  }),

                                  control: (baseStyles, state) => {
                                    return {
                                      ...baseStyles,
                                      background: "rgba(0, 0, 0, 0)",
                                      border: "none",
                                      borderBottom:
                                        !values.state && !!touched.state
                                          ? "1px solid #d32f2f"
                                          : "1px solid #333",
                                      borderBottomLeftRadius: "0",
                                      borderBottomRightRadius: "0",

                                      paddingTop: "7px",
                                      paddingBottom: "7px",
                                      borderColor:
                                        !values.state && !!touched.state
                                          ? "#d32f2f"
                                          : "hsl(0, 0%, 80%)",
                                    };
                                  },
                                }}
                                value={
                                  values.state
                                    ? {
                                        label: values.state,
                                        value: values.state,
                                      }
                                    : undefined
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <div className="form-control">
                              <h2>Zip Code</h2>
                              <FormikTextInput
                                name="zipCode"
                                value={values.zipCode}
                                placeholder="Enter Zip Code"
                                variant="outlined"
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div className="form-control">
                              <h2>Notes</h2>
                              <FormikTextInput
                                name="notes"
                                value={values.notes}
                                placeholder="Enter Notes"
                                variant="outlined"
                              />
                            </div>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            className="container-reward-form-button"
                          >
                            <ErrorText isError={error !== ""} text={error} />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            className="container-reward-form-button"
                          >
                            <Button
                              variant="contained"
                              onClick={() => handleSubmit()}
                            >
                              Claim Reward
                            </Button>
                          </Grid>
                        </Grid>
                      );
                    }}
                  </Formik>
                </Grid>
              </Grid>
              <Grid item xs={6} className="reward-item">
                <img
                  src={`/assets/images/events/items/${product.path}`}
                  alt="reward"
                  width="300"
                />
                <h2 style={{ fontSize: "3rem" }}>{product.name}</h2>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
      {loading ? <Spinner variant="fixed" /> : null}
    </>
  );
};

export default ClaimReward;
