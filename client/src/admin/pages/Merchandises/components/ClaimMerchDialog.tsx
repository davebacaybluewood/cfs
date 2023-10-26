import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SUBSCRIBER_FAQ } from "admin/pages/FAQSubscriber/FAQList";
import { Formik } from "formik";
import agent from "admin/api/agent";
import { BsStarFill } from "react-icons/bs";
import AlertMessage from "library/AlertMessage/Alert";
import FormikTextInput from "library/Formik/FormikInput";
import MerchandiseCard from "admin/components/MerchandiseCard/MerchandiseCard";
import * as Yup from "yup";
import Title from "admin/components/Title/Title";
import { PointsData } from "admin/models/pointsModels";
import { ProfileData } from "admin/hooks/useFetchProfile";
import Spinner from "library/Spinner/Spinner";

type props = {
  openDialog: boolean;
  showSuccessMsg: boolean;
  setShowSuccessMsg: (showMsg: boolean) => void;
  setOpenDialog: (openDialog: boolean) => void;
  activeMerchandise: {
    merchandiseId: string;
    name: string;
    points: number;
    image: string;
  };
  pointsData: PointsData | undefined;
  profile: ProfileData | undefined;
  setActivePoints?: React.Dispatch<React.SetStateAction<number>>;
};

const ClaimMerchDialog = ({
  openDialog,
  showSuccessMsg,
  setShowSuccessMsg,
  setOpenDialog,
  activeMerchandise,
  pointsData,
  profile,
  setActivePoints,
}: props) => {
  const [expanded, setExpanded] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [initialValues, setInitialValues] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    remarks: "",
  });

  const [statisticsNumber, setStatisticsNumber] = useState({
    points: 0,
    redemeedPoints: 0,
    merchandise: 0,
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Name field is required."),
    address: Yup.string().required("Address field is required."),
    phoneNumber: Yup.string().required("Phone Number field is required."),
    emailAddress: Yup.string().required("Email Address field is required."),
  });

  useEffect(() => {
    setStatisticsNumber((prevState) => {
      return {
        ...prevState,
        points: pointsData?.totalPoints ?? 0,
        redemeedPoints: pointsData?.totalRedeemedPoints ?? 0,
      };
    });
  }, [pointsData, showSuccessMsg]);

  useEffect(() => {
    setInitialValues({
      name: profile?.firstName + " " + profile?.lastName,
      address: "",
      phoneNumber: profile?.phoneNumber ?? "",
      emailAddress: profile?.emailAddress ?? "",
      remarks: "",
    });
  }, [profile]);

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        className="dialog-merchandise"
      >
        {showSuccessMsg ? (
          <div className="success-page">
            <img
              src="/assets/icons/success.svg"
              alt="success-indicator"
              className="success-image"
            />
            <h2>Merchandise Redeem Success</h2>
            <p>
              Thank you for redemeening merchandise from CFS Rewards. <br /> It
              will take 3-5 business days to process your request.
            </p>

            <div className="faq-accordions">
              {SUBSCRIBER_FAQ.slice(0, 5).map((data) => {
                return (
                  <Accordion
                    expanded={expanded === data.id}
                    onChange={handleChange(data.id)}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>{data.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{data.description}</Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
            <DialogActions>
              <Button
                onClick={() => setOpenDialog(false)}
                style={{ fontSize: 13 }}
              >
                Close
              </Button>
            </DialogActions>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={async (data) => {
              setLoading(true);
              const req = await agent.Merchandise.submitMerchandise(
                activeMerchandise.merchandiseId,
                {
                  address: data.address,
                  emailAddress: data.emailAddress,
                  name: data.name,
                  phoneNumber: data.phoneNumber,
                  remarks: data.remarks,
                  userGuid: profile!.userGuid,
                }
              );

              if (setActivePoints && pointsData) {
                setActivePoints(
                  pointsData.totalPoints - activeMerchandise.points
                );
              }

              setLoading(false);
              setShowSuccessMsg(true);
            }}
            validationSchema={validationSchema}
          >
            {({ values, handleSubmit }) => {
              const isPointsNotEnough =
                statisticsNumber.points < activeMerchandise.points;
              return (
                <>
                  <DialogContent>
                    <Title
                      title="Redeem Reward"
                      subtitle="To redeem to this merchandise, please enter your information here. We will send updates from time to time."
                    />
                    {isPointsNotEnough ? (
                      <div style={{ marginBottom: 15 }}>
                        <AlertMessage
                          message="You don't have enough points to redeem this reward"
                          icon={<BsStarFill />}
                        />
                      </div>
                    ) : null}
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={6} lg={4}>
                        <div className="active-points-container">
                          <div className="icon">
                            <BsStarFill />
                          </div>
                          <div className="captions">
                            <h3>Your Active Points</h3>
                            <p>{statisticsNumber.points} Points</p>
                          </div>
                        </div>
                        <MerchandiseCard
                          name={activeMerchandise.name}
                          points={activeMerchandise.points}
                          image={activeMerchandise.image}
                        />
                      </Grid>
                      <Grid item sm={12} md={6} lg={8}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <label>Name (Required)</label>
                            <FormikTextInput
                              placeholder="Enter your name here"
                              variant="outlined"
                              name="name"
                              value={values.name}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <label>Email Address (Required)</label>
                            <FormikTextInput
                              placeholder="Enter your email address here"
                              variant="outlined"
                              name="emailAddress"
                              value={values.emailAddress}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <label>Phone Number (Required)</label>
                            <FormikTextInput
                              placeholder="Enter your phone number here"
                              variant="outlined"
                              name="phoneNumber"
                              value={values.phoneNumber}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <label>Address (Required)</label>
                            <FormikTextInput
                              placeholder="Enter your template address here"
                              variant="outlined"
                              name="address"
                              value={values.address}
                              isTextArea
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <label>Remarks</label>
                            <FormikTextInput
                              placeholder="Enter your remarks here"
                              variant="outlined"
                              name="remarks"
                              value={values.remarks}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setOpenDialog(false)}
                      style={{ fontSize: 13 }}
                    >
                      Cancel
                    </Button>
                    {isPointsNotEnough ? null : (
                      <Button
                        type="submit"
                        onClick={() => handleSubmit()}
                        style={{ fontSize: 13 }}
                      >
                        Redeem
                      </Button>
                    )}
                  </DialogActions>
                </>
              );
            }}
          </Formik>
        )}
      </Dialog>
      {loading ? <Spinner variant="fixed" /> : null}
    </>
  );
};

export default ClaimMerchDialog;
