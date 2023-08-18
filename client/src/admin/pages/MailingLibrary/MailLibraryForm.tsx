import { Grid } from "@mui/material";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { Formik } from "formik";
import Spinner from "library/Spinner/Spinner";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import "../EmailMarketing/EmailMarketing.scss";
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
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { BsPlusCircle } from "react-icons/bs";

export const emailOptions = [
  { value: "dave.bacay.vc@gmail.com", label: "dave.bacay.vc@gmail.com" },
  { value: "dave.bacay@gocfs.pro", label: "dave.bacay@gocfs.pro" },
];

const MailLibraryForm: React.FC = () => {
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

  const userCtx = useContext(UserContext) as any;
  const realQuillModules = useQuillModules();

  const populateForm = (emailBody: string, subject: string) => {
    setInitialValues((prevState) => ({
      recipients: prevState.recipients,
      emailBody: emailBody,
      subject: subject,
    }));

    setOpenDrawer(false);
  };

  const rows: GridRowsProp = [
    {
      id: 1,
      createdBy: "Hello",
      createdAt: "World",
      templateName: "Template 1",
      body: "test",
      actions: (
        <React.Fragment>
          <button
            className="select-btn"
            onClick={() => populateForm("test", "test")}
          >
            <span>Select This Template</span> <BsPlusCircle />
          </button>
        </React.Fragment>
      ),
    },
  ];

  const columns: GridColDef[] = [
    { field: "templateName", headerName: "Template Name", width: 300 },
    { field: "createdBy", headerName: "Created By", width: 150 },
    { field: "createdAt", headerName: "Date Created", width: 150 },
    {
      field: "actions",
      headerName: "",
      width: 250,
      align: "right",
      renderCell: (params) => params.value,
    },
  ];

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
                    <div className="actions">
                      <Button variant="default" onClick={() => handleSubmit()}>
                        Save as draft
                      </Button>
                      <Button variant="danger" onClick={() => handleSubmit()}>
                        Save as template
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
            <Button variant="default">Close</Button>
          </React.Fragment>
        }
      >
        <DataGrid rows={rows} columns={columns} />
      </DrawerBase>
    </Wrapper>
  );
};

export default MailLibraryForm;
