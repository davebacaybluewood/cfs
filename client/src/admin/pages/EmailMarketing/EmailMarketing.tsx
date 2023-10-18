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
import { toast } from "react-toastify";
import DrawerBase, { Anchor } from "library/Drawer/Drawer";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { BsPlusCircle } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { EmailTemplateParameter } from "admin/models/emailMarketing";
import nameFallback from "helpers/nameFallback";
import { formatISODateOnly } from "helpers/date";
import { AiFillCheckCircle } from "react-icons/ai";
import EmailEditor from "react-email-editor";
import ReactHtmlParser from "html-react-parser";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const emailOptions = [
  { value: "dave.bacay.vc@gmail.com", label: "dave.bacay.vc@gmail.com" },
  { value: "dave.bacay@gocfs.pro", label: "dave.bacay@gocfs.pro" },
];

const testData =
  '{"counters":{"u_column":6,"u_row":6,"u_content_image":6,"u_content_text":4},"body":{"id":"3ikzk4sDP_","rows":[{"id":"csHFJF237C","cells":[1],"columns":[{"id":"X1zWdJ57IZ","contents":[{"id":"wS2YtbKZ7V","type":"image","values":{"containerPadding":"0px","anchor":"","src":{"url":"https://assets.unlayer.com/stock-templates/1697639044538-header.png","width":600,"height":94},"textAlign":"center","altText":"","action":{"name":"web","values":{"href":"","target":"_blank"}},"displayCondition":null,"_meta":{"htmlID":"u_content_image_1","htmlClassNames":"u_content_image"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}},{"id":"0e7iddrikW","type":"text","values":{"containerPadding":"10px","anchor":"","fontFamily":{"label":"Cabin","value":"\'Cabin\',sans-serif","url":"https://fonts.googleapis.com/css?family=Cabin:400,700","defaultFont":true,"weights":[400,700]},"fontSize":"14px","textAlign":"left","lineHeight":"140%","linkStyle":{"inherit":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"displayCondition":null,"_meta":{"htmlID":"u_content_text_2","htmlClassNames":"u_content_text"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true,"text":"<p style=\\"line-height: 140%; margin-bottom: 8pt;\\"><span style=\\"color: #000000; white-space-collapse: preserve; line-height: 19.6px;\\">Good day Agent!</span></p>\\n<p style=\\"line-height: 140%; margin-bottom: 8pt;\\"><span style=\\"color: #000000; white-space-collapse: preserve; line-height: 19.6px;\\">You are chosen among an extensive list of aspiring experts in the financial world.</span></p>\\n<p style=\\"line-height: 140%; margin-bottom: 8pt;\\"><span style=\\"color: #000000; white-space-collapse: preserve; line-height: 19.6px;\\">Your mission: to gather the best agents and form the best performing CFS team.</span></p>\\n<p style=\\"line-height: 140%; margin-bottom: 8pt;\\"><span style=\\"color: #000000; white-space-collapse: preserve; line-height: 19.6px;\\">Should you choose to accept this mission, CFS will grant you the top-of-the-line tools an agent will find most useful in this mission.</span></p>\\n<p style=\\"line-height: 140%; margin-bottom: 8pt;\\"><span style=\\"color: #000000; white-space-collapse: preserve; line-height: 19.6px;\\">Click on the link below to register and see you in the Business Opportunity Presentation along with the other agents of your caliber.</span></p>"}},{"id":"atJeljrxQ9","type":"image","values":{"containerPadding":"0px","anchor":"","src":{"url":"https://assets.unlayer.com/stock-templates/1697639159379-Speaker-Spotlight.png","width":600,"height":148},"textAlign":"center","altText":"","action":{"name":"web","values":{"href":"","target":"_blank"}},"displayCondition":null,"_meta":{"htmlID":"u_content_image_3","htmlClassNames":"u_content_image"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}},{"id":"kfSH3nfM74","type":"image","values":{"containerPadding":"0px","anchor":"","src":{"url":"https://assets.unlayer.com/stock-templates/1697639253304-Sponsors.png","width":600,"height":120},"textAlign":"center","altText":"","action":{"name":"web","values":{"href":"","target":"_blank"}},"displayCondition":null,"_meta":{"htmlID":"u_content_image_2","htmlClassNames":"u_content_image"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}},{"id":"rgZ1iuhw45","type":"image","values":{"containerPadding":"0px","anchor":"","src":{"url":"https://assets.unlayer.com/stock-templates/1697639560645-Featured-Products.png","width":600,"height":140},"textAlign":"center","altText":"","action":{"name":"web","values":{"href":"","target":"_blank"}},"displayCondition":null,"_meta":{"htmlID":"u_content_image_4","htmlClassNames":"u_content_image"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}},{"id":"LP2pXqWaIX","type":"image","values":{"containerPadding":"0px","anchor":"","src":{"url":"https://assets.unlayer.com/stock-templates/1697639617246-footer.png","width":600,"height":92},"textAlign":"center","altText":"","action":{"name":"web","values":{"href":"","target":"_blank"}},"displayCondition":null,"_meta":{"htmlID":"u_content_image_5","htmlClassNames":"u_content_image"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}}],"values":{"backgroundColor":"#ffffff","padding":"0px","border":{},"_meta":{"htmlID":"u_column_1","htmlClassNames":"u_column"}}}],"values":{"displayCondition":null,"columns":false,"backgroundColor":"","columnsBackgroundColor":"","backgroundImage":{"url":"","fullWidth":true,"repeat":"no-repeat","size":"custom","position":"center"},"padding":"0px","anchor":"","hideDesktop":false,"_meta":{"htmlID":"u_row_1","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}}],"headers":[],"footers":[],"values":{"popupPosition":"center","popupWidth":"600px","popupHeight":"auto","borderRadius":"10px","contentAlign":"center","contentVerticalAlign":"center","contentWidth":"500px","fontFamily":{"label":"Arial","value":"arial,helvetica,sans-serif"},"textColor":"#000000","popupBackgroundColor":"#FFFFFF","popupBackgroundImage":{"url":"","fullWidth":true,"repeat":"no-repeat","size":"cover","position":"center"},"popupOverlay_backgroundColor":"rgba(0, 0, 0, 0.1)","popupCloseButton_position":"top-right","popupCloseButton_backgroundColor":"#DDDDDD","popupCloseButton_iconColor":"#000000","popupCloseButton_borderRadius":"0px","popupCloseButton_margin":"0px","popupCloseButton_action":{"name":"close_popup","attrs":{"onClick":"document.querySelector(\'.u-popup-container\').style.display = \'none\';"}},"backgroundColor":"#e7e7e7","backgroundImage":{"url":"","fullWidth":true,"repeat":"no-repeat","size":"custom","position":"center"},"preheaderText":"","linkStyle":{"body":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"_meta":{"htmlID":"u_body","htmlClassNames":"u_body"}}},"schemaVersion":16}';

const ContractForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const emailEditorRef = useRef<any>(null);
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
      title: "Email Marketing",
      url: paths.emailMarketing,
      isActive: true,
    },
  ];

  const [initialValues, setInitialValues] = useState({
    recipients: [],
    emailBody: "",
    subject: "",
    settings: [""],
  });
  const [templates, setTemplates] = useState<any>([]);
  const userCtx = useContext(UserContext) as any;
  const search = useLocation().search;
  const templateId = new URLSearchParams(search).get("templateId");
  const action = new URLSearchParams(search).get("action");
  const userGuid = userCtx?.user?.userGuid;

  const populateForm = (
    emailBody: string,
    subject: string,
    design: string,
    settings: string[]
  ) => {
    setInitialValues((prevState) => ({
      recipients: prevState.recipients,
      emailBody: emailBody,
      subject: subject,
      settings: settings,
    }));

    emailEditorRef.current?.loadDesign(JSON.parse(design));

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
              populateForm(
                template.templateBody,
                template.subject,
                template.design,
                template.settings
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
      });
      setDesign(data.design);

      /** Load if edit mode */
      // if (Object.keys(data.design)?.length) {
      //   console.log(emailEditorRef.current);
      //   emailEditorRef.current?.loadDesign(JSON.parse(data.design || testData));
      // }
    };
    if (userGuid && templateId) {
      fetchTemplateInfo();
      setLoading(false);
    }
  }, [templateId, userGuid, emailEditorRef]);

  const saveTemplateHandler = async (data: EmailTemplateParameter) => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (htmlData) => {
      const { design: updatedDesign, html } = htmlData;

      data.design = JSON.stringify(updatedDesign);
      data.templateBody = html;

      // check if fields not empty (only templateBody and templateName is needed to validate for this)
      const isNoEmptyFields = data.templateBody && data.templateName;

      if (isNoEmptyFields) {
        setSaveTemplateError("");
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
      } else {
        setSaveTemplateError("Please complete all fields.");
        setLoading(false);
      }
    });
  };

  const validationSchema = Yup.object({
    emailBody: Yup.string().required("Email body is required."),
    subject: Yup.string().required("Subject is required."),
    recipients: Yup.array()
      .min(1, "Pick at least 1 recipients")
      .required("Recipients is required."),
  });

  const loadDesign = useCallback(() => {
    if (emailEditorRef.current) {
      emailEditorRef.current.loadDesign(JSON.parse(design || "{}"));
    }
  }, [emailEditorRef, design]);
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
              const finalData: any = {
                ...data,
                userGuid: userCtx?.user?.userGuid,
              };
              setLoading(true);

              if (action !== "view") {
                const unlayer = emailEditorRef.current?.editor;
                unlayer?.exportHtml(async (htmlData) => {
                  const { design: updatedDesign, html } = htmlData;

                  finalData.design = updatedDesign;
                  finalData.emailBody = html;

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
            {({ values, handleSubmit, setFieldValue, touched, setTouched }) => {
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
                      <div className="template-library-btn">
                        <button onClick={() => setOpenDrawer(true)}>
                          Template Library
                        </button>
                      </div>
                    ) : null}
                    <div className="actions">
                      {action !== "view" ? (
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
                      ) : null}
                      <Button variant="danger" onClick={() => handleSubmit()}>
                        Send
                      </Button>
                    </div>
                  </div>
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                  {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
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
