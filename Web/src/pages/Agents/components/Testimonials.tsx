import { Grid } from "@mui/material";
import Banner from "library/Banner/Banner";
import React from "react";
import { FaQuoteRight } from "react-icons/fa";

type TestimonialProps = {
  testimonials: {
    title: string;
    name: string;
    testimonial: string;
  }[];
};
const Testimonials: React.FC<TestimonialProps> = (props) => {
  return (
    <div className="testimonials">
      <Banner
        bigTitle="What Clients Says To Me"
        title="Testimonials"
        hasBorder={true}
      />

      <Grid container spacing={3}>
        {props.testimonials.map((t: any, index: number) => (
          <Grid item md={6} key={index}>
            <div className="item">
              {/* <div className="abosolute-icon">
                <FaQuoteRight />
              </div> */}
              <p className="testimonial">{t.testimonial}</p>
              <div className="client-from">
                <h5>{t.name}</h5>
                <p>{t.title}</p>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Testimonials;
