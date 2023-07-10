import React, { useEffect, useState } from "react";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import Title from "admin/components/Title/Title";
import { Grid, Menu, MenuItem } from "@mui/material";
import Table from "admin/components/Table/Table";
import { ProfileData } from "admin/hooks/useFetchProfile";
import ENDPOINTS from "constants/endpoints";
import axios from "axios";
import getUserToken from "helpers/getUserToken";
import { FaEllipsisV } from "react-icons/fa";
import Spinner from "library/Spinner/Spinner";
import "./MailingList.scss";
import agent from "api/agent";
import { SubscriptionsData } from "api/models/Subscriptions";
import { formatISODateOnly } from "helpers/dateFormatter";
import { toast } from "react-toastify";

interface ActionButtonsProps {
  id: string;
  setData: React.Dispatch<
    React.SetStateAction<SubscriptionsData[] | undefined>
  >;
}
const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Contacts",
    url: paths.contactAdmin,
    isActive: false,
  },
  {
    title: "Mailing List",
    url: paths.mailingList,
    isActive: false,
  },
];

const ActionButtons: React.FC<ActionButtonsProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = async (id: string) => {
    setLoading(true);

    const res = await agent.Subscription.delete(id);

    if (res) {
      props?.setData((prevState) => {
        const filteredData = prevState?.filter((data) => data._id !== id);
        return filteredData;
      });
      toast.error(`Email address deleted.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      setAnchorEl(null);
    } else {
      setLoading(false);
      setAnchorEl(null);
    }
  };

  return (
    <div className="action-buttons">
      {loading ? <Spinner variant="fixed" /> : null}
      <button
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="ellipsis-btn"
      >
        <FaEllipsisV />
      </button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => deleteHandler(props.id ?? "")}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

const MailingList: React.FC = () => {
  const [data, setData] = useState<SubscriptionsData[] | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await agent.Subscription.get();
      setData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const tableDefs = {
    columns: [
      {
        id: "emailAddress",
        label: "Email Address",
        minWidth: 40,
        align: "left",
      },
      {
        id: "createdAt",
        label: "Date Subscribed",
        minWidth: 80,
        align: "left",
      },
      {
        id: "actions",
        label: "",
        minWidth: 80,
        align: "right",
      },
    ],

    rows: data?.map((data) => {
      const tableData = {
        emailAddress: data.emailAddress,
        id: data._id,
        createdAt: formatISODateOnly(data.createdAt ?? ""),
        actions: <ActionButtons id={data?._id} setData={setData} />,
      };
      return tableData;
    }),
  };
  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={loading}
      className="mailing-list-container"
    >
      <Title title="Mailing List" subtitle="List of all subscribed emails." />
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

export default MailingList;
