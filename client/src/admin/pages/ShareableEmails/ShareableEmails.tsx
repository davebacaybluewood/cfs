import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import React, { useContext, useEffect, useState } from "react";
import { CrumbTypes } from "../Dashboard/types";
import EmailCard from "./EmailCard";
import Title from "admin/components/Title/Title";
import { createSearchParams, useNavigate } from "react-router-dom";
import { UserContext } from "admin/context/UserProvider";
import agent from "admin/api/agent";
import { EmailTemplateDataSubscriber } from "admin/models/emailMarketing";
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter";
import { Skeleton } from "@mui/material";
import Box from "admin/components/Box/Box";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Shareable Emails",
    url: paths.shareableEmails,
    isActive: true,
  },
];

const ShareableEmails: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;
  const [templates, setTemplates] = useState<
    EmailTemplateDataSubscriber | undefined
  >();

  useEffect(() => {
    setLoading(false);
    const fetchEmailTemplates = async () => {
      setLoading(true);
      const data = await agent.EmailMarketing.getEmailTemplatesBySubscriber(
        userGuid
      );

      setTemplates(data);
      setLoading(false);
    };

    if (userGuid) {
      fetchEmailTemplates();
    }
  }, [userGuid]);

  return (
    <Wrapper breadcrumb={crumbs} error={false}>
      <DocumentTitleSetter title="Shareable emails | CFS Portal" />
      <Title
        title="Shareable emails"
        subtitle="List of available shareable emails."
      ></Title>
      {loading &&
        Array.from({ length: 5 }).map((item, idx) => {
          return (
            <Box className="email-card">
              <div>
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height={20}
                  sx={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxWidth: "430px",
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={20}
                  sx={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxWidth: "200px",
                  }}
                />
              </div>
              <Skeleton
                variant="rectangular"
                width={75}
                height={15}
                sx={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  maxWidth: "200px",
                }}
              />
            </Box>
          );
        })}

      {templates?.templates?.map((data) => {
        return (
          <EmailCard
            subject={data.subject}
            createdBy={data.authorName}
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
        );
      })}
    </Wrapper>
  );
};

export default ShareableEmails;
