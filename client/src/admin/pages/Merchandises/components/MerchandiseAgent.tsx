import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Title from "admin/components/Title/Title";
import { MerchandiseData } from "admin/models/merchandiseModel";
import agent from "admin/api/agent";
import MerchandiseCard from "admin/components/MerchandiseCard/MerchandiseCard";
import useFetchPoints from "admin/pages/RewardsHistory/useFetchPoints";
import { UserContext } from "admin/context/UserProvider";
import useFetchSubscribers from "admin/pages/RewardsHistory/useFetchSubscribers";
import ClaimMerchDialog from "./ClaimMerchDialog";
import useFetchUserProfile from "admin/hooks/useFetchProfile";

const MerchandiseAgent = () => {
  const [merchandises, setMerchandises] = useState<
    MerchandiseData[] | undefined
  >();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeMerchandise, setActiveMerchandise] = useState({
    name: "",
    image: "",
    points: 0,
    merchandiseId: "",
  });
  
  

  const [statisticsNumber, setStatisticsNumber] = useState({
    points: 0,
    registeredSubscribers: 0,
    merchandise: 0,
  });

  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;
  const { pointsData } = useFetchPoints(userGuid);
  const { totalSubscribers } = useFetchSubscribers(userGuid);
  const { profile } = useFetchUserProfile(userGuid);

  useEffect(() => {
    const fetchMerchandises = async () => {
      const data = await agent.Merchandise.getAllMerchandise();
      setMerchandises(data);
      setStatisticsNumber((prevState) => {
        return {
          ...prevState,
          merchandise: data?.length ?? 0,
        };
      });
    };

    fetchMerchandises();
  }, []);

  useEffect(() => {
    setStatisticsNumber((prevState) => {
      return {
        ...prevState,
        points: pointsData?.totalPoints ?? 0,
        registeredSubscribers: totalSubscribers ?? 0,
      };
    });
  }, [pointsData, totalSubscribers]);


  return (
    <React.Fragment>
      <Grid container spacing={2} marginBottom={3}>
        <Grid item sm={12} md={12} lg={12}>
          <Title title="Merchandises" subtitle="List of all Merchandises." />
        </Grid>
        {merchandises?.map((data) => {
          return (
            <Grid
              item
              sm={6}
              md={2}
              lg={2}
              style={{ marginTop: 0, paddingTop: 0 }}
            >
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

              <ClaimMerchDialog
                openDialog={openDialog}
                showSuccessMsg={showSuccessMsg}
                setOpenDialog={setOpenDialog}
                setShowSuccessMsg={setShowSuccessMsg}
                activeMerchandise={activeMerchandise}
                pointsData={pointsData}
                profile={profile}
              />


            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default MerchandiseAgent;
