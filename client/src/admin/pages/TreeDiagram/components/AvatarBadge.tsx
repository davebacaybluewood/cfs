const AvatarBadge = ({ type }: { type: string }) => {
  return (
    <div
      className="avatar-badge"
      style={{
        background:
          type === "agent"
            ? "black"
            : type === "subscriber"
            ? "purple"
            : "orange",
      }}
    >
      {type}
    </div>
  )
}

export default AvatarBadge
