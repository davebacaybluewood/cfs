import { Button, Grid } from "@mui/material";
import agent from "admin/api/agent";
import MerchandiseCard from "admin/components/MerchandiseCard/MerchandiseCard";
import Title from "admin/components/Title/Title";
import { UserContext } from "admin/context/UserProvider";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import { MerchandiseData } from "admin/models/merchandiseModel";
import DashboardCard from "admin/pages/Dashboard/components/DashboardCard/DashboardCard";
import useFetchPoints from "admin/pages/RewardsHistory/useFetchPoints";
import { paths } from "constants/routes";
import Spinner from "library/Spinner/Spinner";
import React, { useContext, useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FaCube, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ClaimMerchDialog from "./ClaimMerchDialog";

const MerchandiseSubscriber: React.FC = () => {
  const [merchandises, setMerchandises] = useState<
    MerchandiseData[] | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [activeMerchandise, setActiveMerchandise] = useState({
    name: "",
    image: "",
    points: 0,
    merchandiseId: "",
  });
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;
  const { profile } = useFetchUserProfile(userGuid);
  const [statisticsNumber, setStatisticsNumber] = useState({
    points: 0,
    redemeedPoints: 0,
    merchandise: 0,
  });
  const { pointsData } = useFetchPoints(userGuid);

  useEffect(() => {
    const fetchMerchandises = async () => {
      setLoading(true);
      const data = await agent.Merchandise.getAllMerchandise();

      setMerchandises(data);
      setLoading(false);
    };

    fetchMerchandises();
  }, []);

  useEffect(() => {
    setStatisticsNumber((prevState) => {
      return {
        ...prevState,
        points: pointsData?.totalPoints ?? 0,
        redemeedPoints: pointsData?.totalRedeemedPoints ?? 0,
      };
    });
  }, [pointsData, showSuccessMsg]);

  const navigate = useNavigate();

  return (
    <div className="sub-merchandise-container">
      <Grid container spacing={2} style={{ marginBottom: 20 }}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <DashboardCard
            count={merchandises?.length ?? 0}
            countText="Available Merchandises"
            icon={<FaCube />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <DashboardCard
            count={statisticsNumber.points}
            countText="Active Points"
            icon={<BsStarFill />}
            url="/"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <DashboardCard
            count={statisticsNumber.redemeedPoints}
            countText="Redeemed Points"
            icon={<BsStar />}
            url="/"
          />
        </Grid>
      </Grid>
      <Title title="Merchandises" subtitle="List of all Merchandises.">
        <Button
          className="history-btn"
          onClick={() => navigate(paths.orderHistory)}
        >
          <FaHistory />
          Order History
        </Button>
      </Title>
      <Grid container spacing={2}>
        {merchandises?.map((data) => {
          return (
            <Grid item sm={6} md={2} lg={2}>
              <MerchandiseCard
                name={data.name}
                image={data.image}
                points={data.points}
                button={{
                  display: true,
                  onClick: () => {
                    setShowSuccessMsg(false);
                    setOpenDialog(true);
                    setActiveMerchandise({
                      image: data.image,
                      name: data.name,
                      points: data.points,
                      merchandiseId: data._id,
                    });
                  },
                  text: "Claim Reward",
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      <ClaimMerchDialog
        openDialog={openDialog}
        showSuccessMsg={showSuccessMsg}
        setOpenDialog={setOpenDialog}
        setShowSuccessMsg={setShowSuccessMsg}
        activeMerchandise={activeMerchandise}
        pointsData={pointsData}
        profile={profile}
      />

      {loading ? <Spinner variant="fixed" /> : null}
    </div>
  );
};

export default MerchandiseSubscriber;
