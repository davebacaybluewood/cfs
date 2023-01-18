import { Formik } from "formik";
import Title from "pages/Admin/components/Title/Title";
import React, { useEffect } from "react";
import { EventValues } from "./components/Form";
import * as Yup from "yup";
import { ILabeledInput } from "pages/Contact/components/Form/Form";
import FormikTextInput from "library/Formik/FormikInput";
import { Grid, Button as MUIButton } from "@mui/material";
import Promt from "library/Prompt/Promt";
import getCurrentDateAndTime from "helpers/getCurrentDateAndTime";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  listSingleEvent,
  updateEvent,
} from "redux/actions/eventActions";
import { useNavigate, useParams } from "react-router-dom";
import "./EventsForm.scss";
import Button from "library/Button/Button";
import paths from "constants/routes";
import { EVENT_ACTION_UPDATE_TYPES } from "constants/redux-constants";

const EventsForm: React.FC = () => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title field is required."),
    description: Yup.string().required("Description field is required."),
    eventDate: Yup.string().required("Event Date field is required."),
    image: Yup.string().required("Event image field is required."),
    flyer: Yup.string().required("Event ticket field is required."),
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitEventUpdate = useSelector((state: any) => state.updateEvent);
  const submitEventCreate = useSelector((state: any) => state.createEvent);
  useEffect(() => {
    if (submitEventUpdate?.success || submitEventCreate?.success) {
      dispatch({ type: EVENT_ACTION_UPDATE_TYPES.EVENT_LIST_UPDATE_RESET });
      navigate(paths.adminEvents);
    }

    if (id !== "add") {
      dispatch(listSingleEvent(id ?? "") as any);
    }
  }, [
    dispatch,
    navigate,
    submitEventUpdate?.success,
    submitEventCreate?.success,
    id,
  ]);
  const eventSelector = useSelector((state: any) => state.eventSingleDetails);
  const { event, loading } = eventSelector;
  const editInitialValues: EventValues = {
    title: event[0]?.title || "",
    description: event[0]?.description || "",
    eventDate: event[0]?.event_date || getCurrentDateAndTime(),
    image: event[0]?.image || "",
    flyer: event[0]?.ticket || "",
  };
  const addInitialValues: EventValues = {
    title: "",
    description: "",
    eventDate: getCurrentDateAndTime(),
    image: "",
    flyer: "",
  };

  const initialValues = id === "add" ? addInitialValues : editInitialValues;
  const headerLabel = id === "add" ? "Add Event" : "Update Event";

  if (loading || submitEventUpdate.loading || submitEventCreate.loading) {
    return <p>Loading ...</p>;
  }

  const backHandler = () => {
    dispatch({ type: EVENT_ACTION_UPDATE_TYPES.EVENT_LIST_UPDATE_RESET });
    navigate(paths.adminEvents);
  };

  return (
    <div className="event-page-form">
      <Title title={headerLabel} subtitle="Field with (*) is required." />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: any, actions) => {
          actions.setSubmitting(true);
          if (id !== "add") {
            dispatch(
              updateEvent(
                id ?? "",
                values.title,
                values.description,
                values.eventDate,
                "dark",
                values.image,
                values.flyer
              ) as any
            );
            actions.resetForm();
          } else {
            dispatch(
              createEvent(
                values.title,
                values.description,
                values.eventDate,
                "dark",
                values.image,
                values.flyer
              ) as any
            );
            actions.resetForm();
          }
        }}
      >
        {({
          values,
          handleSubmit,
          dirty,
          isSubmitting,
          setFieldValue,
          errors,
        }) => {
          const labeledInput: ILabeledInput[] = [
            {
              name: "title",
              label: "Title *",
              value: event[0]?.title || "",
              colDef: {
                xs: 12,
                md: 12,
                lg: 12,
              },
            },
            {
              name: "eventDate",
              label: "Event Date *",
              value: event[0]?.event_date || "",
              colDef: {
                xs: 12,
                md: 12,
                lg: 12,
              },
              isDate: true,
            },
            {
              name: "description",
              label: "Description *",
              value: event[0]?.description || "",
              colDef: {
                xs: 12,
                md: 12,
                lg: 12,
              },
              isTextArea: true,
            },
          ];
          return (
            <form
              onSubmit={handleSubmit}
              className="form"
              encType="multipart/form-data"
            >
              <Grid container spacing={2}>
                {labeledInput.map((data, index: number) => (
                  <Grid item {...{ ...data.colDef }} key={index}>
                    <FormikTextInput
                      label={data.label}
                      isDate={data.isDate}
                      variant="filled"
                      fullWidth
                      className="filled-input"
                      name={data.name}
                      isTextArea={data.isTextArea}
                      disabled={data.disabled}
                      value={data.value}
                    />
                  </Grid>
                ))}
                <Grid item xs={12} lg={12}>
                  <h5 className="form-label">Event Image</h5>
                  <MUIButton variant="contained" component="label">
                    Upload New Image
                    <input
                      type="file"
                      hidden
                      name="image"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files![0]);
                      }}
                    />
                  </MUIButton>
                  {id !== "add" && (
                    <div className="image-holder">
                      <img className="thumbnail" src={event[0]?.image || ""} />
                    </div>
                  )}
                  {errors.image ? (
                    <p className="form-error">Event image is required.</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} lg={12}>
                  <h5 className="form-label">Flyer Image</h5>
                  <MUIButton variant="contained" component="label">
                    Upload New Image
                    <input
                      type="file"
                      hidden
                      name="flyer"
                      onChange={(event) => {
                        setFieldValue("flyer", event.currentTarget.files![0]);
                      }}
                    />
                  </MUIButton>
                  {id !== "add" && (
                    <div className="image-holder">
                      <img className="thumbnail" src={event[0]?.ticket || ""} />
                    </div>
                  )}
                  {errors.flyer ? (
                    <p className="form-error">Flyer image is required.</p>
                  ) : null}
                </Grid>
              </Grid>
              <div className="form-footer">
                <Button variation="light" onClick={backHandler}>
                  Back
                </Button>
                <Button variation="dark" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EventsForm;
