import { Container } from '@mui/material'
import Button from 'library/Button/Button'
import React from 'react'
import Carousel from 'react-material-ui-carousel'

const HeadLine: React.FC = () => {
    const items = [
        {
            title: '$1,000,000 retirement plan?',
            image: 'https://images.pexels.com/photos/3823493/pexels-photo-3823493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            learnMore: '',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ut fugit recusandae sit quasi tempora eligendi doloremque quas optio fugiat?'
        },
        {
            title: 'Struggling with getting leads?',
            image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            learnMore: '',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis laborum inventore qui perferendis consectetur dicta hic minus dolorem perspiciatis adipisci?'
        },

    ]
    return (
        <Container>
            <Carousel indicators={false}>
                {items.map((i, index) => (
                    <div className="carousel-headline" key={index}>
                        <img src={i.image} alt={i.image} />
                        <div className="card-headline-container">
                            <div className="card-content">
                                <h2>{i.title}</h2>
                                <p>{i.description}</p>
                                <Button variant='primary'>Learn More</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </Container>
    )
}

export default HeadLine