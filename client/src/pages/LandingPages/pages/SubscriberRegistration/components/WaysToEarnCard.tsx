import "./WaysToEarnCard.scss";

const WaysToEarnCard = (props) => {
  return (
    <div
      className="ways-list-card"
      //   style={{
      //     backgroundImage: `url(${props?.image}`,
      //     backgroundSize: "contain",
      //     backgroundRepeat: "no-repeat",
      //     height: "100%",
      //     width: "100%",
      //   }}
    >
      <img src={props.image} alt="" />
      <div className="ways-list-card-info">
        <p>{`${props?.points} points`}</p>
        <p>{props?.description}</p>
      </div>
    </div>
  );
};

export default WaysToEarnCard;
