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
            gender === "male"
              ? MALE_IMG_URLS[RANDOM_ZERO_AND_ONE]
              : FEMALE_IMG_URLS[RANDOM_ZERO_AND_ONE]
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
