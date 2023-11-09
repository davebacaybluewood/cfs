import React from "react";
import { Grid } from "@mui/material";
import MissionCard from "library/MissionCard/MissionCard";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { faqs } from "./faqs";
import { Helmet } from "react-helmet";
import "./Missions.scss";

const Missions: React.FC = () => {
  const LinearProgressWithLabel = (
    props: LinearProgressProps & { value: number }
  ) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  };

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  // Content Array
  const content = [
    {
      title: "Mission Statement",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut veniam at blanditiis dicta aperiam dolorum suscipit voluptas aliquam. Placeat aperiam natus inventore iure a debitis quaerat voluptatum labore odio eos.",
      progress: (
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={54} />
        </Box>
      ),
    },
    {
      title: "Mission Statement2",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut veniam at blanditiis dicta aperiam dolorum suscipit voluptas aliquam. Placeat aperiam natus inventore iure a debitis quaerat voluptatum labore odio eos.",
      progress: (
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={42} />
        </Box>
      ),
    },
    {
      title: "Mission Statement3",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut veniam at blanditiis dicta aperiam dolorum suscipit voluptas aliquam. Placeat aperiam natus inventore iure a debitis quaerat voluptatum labore odio eos.",
      progress: (
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={80} />
        </Box>
      ),
    },
    {
      title: "Mission Statement4",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut veniam at blanditiis dicta aperiam dolorum suscipit voluptas aliquam. Placeat aperiam natus inventore iure a debitis quaerat voluptatum labore odio eos.",
      progress: (
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={78} />
        </Box>
      ),
    },
  ];

  return (
    <div className="missions-page-main-container">
      <Helmet>
        <title>Missions & Events | Comfort Financial Solutions</title>
        <link rel="canonical" href="gocfs.pro/missions/events" />
      </Helmet>
      <div className="mission-page-content">
        <div className="mission-page-captions-header">
          <h2>Missions & Events</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, atque.
          </p>
          <div className="divider"></div>
        </div>
        <Grid container spacing={4}>
          <Grid item md={8}>
            <h2 className="title-label">Missions</h2>
            <h3 className="page-subtitle">List of Missions</h3>

            {content.map((item) => (
              <MissionCard
                title={item.title}
                description={item.description}
                element={item.progress}
              />
            ))}
            <div className="empty-container"></div>
          </Grid>
          <Grid item md={4}>
            <h2 className="title-label">FAQs</h2>
            <h3 className="page-subtitle">Frequently asked questions.</h3>
            {faqs.map((faq) => (
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <h3>{faq.header}</h3>
                </AccordionSummary>
                <AccordionDetails>{faq.content}</AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </div>
      {/* </Container> */}
    </div>
  );
};

export default Missions;
