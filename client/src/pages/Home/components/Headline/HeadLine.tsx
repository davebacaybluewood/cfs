import { Container } from '@mui/material'
import Button from 'library/Button/Button'
import React from 'react'
import Carousel from 'react-material-ui-carousel'

const HeadLine: React.FC = () => {

    const items = [
        {
            title: '$1,000,000 retirement plan?',
            image: 'https://www.foresters.com/-/media/forestersmvc/images/life-insurance/planright/21planrightns.jpg',
            learnMore: '',
            description: 'Secure your golden years with our exclusive opportunities that gurantees a robust retirement income of $1 million or more . Embrace financial peace of mind and live your retirement dreams worry free'
        },
        {
            title: 'Struggling with getting leads?',
            image: 'https://www.foresters.com/-/media/forestersmvc/images/life-insurance/universal-life/4smartuniversalbanner.jpg',
            learnMore: '',
            description: 'Our proven strategies will supercharge your lead generation efforts , ensuring a steady stream of qualified prospects for your business growth . Join now for a seamless experience that transforms leads into success !'
        },
        {
            title: 'Want to achieve Financial Freedom?',
            image: 'https://www.foresters.com/-/media/forestersmvc/images/life-insurance/brightfutures/18brightfuturens.jpg',
            learnMore: '',
            description: 'Transform your financial landscape and achieve true freedom . Our tailored solutions and personalized strategies empower you to break free from financial constraints , opening doors to a life of independence and prosperity .  Take the first step towards your financial goals today .'
        },

    ]

    return (
        <Carousel indicators={false} navButtonsAlwaysVisible interval={5000} height={700} >
            {
                items.map((i, index) => (
                    <div className="carousel-headline" key={index}>
                        <img src={i.image} alt={i.image} />
                        <div className="card-headline-container">
                            <Container>
                                <div className="card-content">
                                    <h2>{i.title}</h2>
                                    <p>{i.description}</p>
                                    <Button variant='primary'>Learn More</Button>
                                </div>
                            </Container>
                        </div>
                    </div>
                ))
            }
        </Carousel>
    )
}

export default HeadLine