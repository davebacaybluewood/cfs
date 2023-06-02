import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import Button from "../Button/Button";
import "./BlogProps.scss";

interface BlogProps {
  align: "left" | "right";
  blogTitle: string;
  authorImage: string;
  date: string;
  blogCaption: string;
  button: {
    text: string;
    onClick?: () => void;
  };
  blogImage: string;
}
const BlogProps: React.FC<BlogProps> = (props) => {
  return (
    <div className="blog-props-container">
      <Container>
        <Grid
          container
          spacing={2}
          direction={props.align === "right" ? "row-reverse" : undefined}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item sm={12} md={12} lg={6}>
            <div className="blog-title">
              <h3>{props.blogTitle}</h3>
            </div>
            <div className="author-details">
              <div className="author-details__image">
                <img src={props.authorImage} />
                <div className="date">{props.date}</div>
              </div>
              <div className="captions">
                <Typography>{props.blogCaption}</Typography>
              </div>
              <div className="blog__btn">
                <Button variant="default">{props.button.text}</Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <div className="blog-image">
              <img src={props.blogImage} alt="" />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BlogProps;
