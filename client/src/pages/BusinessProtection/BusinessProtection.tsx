import React, { useRef } from "react";
import ConsultationBusiness from "./components/ConsultationBusiness/ConsultationBusiness";
import ProcessBusiness from "./components/ProcessBusiness/ProcessBusiness";
import PlanBusiness from "./components/PlanBusiness/PlanBusiness";
import Blogs from "library/Blogs/Blogs";
import Headline from "library/Headline/Headline";
import Button from "library/Button/Button";
import FAQs from "library/FAQs/FAQs";
import { faqs } from "pages/FamilyProtection/components/FamilyProtectionFAQs";
import { Container, Grid } from "@mui/material";
import StandardCard from "library/StandardCard/StandardCard";
// import { BsChevronLeft, BsChevronRight } from "react-icons/bs" please disregard for now, will use for future;
// import ReactMultiCarousel from "react-multi-carousel" please disregard for now, will use for future;
import featureDataBusiness from "./featureDataBusiness";
import SolutionBusiness from "./components/SolutionBusiness/solutionBusiness";
import useScroll from "hooks/useScroll";
import { CALENDLY } from "constants/constants";
import { PopupModal } from "react-calendly";
import { paths } from "constants/routes";
import "./BusinessProtection.scss";

const BusinessProtection: React.FC = () => {
  const [openCalendlyModal, setOpenCalendlyModal] = React.useState(false);
  const carouselRef = useRef<any>();
  useScroll();
  return (
    <div className="business__protection">
      <Headline
        title={
          <React.Fragment>
            <div className="business-headline-title">
              <h2>
                {" "}
                Ensuring Personal Financial Stability <br /> and Resilience
              </h2>
            </div>
          </React.Fragment>
        }
        description="Take advantage of CFS's strategic financial products. As an individual,
        life insurance is a crucial component of financial planning. Regardless
        of age, providing a safety net for unexpected events could impact their financial future."
        backgroundImage="/assets/images/headline-images/business-protection-image.png"
      >
        <div className="headline__btn">
          <Button
            variant="danger"
            className="danger__btn"
            onClick={() => setOpenCalendlyModal(true)}
          >
            Free Consultation
          </Button>
          {/* <Button variant="default">Learn More</Button> Please disregard, commented for future dev use */}
        </div>
      </Headline>
      <div className="plan">
        <Container className="feature-main-container">
          <Grid container>
            {/* <Grid item xs={12} sm={12} md={12} lg={9}>
                <ReactMultiCarousel
                  ref={carouselRef}
                  additionalTransfrom={0}
                  arrows={false}
                  autoPlaySpeed={3000}
                  centerMode={false}
                  className=""
                  containerClass="container-padding-bottom"
                  dotListClass=""
                  draggable
                  focusOnSelect={false}
                  infinite={true}
                  itemClass=""
                  keyBoardControl
                  minimumTouchDrag={80}
                  pauseOnHover
                  renderArrowsWhenDisabled={false}
                  renderButtonGroupOutside={false}
                  renderDotsOutside={false}
                  responsive={{
                    desktop: {
                      breakpoint: {
                        max: 3000,
                        min: 1024,
                      },
                      items: 3,
                      partialVisibilityGutter: 40,
                    },
                    mobile: {
                      breakpoint: {
                        max: 464,
                        min: 0,
                      },
                      items: 1,
                      partialVisibilityGutter: 30,
                    },
                    tablet: {
                      breakpoint: {
                        max: 1024,
                        min: 464,
                      },
                      items: 2,
                      partialVisibilityGutter: 30,
                    },
                  }}
                  rewind={false}
                  rewindWithAnimation={false}
                  rtl={false}
                  shouldResetAutoplay
                  showDots={false}
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable
                >
                  {featureDataFamily?.map((data, index) => {
                    return (
                      <div
                        style={{
                          padding: "1rem",
                        }}
                      >
                        <StandardCard
                          key={index}
                          icon={data.icon}
                          title={data.title}
                          description={data.description}
                          button={{
                            text: data.button.text,
                          }}
                        />
                      </div>
                    );
                  })}
                </ReactMultiCarousel>
              </Grid> */}
            {/* <Grid item xs={12} sm={12} md={12} lg={3}>
                <div
                  className="carousel-navigator-container"
                  style={{
                    padding: "1rem",
                  }}
                >
                  <StandardCard>
                    <div className="carousel-navigator">
                      <h2>Other Features You May be Interested</h2>
                      <div className="carousel-navigator-btn">
                        <button
                          onClick={(value) => carouselRef?.current?.previous()}
                        >
                          <BsChevronLeft />
                        </button>
                        <button
                          onClick={(value) => carouselRef?.current?.next()}
                        >
                          <BsChevronRight />
                        </button>
                      </div>
                    </div>
                  </StandardCard>
                </div>
              </Grid> Future use*/}
            {featureDataBusiness?.map((data, index) => {
              return (
                <Grid sm={12} md={4} lg={4}>
                  <div
                    style={{
                      padding: "1rem",
                    }}
                  >
                    <StandardCard
                      key={index}
                      icon={data.icon}
                      title={data.title}
                      description={data.description}
                      button={{
                        text: data.button.text,
                      }}
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
      <PlanBusiness />
      <SolutionBusiness />
      <ConsultationBusiness />
      <ProcessBusiness />
      <FAQs
        title="Frequently Asked Questions (FAQ)"
        faqs={faqs(paths.individual_protection)}
        url={paths.individual_protection}
      />
      <Blogs
        title="Latest News and Updates"
        blogsConfig={{
          limit: 3,
          skip: 0,
        }}
      />
      <PopupModal
        url={CALENDLY.CONSULTATION}
        onModalClose={() => setOpenCalendlyModal(false)}
        open={openCalendlyModal}
        rootElement={document.getElementById("root") as any}
      />
    </div>
  );
};

export default BusinessProtection;
