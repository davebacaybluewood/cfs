import React, { useRef } from "react";
import Process from "./components/Process/Process";
import Solution from "./components/Solution/Solution";
import Plan from "./components/Plan/Plan";
import Blogs from "library/Blogs/Blogs";
import FAQs from "library/FAQs/FAQs";
import Headline from "../../library/Headline/Headline";
import Button from "library/Button/Button";
import { faqs } from "./components/FamilyProtection";
import Consultation from "library/Consultation/Consultation";
import { blogsDummy } from "constants/dummyDatas";
import Testimonial from "library/Testimonial/Testimonial";
import { Container, Grid } from "@mui/material";
import StandardCard from "library/StandardCard/StandardCard";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactMultiCarousel from "react-multi-carousel";
import featureDataFamily from "./featureDataFamily";
import "./FamilyProtection.scss";

const testimonials = [
  {
    image: "/assets/images/clients/clients2.png",
    quote:
      "“Best life insurance quote I got. Amazing agents, supportive staff etc. quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam.” 0 123123123",
    name: "Agsunta Mozerrat",
    position: "Engineer",
    age: 45,
    info: "12 years in financial industry",
  },
  {
    image: "/assets/images/clients/clients1.png",
    quote:
      "“Best life insurance quote I got. Amazing agents, supportive staff etc. quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam.” 1 324234 234",
    name: "Agsunta Mozerrat",
    position: "Engineer",
    age: 32,
    info: "12 years in financial industry",
  },
  {
    image: "/assets/images/clients/clients2.png",
    quote:
      "“Best life insurance quote I got. Amazing agents, supportive staff etc. quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam.” 2 34534 534",
    name: "Agsunta Mozerrat",
    position: "Teacher",
    age: 24,
    info: "1 year in financial industry",
  },
  {
    image: "/assets/images/clients/clients1.png",
    quote:
      "“Best life insurance quote I got. Amazing agents, supportive staff etc. quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam.” 3 456 456456",
    name: "Agsunta Mozerrat",
    position: "House Wife",
    age: 27,
    info: "Loves to save money.",
  },
];

const FamilyProtection: React.FC = () => {
  const carouselRef = useRef<any>();
  return (
    <div className="family-protection__page">
      <div className="main-page__content">
        <div className="headline">
          <Headline
            title="Protecting What Matters Most"
            description="At Comfort Financial Solutions, we understand the deep love and commitment you have for your family. That's why we've created a comprehensive family life insurance plan that ensures their future remains secure, no matter what twists and turns life may bring."
            backgroundImage="/assets/images/headline-images/family-protection-image.png"
          >
            <div className="headline__btn">
              <Button variant="danger" className="danger__btn">
                Free Consultation
              </Button>
              <Button variant="default">Learn More</Button>
            </div>
          </Headline>
        </div>
        <div className="plan">
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
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={3}>
                <div
                  className="carousel-navigator-container"
                  style={{
                    padding: "1rem",
                  }}
                >
                  <StandardCard>
                    <div className="carousel-navigator">
                      <h2>Other Features You May be Interested</h2>
                      <p>
                        veritatis et quasi architecto beatae vitae dicta sunt
                        explicabo
                      </p>
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
              </Grid>
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
            description2="We also offer rewards and loyalty programs, giving you the opportunity to earn valuable benefits over time and further enhance your family's financial security. Not sure where to start? Get a free consultation with us today."
            image="/assets/images/home/rectangle-image1.png"
            button={{
              text: "Free Consultation",
            }}
          />
        </div>
        <div className="process">
          <Process />
        </div>
        <div className="faqs">
          <FAQs title="Frequently Asked Questions (FAQ)" faqs={faqs} />
        </div>

        <Testimonial testimonials={testimonials} />

        <Blogs title="Latest from the blog" blogs={blogsDummy} />
      </div>
    </div>
  );
};

export default FamilyProtection;
