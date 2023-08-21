import { Grid, Tooltip } from "@mui/material";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { Formik } from "formik";
import Spinner from "library/Spinner/Spinner";
import * as Yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import "./EmailMarketing.scss";
import FormikTextInput from "library/Formik/FormikInput";
import Button from "library/Button/Button";
import ErrorText from "pages/PortalRegistration/components/ErrorText";
import { ClearIndicatorStyles } from "library/MultiSelectInput/MultiSelectInputV2";
import agent from "admin/api/agent";
import { UserContext } from "admin/context/UserProvider";
import ReactQuill from "react-quill";
import useQuillModules from "../Blogs/useQuillModules";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import DrawerBase, { Anchor } from "library/Drawer/Drawer";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { BsPlusCircle } from "react-icons/bs";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { EmailTemplateParameter } from "admin/models/emailMarketing";
import nameFallback from "helpers/nameFallback";
import { formatISODateOnly } from "helpers/date";
import { AiFillCheckCircle } from "react-icons/ai";

export const emailOptions = [
  { value: "dave.bacay.vc@gmail.com", label: "dave.bacay.vc@gmail.com" },
  { value: "dave.bacay@gocfs.pro", label: "dave.bacay@gocfs.pro" },
];

const ContractForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const validationSchema = Yup.object({
    emailBody: Yup.string().required("Email body is required."),
    subject: Yup.string().required("Subject is required."),
    recipients: Yup.array()
      .min(1, "Pick at least 1 recipients")
      .required("Recipients is required."),
  });

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Email Marketing",
      url: paths.emailMarketing,
      isActive: true,
    },
  ];

  const [initialValues, setInitialValues] = useState({
    recipients: [],
    emailBody: "",
    subject: "",
  });
  const [templates, setTemplates] = useState<any>([]);
  const userCtx = useContext(UserContext) as any;
  const realQuillModules = useQuillModules();
  const search = useLocation().search;
  const action = new URLSearchParams(search).get("action");
  const templateId = new URLSearchParams(search).get("templateId");
  const userGuid = userCtx?.user?.userGuid;

  const populateForm = (emailBody: string, subject: string) => {
    setInitialValues((prevState) => ({
      recipients: prevState.recipients,
      emailBody: emailBody,
      subject: subject,
    }));

    setOpenDrawer(false);
  };

  useEffect(() => {
    const fetchEmailTemplates = async () => {
      setLoading(true);
      const data = await agent.EmailMarketing.getEmailTemplates(userGuid);

      setTemplates(data);
    };

    if (userGuid) {
      fetchEmailTemplates();
      setLoading(false);
    }
  }, [userGuid]);

  const rows: GridRowsProp = templates?.map((template) => {
    return {
      id: template._id,
      createdBy: nameFallback(
        template.authorName,
        template.authorFirstname,
        template.authorLastname
      ),
      createdAt: formatISODateOnly(template.createdAt ?? ""),
      templateName: (
        <Tooltip
          title={<h1 style={{ color: "#fff" }}>Created by Marketing Team</h1>}
        >
          <div className="template-name-header">
            <span>{template.templateName}</span>
            {template.isAddedByMarketing ? <AiFillCheckCircle /> : null}
          </div>
        </Tooltip>
      ),
      actions: (
        <React.Fragment>
          <button
            className="select-btn"
            disabled={
              template.status === "DEACTIVATED" || template.status === "DRAFT"
            }
            onClick={() => {
              populateForm(template.templateBody, template.subject);
            }}
          >
            <span>Import</span> <BsPlusCircle />
          </button>
        </React.Fragment>
      ),
    };
  });

  const columns: GridColDef[] = [
    {
      field: "templateName",
      headerName: "Template Name",
      width: 300,
      renderCell: (params) => params.value,
    },
    { field: "createdBy", headerName: "Created By", width: 100 },
    { field: "createdAt", headerName: "Date Created", width: 120 },
    {
      field: "actions",
      headerName: "",
      width: 300,
      align: "right",
      renderCell: (params) => params.value,
    },
  ];

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
        recipients: [],
      });
    };

    if (userGuid) {
      fetchTemplateInfo();
      setLoading(false);
    }
  }, [action, templateId, userGuid]);

  const saveTemplateHandler = async (data: EmailTemplateParameter) => {
    setLoading(true);
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
  };

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="email-marketing-container"
    >
      <div className="email-marketing-form-container">
        {loading ? <Spinner variant="fixed" /> : null}
        <h2>Email Marketing</h2>
        <div className="email-marketing-form">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (data, actions) => {
              const finalData = {
                ...data,
                userGuid: userCtx?.user?.userGuid,
              };
              setLoading(true);
              const response = await agent.EmailMarketing.sendEmail(finalData);

              if (response) {
                setLoading(false);
                toast.info(`Email has been submitted.`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });

                console.log(response);
              } else {
                setLoading(false);
              }
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
                    <Grid item xs={12} md={12} lg={12}>
                      <label htmlFor="">Recipients (Required)</label>

                      <CreatableSelect
                        isMulti
                        options={emailOptions as any}
                        placeholder="Select a recipient item to add"
                        onChange={(e) => {
                          const modifiedValue = e?.map((val) => val.label);
                          setFieldValue("recipients", modifiedValue);
                        }}
                        onBlur={(e) => {
                          if (values.recipients.length === 0) {
                            setTouched({
                              ...touched,
                              recipients: [],
                            });
                          }
                        }}
                        styles={{
                          clearIndicator: ClearIndicatorStyles,
                          placeholder: (defaultStyles) => {
                            return {
                              ...defaultStyles,
                              color: "rgba(0, 0, 0, 0.3)",
                              zIndex: 9,
                            };
                          },

                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          control: (baseStyles, state) => {
                            return {
                              ...baseStyles,
                              fontSize: "13px",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              borderColor: "hsl(0, 0%, 80%)",
                            };
                          },
                        }}
                      />

                      <ErrorText
                        isError={
                          values.recipients.length === 0 && !!touched.recipients
                        }
                        text="Recipients field is required."
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
                      <ReactQuill
                        value={values.emailBody}
                        modules={realQuillModules}
                        onChange={(value) => setFieldValue("emailBody", value)}
                        theme="snow"
                        placeholder="Enter the email body here"
                      />
                    </Grid>
                  </Grid>
                  <div className="form-actions">
                    <div className="template-library-btn">
                      <button onClick={() => setOpenDrawer(true)}>
                        Template Library
                      </button>
                    </div>
                    <div className="actions">
                      <Button
                        variant="default"
                        onClick={async () =>
                          saveTemplateHandler({
                            templateName: values.subject,
                            templateBody: values.emailBody,
                            templateStatus: "DRAFT",
                            isAddedByMarketing: true,
                            subject: values.subject,
                          })
                        }
                      >
                        Save as draft
                      </Button>
                      <Button
                        variant="default"
                        onClick={async () =>
                          saveTemplateHandler({
                            templateName: values.subject,
                            templateBody: values.emailBody,
                            templateStatus: "ACTIVATED",
                            isAddedByMarketing: true,
                            subject: values.subject,
                          })
                        }
                      >
                        Save as template
                      </Button>
                      <Button variant="danger" onClick={() => handleSubmit()}>
                        Send
                      </Button>
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

      <DrawerBase
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor={Anchor.Right}
        title="Email Library"
        className="drawer-email-library"
        footer={
          <React.Fragment>
            <Button variant="default" onClick={() => setOpenDrawer(false)}>
              Close
            </Button>
          </React.Fragment>
        }
      >
        <div className="datagrid-content">
          <DataGrid rows={rows} columns={columns} />
        </div>
      </DrawerBase>
    </Wrapper>
  );
};

export default ContractForm;
