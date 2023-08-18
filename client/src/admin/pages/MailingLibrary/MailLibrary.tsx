import React from "react";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import Title from "admin/components/Title/Title";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { BsPlusCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import "./MailingLibrary.scss";

const MailLibrary: React.FC = () => {
  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Email Library",
      url: paths.mailLibrary,
      isActive: true,
    },
  ];

  const rows: GridRowsProp = [
    {
      id: 1,
      createdBy: "Hello",
      createdAt: "World",
      templateName: "Template 1",
      body: "test",
      actions: (
        <React.Fragment>
          <button className="select-btn">
            <span>Select This Template</span> <BsPlusCircle />
          </button>
        </React.Fragment>
      ),
    },
  ];

  const columns: GridColDef[] = [
    { field: "templateName", headerName: "Template Name", width: 300 },
    { field: "createdBy", headerName: "Created By", width: 150 },
    { field: "createdAt", headerName: "Date Created", width: 150 },
    {
      field: "actions",
      headerName: "",
      width: 250,
      align: "right",
      renderCell: (params) => params.value,
    },
  ];

  const navigate = useNavigate();

  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <div className="mailing-library-container">
        <div className="header-library">
          <Title title="Email Library" subtitle="lorem ipsum dolor sit amet" />
          <button onClick={() => navigate(paths.mailLibraryForm)}>
            Email Form
          </button>
        </div>
        <div className="mailing-library-table">
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    </Wrapper>
  );
};

export default MailLibrary;
