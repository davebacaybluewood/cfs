import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Advantage.scss";
import { Button, Grid } from "@mui/material";
import CompanyLogo from "pages/LandingPages/components/CompanyLogo";
import { useParams } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClipboardCheck,
  FaMoneyBillWaveAlt,
  FaPeopleCarry,
} from "react-icons/fa";
import { Helmet } from "react-helmet";
import AgentSection from "pages/LandingPages/components/AgentSection";
import { MAIN_WEBSITE_LINK } from "admin/constants/constants";

const Advantage: React.FC = () => {
  const { agentGuid, pageId } = useParams();
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
  const absoluteLink = `${homeLink}?consultationOpen=true`;

  const consultHandler = () => {
    window.open(absoluteLink, "_blank");
  };

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
                fbq('init', '707929211079597');
                fbq('track', 'PageView');
            `}
        <title>
          CFS Advantage Financial Strategies | Comfort Financial Solutions
        </title>
        <meta
          name="description"
          content="CFS Advantage is an ecosystem of financial strategies using proven financial solutions such as debt management, retirement planning, insurance and estate planning."
        ></meta>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <AgentSection agentGuid={agentGuid ?? ""} pageId={pageId ?? ""} />
      <section
        className="section-page section-dark"
        id="first-section"
        ref={ref}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <div className="section-content first-section">
              <CompanyLogo size="medium" />
              <h2>
                Get the <br /> <span>CFS ADVANTAGE</span> <br /> you need{" "}
              </h2>
              <p>
                Secure comfort for today and tomorrow by being in control with
                your finances
              </p>
              <ul>
                <li>
                  <div className="icon-holder">
                    <FaClipboardCheck />
                  </div>
                  <span>
                    Understand essential and advanced money management concepts
                    and make better financial decisions with CFS Financial
                    Literacy Program
                  </span>
                </li>
                <li>
                  <div className="icon-holder">
                    <FaPeopleCarry />
                  </div>
                  <span>
                    Reach your financial goals faster with proven CFS Financial
                    Solutions
                  </span>
                </li>
                <li>
                  <div className="icon-holder">
                    <FaMoneyBillWaveAlt />
                  </div>
                  <span>
                    Have full control with how you manage your money with CFS
                    Financial Tools
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
                          <FaClipboardCheck />
                        </div>
                        <span>
                          Understand essential and advanced money management
                          concepts and make better financial decisions with CFS
                          Financial Literacy Program
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
                          Reach your financial goals faster with proven CFS
                          Financial Solutions
                        </span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={4}>
                    <div className="page-card">
                      <div className="background-image"></div>
                      <div className="card-content">
                        <div className="icon-holder">
                          <FaMoneyBillWaveAlt />
                        </div>
                        <span>
                          Have full control with how you manage your money with
                          CFS Financial Tools
                        </span>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div> */}
              {/* <Button onClick={() => joinUsHandler()}>Join Our Team</Button> */}
              <Button onClick={() => consultHandler()}>
                Book a free consultation
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <div
              style={{
                backgroundImage: `url("https://images.pexels.com/photos/4545160/pexels-photo-4545160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
              }}
              className="header-image"
            ></div>
          </Grid>
        </Grid>
      </section>
      <section className="section-page section-light">
        <div className="section-content second-section">
          <CompanyLogo size="small" />
          <div>
            <h2>WHAT IS CFS ADVANTAGE</h2>
            <h3>Be in Control with CFS ADVANTAGE</h3>
            <div className="section-child-content">
              <p>
                CFS Advantage is a comprehensive ecosystem of financial
                strategies designed using modern and proven financial solutions.
                This ecosystem includes debt management, retirement planning,
                long-term care, and estate planning. In addition to these
                strategies, CFS Advantage also offers financial literacy
                programs to help clients improve their financial knowledge and
                make informed decisions.
              </p>
              <p>
                Furthermore, CFS Advantage provides a range of financial tools
                for its clients such as templates, checklists, and calculators.
                These tools help clients track their financial progress and make
                better decisions regarding their finances. With CFS Advantage,
                clients can access a complete suite of financial services that
                are tailored to their specific needs and goals.
              </p>
              <p>
                Overall, CFS Advantage provides a comprehensive solution for
                clients seeking to manage their finances effectively and make
                informed decisions about their future. By leveraging modern
                financial strategies and tools, clients can achieve financial
                success and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-page section-dark">
        <div className="section-content third-section section-simple">
          <CompanyLogo size="small" />
          <h2>CFS FINANCIAL LITERACY PROGRAM</h2>
          <p>
            CFS Financial Literacy Program is a comprehensive initiative that
            offers financial learning opportunities through various mediums such
            as social media content, blogs, emails, training, webinars, and
            courses. The program aims to empower individuals with financial
            knowledge and equip them with the tools necessary to make informed
            decisions about their finances. The program provides practical
            skills and knowledge to help clients achieve their financial goals
            and secure their future.
          </p>
        </div>
      </section>
      <section className="section-page section-light">
        <div className="section-content forth-section section-list">
          <CompanyLogo size="small" />
          <h2 className="animate__animated animate__bounce">
            CFS FINANCIAL SOLUTIONS
          </h2>
          <div className="section-child-content">
            <div className="list">
              <h3>CFS Wealth Builder</h3>
              <p>
                This program focuses on debt management and capital growth using
                whole life insurance. It helps clients build wealth while
                managing their debt effectively.
              </p>
            </div>
            <div className="list">
              <h3>CFS Financial Freedom</h3>
              <p>
                This program offers retirement planning using Indexed Universal
                Life insurance. It helps clients secure their retirement by
                providing guaranteed income and growth potential.
              </p>
            </div>
            <div className="list">
              <h3>CFS Long-Term Care (Coming Soon)</h3>
              <p>
                This program focuses on long-term care planning. It helps
                clients prepare for the possibility of needing long-term care
                and provides financial support for such care.{" "}
              </p>
            </div>
            <div className="list">
              <h3>CFS Legacy Builder (Coming Soon)</h3>
              <p>
                This program offers estate planning solutions to help clients
                leave a legacy for their loved ones. It helps clients create a
                plan for the distribution of their assets and ensures their
                wishes are fulfilled.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-page section-dark">
        <div className="section-content fifth-section section-simple">
          <CompanyLogo size="small" />
          <h2>CFS FINANCIAL TOOLS (Coming Soon)</h2>
          <div className="section-child-content">
            <p>
              CFS provides a range of tools to help clients track their progress
              on their financial journey. These tools are designed to cater to
              clients at all levels, from beginners to advanced users. The tools
              offered by CFS include but are not limited to checklists,
              templates, calculators, analyzers, and trackers.
            </p>
            <p>
              Checklists help clients ensure that they have completed all the
              necessary steps to achieve their financial goals. Templates
              provide pre-designed formats or layouts that clients can use to
              create documents or other materials quickly and efficiently.
              Calculators allow clients to perform complex financial
              calculations with ease, providing them with accurate and reliable
              results. Analyzers help clients evaluate their financial
              situations and identify areas that require improvement. Finally,
              trackers allow clients to monitor their progress and keep track of
              their financial goals.
            </p>
            <p>
              With these tools, CFS empowers clients to take control of their
              finances and make informed decisions about their financial future.
              By providing these resources, CFS helps clients achieve their
              financial goals and achieve financial success.
            </p>
          </div>
        </div>
      </section>

      {showActions ? (
        <div className="page-actions">
          {/* <div className='button-holder' onClick={() => joinUsHandler()}>
                    <FaUserEdit />
                    <span>JOIN OUR TEAM</span>
                </div> */}
          <div
            className="button-holder"
            onClick={() => {
              window.open(absoluteLink);
            }}
            style={{ width: 260 }}
          >
            <div className="icon-holder">
              <FaCalendarAlt />
            </div>
            <span>Book a free consultation</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Advantage;
