import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import Button from "../Button/Button";
import "./LargeBlogCard.scss";
import UserDetails from "library/UserDetail/UserDetails";
import { AuthorType } from "library/Blogs/BlogModels";
import moment from "moment";

interface BlogProps {
  align: "left" | "right";
  blogTitle: string;
  author: AuthorType;
  date: string;
  content: string;
  button: {
    text: string;
    onClick?: () => void;
  };
  blogImage: string;
}
const LargeBlogCard: React.FC<BlogProps> = (props) => {
  return (
    <div className="blog-props-container">
      <Container>
        <Grid
          container
          spacing={3}
          direction={props.align === "right" ? "row-reverse" : undefined}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item sm={12} md={12} lg={7}>
            <div className="blog-title">
              <h3>{props.blogTitle}</h3>
            </div>
            <UserDetails
              authorName={`${props.author.authorName}, ${moment(
                props.date
              ).format("MMMM D, YYYY")}`}
              image={props.author.image}
            />
            <div className="blog-captions">
              <Typography className="card-blog-content">
                {props.content.replace(/<[^>]*>/g, "").replace("&quot;", " ")}
              </Typography>
              <div className="blog__btn">
                <Button variant="default" onClick={props.button.onClick}>
                  {props.button.text}
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={5}>
            <div className="blog-image">
              <img src={props.blogImage} alt="" />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LargeBlogCard;
