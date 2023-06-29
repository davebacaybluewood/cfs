import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Edge.scss";
import { Button, Grid } from "@mui/material";
import {
  FaCalendarAlt,
  FaChartLine,
  FaPeopleCarry,
  FaTools,
  FaUserEdit,
} from "react-icons/fa";
import CompanyLogo from "pages/LandingPages/components/CompanyLogo";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import AgentSection from "pages/LandingPages/components/AgentSection";
import { MAIN_WEBSITE_LINK } from "admin/constants/constants";

const Edge: React.FC = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState(0);
  const [showActions, setShowActions] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    setHeight(ref.current!.clientHeight);
  }, []);

  const [y, setY] = useState(document.scrollingElement?.scrollHeight);

  const handleNavigation = useCallback(
    (e) => {
      if (parseInt(y?.toString() ?? "") > height) {
        setShowActions(true);
        console.log(y);
      } else if (parseInt(y?.toString() ?? "") < height) {
        setShowActions(false);
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  const homeLink = "http://localhost:3000"; //http://localhost:3000/
  const absoluteLink = `${homeLink}?weeklyOpen=true`;
  const { agentGuid, pageId } = useParams();

  return (
    <div className="page-wrapper page-dark">
      <Helmet>
        {`
                 !function(f,b,e,v,n,t,s)
                 {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                 n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                 if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                 n.queue=[];t=b.createElement(e);t.async=!0;
                 t.src=v;s=b.getElementsByTagName(e)[0];
                 s.parentNode.insertBefore(t,s)}(window, document,'script',
                 'https://connect.facebook.net/en_US/fbevents.js');
                 fbq('init', '244835231377619');
                 fbq('track', 'PageView');
            `}
        <title>CFS Edge Agents Support | Comfort Financial Solutions</title>
        <meta
          name="description"
          content="CFS Edge gives agents the advantage by bridging the gap between agents and clients, and removes every barrier to success that agents face to stay competitive."
        ></meta>
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <AgentSection agentGuid={agentGuid ?? ""} pageId={pageId ?? ""} />
      <section className="section-page section-dark" ref={ref}>
        <Grid container>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <div className="section-content first-section">
              <CompanyLogo size="medium" />
              <h2>
                Get the <br /> <span>CFS EDGE</span> <br /> You Need
              </h2>
              <p>Win the competition with CFS EDGE</p>
              <ul>
                <li>
                  <div className="icon-holder">
                    <FaTools />
                  </div>
                  <span>
                    Stay competitive and productive with the{" "}
                    <span className="bold">
                      MODERN STRATEGIES & SUPERIOR TOOLS
                    </span>
                  </span>
                </li>
                <li>
                  <div className="icon-holder">
                    <FaPeopleCarry />
                  </div>
                  <span>
                    Execute with speed and efficiency with{" "}
                    <span className="bold">
                      OPTIMIZED PROCESSES & STEADFAST SUPPORT
                    </span>
                  </span>
                </li>
                <li>
                  <div className="icon-holder">
                    <FaChartLine />
                  </div>
                  <span>
                    Build your career and reputation with an{" "}
                    <span className="bold">ASSURED GROWTH & OWNERSHIP</span>
                  </span>
                </li>
              </ul>
              {/* <div className="page-card-container">
                <Grid container spacing={2}>
                  <Grid item sm={4}>
                    <div className="page-card">
                      <div className="background-image"></div>
                      <div className="card-content">
                        <div className="icon-holder">
                          <FaTools />
                        </div>
                        <span>
                          Stay competitive and productive with the MODERN
                          STRATEGIES & SUPERIOR TOOLS
                        </span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={4}>
                    <div className="page-card">
                      <div className="background-image"></div>
                      <div className="card-content">
                        <div className="icon-holder">
                          <FaPeopleCarry />
                        </div>
                        <span>
                          Execute with speed and efficiency with OPTIMIZED
                          PROCESSES & STEADFAST SUPPORT
                        </span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={4}>
                    <div className="page-card">
                      <div className="background-image"></div>
                      <div className="card-content">
                        <div className="icon-holder">
                          <FaChartLine />
                        </div>
                        <span>
                          Build your career and reputation with an ASSURED
                          GROWTH & OWNERSHIP
                        </span>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div> */}
              <div>
                <Button
                  onClick={() =>
                    window.open(
                      "https://agent.comfortfinancialsolutions.com/signup",
                      "_blank"
                    )
                  }
                >
                  Join Our Team FOR FREE
                </Button>

                <Button
                  onClick={() => {
                    // window.open("https://www.gocfs.pro/home?isPopupOpen=true")
                    window.open(absoluteLink, "_blank");
                  }}
                >
                  JOIN OUR FREE WEBINAR
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div
              style={{
                backgroundImage: `url("https://images.pexels.com/photos/277124/pexels-photo-277124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
              }}
              className="header-image"
            ></div>
          </Grid>
        </Grid>
      </section>
      <section className="section-page section-light">
        <div className="section-content second-section">
          <CompanyLogo size="small" />
          <h2>WHAT IS CFS EDGE</h2>
          <div className="section-child-content">
            <p>Built from CFS's winning culture, </p>
            <p>
              <span>CFS EDGE</span> ecosystem was developed with modern, highly
              competitive agents in mind.{" "}
            </p>
            <p>
              To put it simply, it gives agents the advantage by bridging the
              gap between agents and clients, and removes every barrier to
              success that agents face in terms of output, workflow, assistance,
              and professional development.
            </p>
          </div>
        </div>
      </section>
      <section className="section-page section-dark">
        <div className="section-content third-section section-simple">
          <CompanyLogo size="small" />
          <h2>MODERN STRATEGIES & SUPERIOR TOOLS</h2>
          <div className="section-child-content">
            <p>
              At the heart of CFS EDGE are modern financial STRATEGIES backed by
              proven strategies that help clients with the their financial goals
              or woes. These solutions covers financial literacy, debt
              management, wealth building, retirement planning, long term care,
              and estate planning. To stay competative, CFS continuesly studies
              the market, look for clients needs, and create the best solution.{" "}
            </p>
            <p>
              "A productive agent is a succesful agent" With that in mind, CFS
              created superior tools to remove the barriers to high
              productivity. CFS EDGE tools include, Prospecting and Lead
              Generation tools, Plan Analyzers and Scenario Builders, Monitoring
              and Reporting Tools, and a lot more.
            </p>
          </div>
        </div>
      </section>
      <section className="section-page section-light">
        <div className="section-content third-section section-simple">
          <CompanyLogo size="small" />
          <h2>OPTIMIZED PROCESSES & STEADFAST SUPPORT</h2>
          <div className="section-child-content">
            <p>
              With a focus on continuous improvement and innovation, CFS has
              successfully streamlined and optimized existing processes to
              deliver faster, more efficient and cost-effective solutions for
              its agents and clients.{" "}
            </p>
            <p>
              Through a combination of technology and industry expertise, CFS
              has introduced new and improved processes that have revolutionized
              the way the life insurance industry operates. From underwriting
              and claims processing to policy administration and customer
              service, CFS has raised the bar for performance and efficiency.
            </p>
            <p>
              In addition to optimized processes, CFS also offers comprehensive
              support to its agents. This includes a range of sales and
              marketing support services, trainings and webinars. CFS
              understands that its agents are critical to the success of its
              business, and therefore provides ongoing support to ensure their
              success.
            </p>
          </div>
        </div>
      </section>
      <section className="section-page section-dark">
        <div className="section-content forth-section section-simple">
          <CompanyLogo size="small" />
          <h2>ASSURED GROWTH & OWNERSHIP</h2>
          <div className="section-child-content">
            <p>
              CFS offers a growth track for both new and seasoned agents, which
              is complemented by competitive compensation and bonuses. This
              growth track provides agents with a clear path for advancement and
              offers opportunities for personal and professional development.
              Agents can take advantage of ongoing training and support to
              enhance their skills and advance their careers.
            </p>
            <p>
              As agents progress in their careers, CFS has established a system
              to help them own their own agency. This is an excellent
              opportunity for agents to build their own legacy and leave a
              lasting impact on the industry. CFS provides support and guidance
              to agents throughout the process of owning their own agency,
              ensuring that they have the resources they need to succeed.
            </p>
          </div>
        </div>
      </section>

      {showActions ? (
        <div className="page-actions">
          <div
            className="button-holder"
            onClick={() =>
              window.open(
                "https://agent.comfortfinancialsolutions.com/signup",
                "_blank"
              )
            }
          >
            <div className="icon-holder">
              <FaUserEdit />
            </div>
            <span>JOIN OUR TEAM FOR FREE</span>
          </div>
          <div
            className="button-holder"
            onClick={() => {
              // window.open("https://www.gocfs.pro/home?isPopupOpen=true")
              window.open(absoluteLink, "_blank");
            }}
          >
            <div className="icon-holder">
              <FaCalendarAlt />
            </div>
            <span>JOIN OUR FREE WEBINAR</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Edge;
