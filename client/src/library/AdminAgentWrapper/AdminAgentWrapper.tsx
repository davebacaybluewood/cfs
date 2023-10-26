import { UserContext } from 'admin/context/UserProvider'
import React, { useContext, useEffect, useState } from 'react'
import useFetchUserProfile from 'admin/hooks/useFetchProfile'
import { Alert, AlertTitle } from '@mui/material'
import Spinner from 'admin/components/Spinner/Spinner'

const components = {
  POSITION_AGENT: [
    'Appointments',
    'Appointments',
    'AgentAppointments',
    'AppointmentInformation',
    'ScheduleAppointment',
    'Calendar',
    'Contacts',
    'Settings',
    'Blogs',
    'ViewBlog',
    'BlogForm',
    'Webinars',
    'TrialSubscription',
    'CFSWebinars',
    'ActivatedWebinars',
    'RequestedWebinars',
    'AdminWebinars',
    'DynamicWebinarInformation',
    'WebinarSingle',
    'LandingPage',
    'LandingPageInfo',
    'Users',
    'Licensing',
    'ContractForm',
    'EmailMarketing',
    'AgentSubscribers',
    'Merchandises',
    'MerchandiseForm',
    'ShareableEmails',
    'RewardsHistory',
    'RSVPLanding',
    'TrialSubscription',
  ],
  POSITION_MASTER_ADMIN: [
    'Appointments',
    'Appointments',
    'AgentAppointments',
    'AppointmentInformation',
    'ScheduleAppointment',
    'Calendar',
    'Contacts',
    'Settings',
    'Blogs',
    'ViewBlog',
    'BlogForm',
    'Webinars',
    'TrialSubscription',
    'CFSWebinars',
    'WebinarForm',
    'ActivatedWebinars',
    'RequestedWebinars',
    'AdminWebinars',
    'DynamicWebinarInformation',
    'WebinarSingle',
    'LandingPage',
    'LandingPageInfo',
    'Users',
    'Licensing',
    'ContractForm',
    'EmailMarketing',
    'AgentSubscribers',
    'Merchandises',
    'MerchandiseForm',
    'ShareableEmails',
    'RewardsHistory',
    'RSVPLanding',
    'Trial Subscription',
  ],
  POSITION_SUBSCRIBER: [
    'Dashboard',
    'Profile',
    'Subscribers',
    'Merchandises',
    'ShareableEmails',
    'Rewards History',
  ],
}

type AdminAgentWrapperProps = {
  children: JSX.Element | React.ReactNode | any
}

const AdminAgentWrapper: React.FC<AdminAgentWrapperProps> = (props) => {
  const userCtx = useContext(UserContext)
  const [hasAccess, setHasAccess] = useState<boolean | undefined>(undefined)
  const { profile, loading } = useFetchUserProfile(
    userCtx?.user?.userGuid || ''
  )
  const { children } = props
  const USER_POSITION = profile?.position
  const childrenName = children?.type?.name
  useEffect(() => {
    if (USER_POSITION) {
      setHasAccess(() => {
        const currRoleValue = USER_POSITION[0].value
        return components[currRoleValue].includes(childrenName)
      })
    }
  }, [USER_POSITION])

  return (
    <main>
      {!loading ? (
        hasAccess ? (
          props.children
        ) : (
          <Alert
            severity='warning'
            sx={{
              fontSize: '15px',
              fontWeight: '400',
              padding: '22px 30px',
              maxWidth: '600px',
            }}
          >
            <AlertTitle sx={{ fontSize: '18px', fontWeight: '600' }}>
              Restricted Page Warning
            </AlertTitle>
            You do not have access to view this page.
            <div>
              <a
                href='https://agent.comfortfinancialsolutions.com/signup'
                target='_blank'
                rel='noreferrer'
              >
                Register
              </a>{' '}
              to subscribe.
            </div>
          </Alert>
        )
      ) : (
        <Spinner />
      )}
    </main>
  )
}

export default AdminAgentWrapper
