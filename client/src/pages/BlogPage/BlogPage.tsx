import Headline from "library/Headline/Headline";
import React, { useEffect, useState } from "react";
import LargeBlogCard from "library/LargeBlogCard/LargeBlogCard";
import Blogs from "library/Blogs/Blogs";
import { blogsDummy } from "constants/dummyDatas";
import Subscription from "pages/Home/components/Subscription/Subscription";
import { isEven } from "helpers/isEvenOrOdd";
import useScroll from "hooks/useScroll";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";
import Spinner from "library/Spinner/Spinner";
import useFetchBlogResource from "./hooks/useFetchBlogResource";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import { Container } from "@mui/material";
import { BlogData } from "./models";
import agent from "api/agent";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikTextInput from "library/Formik/FormikInput";
import "./BlogPage.scss";

const BlogPage: React.FC = () => {
  useScroll();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const { blogs, loading: blogLoading } = useFetchBlogResource(0, limit);
  const [isSearched, setIsSearched] = useState(false);

  const [displayedBlogs, setDisplayedBlogs] = useState<
    BlogData[] | undefined
  >();

  useEffect(() => {
    setDisplayedBlogs(blogs);
  }, [blogs]);

  const initialValues = {
    keyword: "",
  };

  const validationSchema = Yup.object({
    keyword: Yup.string().required("Keyword field is required."),
  });

  return (
    <div className="blog-page">
      <div className="headline-blogs">
        <Headline
          title="Explore Our Blog for Expert Insights "
          description="We believe that knowledge is power, and we are dedicated to empowering you with the information you need to make informed decisions about your insurance coverage. We cover a wide range of topics, from understanding different types of insurance policies and their benefits to providing guidance on navigating the complexities of the insurance industry. "
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setLoading(true);
              const data = await agent.BlogAndResource.search(values.keyword);
              setDisplayedBlogs(data?.blogs);
              setLoading(false);
              setIsSearched(true);
            }}
          >
            {({ handleSubmit, values }) => {
              return (
                <div className="search-form">
                  <FormikTextInput
                    type="text"
                    placeholder="Find financial planning, business, insurance …."
                    name="keyword"
                    value={values.keyword}
                    modifiedInputProps={{
                      endAdornment: (
                        <button type="submit" onClick={() => handleSubmit()}>
                          Search
                        </button>
                      ),
                    }}
                  />
                </div>
              );
            }}
          </Formik>
        </Headline>
      </div>
      {blogLoading || loading ? (
        <Spinner variant="relative" />
      ) : (
        <Container>
          <NoInformationToDisplay
            showNoInfo={!displayedBlogs?.length && !loading && !blogLoading}
            message="Search not found 😢"
            title="There's no information to display."
          >
            <div className="blogs">
              {displayedBlogs?.map((data, index) => {
                return (
                  <LargeBlogCard
                    key={index}
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
          </NoInformationToDisplay>
        </Container>
      )}

      {isSearched ? null : (
        <Blogs
          title="Read More Blogs"
          isShowAll={false}
          hasLoadMoreBtn={true}
          blogsConfig={{
            limit: 6,
            skip: 3,
          }}
        />
      )}
      <Subscription />
    </div>
  );
};

export default BlogPage;
