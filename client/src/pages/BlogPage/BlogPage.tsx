import Headline from "library/Headline/Headline";
import React from "react";
import LargeBlogCard from "library/LargeBlogCard/LargeBlogCard";
import Blogs from "library/Blogs/Blogs";
import { blogsDummy } from "constants/dummyDatas";
import Subscription from "pages/Home/components/Subscription/Subscription";
import { isEven } from "helpers/isEvenOrOdd";
import useScroll from "hooks/useScroll";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";
import "./BlogPage.scss";
import Spinner from "library/Spinner/Spinner";
import useFetchBlogResource from "./hooks/useFetchBlogResource";

const BlogPage: React.FC = () => {
  useScroll();
  const navigate = useNavigate();

  const { blogs, loading } = useFetchBlogResource();

  return (
    <div className="blog-page">
      <div className="headline-blogs">
        <Headline
          title="Explore Our Blog for Expert Insights "
          description="We believe that knowledge is power, and we are dedicated to empowering you with the information you need to make informed decisions about your insurance coverage. We cover a wide range of topics, from understanding different types of insurance policies and their benefits to providing guidance on navigating the complexities of the insurance industry. "
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
      {loading ? (
        <Spinner variant="relative" />
      ) : (
        <div className="blogs">
          {blogs?.map((data, index) => {
            return (
              <LargeBlogCard
                align={isEven(index) ? "right" : "left"}
                blogTitle={`${data.title}`}
                date={data.createdAt ?? ""}
                content={data.content}
                button={{
                  text: "Read More",
                  onClick: () => {
                    const filteredTitle = data.title
                      .split(" ")
                      .join("-")
                      .toLowerCase();
                    navigate(
                      paths.single_blog.replace(":blogTitle", filteredTitle)
                    );
                  },
                }}
                author={{
                  authorName: data.authorName ?? "",
                  image: data.authorThumbnail ?? "",
                }}
                blogImage={data.thumbnail}
              />
            );
          })}
        </div>
      )}

      <Blogs title="Read More Blogs" isShowAll={false} />
      <Subscription />
    </div>
  );
};

export default BlogPage;
