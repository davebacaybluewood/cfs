import { Container, Grid } from "@mui/material";
import Banner from "library/Banner/Banner";
import PageTitle from "library/PageTitle/PageTitle";
import React, { useEffect } from "react";
import "./Agents.scss";
import Wrapper from "pages/Home/components/Wrapper/Wrapper";
import CommonHeaderTitle from "library/HeaderTitle/HeaderTitle";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { FaQuoteRight } from "react-icons/fa";
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
import { AgentStatuses } from "AdminNew/pages/Agents/types";

const tempTestimonials = [
  {
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Dave Spencer Bacay",
    title: "Web Developer",
  },
  {
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Dave Spencer Bacay",
    title: "Web Developer",
  },
];
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
    onEventScheduled: (e) => console.log(e.data.payload),
  });

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
            <Testimonials testimonials={tempTestimonials} />
            <AgentVideos />
          </FilteredContainer>
          <ComponentValidator showNull={!props.showAppointment}>
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
                        url="https://calendly.com/gocfs/30min?primary_color=0057b7"
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
