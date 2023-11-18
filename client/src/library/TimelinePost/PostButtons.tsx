import LeadButton from "./LeadButton"
import "./TimelinePost.scss"
import { Stack } from "@mui/material"
import { CiShare2 } from "react-icons/ci"

const PostButtons = () => {
  return (
    <Stack flexDirection="row" gap={1} sx={{ marginTop: "1rem" }}>
      {/* <LeadButton text={"Register"} />
      <LeadButton text={"Earn rewards"} />
      <LeadButton text={"30 Days Trial"} /> */}
      <button className="lead-button">
        <CiShare2 /> <span style={{ marginLeft: "5px" }}>Share</span>
      </button>
    </Stack>
  )
}

export default PostButtons