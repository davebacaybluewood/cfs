import { Container, Grid, Typography } from "@mui/material";
import Button from "library/Button/Button";
import React from "react";
import "./Consultation.scss";

interface ConsultationProps {
  title: string;
  description: string | JSX.Element;
  image: string;
  button: {
    text: string;
    onClick?: () => void;
  };
}
const Consultation: React.FC<ConsultationProps> = (props) => {
  return (
    <div className="consultation">
      <Container className="section-five__content">
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={12} sm={12} md={6} lg={6} className="text__content">
            <div className="section__title">
              <Typography variant="h3">{props.title}</Typography>
            </div>
            <div className="section__text__content">
              <Typography>{props.description}</Typography>
            </div>
            <div className="section__text__content">
              <Typography>{props.description}</Typography>
            </div>

            <div className="section__btn">
              <Button variant="danger">{props.button.text}</Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} className="section__image">
            <img src={props.image} alt={props.image} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Consultation;
