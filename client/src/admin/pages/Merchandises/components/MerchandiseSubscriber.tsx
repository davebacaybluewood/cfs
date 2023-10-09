import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import agent from "admin/api/agent";
import MerchandiseCard from "admin/components/MerchandiseCard/MerchandiseCard";
import Title from "admin/components/Title/Title";
import { MerchandiseData } from "admin/models/merchandiseModel";
import DashboardCard from "admin/pages/Dashboard/components/DashboardCard/DashboardCard";
import { Formik } from "formik";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FaCube } from "react-icons/fa";
import * as Yup from "yup";

const MerchandiseSubscriber: React.FC = () => {
  const [merchandises, setMerchandises] = useState<
    MerchandiseData[] | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeMerchandise, setActiveMerchandise] = useState({
    name: "",
    image: "",
    points: 0,
  });

  useEffect(() => {
    const fetchMerchandises = async () => {
      setLoading(true);
      const data = await agent.Merchandise.getAllMerchandise();

      setMerchandises(data);
      setLoading(false);
    };

    fetchMerchandises();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name field is required."),
    address: Yup.string().required("Address field is required."),
    phoneNumber: Yup.string().required("Phone Number field is required."),
    emailAddress: Yup.string().required("Email Address field is required."),
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    remarks: "",
  });

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
                  onClick: () => {
                    setOpenDialog(true);
                    setActiveMerchandise({
                      image: data.image,
                      name: data.name,
                      points: data.points,
                    });
                  },
                  text: "Claim Reward",
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        className="dialog-merchandise"
      >
        <DialogContent>
          <Title
            title="Redeem Reward"
            subtitle="To redeem to this merchandise, please enter your information here.
            We will send updates from time to time."
          />
          <Grid container spacing={2}>
            <Grid item sm={12} md={6} lg={4}>
              <MerchandiseCard
                name={activeMerchandise.name}
                points={activeMerchandise.points}
                image={activeMerchandise.image}
              />
            </Grid>
            <Grid item sm={12} md={6} lg={8}>
              <Formik
                initialValues={initialValues}
                onSubmit={() => console.log("")}
                validationSchema={validationSchema}
              >
                {({ values }) => {
                  return (
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={12} lg={12}>
                        <label>Name (Required)</label>
                        <FormikTextInput
                          placeholder="Enter your name here"
                          variant="outlined"
                          name="name"
                          value={values.name}
                        />
                      </Grid>
                      <Grid item sm={12} md={12} lg={12}>
                        <label>Email Address (Required)</label>
                        <FormikTextInput
                          placeholder="Enter your email address here"
                          variant="outlined"
                          name="emailAddress"
                          value={values.emailAddress}
                        />
                      </Grid>
                      <Grid item sm={12} md={12} lg={12}>
                        <label>Phone Number (Required)</label>
                        <FormikTextInput
                          placeholder="Enter your phone number here"
                          variant="outlined"
                          name="phoneNumber"
                          value={values.phoneNumber}
                        />
                      </Grid>
                      <Grid item sm={12} md={12} lg={12}>
                        <label>Address (Required)</label>
                        <FormikTextInput
                          placeholder="Enter your template address here"
                          variant="outlined"
                          name="address"
                          value={values.address}
                          isTextArea
                        />
                      </Grid>
                      <Grid item sm={12} md={12} lg={12}>
                        <label>Remarks</label>
                        <FormikTextInput
                          placeholder="Enter your remarks here"
                          variant="outlined"
                          name="remarks"
                          value={values.remarks}
                        />
                      </Grid>
                    </Grid>
                  );
                }}
              </Formik>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => setOpenDialog(false)}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MerchandiseSubscriber;
