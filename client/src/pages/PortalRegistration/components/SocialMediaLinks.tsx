import { Grid } from "@mui/material";
import FormikTextInput from "library/Formik/FormikInput";
import React from "react";
import {
  FaDiscord,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaRegCommentDots,
  FaTwitterSquare,
} from "react-icons/fa";
import { ValuesType } from "../models";

interface SocialMediaLinksProps {
  changeStage: (newStage: number) => void;
  isValid: boolean;
  values: ValuesType;
  onSubmit: (values: ValuesType, nextStage: number) => Promise<void>;
}
const SocialMediaLinks: React.FC<SocialMediaLinksProps> = (props) => {
  return (
    <Grid container spacing={2} className="social-grids">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <label className="form-label">
          <FaLinkedin />
          <span>LinkedIn (Optional)</span>
        </label>
        <FormikTextInput
          name="linkedIn"
          value={props.values.linkedIn}
          variant="outlined"
          placeholder="Enter your LinkedIn link"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <label className="form-label">
          <FaFacebookSquare />
          <span>Facebook (Optional)</span>
        </label>
        <FormikTextInput
          name="facebook"
          value={props.values.facebook}
          variant="outlined"
          type="facebook"
          placeholder="Enter your Facebook link"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <label className="form-label">
          <FaInstagramSquare />
          <span>Instagram (Optional)</span>
        </label>
        <FormikTextInput
          name="instagram"
          value={props.values.instagram}
          variant="outlined"
          type="text"
          placeholder="Enter your Instagram link"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <label className="form-label">
          <FaTwitterSquare />
          <span>Twitter (Optional)</span>
        </label>
        <FormikTextInput
          name="twitter"
          value={props.values.twitter}
          variant="outlined"
          type="text"
          placeholder="Enter your Twitter link"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <label className="form-label">
          <FaDiscord />
          <span>Discord ID (Optional)</span>
        </label>
        <FormikTextInput
          name="discordId"
          value={props.values.discordId}
          variant="outlined"
          type="text"
          placeholder="Enter your Discord ID (CFS Admin#9465)"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <label className="form-label">
          <FaRegCommentDots />
          <span>WeChat (Optional)</span>
        </label>
        <FormikTextInput
          name="weChat"
          value={props.values.weChat}
          variant="outlined"
          type="weChat"
          placeholder="Enter your WeChat link"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <button
          className="primary-cfs-btn"
          onClick={() => {
            props.onSubmit(props.values, 5);
          }}
        >
          Register
        </button>
        <button
          className="secondary-cfs-btn"
          onClick={() => props.changeStage(3)}
          type="submit"
        >
          Go back to previous stage
        </button>
      </Grid>
    </Grid>
  );
};

export default SocialMediaLinks;
