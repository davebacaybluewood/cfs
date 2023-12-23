import React, { useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import Button from 'library/Button/Button'
import Partners from 'library/Partners/Partners'
import TwoColContent from 'pages/Home/components/TwoColContent/TwoColContent'
import { FaArrowCircleRight, FaCheckCircle } from 'react-icons/fa'
import HeadLine from './components/Headline/HeadLine'
import Blogs from 'library/Blogs/Blogs'
import { useMediaQuery } from 'react-responsive'
import InquirySection from './components/Inquiry-Section/InquirySection'
import './HomeV2.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import Head from 'library/Head/Head'
import METATAGS from 'constants/metatags'
import capitalizeText from 'helpers/capitalizeText'
import AgentCard from './components/AgentCard/AgentCard'
import { paths } from 'constants/routes'


const HomeV2: React.FC = () => {

    const isMobile = useMediaQuery({ maxWidth: 767 })
    const location = useLocation();
    useEffect(() => {
        if (!location.hash) {
            window.scrollTo(0, 0);
        }
    }, [location]);
    const navigate = useNavigate()

    const url = window.location.href

    const items = [`customized financial solutions`, `free access of tools`, `new agent compensation structure`, `debt repayment strategies`, `retirement income projection`, `lead generation tracker`, `great rewards program`, `real time assistance`]

    const sliceIndex = Math.ceil(items.length / 2)
    const sliceItems = items.slice(0, sliceIndex)

    const nextItems = items.slice(sliceIndex, items.length)

    const topAgents = [
        {
            userGuid: 'fe7e02ce-453e-4c25-97ed-d5eccd5543eb123',
            firstName: 'Tracy',
            lastName: 'Song',
            description: 'The forefront of innovation. Always one step ahead, they introduce fresh perspectives, pioneering strategies that set the standard for the industry',
            profileImage: 'https://res.cloudinary.com/dfm2vczpy/image/upload/v1682026191/agent-avatars/bc3d654dad63611d96f7e1549c3e8b9a_mmxstx.jpg',
        },
        {
            userGuid: '78991d86-b4de-4d94-9e84-6e88d4b6f4bf',
            firstName: 'Mark',
            lastName: 'Test',
            description: 'Consistently reaches new heights, achieving and surpassing goals with finesse. Their commitment to excellence is unwavering, making them a true trailblazer in our organization.',
            profileImage: 'https://res.cloudinary.com/dfm2vczpy/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688418199/cfs-image_rkkknx.jpg?_s=public-apps',
        },
    ]

    return (
        <React.Fragment>
            <Head
                title={METATAGS.HOME.TITLE}
                keywords={METATAGS.HOME.KEYWORDS.join(", ")}
                canonical={window.location.href}
                description={METATAGS.HOME.DESCRIPTION}
            >
                <meta
                    name="google-site-verification"
                    content="-8SXobMJclzxTwefhzJ8i5kaM7zpKD-I3VqkfnJtWwc"
                />
                <meta name="msvalidate.01" content="11FA9EC5F1F79FDD3E3761BCB55B12D1" />
            </Head>
            <div className="home-page-container" >
                <div className="lead-section">
                    <HeadLine />
                </div>
                <Container>
                    <div className="top-agents-container">
                        <div className="content-header-agent">

                            <h2>CFS Top Agents</h2>
                            <TwoColContent
                                leftCol={
                                    <AgentCard firstName={topAgents[0].firstName} lastName={topAgents[0].lastName} description={topAgents[0].description} profileImage={topAgents[0].profileImage} onClick={() => navigate(`${paths.myWebPage.replace(':user', topAgents[0].userGuid)}`)} />
                                }
                                rightCol={
                                    <AgentCard firstName={topAgents[1].firstName} lastName={topAgents[1].lastName} description={topAgents[1].description} profileImage={topAgents[1].profileImage} onClick={() => navigate(`${paths.myWebPage.replace(':user', topAgents[1].userGuid)}`)} />
                                }
                            />
                            {/* This section is not yet dynamic, will be refactored and be coded dynamically if the top agent function is done. */}
                        </div>
                    </div>
                    <div className="border"></div>
                    <div className="dual-col-section">
                        <TwoColContent leftCol={
                            <div className="captions">
                                <h2>Streamline Success</h2>
                                <p>
                                    Elevate your business efficiency with our all-in-one-app , your key to seamless operations , enhanced productivity and staying ahead in today's dynamic market . One app , endless possibilities , keeping your business always moving forward
                                </p>
                            </div>
                        } rightCol={
                            <img src="https://www.tieit.ai/wp-content/uploads/2022/12/13634-data-analysis-animation.gif" alt="chart" />
                        } />
                    </div>

                    {isMobile && <Container>
                        <div className="border"></div>
                    </Container>}

                    <div className="dual-col-section section-b">
                        <TwoColContent leftCol={
                            <img src="https://www.tieit.ai/wp-content/uploads/2022/12/13634-data-analysis-animation.gif" alt="chart" />} rightCol={
                                <React.Fragment>
                                    <div className="captions">
                                        <h2>Insight Fusion</h2>
                                        <p>
                                            Empower your decision-making with our integrated platform, where all your insights converge flawlessly.
                                        </p>
                                        <p>
                                            Gain a comprehensive view of your data, enabling informed, data-driven decisions at your fingertips.
                                        </p>
                                    </div>
                                </React.Fragment>
                            } />
                    </div>


                    <div className="product-highlights">
                        <TwoColContent leftSize={9} leftCol={
                            <React.Fragment>
                                <div className="captions">
                                    <h2>Count on us!</h2>
                                    <p>
                                        We are here to help! Whether it's support, guidance, or solutions, our dedicated team is ready to assist you every step of the way. Your success is our priority.
                                    </p>
                                </div>
                                <TwoColContent leftCol={
                                    <React.Fragment>
                                        <ul className='left-list'>
                                            <li> <FaCheckCircle /> <span> <h2>Agent Support</h2> </span> </li>
                                            <li> <FaCheckCircle /> <span> <h2>CFS Portal </h2> </span></li>
                                        </ul>
                                    </React.Fragment>
                                } rightCol={
                                    <React.Fragment>
                                        <ul className='right-list'>
                                            <li> <FaCheckCircle /> <span> <h2>CFS Resources</h2> </span></li>
                                            <li> <FaCheckCircle /> <span> <h2>Agent Tools</h2> </span></li>
                                        </ul>
                                    </React.Fragment>
                                } />
                            </React.Fragment>
                        } rightCol={
                            <React.Fragment>
                                <img src="/assets/images/homev2/teach.svg" alt="" />
                            </React.Fragment>
                        } />
                    </div>

                    <div className="tri-section">
                        <InquirySection />
                    </div>



                    <div className="blogs-container">
                        <Blogs
                            title="CFS Blogs"
                            blogsConfig={{
                                limit: 3,
                                skip: 0,
                            }}
                        />
                    </div>

                    <div className="calendar-container">
                        <div className="content-header">
                            <h2>Unveiling Transformation</h2>
                        </div>

                        <div className="offers" >
                            <Grid container spacing={20}   >
                                <Grid item md={6} >
                                    <ul>
                                        {sliceItems.map((s) => (
                                            <li> <FaCheckCircle /> <span> <h2>{capitalizeText(s)}</h2> </span> </li>
                                        ))}
                                    </ul>
                                </Grid>
                                <Grid item md={6} >
                                    <ul>
                                        {nextItems.map((n) => (
                                            <li> <FaCheckCircle /> <span> <h2>{capitalizeText(n)}</h2> </span> </li>
                                        ))}
                                    </ul>
                                </Grid>
                            </Grid>
                        </div>

                        <div className="captions">
                            <h2>Got 15 minutes?</h2>
                            <p> Discover the transformative power of our solution, <br /> unlocking insights and innovations that will leave you pleasantly surprised.</p>
                            <Button variant='primary'>Get a Demo <FaArrowCircleRight /> </Button>
                        </div>

                    </div>
                </Container>
                <div className="partner-carousel">
                    <Partners />
                </div>


            </div >
        </React.Fragment>
    )
}

export default HomeV2