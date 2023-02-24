import { Box, Button, Grid } from "@mui/material";
import Table from "AdminNew/components/Table/Table";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import React, { useEffect } from "react";
import { CrumbTypes } from "../Dashboard/types";
import "./Contacts.scss";
import { useDispatch, useSelector } from "react-redux";
import { listContacts } from "redux/actions/contactActions";
import { formatISODateToDate } from "helpers/dateFormatter";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Contacts",
    url: paths.contacts,
    isActive: true,
  },
];

const Contacts: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listContacts() as any);
  }, [dispatch]);

  const contactList = useSelector((state: any) => state.contactList);
  const { loading, error } = contactList;

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

  const contacts = [
    {
      _id: "8356e5d3-0508-48af-b4f9-bff582366c17",
      title: "Dave Spencer Bacay",
      contactDate: formatISODateToDate(new Date().toString()),
      description: "This is a description",
    },
    {
      _id: "3356e5d3-0508-48af-b4f9-bff582366c17",
      title: "Dave Spencer Bacay",
      contactDate: formatISODateToDate(new Date().toString()),
      description: "This is a description",
    },
    {
      _id: "5356e5d3-0508-48af-b4f9-bff582366c17",
      title: "Dave Spencer Bacay",
      contactDate: formatISODateToDate(new Date().toString()),
      description: "This is a description",
    },
  ];

  const tableDefs = {
    columns: [
      {
        id: "contactId",
        label: "Name",
        minWidth: 80,
        align: "left",
      },
      {
        id: "title",
        label: "Contact Number",
        minWidth: 80,
        align: "left",
      },
      {
        id: "contactDate",
        label: "Email",
        minWidth: 80,
        align: "left",
      },
      {
        id: "description",
        label: "Remarks",
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

    rows: contacts?.map((contact: any) => {
      return {
        contactId: "Dave Bacay Contact",
        title: "+63294184833",
        contactDate: "spencerbacay@testdata.com",
        description: "This is a client",
        actions: actionButtons,
      };
    }),
  };
  return (
    <Wrapper
      breadcrumb={crumbs}
      error={error}
      loading={false}
      className="contacts-wrapper"
    >
      <Title title="Contacts" subtitle="Track all your saved contacts." />
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

export default Contacts;
