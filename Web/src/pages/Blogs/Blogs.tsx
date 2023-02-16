import React from "react";
import "./Blogs.scss";
import Banner from "library/Banner/Banner";
import PageTitle from "library/PageTitle/PageTitle";
import BlogsCard from "./components/BlogsCard";

const Blogs: React.FC = () => {
  return (
    <div className="blogs">
      <PageTitle title="Blogs" />
      <Banner
        bigTitle="COMFORT BLOGS"
        title=""
        backgroundImage="https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <BlogsCard />
    </div>
  );
};

export default Blogs;
