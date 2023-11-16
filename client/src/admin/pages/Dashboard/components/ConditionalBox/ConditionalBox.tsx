import React from "react";
import AdminBox from "./AdminBox";
import AgentBox from "./AgentBox";
import EditorBox from "./EditorBox";
import SubscriberBox from "./SubscriberBox";

export interface PositionAndRoleType {
  value: string;
  label: string;
}
interface ConditionalBoxProps {
  position: PositionAndRoleType[] | undefined;
  roles: PositionAndRoleType[] | undefined;
}
const ConditionalBox: React.FC<ConditionalBoxProps> = (props) => {
  const isAdmin = props.position?.some(
    (e) => e.value === "POSITION_MASTER_ADMIN"
  );

  const isAgent = props.position?.some((e) => e.value === "POSITION_AGENT");
  const isFreeTrial = props.position?.some(
    (e) => e.value === "POSITION_FREE_30DAYS_TRIAL"
  );

  const isEditor = props.position?.some((e) => e.value === "POSITION_EDITOR");
  const isContentCreator = props.position?.some(
    (e) => e.value === "POSITION_CONTENT_CREATOR"
  );

  const isSubscriber = props.position?.some(
    (e) => e.value === "POSITION_SUBSCRIBER"
  );

  return (
    <div>
      {isAdmin && <AdminBox />}
      {isAgent || (isFreeTrial && <AgentBox />)}
      {(isContentCreator || isEditor) && <EditorBox />}
      {isSubscriber && <SubscriberBox />}
    </div>
  );
};

export default ConditionalBox;
