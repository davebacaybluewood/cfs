import React from 'react'
import CarouselMui from 'react-material-ui-carousel'


interface CarouselProps {
    items: string[],
}

const Carousel: React.FC<CarouselProps> = (props) => {
    return (
        <CarouselMui indicators={false}>{props.items?.map((item, index) => <img key={index} src={item} />)}</CarouselMui>
    )
}

export default Carousel