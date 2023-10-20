import { Button, Menu, MenuItem, TextField } from "@mui/material";
import {
  GridToolbar,
  GridToolbarContainer,
  useGridApiContext,
} from "@mui/x-data-grid";
import React, { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import "./TrialSubscription.scss";
import { TrialSubscriptionProps } from "./TrialSubscriptionTable";

const FilteredGridToolbar = ({
  subscriptions,
  setFilteredSubscriptions,
}: {
  subscriptions: TrialSubscriptionProps[];
  setFilteredSubscriptions: React.Dispatch<
    React.SetStateAction<TrialSubscriptionProps[]>
  >;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const apiRef = useGridApiContext();
  const updateSearchValue = React.useCallback(
    (newSearchValue: string) => {
      apiRef.current.setQuickFilterValues([newSearchValue]);
    },
    [apiRef]
  );
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const filterHandler = (status: string) => {
    const filterExpiredData = subscriptions.filter(
      (item) => item.daysRemaining === 0
    );

    const filterActiveData = subscriptions.filter(
      (item) => item.daysRemaining > 0
    );

    const result =
      status === "ALL"
        ? subscriptions
        : status === "EXPIRED"
        ? filterExpiredData
        : filterActiveData;
    setFilteredSubscriptions(() => {
      return result;
    });
    setAnchorEl(null);
  };

  return (
    <GridToolbarContainer className="custom-toolbar">
      <GridToolbar />
      <Button onClick={handleClick} className="filter-status-btn">
        <BiFilterAlt />
        Filter by Status
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => filterHandler("ALL")}>ALL</MenuItem>
        <MenuItem onClick={() => filterHandler("EXPIRED")}>EXPIRED</MenuItem>
        <MenuItem onClick={() => filterHandler("ACTIVE")}>ACTIVE</MenuItem>
      </Menu>

      <TextField
        placeholder="Search"
        onChange={(e) => updateSearchValue(e.target.value)}
        size="small"
        sx={{ minWidth: "250px" }}
      />
    </GridToolbarContainer>
  );
};

export default FilteredGridToolbar;
