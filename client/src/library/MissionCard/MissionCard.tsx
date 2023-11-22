import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";
import "./MissionCard.scss";
import React from "react";

interface MissionCardProps {
  title: string;
  description: string;
  element?: JSX.Element | string;
  status?: string;
  item: string;
  rewards: { data: Array<{ rewardId: string }>; loading: boolean };
}

const MissionCard: React.FC<MissionCardProps> = (props) => {
  const navigate = useNavigate();

  const ClaimButton = () => {
    if (props.rewards && props.rewards.loading) return <></>;

    const claimedRewards = props.rewards.data;
    const rewardId = props.item;

    // Check if the rewardId exists in claimedRewards
    const shouldDisplayButton = !claimedRewards.some(
      (claimedReward) => claimedReward.rewardId === rewardId
    );
    
    // Display the button only if the condition is met
    return shouldDisplayButton ? (
      <Button
        className={`${
          props.status! == "completed" ? "d-block" : "d-none"
        } ${props.status!}`}
        variant="contained"
        onClick={() =>
          navigate(paths.aaClaimReward.replace(":rewardId", props.item))
        }
      >
        Claim Reward
      </Button>
    ) : null;
  };

  return (
    <div className={`two-content-container ${props.status!}`}>
      <div className="two-content-container-captions">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <div>{props.element}</div>
        <ClaimButton />
      </div>
    </div>
  );
};

export default MissionCard;
