import React from 'react'
import './LoginPromotions.scss'
import Carousel from 'library/Carousel/Carousel'
import { items } from './components/assets'

const LoginPromotions: React.FC = () => {

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