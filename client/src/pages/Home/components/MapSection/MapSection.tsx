import { Typography } from "@mui/material";
import "./MapSection.scss";
import { Container } from "@mui/system";

const MapSection = () => {
  return (
    <Container>
      <div className="map-container">
        <div className="map-captions">
          <Typography>
            CFS is dedicated to helping individuals and families <br /> across
            the United States build a comfortable future.
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
