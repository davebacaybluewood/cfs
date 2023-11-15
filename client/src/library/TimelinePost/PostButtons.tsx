import LeadButton from "./LeadButton"
import { Stack } from "@mui/material"
import { CiShare2 } from "react-icons/ci"

const PostButtons = () => {
  return (
    <Stack flexDirection="row" gap={1} sx={{ marginTop: "1rem" }}>
      <LeadButton text={"Register"} />
      <LeadButton text={"Earn rewards"} />
      <LeadButton text={"30 Days Trial"} />
      <button>
        <CiShare2 />
      </button>
    </Stack>
  )
}

export default PostButtons
