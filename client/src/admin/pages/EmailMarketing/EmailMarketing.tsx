import { Grid } from "@mui/material";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { Formik } from "formik";
import Spinner from "library/Spinner/Spinner";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import "./EmailMarketing.scss";
import FormikTextInput from "library/Formik/FormikInput";
import { GroupBase, StylesConfig } from "react-select";
import Button from "library/Button/Button";
import ErrorText from "pages/PortalRegistration/components/ErrorText";
import MultiSelectInputV2, {
  ClearIndicatorStyles,
} from "library/MultiSelectInput/MultiSelectInputV2";
import agent from "admin/api/agent";
import { UserContext } from "admin/context/UserProvider";
import ReactQuill from "react-quill";
import useQuillModules from "../Blogs/useQuillModules";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";

const availableEmails = ["dave.bacay@gocfs.pro", "dave.bacay.vc@gmail.com"];
export const emailOptions = [
  { value: "dave.bacay.vc@gmail.com", label: "dave.bacay.vc@gmail.com" },
  { value: "dave.bacay@gocfs.pro", label: "dave.bacay@gocfs.pro" },
];

const ContractForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

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

  const initialValues = {
    recipients: [],
    emailBody: "",
    subject: "",
  };

  const userCtx = useContext(UserContext) as any;
  const realQuillModules = useQuillModules();

  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <div className="email-marketing-form-container">
        {loading ? <Spinner variant="fixed" /> : null}
        <h2>Email Marketing</h2>
        <p
          style={{
            fontSize: "1.4rem",
            textAlign: "center",
            color: "#fff",
            lineHeight: "2rem",
            marginTop: "2rem",
            fontWeight: 300,
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid,
          quibusdam. Laborum minima id, <br /> accusamus eum ipsum placeat quod
          saepe? Consectetur.
        </p>
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
                  <Button variant="danger" onClick={() => handleSubmit()}>
                    Submit
                  </Button>
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

export default ContractForm;
