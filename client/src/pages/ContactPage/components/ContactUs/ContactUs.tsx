import { Container, Grid } from "@mui/material";
import React from "react";
import "./ContactUs.scss";

const ContactUs: React.FC = () => {
  return (
    <div className="main-container">
      <Container>
        <div className="content-title">
          <h2>Other Ways To Contact Us</h2>
        </div>
        <div className="section-content">
          <Grid container spacing={2} justifyContent="center">
            <Grid item sm={12} md={4} lg={4}>
              <div className="contact-card">
                <div className="contact-image">
                  <img src="assets\images\contact-images\mail.png" alt="" />
                </div>
                <div className="contact-title">
                  <h3>Email Us</h3>
                </div>
                <div className="contact-caption">
                  Email us for general queries, including <br /> insurance,
                  updates and opportunities.
                </div>
                <div className="contact-contact">admin@gocfs.pro</div>
              </div>
            </Grid>
            <Grid item sm={12} md={4} lg={4}>
              <div className="contact-card">
                <div className="contact-image">
                  <img
                    src="assets\images\contact-images\telephone.png"
                    alt=""
                  />
                </div>
                <div className="contact-title">
                  <h3>Call us</h3>
                </div>
                <div className="contact-caption">
                  Call us to speak to a member of our team. <br /> We are always
                  happy to help.
                </div>
                <div className="contact-contact">+1 (646) 786-5060</div>
              </div>
            </Grid>
            <Grid item sm={12} md={4} lg={4}>
              <div className="contact-card">
                <div className="contact-image">
                  <img
                    src="assets\images\contact-images\tech-support.png"
                    alt=""
                  />
                </div>
                <div className="contact-title">
                  <h3>Support</h3>
                </div>
                <div className="contact-caption">
                  Check out helpful resources, FAQs and <br /> financial tools.
                </div>
                <div className="contact-contact">Support Center</div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
