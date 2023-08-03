import { Container, Grid } from "@mui/material";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { Formik } from "formik";
import Spinner from "library/Spinner/Spinner";
import * as Yup from "yup";
import React, { useState } from "react";
import "./ContractForm.scss";
import FormikTextInput from "library/Formik/FormikInput";
import Select, { GroupBase, StylesConfig } from "react-select";
import { CFS_STATES } from "constants/constants";
import Button from "library/Button/Button";
import agent from "admin/api/agent";

const ContractForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required."),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email address is required."),
    remarks: Yup.string().required("This field is required."),
    state: Yup.string().required("Please select your state."),
  });

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Licensing",
      url: paths.licensing,
      isActive: true,
    },
  ];

  // React Select
  const reactSelectStyle:
    | StylesConfig<
        {
          value: string;
          label: string;
        },
        false,
        GroupBase<{
          value: string;
          label: string;
        }>
      >
    | undefined = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      fontWeight: "400",
      fontFamily: '"Montserrat", sans-serif',
      padding: "1.3rem",
      fontSize: "1.5rem",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "#fff",
        color: "black",
        fontWeight: "600",
        fontSize: "1.4rem",
        fontFamily: '"Montserrat", sans-serif',

        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
    placeholder: (styles) => ({
      ...styles,
      fontSize: "1.5rem",
      color: "#5a7184",
      fontWeight: "400",
      opacity: "0.7",
      fontFamily: '"Montserrat", sans-serif',
    }),
  };

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="users-container"
    >
      <div className="contract-form-container">
        {loading ? <Spinner variant="fixed" /> : null}
        <h2>Contracting</h2>
        <p
          style={{
            fontSize: "2rem",
            textAlign: "center",
            color: "#fff",
            lineHeight: "2rem",
            marginTop: "2rem",
          }}
        >
          {" "}
          {/* Please Remove, still developing  */}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid,
          quibusdam. Laborum minima id, <br /> accusamus eum ipsum placeat quod
          saepe? Consectetur.
        </p>
        <div className="contract-form">
          <Formik
            initialValues={{
              name: "",
              state: "",
              email: "",
              remarks: "",
            }}
            onSubmit={async (data) => {
              const response = await agent.Contracting.requestContract(data);

              console.log(response);
            }}
            validationSchema={validationSchema}
          >
            {({ values, errors, handleSubmit, setFieldValue }) => {
              return (
                <React.Fragment>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <label htmlFor="">Your Name *</label>
                      <FormikTextInput
                        placeholder="Enter your Name"
                        variant="outlined"
                        name="name"
                        value={values.name}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <label htmlFor="">Email *</label>
                      <FormikTextInput
                        placeholder="Enter your Email"
                        variant="outlined"
                        name="email"
                        value={values.email}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <label htmlFor="">State *</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="state"
                        styles={reactSelectStyle}
                        value={CFS_STATES[1]}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isSearchable={true}
                        options={CFS_STATES}
                        placeholder="Select a state"
                        onChange={(value) =>
                          setFieldValue("state", value?.value)
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      sm={12}
                      md={12}
                      lg={12}
                      className="form-card-container"
                    >
                      <label>Remarks * </label>
                      <FormikTextInput
                        className="form-remarks"
                        placeholder="Enter your remarks here"
                        variant="outlined"
                        name="remarks"
                        value={values.remarks}
                        isTextArea
                      />
                    </Grid>
                  </Grid>
                  <Button variant="danger" onClick={() => handleSubmit()}>
                    Submit
                  </Button>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                </React.Fragment>
              );
            }}
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default ContractForm;
