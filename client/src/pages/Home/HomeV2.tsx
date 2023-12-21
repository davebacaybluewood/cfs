import React from 'react'
import './HomeV2.scss'
import { Container, Grid } from '@mui/material'
import Button from 'library/Button/Button'
import Partners from 'library/Partners/Partners'
import HelpSection from './components/HelpSection/HelpSection'
import TwoColContent from 'library/TwoColContent/TwoColContent'
import { FaArrowCircleRight, FaCheckCircle } from 'react-icons/fa'
import HeadLine from './components/Headline/HeadLine'
import Blogs from 'library/Blogs/Blogs'
import Card, { CardProps } from './components/Card/Card'

const HomeV2: React.FC = () => {
    const topAgents: CardProps[] = [
        {
            name: 'Jane Doe',
            description: 'Bravo Agent',
            profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            name: 'John Doe',
            description: 'Wealth Builder Agent',
            profileImage: 'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
    ]
    return (
        <div className="home-page-container" >
            <div className="lead-section">
                <HeadLine />
            </div>
            <div className="partner-carousel">
                <Partners />
            </div>
            <div className="features-section">
                <div className="captions">
                    <h2>Built for growing organizations.</h2>
                    <p>Simplify work and get more done using one powerful application.</p>
                </div>
                <HelpSection />
            </div>
            <Container>
                <div className="dual-col-section">
                    <TwoColContent leftCol={
                        <React.Fragment>
                            <div className="captions">
                                <h2>One app keeps your business moving forward.</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet corrupti ducimus necessitatibus nostrum laboriosam fuga!
                                </p>
                            </div>
                        </React.Fragment>
                    } rightCol={
                        <React.Fragment>
                            <img src="https://www.tieit.ai/wp-content/uploads/2022/12/13634-data-analysis-animation.gif" alt="chart" />
                        </React.Fragment>
                    } />
                </div>
                <div className="dual-col-section section-b">
                    <TwoColContent leftCol={
                        <img src="https://www.tieit.ai/wp-content/uploads/2022/12/13634-data-analysis-animation.gif" alt="chart" />} rightCol={
                            <React.Fragment>
                                <div className="captions">
                                    <h2>Access all your insights in one place to make data-driven decisions.</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa facilis incidunt neque possimus distinctio, iusto consequatur provident temporibus sit tempora.
                                    </p>
                                    <p>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere veritatis a impedit quasi voluptas omnis nemo suscipit quo veniam nostrum.
                                    </p>
                                </div>
                            </React.Fragment>
                        } />
                </div>
                {/* <div className='testimonial-container'></div> discarded for future use */}
                <div className="product-highlights">
                    <TwoColContent leftSize={9} leftCol={
                        <React.Fragment>
                            <div className="captions">
                                <h2>We're Here to Help</h2>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas impedit doloremque harum aliquid laboriosam. Neque minima quasi dolorum ullam facere alias incidunt fugit, molestiae impedit.</p>
                            </div>
                            <TwoColContent leftCol={
                                <React.Fragment>
                                    <ul className='left-list'>
                                        <li> <FaCheckCircle /> <span> <h2>Free Email Support</h2> </span> </li>
                                        <li> <FaCheckCircle /> <span> <h2>Lunch & Learns</h2> </span></li>
                                    </ul>
                                </React.Fragment>
                            } rightCol={
                                <React.Fragment>
                                    <ul className='right-list'>
                                        <li> <FaCheckCircle /> <span> <h2>Online Knowledge Base</h2> </span></li>
                                        <li> <FaCheckCircle /> <span> <h2>Email Pro</h2> </span></li>
                                    </ul>
                                </React.Fragment>
                            } />
                            <div className="captions">
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, exercitationem.</p>
                            </div>
                        </React.Fragment>
                    } rightCol={
                        <React.Fragment>
                            <img src="/assets/images/homev2/educate.png" alt="" />
                        </React.Fragment>
                    } />
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
                        <h2>Getting to your “OMG” and “Aha!” moment is just a demo away</h2>
                    </div>

                    <div className="offers">
                        <TwoColContent leftCol={
                            <React.Fragment>
                                <ul>
                                    <li> <FaCheckCircle /> <span> <h2>Lorem ipsum dolor sit.</h2> </span> </li>
                                    <li> <FaCheckCircle /> <span> <h2>Lorem ipsum dolor sit.</h2> </span> </li>
                                    <li> <FaCheckCircle /> <span> <h2>Lorem ipsum dolor sit.</h2> </span> </li>
                                    <li> <FaCheckCircle /> <span> <h2>Lorem ipsum dolor sit.</h2> </span> </li>
                                </ul>
                            </React.Fragment>
                        } rightCol={
                            <React.Fragment>
                                <ul>
                                    <li> <FaCheckCircle /> <span> <h2>Lorem ipsum dolor sit.</h2> </span> </li>
                                    <li> <FaCheckCircle /> <span> <h2>Lorem ipsum dolor sit.</h2> </span> </li>
                                    <li> <FaCheckCircle /> <span> <h2>Lorem ipsum dolor sit.</h2> </span> </li>
                                    <li> <FaCheckCircle /> <span> <h2>Lorem ipsum dolor sit.</h2> </span> </li>
                                </ul>
                            </React.Fragment>
                        } />
                    </div>

                    <div className="captions">
                        <h2>Got 15 minutes?</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe asperiores voluptates corporis sint?</p>
                        <Button variant='primary'>Get a Demo <FaArrowCircleRight /> </Button>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>

                </div>
            </Container>
            <div className="partner-carousel">
                <Partners />
            </div>


        </div >
    )
}

export default HomeV2