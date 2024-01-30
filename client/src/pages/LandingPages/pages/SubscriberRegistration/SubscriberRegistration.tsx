import { Alert, Drawer, Grid } from "@mui/material";
import "./SubscriberRegistration.scss";
import WaysToEarnCard from "./components/WaysToEarnCard";
import { waysToEarn } from "./utilities/constants";
import MerchandiseCard from "admin/components/MerchandiseCard/MerchandiseCard";
import React, { useEffect, useRef, useState } from "react";
import agent from "api/agent";
import { MerchandiseData } from "admin/models/merchandiseModel";
import { useLocation } from "react-router-dom";
import { MAIN_IMAGES } from "constants/constants";
import RewardsHeroSection from "./components/RewardsHeroSection";
import SubscribeAccountDetails from "pages/Subscribers/SubscribeAccountDetails";
import { Formik } from "formik";
import validationSchema from "./validationSchema";
import Spinner from "library/Spinner/Spinner";
import { ValuesType } from "pages/Subscribers/models";

const SubscriberRegistration = (props) => {
  const colorCarminePink = "#ed3e4b";
  const awards_thumbnail =
    "/assets/images/subs-reg-landing-page/awards-thumbnail.png";
  const [merchandises, setMerchandises] = useState<MerchandiseData[]>();
  const [openMerchDialog, setOpenMerchDialog] = useState(false);

  const search = useLocation().search;
  const merchandiseId = new URLSearchParams(search).get("merchandiseId");
  const modalBtnRef = useRef<HTMLButtonElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showJoinButton, setShowJoinButton] = useState(false);
  const [clickedJoinButton, setClickedJoinButton] = useState(false);

  const [invalid, setInvalid] = useState({
    isInvalid: false,
    text: "",
  });
  const [loading, setLoading] = useState(false);

  const userGuid = new URLSearchParams(search).get("userGuid");
  const templateId = new URLSearchParams(search).get("templateId");
  const eventId = new URLSearchParams(search).get("eventId");
  const isSubRegLandingPage = true; //apply landing page css

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

  const handleShowJoinButton = () => {
    const clientHeight = document.documentElement.clientHeight;
    let scrollDistance = document.documentElement.scrollTop;

    if (scrollDistance > clientHeight / 2) setShowJoinButton(true);
    else setShowJoinButton(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleShowJoinButton);
    return () => {
      window.removeEventListener("scroll", handleShowJoinButton);
    };
  }, []);

  useEffect(() => {
    if (merchandiseId) {
      setOpenMerchDialog(true);
      modalBtnRef.current?.focus();
    }
  }, [merchandiseId]);

  useEffect(() => {
    const fetchMerchandises = async () => {
      const data = await agent.Merchandise.getAllMerchandise();
      setMerchandises(data?.splice(0, 5));
    };

    fetchMerchandises();
  }, []);

  const handleOpenRegistration = (isOpen: boolean) => {
    setOpenMerchDialog(true);
    setClickedJoinButton(true);
  };

  return (
    <main className="sub-reg-landing-page">
      <section id="carousel" className="carousel-section">
        <div className="carousel-section-slides">
          {/* <Carousel
            autoPlay={false}
            animation="slide"
            indicators={false}
            index={activeSlide}
          > */}
          <RewardsHeroSection
            setOpenMerchDialog={setOpenMerchDialog}
            setOpenRegDrawer={handleOpenRegistration}
          />
          {/* <RewardsHeroListSection />
          </Carousel> */}
        </div>
      </section>
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="vertical-border">
            <h1>What we do</h1>
          </div>
          <p>
            Help individuals and families build a comfortable future by
            assisting them in reinforcing and increasing the value of their
            portfolio through financial(or economic) awareness, and well
            developed financial solutions that reduces risks and amplify growth.
          </p>
          <div className="about-container-info">
            <div className="info-group">
              <svg
                height="50"
                viewBox="0 0 24 24"
                width="50"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                fill={colorCarminePink}
              >
                <path d="m22.293 15.707-2.288-2.288 1.414-1.414 2.288 2.288zm1.414-10-1.414-1.414-2.25 2.25 1.414 1.414zm.293 3.293h-3v2h3zm-15.63 8h-5.631l3.111 7h1.4a2.752 2.752 0 0 0 2.514-3.868zm9.63-17v20h-2a5.006 5.006 0 0 0 -5-5h-8a3 3 0 0 1 -3-3v-4a3 3 0 0 1 3-3h8a5.006 5.006 0 0 0 5-5z" />
              </svg>
              <p>
                CFS helps individuals and families build a comfortable future by
                advocating Financial Awareness and providing Risk Management
                Solutions.
              </p>
            </div>
            <div className="info-group">
              <svg
                height="50"
                viewBox="0 0 24 24"
                width="50"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                fill={colorCarminePink}
              >
                <path d="M19.944,2.642,12,.009,4.056,2.642A3,3,0,0,0,2,5.49V12c0,7.524,9.2,11.679,9.594,11.852l.354.157.368-.122C12.712,23.755,22,20.577,22,12V5.49A3,3,0,0,0,19.944,2.642Zm-7.5,11.347a1.873,1.873,0,0,1-1.335.553h-.033a1.872,1.872,0,0,1-1.345-.6l-2.306-2.4L8.868,10.16,11.112,12.5l5.181-5.181,1.414,1.414Z" />
              </svg>
              <p>Ensure coverage during challenging circumstances</p>
            </div>
            <div className="info-group">
              <svg
                height="50"
                viewBox="0 0 24 24"
                width="50"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                fill={colorCarminePink}
              >
                <path d="m8,5h-3v-2h3V0h2v3h3v2h-3v3h-2v-3Zm15.148,3.681c-.515-.469-1.186-.712-1.878-.678-.697.032-1.339.334-1.794.835l-3.541,3.737c.032.21.065.42.065.638,0,2.083-1.555,3.876-3.617,4.17l-4.241.606-.283-1.979,4.241-.606c1.084-.155,1.9-1.097,1.9-2.191,0-1.22-.993-2.213-2.213-2.213H3c-1.654,0-3,1.346-3,3v7c0,1.654,1.346,3,3,3h9.664l10.674-11.655c.948-1.062.862-2.707-.189-3.665Z" />
              </svg>
              <p>Ensure coverage during challenging circumstances</p>
            </div>
          </div>
        </div>
      </section>
      <section id="rewards" className="rewards-section">
        <div className="rewards-container">
          <div className="vertical-border">
            <h1>Choose from these Rewards</h1>
          </div>
          <p>
            CFS My Rewards program is one of CFS's initiatives designed to
            incentivize individuals aiming to earn rewards by sharing CFS
            content within their network.
          </p>
          <div className="rewards-card-list">
            <Grid container spacing={2}>
              {merchandises?.map((merch) => {
                return (
                  <Grid item lg={2} md={4} sm={6}>
                    <MerchandiseCard
                      image={merch.image}
                      name={merch.name}
                      points={merch.points}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      </section>
      <section id="ways" className="ways-section">
        <div className="ways-container">
          <div className="vertical-border">
            <h1>Ways to earn more Reward</h1>
          </div>
          <div className="ways-list">
            <Grid container spacing={4} direction="row" alignItems="center">
              {waysToEarn.map((info) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <WaysToEarnCard
                      key={info.id}
                      image={info.image}
                      description={info.description}
                      points={info.points}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      </section>

      <div
        className={`modale ${openMerchDialog && "opened"}`}
        aria-hidden="true"
      >
        <div className={`modal-dialog ${clickedJoinButton && "join-btn"}`}>
          <div className="modal-header">
            <a
              href="#"
              className="btn-close"
              aria-hidden="true"
              onClick={() => {
                setOpenMerchDialog(false);
                setClickedJoinButton(false);
              }}
            >
              &times;
            </a>
          </div>
          <div className="modal-body">
            <div className={`left ${clickedJoinButton && "join-btn"}`}>
              <img src={awards_thumbnail} alt="awards_thumbnail" />
              <div className="left-container">
                <h3>Congratulations</h3>
                <p>
                  You are on your way on earning your first reward. Click join
                  now to register.
                </p>
                {/* <button
                  type="button"
                  ref={modalBtnRef}
                  onClick={() => {
                    setOpenRegDrawer(true);
                    setOpenMerchDialog(false);
                    setActiveSlide(1);
                  }}
                >
                  Join Now
                </button> */}
              </div>

              <div className="logo-container">
                <img src={MAIN_IMAGES.MAIN_LOGO} alt={MAIN_IMAGES.MAIN_LOGO} />
              </div>
            </div>
            <div className={`right ${clickedJoinButton && "join-btn"}`}>
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
                      setCurrentPage(3);
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
                        isSubRegLandingPage ? "sub-reg" : ""
                      }`}
                    >
                      {loading ? <Spinner variant="fixed" /> : null}
                      {currentPage !== 3 ? (
                        <React.Fragment>
                          <div className="header">
                            <h2 style={{ fontFamily: "Montserrat" }}>
                              Be a Subscriber For Free
                            </h2>
                          </div>
                          {invalid.isInvalid ? (
                            <Alert
                              variant="filled"
                              severity="error"
                              className="error-alert"
                            >
                              {invalid.text}
                            </Alert>
                          ) : null}
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
                        isSubRegLandingPage={isSubRegLandingPage}
                      />
                    </div>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <div className={`join-button-container ${showJoinButton && "show"}`}>
        <button
          type="button"
          onClick={() => {
            setOpenMerchDialog(true);
            setShowJoinButton(false);
            setClickedJoinButton(true);
          }}
        >
          Join Now
        </button>
      </div>
    </main>
  );
};

export default SubscriberRegistration;
