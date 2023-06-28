import React, { useRef } from "react";
import ConsultationBusiness from "./components/ConsultationBusiness/ConsultationBusiness";
import ProcessBusiness from "./components/ProcessBusiness/ProcessBusiness";
import PlanBusiness from "./components/PlanBusiness/PlanBusiness";
import Blogs from "library/Blogs/Blogs";
import Headline from "library/Headline/Headline";
import Button from "library/Button/Button";
import FAQs from "library/FAQs/FAQs";
import { faqs } from "pages/FamilyProtection/components/FamilyProtection";
import { Container, Grid } from "@mui/material";
import StandardCard from "library/StandardCard/StandardCard";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactMultiCarousel from "react-multi-carousel";
import featureDataBusiness from "./featureDataBusiness";
import SolutionBusiness from "./components/SolutionBusiness/solutionBusiness";
import useScroll from "hooks/useScroll";
import { CALENDLY } from "constants/constants";
import { PopupModal } from "react-calendly";

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
              <h2> Securing your business’ growth</h2>
            </div>
          </React.Fragment>
        }
        description="Your business is not just a source of income; it's a symbol of your passion and aspirations. At Comfort Financial Solutions, we specialize in business insurance solutions designed to safeguard your enterprise and empower you to navigate the challenges of today's dynamic marketplace."
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
          <Button variant="default">Learn More</Button>
        </div>
      </Headline>
      <Container className="feature-main-container">
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={9}>
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
              {featureDataBusiness?.map((data, index) => {
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
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <div
              style={{
                padding: "1rem",
              }}
            >
              <div className="carousel-navigator-container">
                <StandardCard>
                  <div className="carousel-navigator">
                    <h2>Other features you may be interested</h2>
                    <button
                      onClick={(value) => carouselRef?.current?.previous()}
                    >
                      <BsChevronLeft />
                    </button>
                    <button onClick={(value) => carouselRef?.current?.next()}>
                      <BsChevronRight />
                    </button>
                  </div>
                </StandardCard>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <PlanBusiness />
      <SolutionBusiness />
      <ConsultationBusiness />
      <ProcessBusiness />
      <FAQs title="Frequently Asked Questions (FAQ)" faqs={faqs} />
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
function useState(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}
