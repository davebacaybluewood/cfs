import { Container } from "@mui/system";
import { paths } from "constants/routes";
import Button from "library/Button/Button";
import PageTitle from "library/PageTitle/PageTitle";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AgentRegistrationSuccess.scss";

const AgentRegistrationSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { agentId } = useParams();
  return (
    <div className="agent-registration-success-wrapper">
      <PageTitle title="Agent Registration Completed" />
      <Container>
        <div className="child-wrapper">
          <div>
            <img
              src="https://res.cloudinary.com/dfm2vczpy/image/upload/v1675209170/other-assets/undraw_Happy_feeling_re_e76r_zsud5u.png"
              alt="success"
            />
          </div>
          <div>
            <h2>Agent Registration Success</h2>
            <p>
              Thank you for registering in Comfort Financial Solutions. <br />{" "}
              It will take 3-5 business days to process your request.
            </p>
            <Button
              onClick={() =>
                navigate(paths.agent_check_status.replace(":id", agentId ?? ""))
              }
              variant="primary"
            >
              TRACK YOUR PROFILE HERE
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AgentRegistrationSuccess;
