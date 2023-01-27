import { Button, Grid } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import { ROLES } from "AdminNew/constants/constants";
import paths from "constants/routes";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import SocialIcons from "pages/Agents/SocialIcons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listAgents } from "redux/actions/agentActions";
import { RootState } from "store";
import { CrumbTypes } from "../Dashboard/types";
import "./Agents.scss";

const PAGE_LIMIT = 9;

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

type AdminAgents = {
  title?: string;
  subtitle?: string;
  showHeaderButtons?: boolean;
};
const AdminAgents: React.FC<AdminAgents> = (props) => {
  const ROLE = ROLES.ROLE_MASTER_ADMIN;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listAgents(ROLE) as any);
  }, [dispatch]);

  const agentSelector = useSelector((state: RootState) => state.agentList);
  const { agents, loading, error } = agentSelector;
  const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);

  const loadMoreHandler = () => {
    setPageLimit((prevState) => prevState + 6);
  };
  const hideLoadMoreButton = pageLimit < agents.length;

  return (
    <Wrapper
      className="agent-container"
      loading={loading}
      error={error}
      breadcrumb={crumbs}
    >
      <Title title={props.title ?? ""} subtitle={props.subtitle ?? ""}>
        <ComponentValidator showNull={!props.showHeaderButtons}>
          <Button
            variant="contained"
            onClick={() =>
              navigate(paths.adminAgentForm.replace(":action", "add"))
            }
          >
            Add Agent
          </Button>
        </ComponentValidator>
      </Title>
      <NoInformationToDisplay showNoInfo={agents.length === 0}>
        <Grid container spacing={3}>
          {agents.slice(0, pageLimit).map((agent: any) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <div
                  className="item"
                  onClick={() =>
                    navigate(paths.adminAgentProfile.replace(":id", agent._id))
                  }
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
                          src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/32e2eeb2b2605b408e5ebb17/reer-min.jpg"
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
