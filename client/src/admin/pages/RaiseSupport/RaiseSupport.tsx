import { paths } from "constants/routes"
import "./RaiseSupport.scss"

// Components
import Wrapper from "admin/components/Wrapper/Wrapper"
import { CrumbTypes } from "../Dashboard/types"

import RaiseSupportForm from "./RaiseSupportForm"

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Raise Support",
    url: paths.raiseSupport,
    isActive: true,
  },
]

const RaiseSupport: React.FC = () => {
  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="raise-support-container"
    >
      <div className="raise-support-form-container">
        <h2>Raise Support</h2>
        <div className="raise-support-form">
          <RaiseSupportForm />
        </div>
      </div>
    </Wrapper>
  )
}

export default RaiseSupport
