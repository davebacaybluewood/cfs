import React from "react";
import { FieldAttributes, useField } from "formik";
import { FormControlLabel, Radio } from "@mui/material";

type FormikRadioProps = { label: string } & FieldAttributes<{}>;
const FormikRadio: React.FC<FormikRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};
export default FormikRadio;
