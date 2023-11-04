import React from "react"

type AvatarProps = {
  name: string
  gender: "male" | "female"
}

const MALE_IMG_URLS = [
  "/assets/images/tree-diagram/user2.png",
  "/assets/images/tree-diagram/user3.png",
]

const FEMALE_IMG_URLS = [
  "/assets/images/tree-diagram/user1.png",
  "/assets/images/tree-diagram/user4.png",
]

const Avatar = ({ name, gender }: AvatarProps) => {
  const RANDOM_ZERO_AND_ONE = Math.floor(Math.random() * 2)
  return (
    <div className="node">
      <div>
        <img
          style={{ width: "80px" }}
          src={
            gender === "male"
              ? MALE_IMG_URLS[RANDOM_ZERO_AND_ONE]
              : FEMALE_IMG_URLS[RANDOM_ZERO_AND_ONE]
          }
          alt="user"
        />
        <h2>{name}</h2>
      </div>
    </div>
  )
}

export default Avatar
