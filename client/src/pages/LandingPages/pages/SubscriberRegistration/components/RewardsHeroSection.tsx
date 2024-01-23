type SectionProps = {
  setOpenRegDrawer: (open: boolean) => void;
  setOpenMerchDialog: (open: boolean) => void;
};

const RewardsHeroSection = ({
  setOpenMerchDialog,
  setOpenRegDrawer,
}: SectionProps) => {
  const heroBg = "/assets/images/subs-reg-landing-page/trophy.png";
  return (
    <div id="carousel-rewards-hero-container">
      <img src={heroBg} alt="" />
      <div className="carousel-container-title">
        <h1>Unlock Exclusive Rewards</h1>
        <p>
          Join our CFS program for a rewarding journey. Simplify lead
          generation, expand your reach, and increase brand visibility. Gain
          insights and feedback while earning valuable points and unlocking
          incredible rewards. Don't miss out on this extraordinary experience!
        </p>
        <button
          type="button"
          className="cta"
          onClick={() => setOpenRegDrawer(true)}
        >
          JOIN US NOW
        </button>
      </div>
    </div>
  );
};

export default RewardsHeroSection;
