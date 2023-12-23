import React from 'react'
import './AgentCard.scss'
import Button from 'library/Button/Button'

interface AgentCardProps {
  firstName: string,
  lastName: string,
  profileImage: string,
  description: string
  onClick: () => void
}

const AgentCard: React.FC<AgentCardProps> = (props) => {
  return (
    <div className='agent-card'>
      <img src={props.profileImage} alt={props.profileImage} />
      <div className="captions-agent">
        <h2>{`${props.firstName} ${props.lastName}`}</h2>
        <p>{props.description}</p>
      </div>
      <Button variant='primary' onClick={() => props.onClick()}>Profile</Button>
    </div>
  )
}

export default AgentCard