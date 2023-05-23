import { Container, Grid, Typography } from "@mui/material";
import { HiOutlinePhone } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { SiFacebook } from "react-icons/si";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import "./Footer.scss";
import GridLinks from "./components/GridLinks";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__header">
        <Container>
          <Typography variant="h3">Comfort Financial Solutions</Typography>
          <Typography variant="h5">
            The quick fox jumps over the lazy dog
          </Typography>
        </Container>
      </div>

      <div className="footer__main-section">
        <Container>
          <Grid container spacing={2} className="footer__main-section__links">
            <Grid item xs={12} sm={12} md={12} lg={2}>
              <GridLinks
                title="Company Info"
                links={[
                  {
                    link: "/",
                    text: "About Us",
                  },
                  {
                    link: "/",
                    text: "Our Mission",
                  },
                  {
                    link: "/",
                    text: "Our Vision",
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={2}>
              <GridLinks
                title="Solutions"
                links={[
                  {
                    link: "/",
                    text: "About Us",
                  },
                  {
                    link: "/",
                    text: "For Families",
                  },
                  {
                    link: "/",
                    text: "For Individuals",
                  },
                  {
                    link: "/",
                    text: "For Agents",
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={2}>
              <GridLinks
                title="Features"
                links={[
                  {
                    link: "/",
                    text: "CFS Edge",
                  },
                  {
                    link: "/",
                    text: "CFS Advantage",
                  },
                  {
                    link: "/",
                    text: "Live Chat",
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={2}>
              <GridLinks
                title="Resources"
                links={[
                  {
                    link: "/",
                    text: "24/7 support",
                  },
                  {
                    link: "/",
                    text: "Free Agent Training",
                  },
                  {
                    link: "/",
                    text: "Blog",
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={2}>
              <h5>Get In Touch</h5>
              <ul>
                <li>
                  <a href="/">
                    <HiOutlinePhone />
                    <span>(480)555-0103</span>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <CiLocationOn /> <span>Nevada, Texas</span>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <MdEmail />
                    <span>admin@gocfs.pro</span>
                  </a>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="sub-footer">
        <Container>
          <div className="footer__copyright">
            <Typography variant="h5">
              Copyright 2023 | Comfort Financial Solutions
            </Typography>
          </div>
          <div className="footer__socials">
            <SiFacebook />
            <BsInstagram />
            <AiOutlineTwitter />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
