import React from "react";
import "./Partners.scss";
import ReactMultiCarousel from "react-multi-carousel";
import { Link } from "react-router-dom";

const logos = [
  {
    image:
      "https://res.cloudinary.com/dfm2vczpy/image/upload/v1691531661/partners/north-america_g3vsxw.png",
    link: "https://www.northamericancompany.com/",
  },
  {
    image:
      "https://res.cloudinary.com/dfm2vczpy/image/upload/v1691531661/partners/nationwide_frjtrx.png",
    link: "https://www.nationwide.com/",
  },
  {
    image:
      "https://res.cloudinary.com/dfm2vczpy/image/upload/v1691533128/partners/lafayette_v1pkr3.png",
    link: "https://www.westernsouthern.com/lafayette",
  },
  {
    image:
      "https://res.cloudinary.com/dfm2vczpy/image/upload/v1691533379/partners/foresters_qyxscd.png",
    link: "https://www.foresters.com/en",
  },
  {
    image:
      "https://res.cloudinary.com/dfm2vczpy/image/upload/v1691531661/partners/north-america_g3vsxw.png",
    link: "https://www.northamericancompany.com/",
  },
  {
    image:
      "https://res.cloudinary.com/dfm2vczpy/image/upload/v1691531661/partners/nationwide_frjtrx.png",
    link: "https://www.nationwide.com/",
  },
  {
    image:
      "https://res.cloudinary.com/dfm2vczpy/image/upload/v1691533128/partners/lafayette_v1pkr3.png",
    link: "https://www.westernsouthern.com/lafayette",
  },
  {
    image:
      "https://res.cloudinary.com/dfm2vczpy/image/upload/v1691533379/partners/foresters_qyxscd.png",
    link: "https://www.foresters.com/en",
  },
];

const Partners: React.FC = () => {
  return (
    <div>
      <ReactMultiCarousel
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
            items: 8,
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
        autoPlay
      >
        {logos.map((data) => {
          return (
            <div className="partners-container">
              <Link to={data.link} target="_blank">
                <img src={data.image} alt={data.image} />
              </Link>
            </div>
          );
        })}
      </ReactMultiCarousel>
    </div>
  );
};

export default Partners;
