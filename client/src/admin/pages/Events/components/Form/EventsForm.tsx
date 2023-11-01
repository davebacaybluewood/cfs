import Wrapper from "admin/components/Wrapper/Wrapper";
import { UserContext } from "admin/context/UserProvider";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { paths } from "constants/routes";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Button as MUIButton,
} from "@mui/material";
import FormikTextInput from "library/Formik/FormikInput";
import "./EventsForm.scss";
import Button from "library/Button/Button";
import agent from "admin/api/agent";
import { toast } from "react-toastify";
import Spinner from "library/Spinner/Spinner";

const EventsForm = () => {
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid ?? "";
  const search = useLocation().search;
  const action = new URLSearchParams(search).get("action");
  const eventId = new URLSearchParams(search).get("eventId");

  const [loading, setLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [initialValues, setInitialValues] = useState({
    thumbnail: "",
    title: "",
    eventDate: "",
    status: "",
    content: "",
    design: "",
    shortDescription: "",
    meetingLink: "",
  });

  const isEditMode = action === "edit";

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Events",
      url: paths.adminEvents,
      isActive: false,
    },
    {
      title: isEditMode ? "Edit" : "Add" + " Event",
      url: paths.adminEventsForm,
      isActive: true,
    },
  ];

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required."),
    eventDate: Yup.string().required("Event Date is required."),
    shortDescription: Yup.string().required("Short Description is required."),
  });

  const handleFocusBack = () => {
    setThumbnailPreview("");
    window.removeEventListener("focus", handleFocusBack);
  };
  const clickedFileInput = () => {
    window.addEventListener("focus", handleFocusBack);
  };

  const submitHandler = async (data) => {
    setLoading(true);
    const res = await agent.Events.createEvent({
      userGuid,
      title: data.title,
      eventDate: data.eventDate,
      shortDescription: data.shortDescription,
      status: "ACTIVE",
      privacy: "PUBLIC",
      thumbnail: data.thumbnail,
      meetingLink: data.meetingLink,
    });

    if (res) {
      toast.success(`Event has been created.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setLoading(false);
    }
  };

  const editHandler = async (data) => {
    setLoading(true);
    const res = await agent.Events.updateEvent(eventId ?? "", {
      userGuid,
      title: data.title,
      eventDate: data.eventDate,
      shortDescription: data.shortDescription,
      status: "ACTIVE",
      privacy: "PUBLIC",
      thumbnail: data.thumbnail,
      meetingLink: data.meetingLink,
    });

    if (res) {
      toast.success(`Event has been updated.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setLoading(false);
    }
  };

  useEffect(() => {
    const getSingleEvent = async () => {
      const res = await agent.Events.getSingleEvent(eventId ?? "");
      setInitialValues({
        thumbnail: res?.thumbnail ?? "",
        title: res?.title ?? "",
        eventDate: res?.eventDate ?? "",
        status: res?.status ?? "",
        content: res?.content ?? "",
        design: res?.design ?? "",
        shortDescription: res?.shortDescription ?? "",
        meetingLink: res?.meetingLink ?? "",
      });
    };

    if (eventId) {
      getSingleEvent();
    }
  }, [eventId]);

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="events-admin-container"
    >
      <div className="events-admin-form-container">
        <h2>{isEditMode ? "Edit" : "Add"} Event </h2>
        <div className="events-admin-form">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (data, actions) => {
              if (isEditMode) {
                await editHandler({
                  userGuid,
                  title: data.title,
                  eventDate: data.eventDate,
                  shortDescription: data.shortDescription,
                  status: "ACTIVE",
                  privacy: "PUBLIC",
                  thumbnail: data.thumbnail,
                  meetingLink: data.meetingLink,
                });
              } else {
                await submitHandler({
                  userGuid,
                  title: data.title,
                  eventDate: data.eventDate,
                  shortDescription: data.shortDescription,
                  status: "ACTIVE",
                  privacy: "PUBLIC",
                  thumbnail: data.thumbnail,
                  meetingLink: data.meetingLink,
                });
              }
            }}
            validationSchema={validationSchema}
          >
            {({ values, handleSubmit, setFieldValue }) => {
              return (
                <Grid container spacing={2}>
                  <Grid item xs={12} className="form-card-container">
                    <h3 className="form-label">Thumbnail (Required)</h3>
                    <MUIButton variant="contained" component="label">
                      Upload File
                      <input
                        type="file"
                        hidden
                        name="thumbnail"
                        onChange={(event) => {
                          setFieldValue(
                            "thumbnail",
                            event.currentTarget.files![0]
                          );
                          const fileReader = new FileReader();
                          fileReader.onload = () => {
                            if (fileReader.readyState === 2) {
                              setThumbnailPreview(
                                fileReader.result?.toString() ?? ""
                              );
                            }
                          };
                          fileReader.readAsDataURL(event.target.files![0]);
                          window.removeEventListener("focus", handleFocusBack);
                        }}
                        onClick={clickedFileInput}
                      />
                    </MUIButton>
                    {thumbnailPreview ||
                    (typeof values.thumbnail === "string" &&
                      values.thumbnail) ? (
                      <div className="thumbnail-container">
                        <img
                          src={
                            typeof values.thumbnail === "string"
                              ? values.thumbnail
                              : thumbnailPreview
                          }
                          alt="thumbnail-pic"
                        ></img>
                      </div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} className="form-card-container">
                    <label>Title (Required)</label>
                    <FormikTextInput
                      placeholder="Enter title"
                      variant="outlined"
                      name="title"
                      value={values.title}
                    />
                  </Grid>
                  <Grid item xs={12} className="form-card-container">
                    <label>Event Date (Required)</label>
                    <FormikTextInput
                      isDate={true}
                      placeholder="Enter Event Date"
                      variant="outlined"
                      name="eventDate"
                      value={values.eventDate}
                    />
                  </Grid>
                  <Grid item xs={12} className="form-card-container">
                    <label>Meeting Link (Required)</label>
                    <FormikTextInput
                      placeholder="Enter Meeting Link"
                      variant="outlined"
                      name="meetingLink"
                      value={values.meetingLink}
                      isTextArea
                    />
                  </Grid>
                  <Grid item xs={12} className="form-card-container">
                    <label>Short Description (Required)</label>
                    <FormikTextInput
                      placeholder="Enter Short Description"
                      variant="outlined"
                      name="shortDescription"
                      value={values.shortDescription}
                      isTextArea
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Button variant="danger" onClick={() => handleSubmit()}>
                      {isEditMode ? "Edit Event" : "Add Event"}
                    </Button>
                  </Grid>
                </Grid>
              );
            }}
          </Formik>
        </div>
      </div>
      {loading ? <Spinner variant="fixed" /> : null}
    </Wrapper>
  );
};

export default EventsForm;
