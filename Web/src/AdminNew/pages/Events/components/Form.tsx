import { Grid, Button as MUIButton } from "@mui/material";
import { Formik } from "formik";
import Button from "library/Button/Button";
import DrawerBase, { Anchor } from "library/Drawer/Drawer";
import FormikTextInput from "library/Formik/FormikInput";
import Promt from "library/Prompt/Promt";
import Spinner from "library/Spinner/Spinner";
import { ILabeledInput } from "pages/Contact/components/Form/Form";
import React, { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "redux/actions/eventActions";
import * as Yup from "yup";
import "./Form.scss";

type FormProps = {
  setShowDialog: Dispatch<SetStateAction<any>>;
  setShowDrawer: Dispatch<SetStateAction<any>>;
  showDrawer: boolean;
  setEventData: Dispatch<SetStateAction<any>>;
  eventData: any;
};
export type EventValues = {
  title: string;
  description: string;
  eventDate: string;
  image: string;
  flyer: string;
};
const Form: React.FC<FormProps> = (props) => {
  const dispatch = useDispatch();
  const eventSubmit = useSelector((state: any) => state.createEvent);
  const { loading } = eventSubmit;
  const initialValues: EventValues = {
    title: "",
    description: "",
    eventDate: "2017-05-24T10:30",
    image: "",
    flyer: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title field is required."),
    description: Yup.string().required("Description field is required."),
    eventDate: Yup.string().required("Event Date field is required."),
    image: Yup.string().required("Event image field is required."),
    flyer: Yup.string().required("Event ticket field is required."),
  });

  return (
    <div className="event-admin-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: any, actions) => {
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
          actions.setSubmitting(false);
          // props.setEventData()
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
              value: values.title,
              colDef: {
                xs: 12,
                md: 12,
                lg: 12,
              },
            },
            {
              name: "eventDate",
              label: "Event Date *",
              value: values.eventDate,
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
              value: values.description,
              colDef: {
                xs: 12,
                md: 12,
                lg: 12,
              },
              isTextArea: true,
            },
          ];
          return (
            <DrawerBase
              anchor={Anchor.Right}
              onClose={() => props.setShowDrawer(false)}
              open={props.showDrawer}
              title="ADD NEW EVENT"
              footer={
                <React.Fragment>
                  <Button
                    onClick={() => props.setShowDrawer(false)}
                    disabled={isSubmitting}
                    variation="light"
                  >
                    CANCEL
                  </Button>
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                    variation="dark"
                  >
                    ADD EVENT
                  </Button>
                </React.Fragment>
              }
            >
              <div>
                <div className="form-instructions">
                  <h2>FILLUP FORM</h2>
                  <p>(*) fields are required.</p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="form"
                  encType="multipart/form-data"
                >
                  <Grid container spacing={2}>
                    {labeledInput.map((data, index) => (
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
                        Upload File
                        <input
                          type="file"
                          hidden
                          name="image"
                          onChange={(event) => {
                            setFieldValue(
                              "image",
                              event.currentTarget.files![0]
                            );
                          }}
                        />
                      </MUIButton>
                      {errors.image ? (
                        <p className="form-error">Event image is required.</p>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <h5 className="form-label">Flyer Image</h5>
                      <MUIButton variant="contained" component="label">
                        Upload File
                        <input
                          type="file"
                          hidden
                          name="flyer"
                          onChange={(event) => {
                            setFieldValue(
                              "flyer",
                              event.currentTarget.files![0]
                            );
                          }}
                        />
                      </MUIButton>
                      {errors.flyer ? (
                        <p className="form-error">Flyer image is required.</p>
                      ) : null}
                    </Grid>
                  </Grid>
                  <Promt isDirty={dirty} />
                  <Spinner isVisible={isSubmitting || loading} />
                </form>
                {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
              </div>
            </DrawerBase>
          );
        }}
      </Formik>
    </div>
  );
};

export default Form;
