import { Button } from "@mui/material";
import paths from "constants/routes";
import { formatDate } from "helpers/dateFormatter";
import Toast from "library/Toast/Toast";
import Table from "pages/Admin/components/Table/Table";
import Title from "pages/Admin/components/Title/Title";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, listAdminAccounts } from "redux/actions/userActions";

const AdminAccounts: React.FC = () => {
  const dispatch = useDispatch();
  const [userDatas, setUserDatas] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listAdminAccounts() as any);
  }, [dispatch]);

  const userAdminList = useSelector((state: any) => state.userAdminList);
  const { loading, error, users } = userAdminList;

  useEffect(() => {
    setUserDatas(users);
  }, [users]);

  const deleteHandler = (id: string) => {
    const filteredEvents = userDatas.filter((x: any) => x._id !== id);
    if (window.confirm("Are you sure you want to delete this data?")) {
      setShowToast(true);
      dispatch(deleteUser(id) as any);
      setUserDatas(filteredEvents);
    }
  };

  const actionButtons = (id: string) => {
    return (
      <div className="action-buttons">
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => deleteHandler(id)}
        >
          Delete
        </Button>
      </div>
    );
  };
  const tableDefs = {
    columns: [
      {
        id: "name",
        label: "Fullname",
        minWidth: 80,
        align: "left",
      },
      {
        id: "email",
        label: "Email Address",
        minWidth: 80,
        align: "left",
      },
      {
        id: "createdAt",
        label: "User Created",
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

    rows: userDatas?.map((user: any) => {
      return {
        name: user.name,
        email: user.email,
        createdAt: formatDate(user.createdAt, "fullFormat"),
        actions: actionButtons(user._id),
      };
    }),
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="admin-accounts-container">
      <Title
        title="Admin Accounts"
        subtitle="Lorem Ipsum is simply dummy text of the printing"
        button={{
          show: true,
          text: "Add Account",
          onClick: () =>
            navigate(paths.adminAccountsForm.replace(":id", "add")),
        }}
      />
      <Table columns={tableDefs.columns} rows={tableDefs.rows} />
      <Toast
        isVisible={showToast}
        setter={setShowToast}
        text="Data has been deleted."
      />
    </div>
  );
};

export default AdminAccounts;
