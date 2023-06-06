import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import "./Testimonial.scss";
import classNames from "classnames";

interface TestimonialType {
  image: string;
  quote: string;
  name: string;
  position: string;
  age: number;
  info: string;
}

interface TestimonialProps {
  testimonials: TestimonialType[];
}

const Testimonial: React.FC<TestimonialProps> = (props) => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const data = props.testimonials[testimonialIndex];

  return (
    <Container className="testimonial-main-container">
      <React.Fragment>
        <div className="testimonial-title">
          <h2>Hear it from our happy clients</h2>
        </div>
        <Grid container spacing={5} alignItems="start">
          <Grid
            item
            sm={12}
            md={12}
            lg={6}
            className="image-content-testimonial"
          >
            <div className="testimonial-image">
              <img src={data.image} alt="" />
            </div>
          </Grid>
          <Grid
            item
            sm={12}
            md={12}
            lg={6}
            className="text-content-testimonial"
          >
            <div className="testimonial-quote">
              <h5>{data.quote}</h5>
            </div>
            <div className="testimonial-author-credentials">
              <h4>{data.name}</h4>
              <p>
                {data.position}/ {data.age} years old/ {data.info}
              </p>
            </div>
            <div className="testimonial__btn">
              {props.testimonials.map((data, index) => {
                const buttonClassnames = classNames({
                  unfilled: index !== testimonialIndex,
                  filled: index === testimonialIndex,
                });
                return (
                  <div className={buttonClassnames}>
                    <button onClick={() => setTestimonialIndex(index)}></button>
                  </div>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    </Container>
  );
};

export default Testimonial;
