// Use this for four fielded form needs
import React from "react";
import { Grid } from "@mui/material";
import "./FormField.scss";

interface FormSixFieldProps {
  heading: string;
  description: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
}

const FormSixField: React.FC<FormSixFieldProps> = (props) => {
  return (
    <div className="form-card">
      <div className="card-captions-top">
        <h3>{props.heading}</h3>
        <p>{props.description}</p>
      </div>
      <div className="form-fields">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <div className="form-fields">
              <div className="single-field">
                <h3>{props.field1}</h3>
                <div className="six-first-input">
                  <input type="text" />
                </div>
              </div>
              <div className="single-field">
                <h3>{props.field2}</h3>
                <div className="six-first-input">
                  <input type="text" />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <div className="form-fields">
              <div className="single-field">
                <h3>{props.field3}</h3>
                <div className="six-two-input">
                  <input type="text" />
                </div>
              </div>
              <div className="single-field">
                <h3>{props.field4}</h3>
                <div className="six-two-input">
                  <input type="text" />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <div className="form-fields">
              <div className="single-field">
                <h3>{props.field5}</h3>
                <div className="six-three-input">
                  <input type="text" />
                </div>
              </div>
              <div className="single-field">
                <h3>{props.field6}</h3>
                <div className="six-three-input">
                  <input type="text" />
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default FormSixField;
