import Headline from "library/Headline/Headline";
import React from "react";
import LargeBlogCard from "library/LargeBlogCard/LargeBlogCard";
import Blogs from "library/Blogs/Blogs";
import { blogsDummy } from "constants/dummyDatas";
import Subscription from "pages/Home/components/Subscription/Subscription";
import { isEven } from "helpers/isEvenOrOdd";
import "./BlogPage.scss";

const BlogPage: React.FC = () => {
  return (
    <div className="blog-page">
      <div className="headline-blogs">
        <Headline
          title="Sample hook and headline"
          description="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
        >
          <form>
            <input
              type="search"
              placeholder="Find financial planning, business, insurance …."
            />
            <button type="submit">Search</button>
          </form>
        </Headline>
      </div>
      <div className="blogs">
        {blogsDummy.map((data, index) => {
          return (
            <LargeBlogCard
              align={isEven(index) ? "right" : "left"}
              blogTitle={`${data.title}`}
              date={data.date}
              content={data.description}
              button={{
                text: "Read More",
              }}
              author={data.author}
              blogImage={data.image}
            />
          );
        })}
      </div>
      <Blogs title="Read More Here" blogs={blogsDummy} />
      <Subscription />
    </div>
  );
};

export default BlogPage;
