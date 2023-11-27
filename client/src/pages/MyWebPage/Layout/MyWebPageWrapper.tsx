import React from "react"
import "./MyWebPageWrapper.scss"
import Spinner from "library/Spinner/Spinner"
import { ProfileData } from "admin/hooks/useFetchProfile"
import { useNavigate } from "react-router-dom"
import { paths } from "constants/routes"

interface MyWebPageWrapperProps {
  showNavBar: boolean
  showFooter: boolean
  children: React.ReactNode
  loading?: boolean
  profile: ProfileData | undefined
}

const MyWebPageWrapper: React.FC<MyWebPageWrapperProps> = (props) => {
  const navigate = useNavigate()

  if (!props.profile && !props.loading) {
    navigate("invalid-agent")
  }

  return (
    <div className="my-webpage-wrapper">
      {/* <div className="navbar">{props.showNavBar ? <Navbar /> : null}</div>{" "} */}
      {/**commented for future use */}
      <main className="mywebpage-content">{props.children}</main>
      <div className="footer">
        {props.showFooter ? (
          /* <Footer/> */ <h2 style={{ textAlign: "center" }}></h2> //Not final
        ) : null}
      </div>
      {props.loading ? <Spinner variant="fixed" /> : null}
    </div>
  )
}
MyWebPageWrapper.defaultProps = {
  showNavBar: true,
  showFooter: true,
}

export default MyWebPageWrapper
