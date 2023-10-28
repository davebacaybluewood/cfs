import React, { useContext, useEffect, useState } from "react";
import useFetchEvents from "admin/pages/Events/hooks/useFetchEvents";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import { UserContext } from "admin/context/UserProvider";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import { paths } from "constants/routes";
import Title from "admin/components/Title/Title";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { BiFilterAlt } from "react-icons/bi";
import { formatISODateOnly } from "helpers/date";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ROLES } from "admin/constants/constants";
import Event from "admin/models/eventModel";
import { RiExternalLinkFill } from "react-icons/ri";
import classNames from "classnames";

const EventsTable = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext) as any;
  const { profile, loading } = useFetchUserProfile(
    userCtx?.user?.userGuid ?? ""
  );
  const role = profile?.role!;

  const [eventList, setEventList] = useState<Event[]>([]);
  const { eventRows } = useFetchEvents(role);

  useEffect(() => {
    setEventList(eventRows);
  }, [eventRows]);

  const FilteredGridToolbar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleFilterStatus = (status: string) => {
      setEventList((prevState) => {
        const filteredData = eventRows?.filter(
          (data) => data.status === status
        );

        return status === "All" ? eventRows : filteredData;
      });
      setAnchorEl(null);
    };

    const status = ["All", "Coming Soon", "Ongoing", "Completed", "Cancelled"];
    return (
      <GridToolbarContainer className="custom-toolbar">
        {(role === ROLES.ROLE_MASTER_ADMIN || role === ROLES.ROLE_AGENT) && (
          <Button
            onClick={() => navigate(paths.newAdminEventsForm)}
            variant="contained"
          >
            Add Event
          </Button>
        )}
        <Divider orientation="vertical" flexItem />
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />

        <Button onClick={handleClick} className="filter-status-btn">
          <BiFilterAlt />
          Filter by Status
        </Button>

        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          {status.map((s) => {
            return (
              <MenuItem key={s} onClick={() => handleFilterStatus(s)}>
                {s}
              </MenuItem>
            );
          })}
        </Menu>
      </GridToolbarContainer>
    );
  };

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Events",
      url: paths.adminEvents,
      isActive: true,
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      width: 200,
      renderCell: (params) => params.value,
      filterable: false,
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => params.value,
    },
    {
      field: "eventDate",
      headerName: "Event Date",
      width: 200,
      renderCell: (params) => params.value,
      filterable: false,
    },
    {
      field: "authorName",
      headerName: "Author Name",
      width: 200,
      renderCell: (params) => params.value,
    },
    {
      field: "noOfAttendees",
      headerName: "Attendees",
      width: 200,
      renderCell: (params) => params.value,
      filterable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => params.value,
      filterable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => params.value,
      filterable: false,
    },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      actions: role === ROLES.ROLE_SUBSCRIBER ? false : true,
    });

  const handleCancelEvent = async (evt: Event) => {
    console.log(evt);
  };

  const filteredEventRows = eventList.map((evt: any) => {
    return {
      id: evt._id,
      title: evt.title,
      thumbnail: (
        <img
          src={evt.thumbnail}
          alt="event"
          width="200"
          className="thumbnail"
        />
      ),
      authorName:
        evt.authorFirstName && evt.authorLastName
          ? evt.authorFirstName + " " + evt.authorLastName
          : "-",
      eventDate: formatISODateOnly(evt.eventDate),
      noOfAttendees: evt.noOfAttendees,
      status: evt.status,
      actions: (
        <>
          {(role === ROLES.ROLE_AGENT || ROLES.ROLE_MASTER_ADMIN) && (
            <>
              <button
                className="select-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  navigate({
                    pathname: paths.newAdminEventsForm,
                    search: createSearchParams({
                      eventId: evt._id,
                      action: "edit",
                    }).toString(),
                  });
                }}
              >
                <span>View</span> <RiExternalLinkFill />
              </button>
              <button
                className={classNames("select-btn", {
                  danger: evt.status !== "Cancelled",
                })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                disabled={evt.status === "Cancelled"}
                onClick={() => {
                  handleCancelEvent(evt);
                }}
              >
                <span>Cancel</span> <RiExternalLinkFill />
              </button>
            </>
          )}
        </>
      ),
    };
  });

  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={loading}>
      <div className="events-admin-container" style={{ padding: "2rem" }}>
        <Title title="Events" subtitle="List of Events" />

        <div className="events-admin-table">
          <DataGrid
            sx={{
              boxShadow: "0 4px 6px -1px #eee, 0 2px 4px -1px #eee",
              background: "white",
              p: 2,
            }}
            rows={filteredEventRows}
            columns={columns}
            slots={{ toolbar: FilteredGridToolbar }}
            localeText={{
              toolbarFilters: "Search by",
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
            initialState={{
              ...filteredEventRows,
              filter: {
                filterModel: {
                  items: [],
                  quickFilterValues: ["a"],
                },
              },
            }}
            // disableDensitySelector
            // disableColumnSelector
            density="comfortable"
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default EventsTable;
