import { Container, Grid, Typography } from "@mui/material";
import { HiOutlinePhone } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { SiFacebook } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import GridLinks from "./components/GridLinks";
import { paths } from "constants/routes";
import { Link } from "react-router-dom";
import "./Footer.scss";
import {
  COMPANY_CONTACT_INFO,
  COMPANY_NAME,
  SOCIAL_MEDIA_LINKS,
  TWITTER_LOGO,
} from "constants/constants";
import Partners from "library/Partners/Partners";

interface FooterProps {
  showPartners?: boolean;
}



const Footer: React.FC<FooterProps> = (props) => {
  return (
    <div className="footer">
      <div className="footer__header">
        {props.showPartners ? <Partners /> : null}
      </div>

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
                    link: paths.about_us,
                    text: "Our Mission",
                  },
                  {
                    link: paths.about_us,
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
                    link: paths.family_protection,
                    text: "For Families",
                  },
                  {
                    link: paths.individual_protection,
                    text: "For Individuals",
                  },
                  {
                    link: paths.join_our_team,
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
                    link: paths.cfsPages.replace(":pageId", "cfs-edge"),
                    text: "CFS Edge",
                  },
                  {
                    link: paths.cfsPages.replace(":pageId", "cfs-advantage"),
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
                  <HiOutlinePhone />
                  <span>{COMPANY_CONTACT_INFO.PHONE}</span>
                </li>
                <li>
                  <CiLocationOn /> <span>{COMPANY_CONTACT_INFO.STATE_NV}</span>
                </li>
                <li>
                  <CiLocationOn /> <span>{COMPANY_CONTACT_INFO.STATE_CA}</span>
                </li>
                <li>
                  <CiLocationOn /> <span>{COMPANY_CONTACT_INFO.STATE_NY}</span>
                </li>
                <li>
                  <a href="mailto:support@gocfs.pro">
                    <MdEmail />
                    <span>{COMPANY_CONTACT_INFO.EMAIL}</span>
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
              <TWITTER_LOGO width="18" height="18" viewBox="0 0 24 24" reactX={0} reactY={0} reactWidth={24} reactHeight={24} reactFill={"#23a6f0"} pathFill={"#0e1f51"} />
            </Link>
            <Link to={SOCIAL_MEDIA_LINKS.LINKEDIN}>
              <FaLinkedin />
            </Link>
            {/* <FaPinterest />
            <FaTiktok />
            <BsYoutube /> Pleasse disregard for future use*/}
          </div>
        </Container>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  showPartners: false,
};
export default Footer;
