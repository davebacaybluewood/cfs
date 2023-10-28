import Wrapper from "admin/components/Wrapper/Wrapper";
import { UserContext } from "admin/context/UserProvider";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { paths } from "constants/routes";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import agent from "admin/api/agent";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid, Button as MUIButton } from "@mui/material";
import FormikTextInput from "library/Formik/FormikInput";
import EmailEditor from "react-email-editor";
import { ROLES } from "admin/constants/constants";
import Button from "library/Button/Button";
import capitalizeText from "helpers/capitalizeText";

const EventsForm = () => {
  const userCtx = useContext(UserContext) as any;

  const { profile } = useFetchUserProfile(userCtx?.user?.userGuid ?? "");
  const role = profile?.role!;
  const search = useLocation().search;
  const navigate = useNavigate();
  const action = new URLSearchParams(search).get("action") ?? "Add";
  const eventId = new URLSearchParams(search).get("eventId");

  const [loading, setLoading] = useState(false);
  const emailEditorRef = useRef<any>(null);
  const [design, setDesign] = useState<any>();
  const [initialValues, setInitialValues] = useState<any>({
    title: "",
    eventDate: "",
    thumbnail: "",
    content: "",
    design: "",
  });

  const [submitBtnVisible, setsubmitBtnVisible] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const evt = await agent.Events.getById(eventId!);

        setDesign(evt[0].design);
        setInitialValues({
          title: evt[0].title,
          eventDate: evt[0].eventDate,
          thumbnail: evt[0].thumbnail,
          content: evt[0].content,
          design: evt[0].design,
        });

        setsubmitBtnVisible(
          role === ROLES.ROLE_AGENT || role === ROLES.ROLE_MASTER_ADMIN
        );

        /** Load if edit mode */
        if (emailEditorRef.current && action === "edit" && eventId)
          emailEditorRef.current?.loadDesign(JSON.parse(evt[0].design));
      } catch (e) {
        console.log(e);
      }
    };

    if (eventId) {
      fetchEvent();
      setLoading(false);
    }
  }, [eventId]);

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
      title: "Form",
      url: paths.adminEventsForm,
      isActive: true,
    },
  ];

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required."),
    eventDate: Yup.string().required("Event Date is required."),
    noOfAttendees: Yup.string().required("Attendees is required."),
    thumbnail: Yup.string().required("Thumbnail is required."),
  });

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={loading}
      className="events-admin-container"
    >
      <div className="events-admin-form-container" style={{ padding: "2rem" }}>
        <h2>{capitalizeText(action)} Event </h2>

        <div className="events-admin-form">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (data, actions) => {
              console.log(data);
            }}
            validationSchema={validationSchema}
          >
            {({ values, handleSubmit, setFieldValue }) => {
              return (
                <Grid container spacing={2}>
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
                    <h3 className="form-label">Thumbnail (Required)</h3>
                    <MUIButton variant="contained" component="label">
                      Upload File
                      <input
                        type="file"
                        hidden
                        name="thumbnail"
                        onChange={(e) => {
                          // console.log(e);
                          setFieldValue("thumbnail", e.currentTarget.files![0]);
                        }}
                      />
                    </MUIButton>
                  </Grid>
                  <Grid item xs={12} className="form-card-container">
                    <label>Email Body (Required)</label>
                    <EmailEditor
                      ref={emailEditorRef}
                      style={{
                        height: "500px",
                      }}
                    />
                  </Grid>
                  {submitBtnVisible && (
                    <Grid item xs={12} className="form-card-container">
                      <div className="form-actions">
                        <div className="actions">
                          <Button
                            className="cfs-button"
                            onClick={() => {
                              navigate(paths.newAdminEvents);
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: loading ? "not-allowed" : "",
                              color: "black",
                            }}
                            type="button"
                            variant="secondary"
                            disabled={loading}
                          >
                            Back
                          </Button>
                          <Button
                            className="primary-cfs-btn"
                            onClick={() => handleSubmit()}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: loading ? "not-allowed" : "",
                            }}
                            type="button"
                            variant="primary"
                            disabled={loading}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </Grid>
                  )}
                </Grid>
              );
            }}
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default EventsForm;
