import Headline from "library/Headline/Headline";
import React from "react";
import { Container, Grid } from "@mui/material";
import BlogProps from "library/BlogsProps/BlogsProps";
import "./BlogPage.scss";
import Blogs from "library/Blogs/Blogs";
import { blogsDummy } from "constants/dummyDatas";
import Subscription from "pages/Home/components/Subscription/Subscription";
import Button from "library/Button/Button";

const BlogPage: React.FC = () => {
  return (
    <div className="blog-page">
      <div className="headline-blogs">
        <Headline
          title="Sample hook and headline"
          description="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
        />
        <Container>
          <form>
            <input
              type="search"
              placeholder="Find financial planning, business, insurance …."
            />
            <button type="submit">Search</button>
          </form>
        </Container>
      </div>
      <div className="blogs">
        <BlogProps
          align="left"
          blogTitle="How to know the right insurance for you hook"
          authorImage="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          date="Darryle April 25, 2023"
          blogCaption="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          button={{
            text: "Read More",
          }}
          blogImage="\assets\images\blogs\blogs-1.png"
        />
        <BlogProps
          align="right"
          blogTitle="How to know the right insurance for you hook"
          authorImage="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          date="Dave April 25, 2023"
          blogCaption="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          button={{
            text: "Read More",
          }}
          blogImage="\assets\images\blogs\blogs-2.png"
        />
        <BlogProps
          align="left"
          blogTitle="How to know the right insurance for you hook"
          authorImage="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          date="Allen April 25, 2023"
          blogCaption="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          button={{
            text: "Read More",
          }}
          blogImage="\assets\images\blogs\blogs-3.png"
        />
      </div>
      <Blogs title="Read More Here" blogs={blogsDummy} />
      <Subscription />
    </div>
  );
};

export default BlogPage;
