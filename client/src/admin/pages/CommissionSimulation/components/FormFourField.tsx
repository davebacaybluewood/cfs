// Use this for four fielded form needs
import React from "react";
import "./FormField.scss";
import { Grid } from "@mui/material";

interface FormFourFieldProps {
  heading: string;
  description: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  button: {
    text: string;
    onclick?: () => void;
  };
}

const FormFourField: React.FC<FormFourFieldProps> = (props) => {
  return (
    <div className="form-card">
      <div className="card-captions-top">
        <h3>{props.heading}</h3>
        <p>{props.description}</p>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="form-fields">
            <div className="single-field">
              <h3>{props.field1}</h3>
              <div className="four-input">
                <input type="text" />
              </div>
            </div>
            <div className="single-field">
              <h3>{props.field2}</h3>
              <div className="four-input">
                <input type="text" />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="form-fields">
            <div className="single-field">
              <h3>{props.field3}</h3>
              <div className="four-input">
                <input type="text" />
              </div>
            </div>
            <div className="single-field">
              <h3>{props.field4}</h3>
              <div className="four-input">
                <input type="text" />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormFourField;
