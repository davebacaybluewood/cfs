import React from 'react'
import './Card.scss'

export interface CardProps {
    name: string,
    profileImage: string,
    description: string,
}

const Card: React.FC<CardProps> = (props) => {
    return (
        <div className="agent-card">
            <img src={props.profileImage} alt='user' />
            <h2>{props.name}</h2>
            <p>{props.description}</p>
        </div>
    )
}

export default Card