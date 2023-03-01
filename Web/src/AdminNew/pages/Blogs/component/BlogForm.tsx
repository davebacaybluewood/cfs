import { Grid, Button as MUIButton } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import { CrumbTypes } from "AdminNew/pages/Dashboard/types";
import useFetchBlogs from "AdminNew/pages/FileMaintenance/pages/Webinars/hooks/useFetchBlogs";
import ENDPOINTS from "constants/endpoints";
import paths from "constants/routes";
import { Formik } from "formik";
import getUserToken from "helpers/getUserToken";
import Button from "library/Button/Button";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useContext, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { BlogType } from "../Blogs";
import "./BlogForm.scss";
import Spinner from "library/Spinner/Spinner";
import { UserContext } from "AdminNew/context/UserProvider";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "View Blog",
    url: paths.adminViewBlogs,
    isActive: true,
  },
];

const BlogForm: React.FC = () => {
  const { id } = useParams();
  const { blogs } = useFetchBlogs(id);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userCtx = useContext(UserContext) as any;

  const addInitialValues = {
    thumbnail: "",
    title: "",
    author: "",
    content: "",
  };
  const editInitialValues = {
    thumbnail: blogs.thumbnail,
    title: blogs.title,
    author: blogs.author,
    content: blogs.content,
  };

  const isEditMode = id !== "add";
  const initialValues = !isEditMode ? addInitialValues : editInitialValues;

  const validationSchema = Yup.object({
    title: Yup.string().required("Title Field is Required."),
    author: Yup.string().required("Author Field is Required."),
    content: Yup.string().required("Content Field is Required."),
  });
  //real quill
  const realQuillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["code-block"],
        ],
        handlers: {},
      },
    }),
    []
  );
  //submit blog form
  const submitBlogFormHandler = (values: any) => {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: "Bearer " + getUserToken(),
        "Content-Type": "multipart/form-data",
      },
    };

    isEditMode
      ? axios
          .put(
            isEditMode
              ? ENDPOINTS.BLOGS_SINGLE.replace(":blogId", id ?? "")
              : ENDPOINTS.BLOGS,
            {
              title: values.title.toString(),
              thumbnail: values.thumbnail,
              author: userCtx.user._id,
              content: values.content.toString(),
            },
            config
          )
          .then((response) => {
            toast.info(`Blog Updated`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate(paths.adminBlogForm);
          })
          .then((result) => {
            console.log(result);
            setIsLoading(false);
          })
      : axios
          .post(
            isEditMode
              ? ENDPOINTS.BLOGS_SINGLE.replace(":blogId", id ?? "")
              : ENDPOINTS.BLOGS,
            {
              title: values.title.toString(),
              thumbnail: values.thumbnail,
              author: values.author,
              content: values.content.toString(),
            },
            config
          )
          .then((response) => {
            toast.info(`Blog Added`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate(paths.blogs);
          })
          .then((result) => {
            console.log(result);
            setIsLoading(false);
          });
  };
  //back to blogs
  const backToBlogsHandler = () => {
    navigate(paths.adminBlogs);
  };
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <Spinner isVisible={loading} />
      <Title
        title={isEditMode ? "Edit Blog" : "Add Blog"}
        subtitle="All fields (*) are required."
      ></Title>
      <Formik
        {...{ initialValues, validationSchema }}
        onSubmit={(values) => submitBlogFormHandler(values)}
        enableReinitialize={true}
      >
        {({ values, setFieldValue, handleSubmit }) => {
          console.log(values);
          return (
            <div className="blog-form">
              <Grid container spacing={2} className="blog-form-container">
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className="blog-thumbnail-upload-container"
                >
                  <MUIButton
                    variant="contained"
                    component="label"
                    className="blog-thumbnail-button"
                  >
                    Upload New Image
                    <input
                      type="file"
                      hidden
                      name="thumbnail"
                      onChange={(event) => {
                        setFieldValue(
                          "thumbnail",
                          event.currentTarget.files![0]
                        );
                      }}
                    />
                  </MUIButton>
                  <img src={values.thumbnail} alt={values.thumbnail}></img>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FormikTextInput
                    name="title"
                    label="Blog Title"
                    value={values.title}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FormikTextInput
                    name="author"
                    label="Blog Author"
                    value={values.author}
                    variant="filled"
                  />
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                  <h5 className="form-label">Blog Content</h5>
                  <ReactQuill
                    value={values.content}
                    modules={realQuillModules}
                    onChange={(value) => setFieldValue("content", value)}
                    theme="snow"
                  />
                </Grid>
              </Grid>
              <div className="form-footer">
                <Button variation="light" onClick={() => backToBlogsHandler()}>
                  Back
                </Button>
                <Button
                  variation="dark"
                  type="submit"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
              </div>
            </div>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default BlogForm;
