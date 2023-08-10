import { Grid, Button as MUIButton } from "@mui/material";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { Formik } from "formik";
import Spinner from "library/Spinner/Spinner";
import * as Yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import FormikTextInput from "library/Formik/FormikInput";
import Select, { GroupBase, StylesConfig } from "react-select";
import { CFS_STATES } from "constants/constants";
import Button from "library/Button/Button";
import agent from "admin/api/agent";
import { toast } from "react-toastify";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import { UserContext } from "admin/context/UserProvider";
import ErrorText from "pages/PortalRegistration/components/ErrorText";
import MultiSelectInputV2 from "library/MultiSelectInput/MultiSelectInputV2";
import moment from "moment";

const CARRIERS = [
  "Foresters",
  "Mutual of Omaha",
  "Nationwide",
  "North American",
  "American Equity",
  "Athene",
  "Nassau RE",
  "Global Atlantic",
];
const EmailMarketing: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const today = moment();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email address is required."),
    state: Yup.string().required("State is required."),
    phoneNumber: Yup.string().required("Phone number is required."),
    licenseNumber: Yup.string().required("License number is required."),
    ssnNumber: Yup.string().required("SSN Number is required."),
    carrier: Yup.array()
      .min(1, "Pick at least 1 Insurance Carrier")
      .required("Insurance Carrier is required."),
    dateOfBirth: Yup.date()
      .nullable()
      .notRequired()
      .test(
        "Is date greater",
        "DOB cannot be greater than today's date",
        (value) => {
          if (!value) return true;
          return moment(today).diff(value) > 0;
        }
      ),
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
      padding: ".6rem",
      fontSize: "1.5rem",
      width: "100%",
      marginTop: "0.8rem",
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

  const userCtx = useContext(UserContext) as any;
  const { profile, loading: profileLoading } = useFetchUserProfile(
    userCtx?.user?.userGuid ?? ""
  );
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [initialValues, setInitialValues] = useState({
    state: CFS_STATES[1].value,
    remarks: "",
  });

  useEffect(() => {
    setInitialValues({
      remarks: "",
      state: profile?.state ?? "",
    });
  }, [profile]);

  const handleFocusBack = () => {
    setThumbnailPreview("");
    window.removeEventListener("focus", handleFocusBack);
  };
  const clickedFileInput = () => {
    window.addEventListener("focus", handleFocusBack);
  };

  const curr = new Date();
  curr.setDate(curr.getDate() + 3);
  const currentDate = curr.toISOString().substring(0, 10);

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="users-container"
    >
      <div className="contract-form-container">
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
          {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid,
          quibusdam. Laborum minima id, <br /> accusamus eum ipsum placeat quod
          saepe? Consectetur. */}
        </p>
        <div className="contract-form">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (data) => {
              setLoading(true);
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
                    <Grid item xs={12} md={4}>
                      <label htmlFor="">Recipient (Required)</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="state"
                        styles={reactSelectStyle}
                        defaultValue={CFS_STATES[1]}
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
                      <label>Remarks (Optional)</label>
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

export default EmailMarketing;
