import { Container } from '@mui/material'
import Button from 'library/Button/Button'
import React from 'react'
import Carousel from 'react-material-ui-carousel'

const HeadLine: React.FC = () => {

    const items = [
        {
            position: 'left',
            title: '$1,000,000 retirement plan?',
            image: '/assets/images/homev2/retire.jpg',
            learnMore: '',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ut fugit recusandae sit quasi tempora eligendi doloremque quas optio fugiat?'
        },
        {
            position: 'right',
            title: 'Struggling with getting leads?',
            image: '/assets/images/homev2/team.jpg',
            learnMore: '',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis laborum inventore qui perferendis consectetur dicta hic minus dolorem perspiciatis adipisci?'
        },
        {
            position: 'center',
            title: 'Want to achieve Financial Freedom?',
            image: '/assets/images/homev2/earn.jpg',
            learnMore: '',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis laborum inventore qui perferendis consectetur dicta hic minus dolorem perspiciatis adipisci?'
        },

    ]

    return (
        <Carousel indicators={false} navButtonsAlwaysVisible interval={5000} >
            {items.map((i, index) => (
                <div className="carousel-headline" key={index}>
                    <div className="headline-img-holder">
                        <img src={i.image} alt={i.image} />
                    </div>
                    <div className="card-headline-container">
                        <Container sx={i.position === 'left' ? { display: 'flex', justifyContent: 'flex-start' } : i.position === 'right' ? { display: 'flex', justifyContent: 'flex-end' } : { display: 'flex', justifyContent: 'center' }}   >
                            <div className="card-content">
                                <h2>{i.title}</h2>
                                <p>{i.description}</p>
                                <Button variant='primary'>Learn More</Button>
                            </div>
                        </Container>
                    </div>
                </div>
            ))}
        </Carousel>
    )
}

export default HeadLine