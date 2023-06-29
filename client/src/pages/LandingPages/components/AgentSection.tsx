import agent from "admin/api/agent";
import { AgentData } from "admin/models/agentModels";
import { paths } from "constants/routes";
import Spinner from "library/Spinner/Spinner";
import SocialIcons from "pages/Agents/SocialIcons";
import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

interface AgentSectionProps {
  agentGuid: string;
  pageId: string;
}
const AgentSection: React.FC<AgentSectionProps> = (props) => {
  const [agentInfo, setAgentInfo] = useState<AgentData | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAgentInfo = async () => {
      setLoading(true);
      const data = await agent.Agents.agentInformation(props.agentGuid ?? "");
      setAgentInfo(data);
    };

    if (props.agentGuid) {
      setTimeout(() => {
        fetchAgentInfo();
        setLoading(false);
      }, 1000);
    }
  }, [props.agentGuid]);

  if (loading) {
    return <Spinner variant="fixed" />;
  } else if (!props.agentGuid || !agentInfo) {
    return <React.Fragment />;
  }

  return (
    <section className="agent-section">
      <div className="agent-info">
        {agentInfo?.avatar ? (
          <div className="image-container">
            <img src={agentInfo?.avatar} alt="agent-cfs" />
          </div>
        ) : null}

        <div className="captions">
          <h2>{agentInfo?.name}</h2>
          <p>{agentInfo.title}</p>
          <ul className="contacts">
            <li>
              <div className="icon-holder">
                <FaPhoneAlt />
              </div>
              <span>{agentInfo?.phoneNumber}</span>
            </li>
            <li>
              <div className="icon-holder">
                <FaEnvelope />
              </div>
              <span>{agentInfo?.emailAddress}</span>
            </li>
          </ul>
        </div>
      </div>
      {agentInfo?.facebook ||
      agentInfo.linkedIn ||
      agentInfo.twitter ||
      agentInfo.instagram ? (
        <SocialIcons
          facebook={agentInfo?.facebook}
          instagram={agentInfo?.instagram}
          linkedIn={agentInfo?.linkedIn}
          twitter={agentInfo?.twitter}
          paw={paths.agent_with_id.replace(":id", agentInfo.userGuid)}
        />
      ) : null}
    </section>
  );
};

export default AgentSection;
