import { Grid } from "@mui/material";
import FormikTextInput from "library/Formik/FormikInput";
import React from "react";
import { ValuesType } from "../models";

interface ContactInfoProps {
  changeStage: (newStage: number) => void;
  isValid: boolean;
  values: ValuesType;
  onSubmit: (values: ValuesType, nextStage: number) => Promise<void>;
}
const ContactInfo: React.FC<ContactInfoProps> = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <label className="form-label">Phone Number</label>
        <FormikTextInput
          name="phoneNumber"
          value={props.values.phoneNumber}
          variant="outlined"
          placeholder="Enter your phone number"
        />
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
