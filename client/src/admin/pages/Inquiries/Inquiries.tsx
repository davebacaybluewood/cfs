import { Button, Grid } from "@mui/material";
import Table from "admin/components/Table/Table";
import Title from "admin/components/Title/Title";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import React, { useEffect } from "react";
import { CrumbTypes } from "../Dashboard/types";
import { useDispatch, useSelector } from "react-redux";
import { listInquiries } from "redux/actions/inquiryActions";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Inquiries",
    url: paths.inquiries,
    isActive: true,
  },
];

const Inquiries: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listInquiries() as any);
  }, [dispatch]);

  const inquiryList = useSelector((state: any) => state.inquiryList);
  const { loading, error, inquiries } = inquiryList;

  const actionButtons = (
    <div className="action-buttons">
      <Button variant="outlined" size="small">
        View
      </Button>
      <Button variant="outlined" size="small" color="error">
        Delete
      </Button>
    </div>
  );
  const tableDefs = {
    columns: [
      {
        id: "inquiryId",
        label: "Inquiry ID",
        minWidth: 80,
        align: "left",
      },
      {
        id: "fullName",
        label: "Fullname",
        minWidth: 80,
        align: "left",
      },
      {
        id: "emailAddress",
        label: "Email Address",
        minWidth: 80,
        align: "left",
      },
      {
        id: "mobileNumber",
        label: "Mobile Number",
        minWidth: 80,
        align: "left",
      },
      {
        id: "actions",
        label: "Actions",
        minWidth: 80,
        align: "left",
      },
    ],

    rows: inquiries?.map((inquiry: any) => {
      return {
        inquiryId: inquiry._id,
        fullName: inquiry.fullName,
        emailAddress: inquiry.emailAddress,
        mobileNumber: inquiry.mobileNumber,
        actions: actionButtons,
      };
    }),
  };
  return (
    <Wrapper
      breadcrumb={crumbs}
      error={error}
      loading={loading}
      className="contacts-wrapper"
    >
      <Title title="Inquiries" subtitle="Track all Comfort Life Inquiries." />
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} lg={12}>
          <Table
            columns={tableDefs.columns}
            rows={tableDefs.rows}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Inquiries;
