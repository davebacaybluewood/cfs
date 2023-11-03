import Wrapper from "admin/components/Wrapper/Wrapper"
import { paths } from "constants/routes"
import React, { useContext, useEffect, useState } from "react"
import { CrumbTypes } from "../Dashboard/types"
import EmailCard from "./EmailCard"
import Title from "admin/components/Title/Title"
import { createSearchParams, useNavigate } from "react-router-dom"
import { UserContext } from "admin/context/UserProvider"
import agent from "admin/api/agent"
import { EmailTemplateDataSubscriber } from "admin/models/emailMarketing"
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter"

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Settings",
    url: paths.settings,
    isActive: true,
  },
]

const ShareableEmails: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const userCtx = useContext(UserContext) as any
  const userGuid = userCtx?.user?.userGuid
  const [templates, setTemplates] = useState<
    EmailTemplateDataSubscriber | undefined
  >()
  const [name, setName] = useState("")

  useEffect(() => {
    setLoading(false)
    const fetchEmailTemplates = async () => {
      setLoading(true)
      const data = await agent.EmailMarketing.getEmailTemplatesBySubscriber(
        userGuid
      )

      setTemplates(data)
      setName(data?.name ?? "")
    }

    if (userGuid) {
      fetchEmailTemplates()
      setLoading(false)
    }
  }, [userGuid])

  return (
    <Wrapper breadcrumb={crumbs} loading={loading} error={false}>
      <DocumentTitleSetter title="Shareable emails | CFS Portal" />
      <Title
        title="Shareable emails"
        subtitle="List of available shareable emails."
      ></Title>
      {templates?.templates?.map((data) => {
        return (
          <EmailCard
            subject={data.subject}
            createdBy={name}
            onClick={() =>
              navigate({
                pathname: paths.emailMarketing,
                search: createSearchParams({
                  templateId: data._id ?? "",
                  action: "view",
                }).toString(),
              })
            }
          />
        )
      })}
    </Wrapper>
  )
}

export default ShareableEmails
