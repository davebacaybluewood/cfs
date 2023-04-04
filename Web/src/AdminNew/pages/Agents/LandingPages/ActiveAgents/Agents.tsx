import { Button, Grid } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import { ROLES } from "AdminNew/constants/constants";
import paths from "constants/routes";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import SocialIcons from "pages/Agents/SocialIcons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listAgents } from "redux/actions/agentActions";
import { RootState } from "store";
import { CrumbTypes } from "../../../Dashboard/types";
import "../../Agents.scss";
import { AgentStatuses } from "../../types";

const PAGE_LIMIT = 9;

type AdminAgentsProps = {
  title?: string;
  subtitle?: string;
  showHeaderButtons?: boolean;
  agentStatus?: AgentStatuses;
};
const AdminAgents: React.FC<AdminAgentsProps> = (props) => {
  const ROLE = ROLES.ROLE_MASTER_ADMIN;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let agentStatus: AgentStatuses | undefined;
  switch (props.agentStatus as AgentStatuses | undefined) {
    case AgentStatuses.ACTIVATED:
      agentStatus = AgentStatuses.ACTIVATED;
      break;
    case AgentStatuses.DEACTIVATED:
      agentStatus = AgentStatuses.DEACTIVATED;
      break;
    case AgentStatuses.PENDING:
      agentStatus = AgentStatuses.PENDING;
      break;
    case AgentStatuses.DECLINED:
      agentStatus = AgentStatuses.DECLINED;
      break;
    default:
      agentStatus = AgentStatuses.ACTIVATED;
  }

  useEffect(() => {
    dispatch(listAgents(ROLE, agentStatus) as any);
  }, [dispatch]);

  const agentSelector = useSelector((state: RootState) => state.agentList);
  const { agents, loading, error } = agentSelector;
  const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);

  const loadMoreHandler = () => {
    setPageLimit((prevState) => prevState + 6);
  };
  const hideLoadMoreButton = pageLimit < agents?.length;

  const cardClickHandler = (id: string) => {
    if (props.agentStatus === AgentStatuses.ACTIVATED) {
      navigate(paths.adminAgentProfile.replace(":id", id));
    } else if (props.agentStatus === AgentStatuses.DEACTIVATED) {
      navigate(paths.adminDeactivatedAgentProfile.replace(":id", id));
    } else if (props.agentStatus === AgentStatuses.DECLINED) {
      navigate(paths.adminDeclinedAgentProfile.replace(":id", id));
    } else {
      navigate(paths.adminAgentRequestProfile.replace(":id", id));
    }
  };

  let breadCrumb = {
    text: "",
    link: "",
  };
  switch (props.agentStatus) {
    case AgentStatuses.ACTIVATED:
      breadCrumb = {
        text: "Activated Agents",
        link: paths.agents,
      };
      break;
    case AgentStatuses.DEACTIVATED:
      breadCrumb = {
        text: "Deactivated Agents",
        link: paths.deactivatedAgents,
      };
      break;
    case AgentStatuses.DECLINED:
      breadCrumb = {
        text: "Declined Agents",
        link: paths.declinedAgents,
      };
      break;
    case AgentStatuses.PENDING:
      breadCrumb = {
        text: "Agent Requests",
        link: paths.agentRequests,
      };
      break;
    default:
      breadCrumb = {
        text: "Activated Agents",
        link: paths.agents,
      };
  }

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: breadCrumb.text,
      url: breadCrumb.link,
      isActive: true,
    },
  ];

  return (
    <Wrapper
      className="agent-container"
      loading={loading}
      error={error}
      breadcrumb={crumbs}
    >
      <Title
        title={`${props.title ?? ""} (${agents?.length})`}
        subtitle={props.subtitle ?? ""}
      ></Title>
      <NoInformationToDisplay
        showNoInfo={agents?.length === 0 && !loading}
        message="There's no agent available."
        title="No information to display."
      >
        <Grid container spacing={3}>
          {agents.slice(0, pageLimit)?.map((agent: any) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <div
                  className="item"
                  onClick={() => cardClickHandler(agent.userGuid)}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={12} md={7}>
                      <div className="card-captions">
                        <h5>{agent.title}</h5>
                        <h1>{agent.name}</h1>
                        <p>{agent.bio}</p>
                        <SocialIcons
                          facebook={agent.facebook}
                          twitter={agent.twitter}
                          instagram={agent.instagram}
                          linkedIn={agent.linkedIn}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <div className="card-image">
                        <img
                          src={agent.avatar ? agent.avatar : "/assets/others/no-image.png"}
                          className="agent-img"
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </NoInformationToDisplay>
      {hideLoadMoreButton && (
        <Button onClick={loadMoreHandler} className="load-more-btn">
          Load More
        </Button>
      )}
    </Wrapper>
  );
};

AdminAgents.defaultProps = {
  title: "Agents",
  subtitle: "Lorem Ipsum is simply dummy text of the printing",
  showHeaderButtons: true,
};
export default AdminAgents;
