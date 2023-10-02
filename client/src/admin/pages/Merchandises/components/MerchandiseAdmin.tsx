import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import Title from "admin/components/Title/Title";
import { paths } from "constants/routes";
import React, { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { createSearchParams, useNavigate } from "react-router-dom";
import { formatISODateOnly } from "helpers/date";
import { BsPlusCircle } from "react-icons/bs";
import { MerchandiseData } from "admin/models/merchandiseModel";
import agent from "admin/api/agent";
import Spinner from "library/Spinner/Spinner";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import "./style.scss";

const MerchandiseAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fixedLoading, setFixedLoading] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [merchandises, setMerchandises] = useState<
    MerchandiseData[] | undefined
  >();

  const FilteredGridToolbar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const filterHandler = (status: string) => {
      console.log("test");
    };
    return (
      <GridToolbarContainer className="custom-toolbar">
        <GridToolbar />
        <Button onClick={handleClick} className="filter-status-btn">
          <BiFilterAlt />
          Filter by Status
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => filterHandler("ALL")}>All Status</MenuItem>
          <MenuItem onClick={() => filterHandler("ACTIVATED")}>
            Activated
          </MenuItem>
          <MenuItem onClick={() => filterHandler("DEACTIVATED")}>
            Deactivated
          </MenuItem>
        </Menu>
      </GridToolbarContainer>
    );
  };

  useEffect(() => {
    const fetchMerchandises = async () => {
      setLoading(true);
      const data = await agent.Merchandise.getAllMerchandise();

      setMerchandises(data);
      setLoading(false);
    };

    fetchMerchandises();
  }, []);

  const deleteHandler = async (id: string) => {
    setFixedLoading(true);
    const res = await agent.Merchandise.deleteMerchandise(id);

    if (res) {
      setMerchandises((prevState) =>
        prevState?.filter((data) => data._id !== id)
      );
      setActiveId("");
      setIsDialogOpen(false);
      setFixedLoading(false);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => params.value,
    },
    {
      field: "id",
      headerName: "ID",
      width: 350,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "points",
      headerName: "Points",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
    },
    {
      field: "actions",
      headerName: "",
      width: 480,
      align: "right",
      renderCell: (params) => params.value,
    },
  ];

  const rows = merchandises?.map((data) => {
    return {
      id: data._id,
      name: data.name,
      points: data.points,
      createdAt: formatISODateOnly(data.createdAt),
      status: data.status,
      image: (
        <img src={data.image} alt="Merchandise" className="merchandise-image" />
      ),
      actions: (
        <React.Fragment>
          <button
            className="select-btn"
            onClick={() =>
              navigate({
                pathname: paths.merchandiseForm,
                search: createSearchParams({
                  action: "edit",
                  merchandiseId: data._id,
                }).toString(),
              })
            }
          >
            <span>Update</span>
            <BsPlusCircle />
          </button>
          <button
            className="select-btn danger"
            onClick={() => {
              setActiveId(data._id);
              setIsDialogOpen(true);
            }}
          >
            <span>Delete</span>
            <BsPlusCircle />
          </button>
        </React.Fragment>
      ),
    };
  });

  if (loading) {
    return <Spinner variant="relative" />;
  }

  return (
    <div className="merchandises-container">
      <Title title="Merchandises" subtitle="List of all Merchandises.">
        <Button
          onClick={() => navigate(paths.merchandiseForm)}
          variant="contained"
        >
          Add Merchandise
        </Button>
      </Title>
      {merchandises?.length ? (
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} lg={12}>
            <div className="merchandise-table">
              <DataGrid
                rows={rows ?? []}
                columns={columns}
                slots={{ toolbar: FilteredGridToolbar }}
              />
            </div>
          </Grid>
        </Grid>
      ) : (
        <NoInformationToDisplay
          message="No available merchandise to display"
          title="No Merchandise"
          showNoInfo={true}
          variant="primary"
        />
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogContentText fontSize={15}>
            Are you sure you want to delete this merchandise?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDialogOpen(false)}
            style={{ fontSize: "13px" }}
          >
            No
          </Button>
          <Button
            onClick={() => deleteHandler(activeId)}
            autoFocus
            style={{ fontSize: "13px" }}
          >
            Yes, I want to delete this merchandise.
          </Button>
        </DialogActions>
      </Dialog>
      {fixedLoading ? <Spinner variant="fixed" /> : null}
    </div>
  );
};

export default MerchandiseAdmin;
