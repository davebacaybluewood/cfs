import { Container } from '@mui/material'
import Button from 'library/Button/Button'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'

const HeadLine: React.FC = () => {

    const [index, setIndex] = useState(1)

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


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                if (index > items.length) {
                    setIndex(1)
                }
                else {
                    setIndex((prev) => prev + 1)
                }
            } else if (event.key === 'ArrowLeft') {
                if (index < 1) {
                    setIndex(1)
                }
                else {
                    setIndex((prev) => prev - 1)
                }
            }
            console.log(index);

        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);





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