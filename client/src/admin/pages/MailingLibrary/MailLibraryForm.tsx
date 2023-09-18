import { Grid } from "@mui/material";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { Formik } from "formik";
import Spinner from "library/Spinner/Spinner";
import * as Yup from "yup";
import React, { useContext, useEffect, useRef, useState } from "react";
import FormikTextInput from "library/Formik/FormikInput";
import Button from "library/Button/Button";
import agent from "admin/api/agent";
import { UserContext } from "admin/context/UserProvider";
import { toast } from "react-toastify";
import "./MailLibraryForm.scss";
import { EmailTemplateParameter } from "admin/models/emailMarketing";
import { useLocation } from "react-router-dom";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import { PROFILE_ROLES } from "pages/PortalRegistration/constants";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";

const MailLibraryForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const emailEditorRef = useRef<any>(null);
  const [design, setDesign] = useState<any>();
  const [initialValues, setInitialValues] = useState({
    emailBody: "",
    subject: "",
    templateName: "",
  });

  const validationSchema = Yup.object({
    subject: Yup.string().required("Subject is required."),
    templateName: Yup.string().required("Template name is required."),
  });

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Email Library",
      url: paths.mailLibrary,
      isActive: false,
    },
    {
      title: "Email Library Form",
      url: paths.mailLibraryForm,
      isActive: true,
    },
  ];

  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;
  const [editButtonVisibility, setEditButtonVisibility] = useState(false);

  const search = useLocation().search;
  const action = new URLSearchParams(search).get("action");
  const templateId = new URLSearchParams(search).get("templateId");

  useEffect(() => {
    const fetchTemplateInfo = async () => {
      setLoading(true);
      const data = await agent.EmailMarketing.getSingleTemplate(
        userGuid,
        templateId || ""
      );
      setInitialValues({
        emailBody: data.templateBody,
        subject: data.subject,
        templateName: data.templateName,
      });
      setDesign(data.design);
      setEditButtonVisibility(data.userGuid === userGuid);

      /** Load if edit mode */
      if (emailEditorRef.current && action && templateId) {
        emailEditorRef.current?.loadDesign(JSON.parse(data.design));
      }
    };

    if (userGuid) {
      fetchTemplateInfo();
      setLoading(false);
    }
  }, [action, templateId, userGuid]);

  const saveTemplateHandler = async (data: EmailTemplateParameter) => {
    const unlayer = emailEditorRef.current?.editor;

    if (action === "edit") {
      setLoading(true);
      unlayer?.exportHtml(async (htmlData) => {
        const { design: updatedDesign, html } = htmlData;
        const body = {
          templateName: data.templateName,
          templateBody: html,
          templateStatus: data.templateStatus,
          isAddedByMarketing: data.isAddedByMarketing,
          subject: data.subject,
          design: JSON.stringify(updatedDesign),
        };

        const response = await agent.EmailMarketing.updateEmailTemplate(
          userGuid,
          templateId ?? "",
          body
        );

        if (response) {
          toast.info(`Email Template has been updated.`, {
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
      });
    } else {
      setLoading(true);
      unlayer?.exportHtml(async (htmlData) => {
        const { design, html } = htmlData;

        data.templateBody = html;
        data.design = JSON.stringify(design);

        const response = await agent.EmailMarketing.createEmailTemplate(
          userGuid,
          data
        );

        if (response) {
          toast.info(`Email Template has been added.`, {
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
      });
    }
  };

  const { profile, loading: profileLoading } = useFetchUserProfile(
    userCtx?.user?.userGuid ?? ""
  );
  const isAdmin = profile?.roles?.some((f) => {
    return f.value === PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value;
  });

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={profileLoading}
      className="email-template-container"
    >
      <div className="email-template-form-container">
        {loading ? <Spinner variant="fixed" /> : null}
        <h2>Email Template Form</h2>
        <div className="email-template-form">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (data, actions) => {
              const finalData = {
                templateName: data.templateName,
                templateBody: data.emailBody,
                templateStatus: "ACTIVATED",
                isAddedByMarketing: !!isAdmin,
                subject: data.subject,
                design: JSON.stringify(design),
              };
              saveTemplateHandler(finalData);
            }}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              handleSubmit,
              setFieldValue,
              touched,
              setTouched,
            }) => {
              return (
                <React.Fragment>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      sm={12}
                      md={12}
                      lg={12}
                      className="form-card-container"
                    >
                      <label>Template Name (Required)</label>
                      <FormikTextInput
                        placeholder="Enter your template name here"
                        variant="outlined"
                        name="templateName"
                        value={values.templateName}
                      />
                    </Grid>
                    <Grid
                      item
                      sm={12}
                      md={12}
                      lg={12}
                      className="form-card-container"
                    >
                      <label>Email Subject (Required)</label>
                      <FormikTextInput
                        placeholder="Enter your subject here"
                        variant="outlined"
                        name="subject"
                        value={values.subject}
                      />
                    </Grid>
                    <Grid
                      item
                      sm={12}
                      md={12}
                      lg={12}
                      className="form-card-container"
                    >
                      <label>Email Body (Required)</label>

                      <EmailEditor
                        ref={emailEditorRef}
                        style={{
                          height: "500px",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <div className="form-actions">
                    <div className="actions">
                      {action === "edit" ? (
                        editButtonVisibility ? (
                          <Button
                            variant="danger"
                            onClick={() => handleSubmit()}
                          >
                            Edit Template
                          </Button>
                        ) : null
                      ) : (
                        <React.Fragment>
                          <Button
                            variant="default"
                            onClick={async () =>
                              saveTemplateHandler({
                                templateName: values.templateName,
                                templateBody: values.emailBody,
                                templateStatus: "DRAFT",
                                isAddedByMarketing: !!isAdmin,
                                subject: values.subject,
                                design: JSON.stringify(design),
                              })
                            }
                          >
                            Save as draft
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleSubmit()}
                          >
                            Save Template
                          </Button>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                  <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                </React.Fragment>
              );
            }}
          </Formik>
        </div>
      </div>
      {loading ? <Spinner variant="fixed" /> : null}
    </Wrapper>
  );
};

export default MailLibraryForm;
