import {
  Grid,
  Button as MUIButton,
  InputLabel,
  Select,
  FormControl,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
} from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import { CrumbTypes } from "AdminNew/pages/Dashboard/types";
import useFetchBlogs, {
  BlogValueType,
} from "AdminNew/pages/FileMaintenance/pages/Webinars/hooks/useFetchBlogs";
import ENDPOINTS from "constants/endpoints";
import paths from "constants/routes";
import { Formik } from "formik";
import getUserToken from "helpers/getUserToken";
import Button from "library/Button/Button";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useContext, useMemo, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "./BlogForm.scss";
import Spinner from "library/Spinner/Spinner";
import { UserContext } from "AdminNew/context/UserProvider";
import { MenuProps } from "pages/Agents/AgentsLanding/utils";
import { tagOptions } from "../utils";

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
  const [thumbnailPreview, setThumbnailPreview] = useState<any>("");

  useEffect(() => {}, [thumbnailPreview]);

  const addInitialValues: Omit<BlogValueType, "role"> = {
    thumbnail: "",
    title: "",
    author: "",
    tags: [],
    content: "",
  };
  const editInitialValues: Omit<BlogValueType, "role"> = {
    thumbnail: blogs[0]?.thumbnail,
    title: blogs[0]?.title,
    author: blogs[0]?.singleAuthorName,
    tags: blogs[0]?.tags ?? [],
    content: blogs[0]?.content,
  };

  const isEditMode = id !== "add";
  const initialValues = !isEditMode ? addInitialValues : editInitialValues;

  const validationSchema = Yup.object({
    title: Yup.string().required("Title Field is Required."),
    author: Yup.string().required("Author Field is Required."),
    content: Yup.string().required("Content Field is Required."),
  });

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
              tags: values.tags,
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
            navigate(paths.adminBlogs);
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
              author: userCtx.user._id,
              tags: values.tags,
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
            navigate(paths.adminBlogs);
          })
          .then((result) => {
            console.log(result);
            setIsLoading(false);
          });
  };

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
        {({
          values,
          setFieldValue,
          setFieldTouched,
          handleSubmit,
          touched,
        }) => {
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
                        const fileReader = new FileReader();
                        fileReader.onload = () => {
                          if (fileReader.readyState === 2) {
                            setThumbnailPreview(fileReader.result);
                          }
                        };
                        fileReader.readAsDataURL(event.target.files![0]);
                        setFieldValue(
                          "thumbnail",
                          event.currentTarget.files![0]
                        );
                      }}
                    />
                  </MUIButton>
                  <div className="img-container">
                    <img
                      src={
                        isEditMode && !thumbnailPreview
                          ? values.thumbnail
                          : thumbnailPreview
                      }
                      alt={isEditMode ? values.thumbnail : thumbnailPreview}
                    ></img>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FormikTextInput
                    name="title"
                    label="Blog Title"
                    value={values.title}
                    variant="filled"
                    InputLabelProps={{ shrink: !!values.title }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FormikTextInput
                    name="author"
                    label="Blog Author"
                    value={userCtx.user.name}
                    variant="filled"
                    InputLabelProps={{ shrink: !!values.author }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="languages-label">
                      Put Some Tags (You can choose more than one)
                    </InputLabel>
                    <Select
                      labelId="languages-label"
                      id="languages-chip"
                      multiple
                      value={values.tags}
                      onChange={(event) => {
                        const tags = event.target.value?.map((tag: any) => {
                          return { label: tag };
                        });
                        console.log(event.target.value);
                        setFieldValue("tags", event.target.value);
                        setFieldTouched("tags", true);
                      }}
                      variant="outlined"
                      name="languages"
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                          }}
                        >
                          {selected.map((value: any) => (
                            <Chip key={value?.label} label={value?.label} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {tagOptions.map((name) => (
                        <MenuItem
                          key={name.label}
                          value={{ label: name.label } as any}
                        >
                          {name.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
