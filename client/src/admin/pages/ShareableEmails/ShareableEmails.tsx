import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import React, { useContext, useEffect, useState } from "react";
import { CrumbTypes } from "../Dashboard/types";
import EmailCard from "./EmailCard";
import Title from "admin/components/Title/Title";
import { createSearchParams, useNavigate } from "react-router-dom";
import { UserContext } from "admin/context/UserProvider";
import agent from "admin/api/agent";

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
];

const ShareableEmails: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;
  const [templates, setTemplates] = useState<any>([]);

  useEffect(() => {
    setLoading(false);
    const fetchEmailTemplates = async () => {
      setLoading(true);
      const data = await agent.EmailMarketing.getEmailTemplates(userGuid);

      setTemplates(data);
    };

    if (userGuid) {
      fetchEmailTemplates();
      setLoading(false);
    }
  }, [userGuid]);

  return (
    <Wrapper breadcrumb={crumbs} loading={loading} error={false}>
      <Title
        title="Shareable emails"
        subtitle="List of available shareable emails."
      ></Title>
      {templates?.map((data) => {
        return (
          <EmailCard
            subject={data.subject}
            createdBy="Dave Bacay"
            onClick={() =>
              navigate({
                pathname: paths.emailMarketing,
                search: createSearchParams({
                  templateId: data._id,
                  action: "view",
                }).toString(),
              })
            }
          />
        );
      })}
    </Wrapper>
  );
};

export default ShareableEmails;
