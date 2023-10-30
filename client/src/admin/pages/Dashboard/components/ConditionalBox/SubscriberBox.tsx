import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FaUserShield, FaCalendarMinus } from "react-icons/fa";
import DashboardCard from "../DashboardCard/DashboardCard";
import { StatisticTypes } from "../../types";
import Title from "admin/components/Title/Title";
import { MerchandiseData } from "admin/models/merchandiseModel";
import agent from "admin/api/agent";
import MerchandiseCard from "admin/components/MerchandiseCard/MerchandiseCard";
import RewardsHistoryTable from "admin/pages/RewardsHistory/RewardsHistoryTable";
import "../../Dashboard.scss";
import useFetchPoints from "admin/pages/RewardsHistory/useFetchPoints";
import { UserContext } from "admin/context/UserProvider";
import useFetchSubscribers from "admin/pages/RewardsHistory/useFetchSubscribers";
import ClaimMerchDialog from "admin/pages/Merchandises/components/ClaimMerchDialog";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import { AiFillStar } from "react-icons/ai";

const SubscriberBox = () => {
  const [merchandises, setMerchandises] = useState<
    MerchandiseData[] | undefined
  >();

  const [statisticsNumber, setStatisticsNumber] = useState({
    points: 0,
    registeredSubscribers: 0,
    merchandise: 0,
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    remarks: "",
  });

  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;
  const { pointsData } = useFetchPoints(userGuid);
  const { totalSubscribers } = useFetchSubscribers(userGuid);
  const { profile } = useFetchUserProfile(userGuid);

  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  // for dashboard active points value
  const [activePoints, setActivePoints] = useState(0);

  const [activeMerchandise, setActiveMerchandise] = useState({
    name: "",
    image: "",
    points: 0,
    merchandiseId: "",
  });

  useEffect(() => {
    setInitialValues({
      name: profile?.firstName + " " + profile?.lastName,
      address: "",
      phoneNumber: profile?.phoneNumber ?? "",
      emailAddress: profile?.emailAddress ?? "",
      remarks: "",
    });
  }, [profile]);

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

    setActivePoints(pointsData?.totalPoints ?? 0);
  }, [pointsData, totalSubscribers]);

  const statistics: StatisticTypes[] = [
    {
      countText: "Active Points",
      count: activePoints,
      url: "", //paths.typeAppointments.replace(":typeId", "paw"),
      icon: <AiFillStar />,
    },
    {
      countText: "Registered Subscriber",
      count: statisticsNumber.registeredSubscribers,
      url: "", //paths.typeAppointments.replace(":typeId", "webinar"),
      icon: <FaCalendarMinus />,
    },
    {
      countText: "Merchandises",
      count: statisticsNumber.merchandise,
      url: "", //paths.contacts,
      icon: <FaUserShield />,
    },
  ];

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        marginBottom={2}
        justifyContent="center"
        alignItems="center"
      >
        {statistics.map((statistic: StatisticTypes, index: number) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
            <DashboardCard {...statistic} />
          </Grid>
        ))}
      </Grid>

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
                key={data._id}
                name={data.name}
                image={data.image}
                points={data.points}
                button={{
                  display: true,
                  onClick: () => {
                    setActiveMerchandise({
                      image: data.image,
                      name: data.name,
                      points: data.points,
                      merchandiseId: data._id,
                    });
                    setShowSuccessMsg(false);
                    setOpenDialog(true);
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
        setActivePoints={setActivePoints}
      />

      <Grid container spacing={2} marginBottom={3}>
        <Grid item sm={12} md={12} lg={12}>
          <Title title="Reward History" subtitle="History of your points" />
        </Grid>
        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          style={{ marginTop: 0, paddingTop: 0 }}
        >
          <RewardsHistoryTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SubscriberBox;
