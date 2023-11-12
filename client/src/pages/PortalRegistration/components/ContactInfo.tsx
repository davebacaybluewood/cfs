import { Grid } from "@mui/material";
import FormikTextInput from "library/Formik/FormikInput";
import React from "react";
import { ValuesType } from "../models";
import US_STATES from "constants/statesAndLocation";
import ErrorText from "./ErrorText";
import { FormikTouched } from "formik";
import Select from "react-select";

interface ContactInfoProps {
  changeStage: (newStage: number) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  setTouched: (
    touched: FormikTouched<ValuesType>,
    shouldValidate?: boolean | undefined
  ) => void;
  isValid: boolean;
  values: ValuesType;
  touched: FormikTouched<ValuesType>;

  onSubmit: (values: ValuesType, nextStage: number) => Promise<void>;
}
const ContactInfo: React.FC<ContactInfoProps> = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={7} sm={7} md={7}>
        <label className="form-label">State</label>
        <Select
          className="basic-single"
          classNamePrefix="select"
          onChange={(event) => {
            props.setFieldValue("state", event!.value);
          }}
          onBlur={(e) => {
            if (!props.values.state) {
              props.setTouched({ ...props.touched, state: true });
            }
          }}
          placeholder="Select a state"
          isSearchable={true}
          name="state"
          options={US_STATES.map((st) => {
            return {
              label: st.name,
              value: st.name,
            };
          })}
          styles={{
            control: (baseStyles, state) => {
              return {
                ...baseStyles,
                border:
                  !props.values.state && !!props.touched.state
                    ? "1px solid #d32f2f"
                    : undefined,
                fontSize: "13px",
                paddingTop: "5px",
                paddingBottom: "5px",
              };
            },
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: "rgba(0, 0, 0, 0.3)",
            }),
          }}
          value={
            props.values.state
              ? {
                  label: props.values.state,
                  value: props.values.state,
                }
              : undefined
          }
        />
        <ErrorText
          isError={!props.values.state && !!props.touched.state}
          text="State field is required."
        />
      </Grid>
      <Grid item xs={5} sm={5} md={5} lg={5}>
        <div className="zipCode">
          <label className="form-label">Zip Code</label>
          <FormikTextInput
            variant="outlined"
            name="zipCode"
            value={props.values.zipCode}
            placeholder="Enter your Zip Code"
            type="number"
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <label className="form-label">Address Line 1 (Required)</label>
        <FormikTextInput
          name="address1"
          value={props.values.address1}
          variant="outlined"
          type="text"
          placeholder="Enter your address line 1"
          isTextArea
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <label className="form-label">Address Line 2 (Optional)</label>
        <FormikTextInput
          name="address2"
          value={props.values.address2}
          variant="outlined"
          type="text"
          placeholder="Enter your address line 2"
          isTextArea
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12}>
        <button
          className="primary-cfs-btn"
          onClick={() => {
            props.onSubmit(props.values, 4);
          }}
          disabled={props.isValid}
        >
          Continue with your registration
        </button>
        <button
          className="secondary-cfs-btn"
          onClick={() => props.changeStage(2)}
        >
          Go back to previous stage
        </button>
      </Grid>
    </Grid>
  );
};

export default ContactInfo;
