import React, { useContext } from "react"
import "./Subcribers/RaiseSupport.scss"
// components
import Wrapper from "admin/components/Wrapper/Wrapper"
import { CrumbTypes } from "../Dashboard/types"
import RaiseSupportForm from "./Subcribers/RaiseSupportForm"
import RaiseSupportTable from "./Admin/RaiseSupportTable"
import RaiseSupportFormLoading from "./loading/RaiseSupportFormLoading"
// context
import { UserContext } from "admin/context/UserProvider"
// custom hooks
import useFetchUserProfile from "admin/hooks/useFetchProfile"
// constants
import { paths } from "constants/routes"
import { PROFILE_ROLES } from "pages/PortalRegistration/constants"
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter"
import TableLoading from "admin/components/Spinner/TableLoading"

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
  const userCtx = useContext(UserContext) as any
  const { profile, loading } = useFetchUserProfile(
    userCtx?.user?.userGuid ?? ""
  )

  const isAdmin = profile?.roles?.some((f) => {
    return f.value === PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value
  })

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="raise-support-container"
    >
      <DocumentTitleSetter title="Raise Support | CFS Portal" />
      <div className="raise-support-form-container">
        <h2>Raise Support</h2>
        <div
          className="raise-support-form"
          style={{ maxWidth: isAdmin !== undefined && !isAdmin ? "800px" : "" }}
        >
          {!loading ? (
            <>
              {isAdmin !== undefined && !isAdmin ? (
                <RaiseSupportForm />
              ) : (
                <RaiseSupportTable />
              )}
            </>
          ) : (
            <TableLoading />
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export default RaiseSupport
