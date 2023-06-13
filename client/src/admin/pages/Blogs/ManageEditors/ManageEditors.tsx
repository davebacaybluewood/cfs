import { Grid } from "@mui/material";
import Title from "admin/components/Title/Title";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { paths } from "constants/routes";
import EditorCard from "library/EditorCard/EditorCard";
import React from "react";
import { FaPlus } from "react-icons/fa";
import "./ManageEditors.scss";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Manage Editors",
    url: paths.adminBlogUsers,
    isActive: true,
  },
];

const ManageEditors: React.FC = () => {
  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={false}>
      <Title title="View All Editors" subtitle="Editors"></Title>
      <div className="add-editor-btn-container">
        <button>
          <FaPlus />
        </button>
      </div>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <EditorCard />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default ManageEditors;
