import "./Rewards.scss";
import { useRef } from "react";
import { rewardItems } from "./contants/Items";
import { paths } from "constants/routes";
import { useNavigate } from "react-router-dom";
import Container from "./components/Container";

interface IRewards {
  id: string;
  path: string;
  name: string;
}

const Rewards: React.FC = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLUListElement>(null);
  const DEFAULT_IMAGE = "/assets/images/events/items/AmazonGC_1000x1000.png";

  return (
    <Container>
      <div className="container-wrapper">
        <h1>Agent of Agents</h1>
        <div className="container-contents">
          <h2>Rewards Interface</h2>
          <ul className="container-list" ref={ref}>
            {rewardItems.length ? (
              rewardItems.map((item: IRewards, index: number) => (
                <li className="item" key={index}>
                  <img
                    src={
                      item.path
                        ? `/assets/images/events/items/${item.path}`
                        : DEFAULT_IMAGE
                    }
                    alt=""
                  />
                  <h3>{item.name}</h3>
                  <button
                    onClick={() => navigate(`${paths.rewards}/${item.id}`)}
                  >
                    Claim Reward
                  </button>
                </li>
              ))
            ) : (
              <li className="item no-rewards">
                <p className="container-rewards-text">No Rewards Available</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Rewards;
