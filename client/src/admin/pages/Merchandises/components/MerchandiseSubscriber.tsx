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
import agent from "admin/api/agent";
import MerchandiseCard from "admin/components/MerchandiseCard/MerchandiseCard";
import Title from "admin/components/Title/Title";
import { UserContext } from "admin/context/UserProvider";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import { MerchandiseData } from "admin/models/merchandiseModel";
import DashboardCard from "admin/pages/Dashboard/components/DashboardCard/DashboardCard";
import useFetchPoints from "admin/pages/RewardsHistory/useFetchPoints";
import { paths } from "constants/routes";
import { Formik } from "formik";
import AlertMessage from "library/AlertMessage/Alert";
import FormikTextInput from "library/Formik/FormikInput";
import Spinner from "library/Spinner/Spinner";
import { SUBSCRIBER_FAQ } from "../../FAQSubscriber/FAQList";
import React, { useContext, useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FaCube, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const MerchandiseSubscriber: React.FC = () => {
  const [merchandises, setMerchandises] = useState<
    MerchandiseData[] | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [activeMerchandise, setActiveMerchandise] = useState({
    name: "",
    image: "",
    points: 0,
    merchandiseId: "",
  });
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;
  const { profile } = useFetchUserProfile(userGuid);
  const [expanded, setExpanded] = React.useState();
  const [statisticsNumber, setStatisticsNumber] = useState({
    points: 0,
    redemeedPoints: 0,
    merchandise: 0,
  });
  const { pointsData } = useFetchPoints(userGuid);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchMerchandises = async () => {
      setLoading(true);
      const data = await agent.Merchandise.getAllMerchandise();

      setMerchandises(data);
      setLoading(false);
    };

    fetchMerchandises();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name field is required."),
    address: Yup.string().required("Address field is required."),
    phoneNumber: Yup.string().required("Phone Number field is required."),
    emailAddress: Yup.string().required("Email Address field is required."),
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    remarks: "",
  });

  useEffect(() => {
    setInitialValues({
      name: profile?.firstName + " " + profile?.lastName,
      address: "",
      phoneNumber: profile?.phoneNumber ?? "",
      emailAddress: profile?.emailAddress ?? "",
      remarks: "",
    });
  }, [profile]);

  useEffect(() => {
    setStatisticsNumber((prevState) => {
      return {
        ...prevState,
        points: pointsData?.totalPoints ?? 0,
        redemeedPoints: pointsData?.totalRedeemedPoints ?? 0,
      };
    });
  }, [pointsData, showSuccessMsg]);

  const navigate = useNavigate();

  return (
    <div className="sub-merchandise-container">
      <Grid container spacing={2} style={{ marginBottom: 20 }}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <DashboardCard
            count={merchandises?.length ?? 0}
            countText="Available Merchandises"
            icon={<FaCube />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <DashboardCard
            count={statisticsNumber.points}
            countText="Active Points"
            icon={<BsStarFill />}
            url="/"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <DashboardCard
            count={statisticsNumber.redemeedPoints}
            countText="Redeemed Points"
            icon={<BsStar />}
            url="/"
          />
        </Grid>
      </Grid>
      <Title title="Merchandises" subtitle="List of all Merchandises.">
        <Button
          className="history-btn"
          onClick={() => navigate(paths.orderHistory)}
        >
          <FaHistory />
          Order History
        </Button>
      </Title>
      <Grid container spacing={2}>
        {merchandises?.map((data) => {
          return (
            <Grid item sm={6} md={2} lg={2}>
              <MerchandiseCard
                name={data.name}
                image={data.image}
                points={data.points}
                button={{
                  display: true,
                  onClick: () => {
                    setShowSuccessMsg(false);
                    setOpenDialog(true);
                    setActiveMerchandise({
                      image: data.image,
                      name: data.name,
                      points: data.points,
                      merchandiseId: data._id,
                    });
                  },
                  text: "Claim Reward",
                }}
              />
            </Grid>
          );
        })}
      </Grid>

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
                  userGuid: userGuid,
                }
              );

              if (req) {
                setLoading(false);
                setActiveMerchandise({
                  image: "",
                  name: "",
                  points: 0,
                  merchandiseId: "",
                });
                setShowSuccessMsg(true);
              } else {
                setLoading(false);
                setShowSuccessMsg(false);
              }
            }}
            validationSchema={validationSchema}
          >
            {({ values, handleSubmit }) => {
              const isPointsNotEnough =
                statisticsNumber.points < activeMerchandise.points;
              return (
                <React.Fragment>
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
                </React.Fragment>
              );
            }}
          </Formik>
        )}
      </Dialog>
      {loading ? <Spinner variant="fixed" /> : null}
    </div>
  );
};

export default MerchandiseSubscriber;
