import "./Rewards.scss"
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

    return (
        <Container>
            <div className="container-wrapper">
                <h1>Agent of Agents</h1>
                <div className="container-contents">
                    <h2>Rewards Interface</h2>
                    <ul className="container-list" ref={ref}>
                        {
                            rewardItems.map((item: IRewards, index: number) => (
                                <li className="item" key={index}>
                                    <img src={item.path ? item.path : '/assets/images/events/default-item.png'} alt="" />
                                    <h3>{item.name}</h3>
                                    <button onClick={() =>
                                        navigate(`${paths.rewards}/${item.id}`)
                                    }>Claim Reward</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </Container>
    )
}

export default Rewards;
