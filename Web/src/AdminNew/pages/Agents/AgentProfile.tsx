import { Button } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import Agents from "pages/Agents/Agents";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { listSingleAgent } from "redux/actions/agentActions";
import { RootState } from "store";
import { CrumbTypes } from "../Dashboard/types";
import "./AgentProfile.scss";

const AgentProfile: React.FC = () => {
  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Life Finance Admin",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Agents",
      url: paths.adminAgents,
      isActive: true,
    },
  ];
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listSingleAgent(id ?? "") as any);
  }, [dispatch, id]);

  const agentSelector = useSelector((state: RootState) => state.agentSingle);
  const { agent, loading, error } = agentSelector;

  const updateHandler = () => {
    console.log("update");
  };

  return (
    <Wrapper
      loading={loading}
      error={error}
      breadcrumb={crumbs}
      className="agent-profile-wrapper"
    >
      <Title
        title="Agents"
        subtitle="Lorem Ipsum is simply dummy text of the printing"
      >
        <Button
          variant="contained"
          onClick={() =>
            navigate(paths.adminAgentForm.replace(":action", "add"))
          }
        >
          Edit Information
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            navigate(paths.adminAgentForm.replace(":action", "add"))
          }
        >
          Add Testimonial
        </Button>
      </Title>
      <Agents
        showAppointment={false}
        showBanner={false}
        noContainer={true}
        agentProfile={agent}
      />
    </Wrapper>
  );
};

export default AgentProfile;
