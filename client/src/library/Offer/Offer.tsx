import React from "react";
import "./Offer.scss";
import { Container, Grid, Typography } from "@mui/material";
import Button from "library/Button/Button";
import { FaCheckCircle } from "react-icons/fa";

interface OfferProps {
  title: string | JSX.Element;
  description: string | JSX.Element;
  list: string[];
  button: {
    text: string;
    onClick?: () => void;
  };
  image: string;
}
const Offer: React.FC<OfferProps> = (props) => {
  return (
    <Container className="offer__content">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="section__title">
            <Typography variant="h2">{props.title}</Typography>
          </div>
          <div className="section__description">
            <Typography>{props.description}</Typography>
          </div>
          <div className="offer__list">
            <ul>
              {props.list.map((list, index) => {
                return (
                  <li key={index}>
                    <FaCheckCircle /> {list}
                  </li>
                );
              })}
            </ul>
            <div className="section__button">
              <Button variant="primary">{props.button.text}</Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="section__image">
            <img src={props.image} alt="" />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Offer;
