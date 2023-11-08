import React from "react"
import AvatarBadge from "./AvatarBadge"
import "../TreeDiagram.scss"

type AvatarProps = {
  name: string
  gender: "male" | "female"
  type: "agent" | "subscriber" | "free-trial"
}

const MALE_IMG_URLS = [
  "/assets/images/tree-diagram/user2.png",
  "/assets/images/tree-diagram/user3.png",
]

const FEMALE_IMG_URLS = [
  "/assets/images/tree-diagram/user1.png",
  "/assets/images/tree-diagram/user4.png",
]

const Avatar = ({ name, gender, type }: AvatarProps) => {
  const RANDOM_ZERO_AND_ONE = Math.floor(Math.random() * 2)
  return (
    <div className="node">
      <div style={{ position: "relative" }}>
        <img
          style={{ width: "70px" }}
          src={
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="user"
        />
        <h2>{name}</h2>
        <AvatarBadge type={type} />
      </div>
    </div>
  )
}

export default Avatar
