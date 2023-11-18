import "./TimelinePost.scss"
import { Stack } from "@mui/material"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share"

const PostButtons = ({ shareUrl }: { shareUrl?: string | null }) => {
  return (
    <div style={{ marginTop: "2rem" }}>
      <span style={{ fontSize: "12px", color: "gray", marginRight: "6px" }}>
        Share{" "}
      </span>
      {shareUrl && (
        <Stack
          flexDirection="row"
          gap={0.5}
          sx={{ marginTop: "1rem" }}
          alignItems="center"
        >
          <FacebookShareButton
            url={shareUrl}
            hashtag="#ComfortFinancialSolutions"
          >
            <button className="lead-button">
              <FacebookIcon borderRadius={25} size={16} />{" "}
            </button>
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <button className="lead-button">
              <TwitterIcon borderRadius={25} size={16} />{" "}
            </button>
          </TwitterShareButton>

          <WhatsappShareButton url={shareUrl}>
            <button className="lead-button">
              <WhatsappIcon borderRadius={25} size={16} />{" "}
            </button>
          </WhatsappShareButton>
        </Stack>
      )}
    </div>
  )
}

export default PostButtons
