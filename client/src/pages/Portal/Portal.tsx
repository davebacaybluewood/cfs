import { Grid } from "@mui/material";
import React from "react";
import ReactHelmet from "react-helmet";
import { Parallax } from "react-parallax";
import PortalContent from "./PortalContent";
import "./Portal.scss";

const Portal: React.FC = () => {
  const metaKeywords = ["life insurance portal", "insurance agent portal"].join(
    ", "
  );
  return (
    <div className="portal-container">
      <ReactHelmet>
        <title>Life Insurance Portal | Comfort Financial Solutions</title>
        <meta
          name="description"
          content="Take charge of your financial future by attending insurance and financial events hosted by Comfort Financial Solutions. Discover how to manage your finances!"
        />
        <meta name="keywords" content={metaKeywords} />
        <link rel="canonical" href={window.location.href} />
      </ReactHelmet>

      <Grid container>
        <Grid item sm={12} md={6} lg={6}>
          <Parallax
            bgImage="https://images.pexels.com/photos/3228684/pexels-photo-3228684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            strength={500}
            bgImageSizes="100%"
          >
            <div style={{ height: 1000 }}>
              <PortalContent
                title="New Member"
                description=""
                linkProps={{
                  link: "https://agent.comfortfinancialsolutions.com/signup",
                  text: "Sign up",
                }}
                bgFadedPosition="right"
              />
            </div>
          </Parallax>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Parallax
            bgImage="https://images.pexels.com/photos/2505056/pexels-photo-2505056.jpeg"
            strength={500}
            bgImageSizes="100%"
          >
            <div style={{ height: 1000 }}>
              <PortalContent
                title="Agent
                  Back Office"
                description=""
                linkProps={{
                  link: "https://agent.comfortfinancialsolutions.com/",
                  text: "Login",
                }}
                bgFadedPosition="left"
              />
            </div>
          </Parallax>
        </Grid>
      </Grid>
    </div>
  );
};

export default Portal;
