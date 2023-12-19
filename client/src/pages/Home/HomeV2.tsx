import React from 'react'
import './HomeV2.scss'
import { Container } from '@mui/material'
import Button from 'library/Button/Button'
import Partners from 'library/Partners/Partners'
import HelpSection from './components/HelpSection/HelpSection'
import TwoColContent from 'library/TwoColContent/TwoColContent'
import { FaCheckCircle } from 'react-icons/fa'

const HomeV2: React.FC = () => {
    return (
        <div className="home-page-container">
            <Container>
                <div className='leading-section'>
                    <TwoColContent leftCol={
                        <React.Fragment>
                            <h2>One platform to run your organization, all in one place.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quasi voluptatem pariatur voluptatibus quam voluptas necessitatibus obcaecati, itaque rerum laboriosam?</p>
                            <Button variant='primary'>Get A Demo</Button>
                        </React.Fragment>
                    } rightCol={
                        <React.Fragment>
                            <div className="image-holder">
                                <img src="https://www.tieit.ai/wp-content/uploads/2023/03/TIEIT-All-in-one-image-2-e1678066112361.png" alt="chart" />
                            </div>
                        </React.Fragment>
                    } />
                    <div className="border"></div>
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
                                        <li> <FaCheckCircle /> <span> <h2>Lorem ipsum dolor sit amet.</h2> </span> </li>
                                        <li> <FaCheckCircle /> <span> <h2>Lorem ipsum dolor sit amet.</h2> </span></li>
                                    </ul>
                                </React.Fragment>
                            } rightCol={
                                <React.Fragment>
                                    <ul className='right-list'>
                                        <li> <FaCheckCircle /> <span> <h2>Lorem ipsum dolor sit amet.</h2> </span></li>
                                        <li> <FaCheckCircle /> <span> <h2>Lorem ipsum dolor sit amet.</h2> </span></li>
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
            </Container>
        </div>
    )
}

export default HomeV2