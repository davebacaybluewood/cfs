import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa"
import { HiLocationMarker } from "react-icons/hi"

const agentLinks = (
  address?: string,
  facebook?: string,
  linkedIn?: string,
  twitter?: string
) => {
  return [
    {
      icon: <FaFacebook />,
      title: "Facebook",
      link: facebook,
    },
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      link: linkedIn,
    },
    {
      icon: <FaTwitter />,
      title: "Twitter",
      link: twitter,
    },
  ].filter((data) => data.link)
}

export default agentLinks
