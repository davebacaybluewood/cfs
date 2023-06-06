import { Typography } from "@mui/material";
import "./MapSection.scss";
import { Container } from "@mui/system";

const MapSection = () => {
  return (
    <Container>
      <div className="map-container">
        <div className="map-captions">
          <Typography variant="h3">
            Financial Comfort, <br /> Now and Tomorrow
          </Typography>
          <Typography>
            CFS helps individuals and families build a comfortable future by{" "}
            <br />
            advocating Financial Awareness and providing Risk Management
            Solutions.
          </Typography>
        </div>
        <div className="map-image">
          <img src="\assets\images\home\map.png" alt="" />
        </div>
      </div>
    </Container>
  );
};

export default MapSection;
