import { Container, Grid, Typography } from "@mui/material";
import Button from "library/Button/Button";
import React from "react";
import "./QuestionForm.scss";

const QuestionForm: React.FC = () => (
  <form action="">
    <Container>
      <div className="question-form-container">
        <div className="question-img">
          <img src="\assets\images\home\contact-img.jpg" alt="" />
        </div>
        <div className="question-form">
          <Typography variant="h3" className="section-title">
            Got Questions? Talk to us!
          </Typography>
          <div className="form">
            <div className="form-input form__name">
              <h6>Name*</h6>
              <input type="text" placeholder="Full Name" />
            </div>
            <div className="form-input form__email">
              <h6>Email address*</h6>
              <input type="text" placeholder="Name@email.com" />
            </div>
            <Button variant="danger">Book a Free Consultation</Button>
          </div>
        </div>
      </div>
    </Container>
  </form>
);

export default QuestionForm;
