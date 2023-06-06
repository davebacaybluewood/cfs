import React from "react";
import "./Coin.scss";

interface CoinProps {
  icon?: JSX.Element;
  title: string | JSX.Element;
  description: string | JSX.Element;
}
const Coin: React.FC<CoinProps> = (props) => {
  return (
    <div className="coin-container">
      <div className="coin-icon">{props.icon}</div>
      <div className="coin-captions">
        <h4>{props.title}</h4>

        <div className="coin-description">{props.description}</div>
      </div>
    </div>
  );
};

export default Coin;
