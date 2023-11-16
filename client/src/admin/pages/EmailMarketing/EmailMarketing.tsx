import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { Formik } from "formik";
import Spinner from "library/Spinner/Spinner";
import * as Yup from "yup";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./EmailMarketing.scss";
import FormikTextInput from "library/Formik/FormikInput";
import Button from "library/Button/Button";
import ErrorText from "pages/PortalRegistration/components/ErrorText";
import { ClearIndicatorStyles } from "library/MultiSelectInput/MultiSelectInputV2";
import agent from "admin/api/agent";
import { UserContext } from "admin/context/UserProvider";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import { toast } from "react-toastify";
import DrawerBase, { Anchor } from "library/Drawer/Drawer";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { BsFillTrashFill, BsPlusCircle } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { EmailTemplateParameter } from "admin/models/emailMarketing";
import nameFallback from "helpers/nameFallback";
import { formatISODateOnly } from "helpers/date";
import { AiFillCheckCircle } from "react-icons/ai";
import EmailEditor, { EditorRef } from "react-email-editor";
import ReactHtmlParser from "html-react-parser";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter";
import { Contacts } from "admin/models/contactsModel";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import { PROFILE_ROLES } from "pages/PortalRegistration/constants";

const ContractForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const emailEditorRef = useRef<EditorRef>(null);
  const [design, setDesign] = useState<any>();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [saveTemplateError, setSaveTemplateError] = useState<string>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "EmailPro",
      url: paths.emailMarketing,
      isActive: true,
    },
  ];

  const [initialValues, setInitialValues] = useState({
    recipients: [],
    emailBody: "",
    subject: "",
    settings: [""],
    templateName: "",
    status: "",
    createdById: "",
  });

  const [templates, setTemplates] = useState<any>([]);
  const userCtx = useContext(UserContext) as any;
  const search = useLocation().search;
  const action = new URLSearchParams(search).get("action");
  const userGuid = userCtx?.user?.userGuid;
  const [contacts, setContacts] = useState<any>([]);
  const [contactsValue, setContactsValue] = useState<any>([]);
  const [recipientLoading, setRecipientLoading] = useState(false);
  const [templateId, setTemplateId] = useState(new URLSearchParams(search).get("templateId"));

  const populateForm = (
    emailBody: string,
    subject: string,
    design: string,
    settings: string[],
    templateName: string,
    status: string,
    createdById: string
  ) => {
    setInitialValues((prevState) => ({
      recipients: prevState.recipients,
      emailBody: emailBody,
      subject: subject,
      settings: settings,
      templateName: templateName,
      status: status,
      createdById: userGuid,
    }));

    emailEditorRef.current?.editor?.loadDesign(JSON.parse(design || ""));

    setOpenDrawer(false);
  };

  useEffect(() => {
    const fetchEmailTemplates = async () => {
      setLoading(true);
      const data = await agent.EmailMarketing.getEmailTemplates(userGuid);

      setTemplates(data);
    };

    const fetchMailingList = async () => {
      setLoading(true);
      const data = await agent.Contacts.getMailingList(userGuid);

      const emailArray = data.map((e) => {
        return {
          value: e._id,
          label: e.emailAddress,
          keyword: "",
        };
      });

      setContacts(emailArray);
    };

    if (userGuid) {
      fetchEmailTemplates();
      fetchMailingList();
      setLoading(false);
    }
  }, [userGuid]);

  const handleCreateContact = async (data: Contacts) => {
    setRecipientLoading(true);
    if (data.emailAddress && data.userGuid)
      await agent.Contacts.create(data)
        .then((c) => {
          setTimeout(() => {
            const newContact = createOption(c.data.emailAddress, c.data._id);

            setContacts((prev) => [...prev, newContact]);
            setContactsValue((prev) => [...prev, newContact]);
          }, 1000);

          setRecipientLoading(false);
          toast.info(`New Contact added. ${c.data.emailAddress}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((err) => {
          let errMsg = "";
          if (
            err.response?.data?.description.match(
              /(ValidationError).*(emailAddress)/
            )
          ) {
            errMsg = "Invalid Email Address format";
          } else {
            errMsg = err.response?.data?.description;
          }

          setRecipientLoading(false);
          toast.error(errMsg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
  };

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
              populateForm(
                template.templateBody,
                template.subject,
                template.design,
                template.settings,
                template.templateName,
                template.status,
                template.createdById
              );
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
        settings: data.settings,
        templateName: data.templateName,
        status: data.status,
        createdById: data.userGuid,
      });
      setDesign(data.design);

      /** Load if edit mode */
      if (Object.keys(data.design)?.length) {
        emailEditorRef.current?.editor?.loadDesign(
          JSON.parse(data.design || "{}")
        );
      }
    };
    if (userGuid && templateId) {
      fetchTemplateInfo();
      setLoading(false);
    }
  }, [templateId, userGuid]);

  const saveTemplateHandler = async (data: EmailTemplateParameter) => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (htmlData) => {
      const { design: updatedDesign, html } = htmlData;
      let action = new URLSearchParams(window.location.search).get("action");

      data.design = JSON.stringify(updatedDesign);
      data.templateBody = html;
      data.templateStatus = "ACTIVATED";

      // check if fields not empty (only templateBody and templateName is needed to validate for this)
      const isNoEmptyFields = data.templateBody && data.templateName;

      if (isNoEmptyFields) {
        setSaveTemplateError("");
        setLoading(true);
        let response;
        if (action !== "edit") {
          response = await agent.EmailMarketing.createEmailTemplate(
            userGuid,
            data
          );
          let params = new URLSearchParams(search);
          params.set("templateId", templateId!);
          window.history.replaceState(null, "", `${search}?templateId=${response.data._id}`);
          setTemplateId(response.data._id);
        } else {
          response = await agent.EmailMarketing.updateEmailTemplate(
            userGuid,
            templateId,
            data
          );
        }

        if (response) {
          toast.info(`Email Template has been saved.`, {
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
      } else {
        setSaveTemplateError("Please complete all fields.");
        setLoading(false);
      }
    });
  };

  let validationSchema;

  if (action === "edit") {
    validationSchema = Yup.object({
      subject: Yup.string().required("Subject is required."),
      templateName: Yup.string().required("Template name is required."),
    });
  } else {
    validationSchema = Yup.object({
      subject: Yup.string().required("Subject is required."),
      recipients: Yup.array()
        .min(1, "Pick at least 1 recipients")
        .required("Recipients is required."),
    });
  }

  const loadDesign = useCallback(() => {}, [emailEditorRef, design]);

  useEffect(() => {}, [design]);

  const handleDeleteContact = async (contactId: string) => {
    if (contactId) {
      setRecipientLoading(true);
      setContacts(contacts.filter((data) => data.value !== contactId));
      await agent.Contacts.delete(contactId)
        .then((c) => {
          setRecipientLoading(false);
          toast.info(`Contact removed: ${c.data.emailAddress}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((err) => {
          let errMsg =
            err.response?.data?.description ?? "Something went wrong";

          toast.error(errMsg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setRecipientLoading(false);
        });
    }
  };

  const RemoveContactButton = (props) => {
    return (
      <components.Option {...props}>
        {props.children}
        {!props.children.match(/^Create/) && ( //disable button on Create option
          <button
            className="close"
            style={{ marginLeft: "2px" }}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteContact(props.data.value);
            }}
          >
            <BsFillTrashFill style={{ color: "red" }} />
          </button>
        )}
      </components.Option>
    );
  };

  const createOption = (label: string, value: string) => ({
    label: label,
    value: value,
    keyword: "",
  });

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
      loading={false}
      className="email-marketing-container"
    >
      <DocumentTitleSetter title="EmailPro | CFS Portal" />
      <div className="email-marketing-form-container">
        {loading ? <Spinner variant="fixed" /> : null}
        <h2>EmailPro</h2>
        <div className="email-marketing-form">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (data, actions) => {
              const finalData: any = {
                ...data,
                userGuid: userCtx?.user?.userGuid,
              };
              let action = new URLSearchParams(window.location.search).get("action");
              setLoading(true);
              if (action === "edit") {
                const finalPayloadData = {
                  templateName: data.templateName,
                  templateBody: data.emailBody,
                  templateStatus: data.status,
                  isAddedByMarketing: !!isAdmin,
                  subject: data.subject,
                  design: JSON.stringify(design),
                  settings: data.settings,
                };
                saveTemplateHandler(finalPayloadData);
                return;
              }

              if (action !== "view") {
                const unlayer = emailEditorRef.current?.editor;
                unlayer?.exportHtml(async (htmlData) => {
                  const { design: updatedDesign, html } = htmlData;

                  finalData.design = updatedDesign;
                  finalData.emailBody = html;

                  finalData.recipients =
                    finalData.recipients?.map((email) => email.label) || [];

                  const response = await agent.EmailMarketing.sendEmail(
                    finalData
                  );

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
                  } else {
                    setLoading(false);
                  }
                });
              } else {
                finalData.design = design;
                finalData.emailBody = initialValues.emailBody;

                const response = await agent.EmailMarketing.sendEmail(
                  finalData
                );

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
                } else {
                  setLoading(false);
                }
              }
            }}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleSubmit,
              setFieldValue,
              touched,
              setFieldTouched,
              errors,
            }) => {
              return (
                <React.Fragment>
                  <Grid container spacing={2}>
                    {action !== "edit" ? (
                      <Grid item xs={12} md={12} lg={12}>
                        <label htmlFor="">Recipients (Required)</label>

                        <CreatableSelect
                          isMulti
                          options={contacts}
                          isLoading={recipientLoading}
                          isDisabled={recipientLoading}
                          value={contactsValue}
                          components={{ Option: RemoveContactButton }}
                          placeholder="Select a recipient item to add"
                          onCreateOption={(input) => {
                            let data = {
                              _id: "",
                              userGuid: userGuid,
                              emailAddress: input,
                            };
                            handleCreateContact(data);
                            setFieldTouched("recipients", false);
                            setFieldValue("recipients", data);
                          }}
                          onChange={(e) => {
                            const modifiedValue = e?.map((contact) => {
                              return {
                                label: contact.label,
                                value: contact.value,
                              };
                            });
                            setFieldValue("recipients", modifiedValue);
                            setContactsValue(modifiedValue);
                          }}
                          onBlur={(e) => {
                            if (values.recipients.length <= 0)
                              setFieldTouched("recipients", true);
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
                            values.recipients.length === 0 &&
                            !!touched.recipients
                          }
                          text="Recipients field is required."
                        />
                      </Grid>
                    ) : null}
                    {action === "edit" ? (
                      <Grid
                        item
                        sm={12}
                        md={12}
                        lg={12}
                        className="form-card-container"
                      >
                        <label>Template Name(Required)</label>
                        <FormikTextInput
                          placeholder="Enter your template name here"
                          variant="outlined"
                          name="templateName"
                          value={values.templateName}
                        />
                      </Grid>
                    ) : null}
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
                      {action !== "view" ? (
                        <React.Fragment>
                          <label>Email Body (Required)</label>

                          <EmailEditor
                            ref={emailEditorRef}
                            onReady={loadDesign}
                            style={{
                              height: "500px",
                            }}
                          />
                        </React.Fragment>
                      ) : (
                        ReactHtmlParser(initialValues.emailBody)
                      )}
                    </Grid>
                    <Grid
                      item
                      sm={12}
                      md={12}
                      lg={12}
                      className="form-card-container"
                    >
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography
                            sx={{ fontSize: 15, width: "33%", flexShrink: 0 }}
                          >
                            Advanced Settings
                          </Typography>
                          <Typography
                            sx={{ fontSize: 13, color: "text.secondary" }}
                          >
                            Configure your email settings
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="BLOGS"
                                  checked={values.settings.includes("BLOGS")}
                                />
                              }
                              label="Show Blogs"
                              onChange={(e) => {
                                if (values.settings.includes("BLOGS")) {
                                  const filteredValues = values.settings.filter(
                                    function (item: string) {
                                      return item !== "BLOGS";
                                    }
                                  );

                                  setFieldValue("settings", filteredValues);
                                } else {
                                  const filteredValues = [
                                    ...values.settings,
                                    "BLOGS",
                                  ];
                                  setFieldValue("settings", filteredValues);
                                }
                              }}
                            />
                            <FormControlLabel
                              required
                              control={
                                <Checkbox
                                  name="REGISTER"
                                  checked={values.settings.includes(
                                    "REGISTER_BUTTONS"
                                  )}
                                />
                              }
                              label="Show Register Buttons"
                              onChange={(e) => {
                                if (
                                  values.settings.includes("REGISTER_BUTTONS")
                                ) {
                                  const filteredValues = values.settings.filter(
                                    function (item: string) {
                                      return item !== "REGISTER_BUTTONS";
                                    }
                                  );

                                  setFieldValue("settings", filteredValues);
                                } else {
                                  const filteredValues = [
                                    ...values.settings,
                                    "REGISTER_BUTTONS",
                                  ];
                                  setFieldValue("settings", filteredValues);
                                }
                              }}
                            />
                          </FormGroup>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </Grid>
                  {saveTemplateError && (
                    <div className="save-template-error-text">
                      <span>{saveTemplateError}</span>
                    </div>
                  )}

                  <div className="form-actions">
                    {action !== "view" ? (
                      action !== "edit" ? (
                        <div className="template-library-btn">
                          <button onClick={() => setOpenDrawer(true)}>
                            Template Library
                          </button>
                        </div>
                      ) : null
                    ) : null}
                    <div className="actions">
                      {action === "edit" ? (
                        values.createdById === userGuid && (
                          <Button
                            variant="danger"
                            onClick={() => handleSubmit()}
                          >
                            Save Template
                          </Button>
                        )
                      ) : (
                        <React.Fragment>
                          {!templateId ? (
                            <React.Fragment>
                              <Button
                                variant="default"
                                onClick={async () =>
                                  saveTemplateHandler({
                                    templateName: values.subject,
                                    templateBody: values.emailBody,
                                    templateStatus: "DRAFT",
                                    isAddedByMarketing: true,
                                    subject: values.subject,
                                    design: JSON.stringify(design),
                                    settings: values.settings,
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
                                    design: JSON.stringify(design),
                                    settings: values.settings,
                                  })
                                }
                              >
                                Save as template 
                              </Button>
                            </React.Fragment>
                          ) : (
                            <Button
                                variant="danger"
                                onClick={() => {
                                  let params = new URLSearchParams(window.location.search);
                                  params.set("action", "edit");
                                  if (!window.location.search.includes("&action=edit")) {
                                    window.history.replaceState(null, "", `${window.location.search}&action=edit`);
                                  }
                                  handleSubmit()
                                }}
                              >
                              Update Template
                            </Button>
                          )}
                          <Button
                            variant="danger"
                            onClick={() => handleSubmit()}
                          >
                            Send
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

      <DrawerBase
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor={Anchor.Right}
        title="EmailPro Templates"
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
