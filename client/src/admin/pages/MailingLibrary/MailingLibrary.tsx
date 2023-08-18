import React, { useContext, useEffect, useState } from "react";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import Title from "admin/components/Title/Title";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { BsPlusCircle } from "react-icons/bs";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";
import agent from "admin/api/agent";
import { UserContext } from "admin/context/UserProvider";
import "./MailingLibrary.scss";
import nameFallback from "helpers/nameFallback";
import { formatISODateOnly } from "helpers/date";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import classNames from "classnames";
import { HiOutlineTrash } from "react-icons/hi";
import { RiExternalLinkFill } from "react-icons/ri";
import Spinner from "library/Spinner/Spinner";

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

const MailLibrary: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fixedLoading, setFixedLoading] = useState(false);
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;
  const [templates, setTemplates] = useState<any>([]);

  const columns: GridColDef[] = [
    {
      field: "templateName",
      headerName: "Template Name",
      width: 400,
      renderCell: (params) => params.value,
    },
    { field: "subject", headerName: "Subject", width: 150 },
    { field: "createdBy", headerName: "Created By", width: 150 },
    { field: "createdAt", headerName: "Date Created", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => params.value,
    },
    {
      field: "actions",
      headerName: "",
      width: 600,
      align: "right",
      renderCell: (params) => params.value,
    },
  ];

  const activationHandler = async (
    templateName: string,
    templateBody: string,
    templateStatus: string,
    isAddedByMarketing: boolean,
    templateId: string,
    subject: string
  ) => {
    setFixedLoading(true);
    const body = {
      templateName,
      templateBody,
      templateStatus,
      isAddedByMarketing,
      subject,
    };
    const res = await agent.EmailMarketing.updateEmailTemplate(
      userGuid,
      templateId,
      body
    );
    if (res) {
      toast.info(`Template Updated`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setFixedLoading(false);

      setTemplates((prevRows) => {
        return prevRows.map((row, index) => {
          const newData =
            row._id === templateId
              ? {
                  ...row,
                  status: templateStatus,
                }
              : row;

          console.log(newData);
          return newData;
        });
      });
    }
  };

  useEffect(() => {
    const fetchEmailTemplates = async () => {
      setLoading(true);
      const data = await agent.EmailMarketing.getEmailTemplates(userGuid);

      setTemplates(data);
    };

    if (userGuid) {
      fetchEmailTemplates();
      setLoading(false);
    }
  }, [userGuid]);

  const filteredRows = templates?.map((template) => {
    const deactivateButtonIsDisabled = template.userGuid !== userGuid;
    const btnClassnames = classNames("select-btn", {
      danger: template.status === "ACTIVATED",
    });

    return {
      id: template._id,
      createdBy: nameFallback(
        template.authorName,
        template.authorFirstname,
        template.authorLastname
      ),
      createdAt: formatISODateOnly(template.createdAt ?? ""),
      templateName: (
        <Tooltip
          title={<h1 style={{ color: "#fff" }}>Created by Marketing Team</h1>}
        >
          <div className="template-name-header">
            <span>{template.templateName}</span>
            {template.isAddedByMarketing ? <AiFillCheckCircle /> : null}
          </div>
        </Tooltip>
      ),
      subject: template.subject,
      body: template.templateBody,
      status:
        template.status.charAt(0).toUpperCase() +
        template.status.slice(1).toLowerCase(),
      isAddedByMarketing: template.isAddedByMarketing,
      actions: (
        <React.Fragment>
          <button
            className="select-btn"
            disabled={
              template.status === "DEACTIVATED" || template.status === "DRAFT"
            }
            onClick={() => {
              navigate({
                pathname: paths.emailMarketing,
                search: createSearchParams({
                  templateId: template._id,
                }).toString(),
              });
            }}
          >
            <span>Import</span> <BsPlusCircle />
          </button>
          <button
            className="select-btn"
            onClick={() => {
              navigate({
                pathname: paths.mailLibraryForm,
                search: createSearchParams({
                  action: "edit",
                  templateId: template._id,
                }).toString(),
              });
            }}
          >
            <span>View</span> <RiExternalLinkFill />
          </button>
          {template.status === "DEACTIVATED" ||
          (template.status === "DRAFT" && template.userGuid === userGuid) ? (
            <button
              className={btnClassnames}
              onClick={() =>
                activationHandler(
                  template.templateName,
                  template.templateBody,
                  "ACTIVATED",
                  !!template.isAddedByMarketing,
                  template._id ?? "",
                  template.subject
                )
              }
              disabled={deactivateButtonIsDisabled}
            >
              <span>Activate</span> <AiOutlineCheckCircle />
            </button>
          ) : (
            <button
              className={btnClassnames}
              onClick={() =>
                activationHandler(
                  template.templateName,
                  template.templateBody,
                  "DEACTIVATED",
                  !!template.isAddedByMarketing,
                  template._id ?? "",
                  template.subject
                )
              }
              disabled={deactivateButtonIsDisabled}
            >
              <span>Deactivate</span> <HiOutlineTrash />
            </button>
          )}
        </React.Fragment>
      ),
    };
  });

  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={loading}>
      <div className="mailing-library-container">
        <Title title="Email Library" subtitle="lorem ipsum dolor sit amet">
          <Button
            onClick={() => navigate(paths.mailLibraryForm)}
            variant="contained"
          >
            Add Template
          </Button>
        </Title>
        <div className="mailing-library-table">
          <DataGrid
            rows={filteredRows}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </div>
      </div>
      {fixedLoading ? <Spinner variant="fixed" /> : null}
    </Wrapper>
  );
};

export default MailLibrary;
