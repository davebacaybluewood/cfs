import React, { useRef } from "react";
import Process from "./components/Process/Process";
import Solution from "./components/Solution/Solution";
import Plan from "./components/Plan/Plan";
import Blogs from "library/Blogs/Blogs";
import FAQs from "library/FAQs/FAQs";
import Headline from "../../library/Headline/Headline";
import Button from "library/Button/Button";
import { faqs, filteredFaqs } from "./components/FamilyProtectionFAQs";
import Consultation from "library/Consultation/Consultation";
// import Testimonial from "library/Testimonial/Testimonial"; Commented for future use
import { Container, Grid } from "@mui/material";
import StandardCard from "library/StandardCard/StandardCard";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactMultiCarousel from "react-multi-carousel";
import featureDataFamily from "./featureDataFamily";
import useScroll from "hooks/useScroll";
import { CALENDLY } from "constants/constants";
import { PopupModal } from "react-calendly";
import "./FamilyProtection.scss";
import { paths } from "constants/routes";
import { useSearchParams } from "react-router-dom";

const FamilyProtection: React.FC = () => {
  const [openCalendlyModal, setOpenCalendlyModal] = React.useState(false);
  const carouselRef = useRef<any>();
  useScroll();

  return (
    <div className="family-protection__page">
      <div className="main-page__content">
        <div className="headline">
          <Headline
            title="Safeguarding Your
            Family's Future"
            description="Life insurance is essential for families looking to protect their
            financial well-being and provide a better future for their loved ones.
            In the event of an unexpected death, life insurance can help cover expenses such as funeral costs, outstanding debts, and
            ongoing living expenses."
            backgroundImage="/assets/images/headline-images/family-protection-image.png"
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
        </div>
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
              {featureDataFamily?.map((data, index) => {
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
          <Plan />
        </div>
        <div className="solution">
          <Solution />
        </div>
        <div className="two-column-section-content">
          <Consultation
            title="Why Choose CFS?"
            description1="We believe that securing your family's future should not break the bank. Our family life insurance policies offer competitive premiums that fit within your budget while still providing extensive coverage."
            description2="Earn valuable benefits with our financial solutions. Get a free consultation today to start your familiy's  journey toward financial security."
            image="/assets/others/Family_2.png"
            button={{
              text: "Free Consultation",
            }}
          />
        </div>
        <div className="process">
          <Process />
        </div>
        <div className="faqs">
          <FAQs
            title="Frequently Asked Questions (FAQ)"
            faqs={faqs(paths.family_protection)}
            url={paths.family_protection}
          />
        </div>

        {/* <Testimonial testimonials={testimonials} /> */}
        {/* Commented due for future use */}

        <Blogs
          title="Latest from the blogs"
          blogsConfig={{
            limit: 3,
            skip: 0,
          }}
        />
      </div>
      <PopupModal
        url={CALENDLY.CONSULTATION}
        onModalClose={() => setOpenCalendlyModal(false)}
        open={openCalendlyModal}
        rootElement={document.getElementById("root") as any}
      />
    </div>
  );
};

export default FamilyProtection;
