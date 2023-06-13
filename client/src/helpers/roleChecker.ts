import { RolesAndPositionType } from "admin/hooks/useFetchProfile";
import {
  ADMIN_ROLES,
  AGENT_ROLES,
  CONTENT_CREATOR_ROLES,
  EDITOR_ROLES,
} from "pages/PortalRegistration/constants";

type RoleType = "editor" | "agent" | "contentCreator" | "admin";
const roleChecker = (
  roleToValidate: RolesAndPositionType[],
  role: RoleType
) => {
  const roleValidations =
    role === "agent"
      ? AGENT_ROLES
      : role === "contentCreator"
      ? CONTENT_CREATOR_ROLES
      : role === "admin"
      ? ADMIN_ROLES
      : EDITOR_ROLES;

  console.log(roleToValidate);
};

export default roleChecker;
