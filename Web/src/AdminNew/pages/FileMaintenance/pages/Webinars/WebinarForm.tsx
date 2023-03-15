import { Grid, Button as MUIButton } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import { Formik, useFormik } from "formik";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "library/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "library/Spinner/Spinner";
import useFetchWebinars, { WebinarValuesType } from "./hooks/useFetchWebinars";

const WebinarForm: React.FC = () => {
  const { id } = useParams();
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { webinars } = useFetchWebinars(id);
  const addInitialValues = {
    title: "",
    introVideo: "",
    introVideoContent: "",
    introVideoTimeTracker: 1,
    fullVideo: "",
    fullVideoContent: "",
    fullVideoTimeTracker: 1,
    thumbnail: "",
    calendlyLink: "",
  };
  const editInitialValues = {
    title: webinars.title,
    introVideo: webinars.introVideo,
    introVideoContent: webinars.introVideoContent,
    introVideoTimeTracker: webinars.introVideoTimeTracker,
    fullVideo: webinars.fullVideo,
    fullVideoContent: webinars.fullVideoContent,
    fullVideoTimeTracker: webinars.fullVideoTimeTracker,
    thumbnail: webinars.thumbnail,
    calendlyLink: webinars.calendlyLink,
  };

  const isEditMode = id !== "add";
  const initialValues = !isEditMode ? addInitialValues : editInitialValues;

  const validationSchema = Yup.object({
    title: Yup.string().required("Title field is required."),
    introVideo: Yup.string().required("Intro Video field is required."),
    introVideoContent: Yup.string().required(
      "Intro Video Content field is required."
    ),
    introVideoTimeTracker: Yup.string().required(
      "Intro Video Time Tracker field is required."
    ),
    fullVideo: Yup.string().required("Full Video field is required."),
    fullVideoContent: Yup.string().required(
      "Full Video Content field is required."
    ),
    fullVideoTimeTracker: Yup.string().required(
      "Full Video Content field is required."
    ),
    thumbnail: Yup.string().required("Thumbnail field is required."),
    calendlyLink: Yup.string().required("Calendly field is required."),
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

  const submitFormHandler = (values: WebinarValuesType) => {
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
              ? ENDPOINTS.WEBINAR_SINGLE.replace(":webinarId", id ?? "")
              : ENDPOINTS.WEBINARS,
            {
              title: values.title.toString(),
              introVideo: values.introVideo.toString(),
              introVideoContent: values.introVideoContent.toString(),
              introVideoTimeTracker: values.introVideoTimeTracker,
              fullVideo: values.fullVideo.toString(),
              fullVideoContent: values.fullVideoContent.toString(),
              fullVideoTimeTracker: values.fullVideoTimeTracker,
              thumbnail: values.thumbnail,
              calendlyLink: values.calendlyLink,
            },
            config
          )
          .then((response) => {
            toast.info(`Webinar Added`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate(paths.webinar);
          })
          .then((result) => {
            setIsLoading(false);
          })
      : axios
          .post(
            isEditMode
              ? ENDPOINTS.WEBINAR_SINGLE.replace(":webinarId", id ?? "")
              : ENDPOINTS.WEBINARS,
            {
              title: values.title.toString(),
              introVideo: values.introVideo.toString(),
              introVideoContent: values.introVideoContent.toString(),
              introVideoTimeTracker: values.introVideoTimeTracker,
              fullVideo: values.fullVideo.toString(),
              fullVideoContent: values.fullVideoContent.toString(),
              fullVideoTimeTracker: values.fullVideoTimeTracker,
              thumbnail: values.thumbnail,
              calendlyLink: values.calendlyLink,
            },
            config
          )
          .then((response) => {
            toast.info(`Webinar Added`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate(paths.webinar);
          })
          .then((result) => {
            setIsLoading(false);
          });
  };

  const breadcrumb = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Webinars",
      url: paths.webinar,
      isActive: false,
    },
    {
      title: "Manage Webinar",
      url: paths.webinar,
      isActive: false,
    },
  ];

  return (
    <Wrapper
      className="webinar-admin-container"
      loading={false}
      error={false}
      breadcrumb={breadcrumb}
    >
      <Spinner isVisible={loading} />
      <Title
        title={`${id === "add" ? "Add" : "Edit"} Webinar`}
        subtitle="All fields (*) are required."
      ></Title>
      <div className="webinar-light">
        <Formik
          {...{ initialValues, validationSchema }}
          onSubmit={(values) => submitFormHandler(values)}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, handleSubmit }) => {
            return (
              <div className="webinar-form">
                <Grid container spacing={2}>
                  <Grid item sm={12} md={12} lg={12}>
                    <FormikTextInput
                      name="title"
                      label="Webinar Title *"
                      value={values.title}
                      variant="filled"
                      InputLabelProps={{ shrink: !!values.title }}
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={9}>
                    <FormikTextInput
                      name="introVideo"
                      label="Short Video *"
                      value={values.introVideo}
                      variant="filled"
                      InputLabelProps={{ shrink: !!values.introVideo }}
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={3}>
                    <FormikTextInput
                      name="introVideoTimeTracker"
                      label="Short Video Time Tracker*"
                      value={values.fullVideoTimeTracker}
                      variant="filled"
                      InputLabelProps={{
                        shrink: !!values.fullVideoTimeTracker,
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <h5 className="form-label">Short Video Content</h5>
                    <ReactQuill
                      value={values.introVideoContent}
                      modules={realQuillModules}
                      onChange={(value) =>
                        setFieldValue("introVideoContent", value)
                      }
                      theme="snow"
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={9}>
                    <FormikTextInput
                      name="fullVideo"
                      label="Long Video *"
                      value={values.fullVideo}
                      variant="filled"
                      InputLabelProps={{ shrink: !!values.fullVideo }}
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={3}>
                    <FormikTextInput
                      name="fullVideoTimeTracker"
                      label="Long Video Time Tracker *"
                      value={values.fullVideoTimeTracker}
                      variant="filled"
                      InputLabelProps={{
                        shrink: !!values.fullVideoTimeTracker,
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <h5 className="form-label">Long Video Content</h5>
                    <ReactQuill
                      value={values.fullVideoContent}
                      modules={realQuillModules}
                      onChange={(value) =>
                        setFieldValue("fullVideoContent", value)
                      }
                      theme="snow"
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <FormikTextInput
                      name="calendlyLink"
                      label="Calendly Link *"
                      value={values.calendlyLink}
                      variant="filled"
                      InputLabelProps={{ shrink: !!values.calendlyLink }}
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <h5 className="form-label">Webinar Thumbnail</h5>
                    <MUIButton variant="contained" component="label">
                      Upload New Image
                      <input
                        type="file"
                        hidden
                        name="image"
                        onChange={(event) => {
                          setFieldValue(
                            "thumbnail",
                            event.currentTarget.files![0]
                          );
                        }}
                      />
                    </MUIButton>
                  </Grid>
                </Grid>
                <div className="form-footer">
                  <Button variation="light" onClick={() => console.log("back")}>
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
                {/* {<pre>{JSON.stringify(values, null, 2)}</pre>} */}
              </div>
            );
          }}
        </Formik>
      </div>
    </Wrapper>
  );
};

export default WebinarForm;
