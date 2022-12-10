import { Box, Grid } from "@mui/material";
import { Parallax } from "react-parallax";
import PortalContent from "./components/PortalContent";
import "./Portal.scss";

const Portal = () => {
  return (
    <div className="portal-container">
      <Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Parallax
              bgImage="https://images.pexels.com/photos/3228684/pexels-photo-3228684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              strength={500}
              bgImageSizes="100%"
            >
              <div style={{ height: 700 }}>
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
              <div style={{ height: 700 }}>
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
      </Box>
    </div>
  );
};

export default Portal;
