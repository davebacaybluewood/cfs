import React, { useContext, useEffect } from "react"
import { paths } from "constants/routes"
import "./RaiseSupport.scss"

// Components
import Wrapper from "admin/components/Wrapper/Wrapper"
import { CrumbTypes } from "../../Dashboard/types"

import RaiseSupportForm from "./RaiseSupportForm"

// Context
import { UserContext } from "admin/context/UserProvider"
import useFetchUserProfile from "admin/hooks/useFetchProfile"
import {
  EDITOR_ROLES,
  POSITIONS,
  PROFILE_ROLES,
} from "pages/PortalRegistration/constants"
import RaiseSupportTable from "../Admin/RaiseSupportTable"
import RaiseSupportLoading from "../loading/RaiseSupportLoading"

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

  useEffect(() => {
    console.log(isAdmin)
  }, [isAdmin])

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
          {!loading ? (
            <>
              {isAdmin !== undefined && !isAdmin ? (
                <RaiseSupportForm />
              ) : (
                <RaiseSupportTable />
              )}
            </>
          ) : (
            <RaiseSupportLoading />
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export default RaiseSupport
