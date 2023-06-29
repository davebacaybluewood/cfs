import { Container, Grid, Typography } from "@mui/material";
import { HiOutlinePhone } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { SiFacebook } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaPinterest, FaLinkedin, FaTiktok } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import GridLinks from "./components/GridLinks";
import { paths } from "constants/routes";
import { Link } from "react-router-dom";
import "./Footer.scss";
import { COMPANY_NAME, SOCIAL_MEDIA_LINKS } from "constants/constants";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__header"></div>

      <div className="footer__main-section">
        <Container>
          <Grid container spacing={2} className="footer__main-section__links">
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <GridLinks
                title="Company Info"
                links={[
                  {
                    link: paths.about_us,
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

            <Grid item xs={12} sm={4} md={4} lg={2}>
              <GridLinks
                title="Solutions"
                links={[
                  {
                    link: paths.solutions,
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

            <Grid item xs={12} sm={4} md={4} lg={2}>
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
                ]}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={2}>
              <GridLinks
                title="Resources"
                links={[
                  {
                    link: paths.resources,
                    text: "Free Agent Training",
                  },
                  {
                    link: paths.resources,
                    text: "Blog",
                  },
                  // {
                  //   link: "/",
                  //   text: "24/7 Support",
                  // },
                  // Please disregard, this will be use in future development
                ]}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={2}>
              <h5>Get In Touch</h5>
              <ul>
                <li>
                  <a href="/">
                    <HiOutlinePhone />
                    <span>+1 (702) 900-5666</span>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <CiLocationOn /> <span>Las Vegas, NV</span>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <CiLocationOn
                      style={{
                        color: "transparent",
                      }}
                    />{" "}
                    <span>Los Angeles, CA</span>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <CiLocationOn
                      style={{
                        color: "transparent",
                      }}
                    />{" "}
                    <span>New York City, NY</span>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <MdEmail />
                    <span>support@gocfs.pro</span>
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
              Copyright {new Date().getFullYear()} | {COMPANY_NAME}
            </Typography>
          </div>
          <div className="footer__socials">
            <Link to={SOCIAL_MEDIA_LINKS.FACEBOOK}>
              <SiFacebook />
            </Link>
            <Link to={SOCIAL_MEDIA_LINKS.INSTAGRAM}>
              <RiInstagramFill />
            </Link>
            <Link to={SOCIAL_MEDIA_LINKS.TWITTER}>
              <AiOutlineTwitter />
            </Link>
            <Link to={SOCIAL_MEDIA_LINKS.LINKEDIN}>
              <FaLinkedin />
            </Link>
            <FaPinterest />
            <FaTiktok />
            <BsYoutube />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
