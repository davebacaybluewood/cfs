import { Container } from "@mui/system";
import Spinner from "admin/components/Spinner/Spinner";
import { AgentStatuses } from "admin/pages/Agents/types";
import { paths } from "constants/routes";
import PageTitle from "library/PageTitle/PageTitle";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { listSingleAgent } from "redux/actions/agentActions";
import { RootState } from "store";
import "./AgentRegistrationSuccess.scss";

const AgentCheckStatus: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listSingleAgent(id ?? "") as any);
  }, [dispatch, id]);

  const agentSelector = useSelector((state: RootState) => state.agentSingle);
  const { agent, loading, error } = agentSelector as any;

  const AGENT_STATUS_HEADER = {
    DECLINED: {
      IMAGE:
        "https://res.cloudinary.com/dfm2vczpy/image/upload/v1675727238/other-assets/undraw_wait_in_line_o2aq_1_slri2y.svg",
      HEADER: "Your Agent Registration Has Been Declined",
      DESCRIPTION: (
        <React.Fragment>
          <span>
            Upon reviewing your request, Comfort Finacial Solutions team is
            declined your request.
          </span>
          <div>
            <p>
              If you have any questions or concerns, you may contact{" "}
              <a href="admin@gocfs.pro">admin@gocfs.pro</a>
            </p>
          </div>
          <div>
            <p>Thanks again for your request and we will be in touch soon!</p>
          </div>
        </React.Fragment>
      ),
    },
    SUCCESS: {
      IMAGE:
        "https://res.cloudinary.com/dfm2vczpy/image/upload/v1675727238/other-assets/undraw_wait_in_line_o2aq_1_slri2y.svg",
      HEADER: "Your Agent Registration Success",
      DESCRIPTION: (
        <React.Fragment>
          <span>Your account has been approved. </span>
          <div>
            <p>
              If you have any questions or concerns, you may contact{" "}
              <a href="support@gocfs.pro">support@gocfs.pro</a>
            </p>
          </div>
          <div>
            <p>Thanks again for your request and we will be in touch soon!</p>
          </div>
        </React.Fragment>
      ),
    },
    PENDING: {
      IMAGE:
        "https://res.cloudinary.com/dfm2vczpy/image/upload/v1675727238/other-assets/undraw_wait_in_line_o2aq_1_slri2y.svg",
      HEADER: "Your Agent Registration Is Pending",
      DESCRIPTION: (
        <React.Fragment>
          <span>
            Your account is on process. The Comfort Finacial Solutions Team is
            reviewing your request and will be in touch with you as soon as we
            have an update. Our goal is to process your request quickly and
            throughly, and to keep you informed for the next steps.
          </span>
          <div>
            <p>
              If you have any questions or concerns, you may contact{" "}
              <a href="admin@gocfs.pro">admin@gocfs.pro</a>
            </p>
          </div>
          <div>
            <p>Thanks again for your request and we will be in touch soon!</p>
          </div>
        </React.Fragment>
      ),
    },
  };

  const conditionalPageContent =
    agent?.status === AgentStatuses.DECLINED
      ? AGENT_STATUS_HEADER.DECLINED
      : agent?.status === AgentStatuses.PENDING
      ? AGENT_STATUS_HEADER.PENDING
      : AGENT_STATUS_HEADER.SUCCESS;

  if (loading) {
    return <Spinner />;
  }

  if (!loading && error) {
    navigate(paths.invalid);
  }
  return (
    <div className="agent-registration-success-wrapper">
      <PageTitle title="Agent Registration Completed" />
      <Container>
        <div className="child-wrapper">
          <div>
            <img
              src="https://res.cloudinary.com/dfm2vczpy/image/upload/v1675727238/other-assets/undraw_wait_in_line_o2aq_1_slri2y.svg"
              alt="success"
            />
          </div>
          <div>
            <h2>{conditionalPageContent.HEADER}</h2>
            <p>{conditionalPageContent.DESCRIPTION}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AgentCheckStatus;
