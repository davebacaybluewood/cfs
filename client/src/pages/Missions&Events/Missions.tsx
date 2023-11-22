import { listAchievements } from "redux/actions/achievementActions";
import MissionCard from "library/MissionCard/MissionCard";
import { listRewards } from "redux/actions/rewardActions";
import { useDispatch, useSelector } from "react-redux";
import Progress from "./components/Progress";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import FAQ from "./components/FAQ";
import { RootState } from "store";
import "./Missions.scss";

const Missions: React.FC = () => {
  const data = useSelector((state: RootState) => state.achievements);
  const rewards = useSelector((state: RootState) => state.rewards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAchievements() as any);
    dispatch(listRewards() as any);

  }, [dispatch]);

  const getStatus = (doc: any, content: any) => {
    const status = {
      todo: "todo",
      inProgress: "in-progress",
      completed: "completed",
    };
  
    if (content && content.name == 'One Year Team') {
      return content.progress == 0 ? status.todo : doc.achievements.oneYearTeam.isCompleted ? status.completed : status.inProgress
    }
  }

  return (
    <div className="missions-page-main-container">
      <Helmet>
        <title>Missions & Events | Comfort Financial Solutions</title>
        <link rel="canonical" href="gocfs.pro/missions/events" />
      </Helmet>
      <div className="mission-page-content">
        <div className="mission-page-captions-header">
          <h2>Missions & Events</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, atque.
          </p>
          <div className="divider"></div>
        </div>
        <Grid container spacing={4}>
          <Grid item md={8}>
            <h2 className="title-label">Missions</h2>
            <h3 className="page-subtitle">List of Missions</h3>

            {data && data.content.map((item, index) => (
              <MissionCard
                title={item.title}
                description={item.description}
                status={getStatus(data, item)}
                item={item.id}
                rewards={rewards}
                element={
                  <Box sx={{ width: "100%" }}>
                    <Progress value={Number(item.progress.toFixed())} />
                  </Box>
                }
                key={index}
              />
            ))}
            <div className="empty-container"></div>
          </Grid>
          <Grid item md={4}>
            <h2 className="title-label">FAQs</h2>
            <h3 className="page-subtitle">Frequently asked questions.</h3>
            <FAQ></FAQ>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Missions;
