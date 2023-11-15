import { Container, Stack } from "@mui/material"
import TimelinePost from "library/TimelinePost/TimelinePost"
import { fakePosts } from "./fakePosts"

const ProfilePage = () => {
  return (
    <main style={{ padding: "4rem 0" }}>
      <Container>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          {/* Left sidebar */}
          <div
            style={{
              background: "#f4f4f4",
              height: "auto",
              flexShrink: 1,
              width: "20%",
            }}
          ></div>
          <div style={{ flexGrow: 1, width: "60%" }}>
            {fakePosts.map((item, index) => (
              <TimelinePost
                profileImg={item.profileImg}
                fullName={item.fullName}
                userName={item.userName}
                datePosted={item.datePosted}
                content={item.content}
                imgContent={item.imgContent}
              />
            ))}
          </div>
          {/* Right sidebar */}
          <div
            style={{
              background: "#f4f4f4",
              height: "auto",
              width: "20%",
              flexShrink: 1,
            }}
          ></div>
        </Stack>
      </Container>
    </main>
  )
}

export default ProfilePage
