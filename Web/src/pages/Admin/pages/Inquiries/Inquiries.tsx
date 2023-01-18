import { Button } from "@mui/material";
import Table from "pages/Admin/components/Table/Table";
import Title from "pages/Admin/components/Title/Title";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listInquiries } from "redux/actions/inquiryActions";

const Inquiries = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listInquiries() as any);
  }, [dispatch]);

  const inquiryList = useSelector((state: any) => state.inquiryList);
  const { loading, error, inquiries } = inquiryList;

  console.log(inquiries);

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
    <div className="admin-inquiries">
      <Title
        title="Inquiries"
        subtitle="Lorem Ipsum is simply dummy text of the printing"
      />
      <Table columns={tableDefs.columns} rows={tableDefs.rows} />
    </div>
  );
};

export default Inquiries;
