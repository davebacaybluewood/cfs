import React from "react";
import "./LandingPageCard.scss";
import { Link } from "react-router-dom";
import adminPathsNew from "admin/constants/routes";
import { FaAngleRight } from "react-icons/fa";
import { Button } from "@mui/material";
import { ROLES } from "admin/constants/constants";
import { paths } from "constants/routes";

interface LandingPageCardProps {
  name: string;
  createdAt?: string;
  id: string;
  children?: string;
  subTitle: string;
  role: string;
  isActivated: boolean;
  userGuid?: string;
  activateHandler: () => void;
  deactivateHandler: () => void;
  isLoading: boolean;
}

const LandingPageCard: React.FC<LandingPageCardProps> = (props) => {
  return (
    <div className="landing-page-card">
      <div className="captions">
        <h2>{props.name}</h2>
        <p>{props.subTitle}</p>
      </div>
      <div className="actions">
        {props.isLoading ? null : props.role === ROLES.ROLE_AGENT ? (
          <div className="agent-actions">
            <Button
              variant="contained"
              onClick={() =>
                props.isActivated
                  ? window.open(
                      window.location.origin +
                        paths.cfsPagesWithAgent
                          .replace(":pageId", props.id)
                          .replace(":agentGuid", props?.userGuid ?? "")
                    )
                  : window.open(
                      window.location.origin +
                        paths.cfsPages.replace(":pageId", props.id)
                    )
              }
            >
              View Landing Page
            </Button>
            {props.isActivated ? (
              <Button
                color="error"
                variant="contained"
                onClick={() => props.deactivateHandler()}
              >
                Deactivate
              </Button>
            ) : (
              <Button
                color="info"
                variant="contained"
                onClick={() => props.activateHandler()}
              >
                Activate
              </Button>
            )}
          </div>
        ) : (
          <div className="admin-actions">
            <Link
              to={adminPathsNew.landingPageInfo.replace(":pageId", props.id)}
            >
              Learn More <FaAngleRight />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPageCard;
