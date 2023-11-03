import Wrapper from "admin/components/Wrapper/Wrapper"
import { paths } from "constants/routes"
import React from "react"
import { CrumbTypes } from "../Dashboard/types"
import "./Notifications.scss"
import Indicator from "admin/components/Indicator/Indicator"
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter"

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Notifications",
    url: paths.notifications,
    isActive: true,
  },
]

const Notifications: React.FC = () => {
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <DocumentTitleSetter title="Notifications | CFS Portal" />
      <Indicator />
    </Wrapper>
  )
}

export default Notifications
