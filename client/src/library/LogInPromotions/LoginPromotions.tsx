import React from 'react'
import './LoginPromotions.scss'
import Carousel from 'library/Carousel/Carousel'

const LoginPromotions: React.FC = () => {
    const items = ['https://media.licdn.com/dms/image/D5605AQFJaysQSQtHMw/feedshare-thumbnail_720_1280/0/1684964987009?e=2147483647&v=beta&t=kwSFGS3I5ledaSVaZ0xilrWcGqFaZyGjYam5oi2fhWI',
        'https://www.gocfs.pro/assets/images/home/overview.png',
        'https://rfi.global/wp-content/uploads/2022/10/Capture5.png', 'https://static.vecteezy.com/system/resources/previews/004/698/589/original/rewards-red-and-yellow-promotion-banner-vector.jpg']
    return (
        <div className="login-rewards">
            <div className="carousel-container">
                <div className="image-holder">
                    <Carousel items={items} />
                </div>
            </div>
        </div>
    )
}

export default LoginPromotions