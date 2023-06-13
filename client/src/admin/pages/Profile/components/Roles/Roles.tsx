import React from "react";
import "./Roles.scss";
import Badge from "library/Badge/Badge";
import { RolesAndPositionType } from "admin/hooks/useFetchProfile";
import {
  AGENT_ROLES,
  CONTENT_CREATOR_ROLES,
  EDITOR_ROLES,
  POSITIONS,
  PROFILE_ROLES,
} from "pages/PortalRegistration/constants";

interface RolesProps {
  roles: RolesAndPositionType[] | undefined;
  position: RolesAndPositionType[] | undefined;
}
const Roles: React.FC<RolesProps> = (props) => {
  const isAdmin = props.roles?.some((f) => {
    return f.value === PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value;
  });

  const isEditor = props.roles?.some((f) => {
    return (
      f.value === PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.value ||
      f.value === PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.value
    );
  });

  const isContentCreator = props.roles?.some((f) => {
    return (
      f.value ===
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.value ||
      f.value ===
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
          .value
    );
  });

  const isAgent = props.roles?.some((f) => {
    return (
      f.value === PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value
    );
  });

  return (
    <div className="about-wrapper">
      <div className="about-info">
        <h2>Roles & Positions</h2>
        <div>
          {props.position?.map((data) => {
            const isAgent = POSITIONS[0].value === data.value;
            const isEditor = POSITIONS[1].value === data.value;
            const isContentCreator = POSITIONS[2].value === data.value;

            const badgeVariant = isAgent
              ? "secondary"
              : isEditor || isContentCreator
              ? "danger"
              : "primary";
            return <Badge variant={badgeVariant}>{data.label}</Badge>;
          })}
        </div>
        {isAdmin ? null : (
          <div>
            {props.roles?.map((data) => {
              const isAgent = AGENT_ROLES?.some((e) => e.value === data.value);
              const isEditor = EDITOR_ROLES?.some(
                (e) => e.value === data.value
              );
              const isContentCreator = CONTENT_CREATOR_ROLES?.some(
                (e) => e.value === data.value
              );

              const badgeVariant = isAgent
                ? "secondary"
                : isEditor || isContentCreator
                ? "danger"
                : "primary";

              return (
                <Badge variant={badgeVariant} isBordered>
                  {data.label}
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roles;
