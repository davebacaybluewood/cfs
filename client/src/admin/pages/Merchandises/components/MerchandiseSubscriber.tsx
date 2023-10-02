import { Grid } from "@mui/material";
import agent from "admin/api/agent";
import MerchandiseCard from "admin/components/MerchandiseCard/MerchandiseCard";
import Title from "admin/components/Title/Title";
import { MerchandiseData } from "admin/models/merchandiseModel";
import DashboardCard from "admin/pages/Dashboard/components/DashboardCard/DashboardCard";
import React, { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FaCube, FaEnvelopeOpenText } from "react-icons/fa";

const MerchandiseSubscriber: React.FC = () => {
  const [merchandises, setMerchandises] = useState<
    MerchandiseData[] | undefined
  >();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMerchandises = async () => {
      setLoading(true);
      const data = await agent.Merchandise.getAllMerchandise();

      setMerchandises(data);
      setLoading(false);
    };

    fetchMerchandises();
  }, []);

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
            count={0}
            countText="Active Points"
            icon={<BsStarFill />}
            url="/"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <DashboardCard
            count={0}
            countText="Redeemed Points"
            icon={<BsStar />}
            url="/"
          />
        </Grid>
      </Grid>
      <Title title="Merchandises" subtitle="List of all Merchandises." />
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
                  onClick: () => console.log("test"),
                  text: "Claim Reward",
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default MerchandiseSubscriber;
