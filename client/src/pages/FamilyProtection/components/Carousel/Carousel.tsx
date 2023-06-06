import StandardCard from "library/StandardCard/StandardCard";
import React, { useRef } from "react";
import { RiShieldUserLine } from "react-icons/ri";
import ReactMultiCarousel from "react-multi-carousel";

const CustomButtonGroup = () => {
  return <button>testasfasfasfasfasf</button>;
};

interface CarouselProps {
  next?: any;
  previous?: any;
}
const Carousel: React.FC<CarouselProps> = (props) => {
  const carouselRef = useRef<any>();

  return (
    <ReactMultiCarousel
      ref={carouselRef}
      additionalTransfrom={0}
      arrows={false}
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container-padding-bottom"
      customButtonGroup={<CustomButtonGroup />}
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
      <div
        style={{
          padding: "1rem",
        }}
      >
        <StandardCard
          icon={<RiShieldUserLine />}
          title="Become a CFS Agent"
          description="veritatis et quasi architecto beatae vitae dicta sunt explicabo"
          button={{
            text: "Sign up",
          }}
        />
      </div>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <StandardCard
          icon={<RiShieldUserLine />}
          title="Become a CFS Agent"
          description="veritatis et quasi architecto beatae vitae dicta sunt explicabo"
          button={{
            text: "Sign up",
          }}
        />
      </div>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <StandardCard
          icon={<RiShieldUserLine />}
          title="Become a CFS Agent"
          description="veritatis et quasi architecto beatae vitae dicta sunt explicabo"
          button={{
            text: "Sign up",
          }}
        />
      </div>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <StandardCard
          icon={<RiShieldUserLine />}
          title="Become a CFS Agent"
          description="veritatis et quasi architecto beatae vitae dicta sunt explicabo"
          button={{
            text: "Sign up",
          }}
        />
      </div>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <StandardCard
          icon={<RiShieldUserLine />}
          title="Become a CFS Agent"
          description="veritatis et quasi architecto beatae vitae dicta sunt explicabo"
          button={{
            text: "Sign up",
          }}
        />
      </div>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <StandardCard
          icon={<RiShieldUserLine />}
          title="Become a CFS Agent"
          description="veritatis et quasi architecto beatae vitae dicta sunt explicabo"
          button={{
            text: "Sign up",
          }}
        />
      </div>
    </ReactMultiCarousel>
  );
};

export default Carousel;
