import { Container } from "@mui/system";
import Spinner from "AdminNew/components/Spinner/Spinner";
import { AgentStatuses } from "AdminNew/pages/Agents/types";
import paths from "constants/routes";
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
    },
    SUCCESS: {
      IMAGE:
        "https://res.cloudinary.com/dfm2vczpy/image/upload/v1675727238/other-assets/undraw_wait_in_line_o2aq_1_slri2y.svg",
      HEADER: "Your Agent Registration Success",
    },
    PENDING: {
      IMAGE:
        "https://res.cloudinary.com/dfm2vczpy/image/upload/v1675727238/other-assets/undraw_wait_in_line_o2aq_1_slri2y.svg",
      HEADER: "Your Agent Registration Is Pending",
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AgentCheckStatus;
