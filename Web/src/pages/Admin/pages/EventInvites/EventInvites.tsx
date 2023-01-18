import Table from "pages/Admin/components/Table/Table";
import Title from "pages/Admin/components/Title/Title";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEventInvite,
  listEventInvites,
} from "redux/actions/eventActions";
import "./EventInvites.scss";
import checkBlankValue from "helpers/checkBlankValue";
import { Button } from "@mui/material";

const EventInvites = () => {
  const dispatch = useDispatch();
  const [eventInviteData, setEventInviteData] = useState([]);

  useEffect(() => {
    dispatch(listEventInvites() as any);
  }, [dispatch]);

  const eventInvitesList = useSelector((state: any) => state.eventInvitesList);
  const { loading, eventInvites } = eventInvitesList;
  const eventInvitesDelete: any = useSelector(
    (state: any) => state.eventInvitesDelete
  );

  const { loading: deleteLoading } = eventInvitesDelete;

  useEffect(() => {
    setEventInviteData(eventInvites);
  }, [eventInvites]);

  const deleteHandler = (id: string) => {
    const filteredData = eventInviteData.filter(
      (x: any) => x.referenceId !== id
    );
    if (window.confirm("Are you sure you want to delete this data?")) {
      dispatch(deleteEventInvite(id) as any);
      setEventInviteData(filteredData);
    }
  };
  const tableDefs = {
    columns: [
      {
        id: "refId",
        label: "Reference ID",
        minWidth: 80,
        align: "left",
      },
      {
        id: "eventName",
        label: "Event Name",
        minWidth: 80,
        align: "left",
      },
      {
        id: "clientName",
        label: "Client Name",
        minWidth: 80,
        align: "left",
      },
      {
        id: "invitedBy",
        label: "Invited By",
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
        id: "agentNumber",
        label: "Agent Number",
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

    rows: eventInviteData?.map((invite: any) => {
      return {
        refId: invite.referenceId,
        eventName: checkBlankValue(invite.eventsData[0]?.title),
        clientName: invite.fullName,
        invitedBy: checkBlankValue(invite.invitee),
        emailAddress: checkBlankValue(invite.emailAddress),
        mobileNumber: checkBlankValue(invite.mobileNumber),
        agentNumber: checkBlankValue(invite.agentNumber),
        id: checkBlankValue(invite._id),
        actions: (
          <div className="action-buttons">
            <Button
              variant="outlined"
              size="small"
              onClick={() => deleteHandler(invite.referenceId)}
            >
              View
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => deleteHandler(invite.referenceId)}
            >
              Delete
            </Button>
          </div>
        ),
      };
    }),
  };

  return (
    <div className="admin-event-invites">
      <Title
        title="Event Invites"
        subtitle="Lorem Ipsum is simply dummy text of the printing"
      />
      <Table
        columns={tableDefs.columns}
        rows={tableDefs.rows}
        loading={loading || deleteLoading}
      />
    </div>
  );
};

export default EventInvites;
