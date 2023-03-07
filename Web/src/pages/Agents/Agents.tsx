import { Container, Grid } from "@mui/material";
import Banner from "library/Banner/Banner";
import PageTitle from "library/PageTitle/PageTitle";
import React, { useEffect } from "react";
import "./Agents.scss";
import Wrapper from "pages/Home/components/Wrapper/Wrapper";
import CommonHeaderTitle from "library/HeaderTitle/HeaderTitle";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSingleAgent } from "redux/actions/agentActions";
import { RootState } from "store";
import AgentProfile from "./components/AgentProfile";
import Testimonials from "./components/Testimonials";
import AgentVideos from "./components/AgentVideos";
import Spinner from "AdminNew/components/Spinner/Spinner";
import AgentPending from "./components/AgentPending";
import paths from "constants/routes";
import useFetchAgentWebinars from "AdminNew/pages/Profile/components/Webinars/hooks/useFetchAgentWebinars";
import ENDPOINTS from "constants/endpoints";

type FilteredContainerProps = {
  noSpacing?: boolean;
  children: React.ReactNode;
};
type AgentsProps = {
  showBanner?: boolean;
  showAppointment?: boolean;
  noContainer?: boolean;
  agentProfile?: any;
  noPendingValidation?: boolean;
};

const FilteredContainer: React.FC<FilteredContainerProps> = (props) => {
  if (props.noSpacing) {
    return <div>{props.children}</div>;
  }
  return <Container>{props.children}</Container>;
};

const Agents: React.FC<AgentsProps> = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listSingleAgent(id ?? "") as any);
  }, [dispatch, id]);

  const agentSelector = useSelector((state: RootState) => state.agentSingle);
  const { agent: agentData, loading, error } = agentSelector;

  const agent = props.agentProfile ? props.agentProfile : agentData;

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: (e) => console.log(e),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => {
      const inviteLink = e.data.payload.invitee.uri;
      console.log(inviteLink);
      const getActiveWebinars = async () => {
        const req = await fetch(
          ENDPOINTS.APPOINTMENT_AGENT_CALENDLY.replace(":agentId", id ?? ""),
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              state: "State Test",
              calendlyURI: inviteLink,
              appointment_type: "PAW",
              webinarGuid: "",
            }),
          }
        );

        const response = await req.json();
        console.log(response);
      };

      getActiveWebinars();
    },
  });

  const { webinars, loading: webinarLoading } = useFetchAgentWebinars(
    agent?.webinars
  );

  if (error) {
    navigate(paths.invalid);
  }

  return (
    <div className="agent-wrapper">
      <PageTitle title="Agents" />
      <ComponentValidator showNull={!props.showBanner}>
        <Banner
          bigTitle="Agents"
          title="Meet our awesome people"
          hasBorder={true}
        />
      </ComponentValidator>
      {loading ? (
        <Spinner />
      ) : !agent.status ? (
        <Container>
          <AgentPending />
        </Container>
      ) : (
        <React.Fragment>
          <FilteredContainer noSpacing={props.noContainer}>
            <AgentProfile noContainer={props.noContainer} agent={agent} />
            <Testimonials
              testimonials={agent.testimonials}
              agentId={agent._id ?? ""}
            />
            <ComponentValidator
              showNull={
                false /** This will change after webinar feature completed */
              }
            >
              <AgentVideos
                webinars={webinars ?? []}
                loading={webinarLoading}
                agentId={agent.userGuid}
              />
            </ComponentValidator>
          </FilteredContainer>
          <ComponentValidator
            showNull={
              false /** This will change after webinar feature completed */
            }
          >
            <Wrapper
              style={{
                backgroundImage: `url("https://techno.dreamitsolution.net/wp-content/uploads/2020/10/team-bg2.jpg")`,
              }}
              className="appoinment-content"
            >
              <React.Fragment>
                <Container>
                  <Grid container spacing={2} className="appointment-container">
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <CommonHeaderTitle
                        title="SCHEDULE A APPOINTMENT"
                        bigTitle="To Make Requests For The Further Information"
                        description={`Or direct call to ${agent.phoneNumber}`}
                      />
                      <InlineWidget
                        url={agent?.calendlyLink}
                        styles={{
                          height: "850px",
                          width: "100%",
                          marginBottom: "-6rem",
                          marginTop: "-6rem",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Container>
              </React.Fragment>
            </Wrapper>
          </ComponentValidator>
        </React.Fragment>
      )}
    </div>
  );
};

Agents.defaultProps = {
  showAppointment: true,
  showBanner: true,
  noContainer: false,
  noPendingValidation: false,
};

export default Agents;
