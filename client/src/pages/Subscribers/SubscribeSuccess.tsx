import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom"; // Assuming you are using React Router
import { paths } from "constants/routes";
import "./SubscribeSuccess.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const SubscribeSuccess = () => {
  const navigate = useNavigate();
  const accordionStyle = {
    // paddingLeft: '48px',
    // paddingRight: '48px'
    width: "560px",
  };

  return (
    <>
      <div className="subscribe-success-container">
        <img
          src="\assets\images\logos\cfs-logo.png"
          alt="\assets\images\logos\cfs-logo.png"
        />
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h3>Welcome to CFS</h3>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <button
            className="secondary-cfs-btn"
            style={{ width: "24rem", height: "3rem", marginTop: "1rem" }}
            onClick={() => {
              navigate(paths.login);
            }}
          >
            Login
          </button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginTop: "3rem" }}>
          <h2>Frequently Asked Questions</h2>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ marginTop: "2rem"}}>
          <Accordion style={accordionStyle}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>What is Comfort Financial Solutions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                vel nisl ligula. Praesent imperdiet erat sed dolor sagittis
                placerat. Morbi ut hendrerit erat. Mauris sit amet felis ac leo
                bibendum pharetra. Morbi id lorem id lectus sagittis consequat
                nec et neque. Vestibulum convallis tellus risus. Donec
                consectetur vestibulum commodo. Donec mollis vitae nulla nec
                vestibulum. Ut et porttitor ante. Sed augue est, laoreet a
                sollicitudin iaculis, pellentesque nec massa. Nullam risus
                felis, pharetra a mollis ut, posuere id mauris.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        
        {/* 
        COMMENT OUT ACCORDION FAQ AFTER REGISTRATION
        
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ marginTop: "2rem"}}>
          <Accordion style={accordionStyle}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>What is Comfort Financial Solutions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                vel nisl ligula. Praesent imperdiet erat sed dolor sagittis
                placerat. Morbi ut hendrerit erat. Mauris sit amet felis ac leo
                bibendum pharetra. Morbi id lorem id lectus sagittis consequat
                nec et neque. Vestibulum convallis tellus risus. Donec
                consectetur vestibulum commodo. Donec mollis vitae nulla nec
                vestibulum. Ut et porttitor ante. Sed augue est, laoreet a
                sollicitudin iaculis, pellentesque nec massa. Nullam risus
                felis, pharetra a mollis ut, posuere id mauris.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ marginTop: "2rem"}}>
          <Accordion style={accordionStyle}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>What is Comfort Financial Solutions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                vel nisl ligula. Praesent imperdiet erat sed dolor sagittis
                placerat. Morbi ut hendrerit erat. Mauris sit amet felis ac leo
                bibendum pharetra. Morbi id lorem id lectus sagittis consequat
                nec et neque. Vestibulum convallis tellus risus. Donec
                consectetur vestibulum commodo. Donec mollis vitae nulla nec
                vestibulum. Ut et porttitor ante. Sed augue est, laoreet a
                sollicitudin iaculis, pellentesque nec massa. Nullam risus
                felis, pharetra a mollis ut, posuere id mauris.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ marginTop: "2rem"}}>
          <Accordion style={accordionStyle}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>What is Comfort Financial Solutions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                vel nisl ligula. Praesent imperdiet erat sed dolor sagittis
                placerat. Morbi ut hendrerit erat. Mauris sit amet felis ac leo
                bibendum pharetra. Morbi id lorem id lectus sagittis consequat
                nec et neque. Vestibulum convallis tellus risus. Donec
                consectetur vestibulum commodo. Donec mollis vitae nulla nec
                vestibulum. Ut et porttitor ante. Sed augue est, laoreet a
                sollicitudin iaculis, pellentesque nec massa. Nullam risus
                felis, pharetra a mollis ut, posuere id mauris.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ marginTop: "2rem"}}>
          <Accordion style={accordionStyle}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>What is Comfort Financial Solutions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                vel nisl ligula. Praesent imperdiet erat sed dolor sagittis
                placerat. Morbi ut hendrerit erat. Mauris sit amet felis ac leo
                bibendum pharetra. Morbi id lorem id lectus sagittis consequat
                nec et neque. Vestibulum convallis tellus risus. Donec
                consectetur vestibulum commodo. Donec mollis vitae nulla nec
                vestibulum. Ut et porttitor ante. Sed augue est, laoreet a
                sollicitudin iaculis, pellentesque nec massa. Nullam risus
                felis, pharetra a mollis ut, posuere id mauris.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid> */}
      </div>
    </>
  );
};

export default SubscribeSuccess;
