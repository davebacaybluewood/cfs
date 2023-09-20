import { useNavigate } from "react-router-dom"; // Assuming you are using React Router
import { paths } from "constants/routes";
import "./SubscribeSuccess.scss";
import {
  Grid,
} from "@mui/material";

const SubscribeSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="subscribe-success-container">
      <img
        src="\assets\images\logos\cfs-logo.png"
        alt="\assets\images\logos\cfs-logo.png"
      />
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <h3>Welcome to CFS</h3>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <button
          className="secondary-cfs-btn"
          style={{ width: "24rem", height: "3rem", marginTop: "1rem" }}
          onClick={() => {
            navigate(paths.login);
          }}
        >
          Login
        </button>
      </Grid>
      

    </div>
  );
};

export default SubscribeSuccess;
