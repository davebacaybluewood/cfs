import React, { useEffect, useState } from "react";
import { Accordion, Container, Grid } from "@mui/material";
import TwoContentCard from "library/TwoContentCard/TwoContentCard";
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
import "./Missions.scss";

const Missions: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [progress, setProgress] = useState(10);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 100 ? 10 : prevProgress + 10
  //     );
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []); //Could be used in future

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
          <LinearProgressWithLabel value={100} />
        </Box>
      ),
    },
  ];

  // FAQs Array
  const faqs = [
    {
      header: "What is Finance ? 1",
      content:
        " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo molestias praesentium animi! Explicabo culpa nostrum unde voluptatum molestiae laudantium omnis.",
    },

    {
      header: "What is Finance ? 2",
      content:
        " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo molestias praesentium animi! Explicabo culpa nostrum unde voluptatum molestiae laudantium omnis.",
    },

    {
      header: "What is Finance ? 3",
      content:
        " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo molestias praesentium animi! Explicabo culpa nostrum unde voluptatum molestiae laudantium omnis.",
    },

    {
      header: "What is Finance ? 4",
      content:
        " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo molestias praesentium animi! Explicabo culpa nostrum unde voluptatum molestiae laudantium omnis.",
    },
  ];

  return (
    <Container>
      <div className="missions-page-main-container">
        <div className="mission-page-content">
          <Grid container spacing={4}>
            <Grid item md={8}>
              <h2 className="title-label">Missions</h2>
              <h3 className="page-subtitle">List of Missions</h3>

              {content.map((item) => (
                <React.Fragment>
                  <TwoContentCard
                    title={item.title}
                    description={item.description}
                    element={item.progress}
                  />
                </React.Fragment>
              ))}
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
      </div>
    </Container>
  );
};

export default Missions;
