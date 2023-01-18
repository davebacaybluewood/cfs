import { Button } from "@mui/material";
import Table from "pages/Admin/components/Table/Table";
import Title from "pages/Admin/components/Title/Title";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listContacts } from "redux/actions/contactActions";

const Contacts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listContacts() as any);
  }, [dispatch]);

  const contactList = useSelector((state: any) => state.contactList);
  const { loading, error, contacts } = contactList;

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
        id: "contactId",
        label: "Event ID",
        minWidth: 80,
        align: "left",
      },
      {
        id: "title",
        label: "Title",
        minWidth: 80,
        align: "left",
      },
      {
        id: "contactDate",
        label: "Event Date",
        minWidth: 80,
        align: "left",
      },
      {
        id: "description",
        label: "Description",
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
        contactId: contact._id,
        title: contact.title,
        contactDate: contact.date,
        description: contact.description,
        actions: actionButtons,
      };
    }),
  };
  console.log(tableDefs.rows);
  return (
    <div className="admin-contacts">
      <Title
        title="Contacts"
        subtitle="Lorem Ipsum is simply dummy text of the printing"
      />
      <Table
        columns={tableDefs.columns}
        rows={tableDefs.rows}
        loading={loading}
      />
    </div>
  );
};

export default Contacts;
