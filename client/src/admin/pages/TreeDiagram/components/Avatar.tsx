import React, { useState, useEffect } from "react"
import AvatarBadge from "./AvatarBadge"
import "../TreeDiagram.scss"

type AvatarProps = {
  name: string
  gender: "male" | "female"
  type: "agent" | "subscriber" | "free-trial"
  profileImg?: string
}

const MALE_IMG_URLS = [
  "/assets/images/tree-diagram/user2.png",
  "/assets/images/tree-diagram/user3.png",
]

const FEMALE_IMG_URLS = [
  "/assets/images/tree-diagram/user1.png",
  "/assets/images/tree-diagram/user4.png",
]

const Avatar = ({ name, gender, type, profileImg }: AvatarProps) => {
  const shortenName = (name) => {
    const splitName = name.split(" ")
    const firstName = splitName[0]
    const lastName = splitName[1]
    return `${firstName} ${lastName ? lastName.slice(0, 1) + "." : ""}`
  }
  const RANDOM_ZERO_AND_ONE = Math.floor(Math.random() * 2)
  return (
    <div className="node">
      <div style={{ position: "relative" }}>
        {profileImg ? (
          <img
            src={profileImg}
            alt=""
            style={{
              width: "90px",
              height: "90px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        ) : (
          <img
            style={{ width: "70px" }}
            src={
              gender === "male"
                ? MALE_IMG_URLS[RANDOM_ZERO_AND_ONE]
                : FEMALE_IMG_URLS[RANDOM_ZERO_AND_ONE]
            }
            alt="user"
          />
        )}
        <h2>{name && shortenName(name)}</h2>
        <AvatarBadge type={type} />
      </div>
    </div>
  )
}

export default Avatar
