import AvatarBadge from "./AvatarBadge"
import "../TreeDiagram.scss"

type AvatarProps = {
  name: string
  type: string
  profileImg?: string
}

const PLACEHOLDER_AVATAR = "/assets/images/agent-mission/agent.png"

const Avatar = ({ name, type, profileImg }: AvatarProps) => {
  // function to shorten name
  const shortenName = (name: string) => {
    const splitName = name.split(" ")
    const firstName = splitName[0]
    const lastName = splitName[1]
    return `${firstName} ${lastName ? lastName.slice(0, 1) + "." : ""}`
  }

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
            style={{ width: "135px", height: "90px", objectFit: "cover" }}
            src={PLACEHOLDER_AVATAR}
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
