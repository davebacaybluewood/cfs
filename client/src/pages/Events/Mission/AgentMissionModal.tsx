import { Dialog, DialogContent, Grid, Typography, Stack } from "@mui/material";

import { MAIN_IMAGES, AGENT_MISSION_IMAGES } from "constants/constants";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsShareFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import "./AgentMissionModal.scss";

type props = {
  openModal: boolean;
  showModal: (show: boolean) => void;
  onClick: () => void;
  agentName: string;
};

const AgentMissionModal = ({
  openModal,
  showModal,
  onClick,
  agentName,
}: props) => {
  const centeredStyle = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  };
  return (
    <Dialog
      fullWidth={false}
      maxWidth="xs"
      open={openModal}
      className="agent-mission-modal"
      onClose={() => showModal(false)}
      onClick={onClick}
    >
      <DialogContent sx={{ padding: "0.5rem", borderRadius: "3rem" }}>
        <Grid
          container
          sx={{
            backgroundImage: `url(${AGENT_MISSION_IMAGES.BACKGROUND})`,
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              ...centeredStyle,
              color: "white",
              marginBottom: "2rem",
            }}
          >
            <Typography
              sx={{
                ...centeredStyle,
                fontSize: 36,
                width: "100%  ",
                fontFamily: "SpecialAgent",
              }}
            >
              Agent of Agents
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid
            item
            xs={5}
            style={{
              display: "flex",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ maxWidth: "175px" }}
              src={MAIN_IMAGES.MAIN_LOGO}
              className="thumbnail"
            />
            <Typography
              sx={{
                ...centeredStyle,
                textAlign: "center",
                fontSize: 24,
                width: "100%  ",
                color: "white",
                marginTop: "1.5rem",
              }}
            >
              JOIN THE MISSION
            </Typography>
          </Grid>

          <Grid
            item
            xs={5}
            sx={{
              paddingLeft: "2rem",
              paddingRight: "2rem",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <img
              style={{ maxWidth: "200px" }}
              src={AGENT_MISSION_IMAGES.AGENT}
            />
          </Grid>
          <Grid item xs={12} sx={{ paddingBottom: "1rem" }}>
            <Typography
              sx={{
                ...centeredStyle,
                fontSize: 30,
                width: "100% ",
                color: "white",
              }}
            >
              [{agentName}]
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogContent sx={{ padding: "2px", display: "none" }}>
        <Grid xs={12}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-end"
            sx={{ marginRight: "1.5rem" }}
          >
            <a href={"#"} target="_self">
              <BsShareFill size="20px" />
            </a>
            <a href={"#"} target="_self">
              <FaFacebook size="20px" />
            </a>
            <a href={"#"} target="_self">
              <FaInstagram size="20px" />
            </a>
            <a href={"#"} target="_self">
              <MdEmail size="20px" />
            </a>
          </Stack>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AgentMissionModal;
