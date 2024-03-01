import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
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
import EmailEditor, { EditorRef } from "react-email-editor";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CreatableSelect from "react-select/creatable";
import { ClearIndicatorStyles } from "library/MultiSelectInput/MultiSelectInputV2";
import { EMAIL_TEMPLATES_CATEGORIES } from "admin/constants/constants";
import {
  CategoryData,
  CategoryPayload,
} from "admin/api/categoryServices/categoryModels";
import { components } from "react-select";
import { BsFillTrashFill } from "react-icons/bs";

type CategoryValue = {
  label: string;
  value: string;
  keyword: string;
};
const MailLibraryForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const emailEditorRef = useRef<EditorRef>(null);
  const [design, setDesign] = useState<any>();
  const [categories, setCategories] = useState<any>();
  const [categoryValue, setCategoryValue] = useState<
    CategoryValue[] | undefined
  >();
  const [initialValues, setInitialValues] = useState<any>({
    emailBody: "",
    subject: "",
    templateName: "",
    settings: [""],
    categories: [],
  });
  const [categoryLoading, setCategoryLoading] = useState(false);

  const validationSchema = Yup.object({
    subject: Yup.string().trim().required("Subject is required."),
    templateName: Yup.string().trim().required("Template name is required."),
    categories: Yup.array()
      .min(1, "Pick at least 1 categories")
      .required("Categories is required."),
  });

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "EmailPro Templates",
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
        emailBody: data.templateBody ?? "",
        subject: data.subject ?? "",
        templateName: data.templateName ?? "",
        settings: data.settings ?? [],
        status: data.status,
      });
      setDesign(data.design);
      setEditButtonVisibility(data.userGuid === userGuid);

      /** Load if edit mode */
      if (Object.keys(data.design)?.length) {
        emailEditorRef.current?.editor?.loadDesign(
          JSON.parse(data.design || "{}")
        );
      }
    };

    if (userGuid && action === "edit") {
      fetchTemplateInfo();
      setLoading(false);
    }
  }, [action, templateId, userGuid]);
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
        settings: data.settings,
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
          settings: data.settings,
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
        try {
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
          }
        } catch (ex) {
          toast.error(`Error saving template`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } finally {
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

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const loadDesign = useCallback(() => {}, [emailEditorRef, design]);

  useEffect(() => {}, [design]);

  useEffect(() => {
    const getData = async () => {
      const data = await agent.Categories.getAllCategoriesByUserGuid(userGuid);

      setCategories(data);
    };

    if (userGuid) {
      getData();
    }
  }, [userGuid]);

  const handleDeleteContact = async (categoryId: string) => {
    setCategoryLoading(true);
    try {
      await agent.Categories.deleteCategory(categoryId);
      setCategories(categories.filter((data) => data._id !== categoryId));
      toast.info(`Category Removed`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setCategoryLoading(false);
    } catch (error) {
      toast.error("Invalid Request", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setCategoryLoading(false);
    }
  };

  const RemoveCategoryButton = (props) => {
    return (
      <components.Option {...props}>
        {props.children}
        {!props.children?.match(/^Create/) && ( //disable button on Create option
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
  const handleCreateCategory = async (data: CategoryPayload) => {
    setCategoryLoading(true);
    try {
      const req = await agent.Categories.createCategory(
        data.name,
        userGuid,
        data.isPublic
      );
      const newContact = createOption(req?.name ?? "", req?._id ?? "");
      setCategories([
        ...(categories ?? []),
        {
          userGuid: userGuid,
          name: req?.name,
          isPublic: req?.isPublic,
          _id: req?._id,
          createdAt: req?.createdAt,
          updatedAt: req?.updatedAt,
        },
      ]);
      setCategoryValue([...(categoryValue ?? []), newContact]);

      setCategoryLoading(false);
      toast.info(`New Category Added`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      setCategoryLoading(false);
      toast.error("Category name is already exist", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

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
                settings: data.settings,
                categories: data.categories,
              };
              saveTemplateHandler(finalData);
            }}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleSubmit,
              errors,
              setFieldValue,
              setFieldTouched,
            }) => {
              const filteredCategory = categories?.map((e) => {
                return {
                  value: e._id,
                  label: e.name,
                  keyword: e.name,
                };
              });
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
                      <label>Categories (Required)</label>
                      <CreatableSelect
                        isMulti
                        options={filteredCategory}
                        isLoading={categoryLoading}
                        isDisabled={categoryLoading}
                        value={categoryValue}
                        name="categories"
                        components={{ Option: RemoveCategoryButton }}
                        placeholder="Select category item to add"
                        onCreateOption={(input) => {
                          let data = {
                            _id: "",
                            userGuid: userGuid,
                            emailAddress: input.trim(),
                          };
                          handleCreateCategory({
                            name: input.trim(),
                            _id: "",
                            isPublic: true,
                          });
                          setFieldValue("categories", [
                            ...values.categories,
                            data,
                          ]);
                        }}
                        onChange={(e) => {
                          const modifiedValue = e?.map((contact) => {
                            return {
                              label: contact.label,
                              value: contact.value,
                              keyword: contact.label,
                            };
                          });
                          setFieldValue("categories", modifiedValue);
                          setCategoryValue(modifiedValue);
                        }}
                        onBlur={(e) => {
                          if (values.categories.length <= 0)
                            setFieldTouched("categories", true);
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
                              marginBottom: 5,
                            };
                          },
                        }}
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
                      style={{ overflow: "auto" }}
                    >
                      <label>Email Body (Required)</label>

                      <React.Fragment>
                        <EmailEditor
                          ref={emailEditorRef}
                          onReady={loadDesign}
                          style={{
                            height: "500px",
                          }}
                        />
                      </React.Fragment>
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
                                  checked={
                                    values.settings &&
                                    values.settings.includes("BLOGS")
                                  }
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
                                  checked={
                                    values.settings &&
                                    values.settings.includes("REGISTER_BUTTONS")
                                  }
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
                            disabled={
                              Object.values(errors).length !== 0 ||
                              categoryValue?.length === 0
                            }
                            onClick={async () =>
                              saveTemplateHandler({
                                templateName: values.templateName,
                                templateBody: values.emailBody,
                                templateStatus: "DRAFT",
                                isAddedByMarketing: !!isAdmin,
                                subject: values.subject,
                                design: JSON.stringify(design),
                                settings: values.settings,
                                categories: values.categories,
                              })
                            }
                          >
                            Save as draft
                          </Button>
                          <Button
                            variant="danger"
                            disabled={
                              Object.values(errors).length !== 0 ||
                              categoryValue?.length === 0
                            }
                            onClick={() => handleSubmit()}
                          >
                            Save Template
                          </Button>
                        </React.Fragment>
                      )}
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
    </Wrapper>
  );
};

export default MailLibraryForm;
