import { Button } from "@mui/material";
import paths from "constants/routes";
import { formatISODateToDate } from "helpers/dateFormatter";
import Toast from "library/Toast/Toast";
import Table from "pages/Admin/components/Table/Table";
import Title from "pages/Admin/components/Title/Title";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEvent, listEvents } from "redux/actions/eventActions";
import Form from "./components/Form";

const Events: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    dispatch(listEvents() as any);
  }, [dispatch]);

  const eventList = useSelector((state: any) => state.eventList);
  const { loading, events } = eventList;

  useEffect(() => {
    setEventData(events);
  }, [events]);

  const deleteHandler = (id: string) => {
    const filteredEvents = eventData.filter((x: any) => x._id !== id);
    if (window.confirm("Are you sure you want to delete this data?")) {
      setShowToast(true);
      dispatch(deleteEvent(id) as any);
      setEventData(filteredEvents);
    }
  };

  const viewHandler = (id: string) => {
    navigate(paths.adminEventsForm.replace(":id", id));
  };

  const actionButtons = (id: string) => {
    return (
      <div className="action-buttons">
        <Button variant="outlined" size="small" onClick={() => viewHandler(id)}>
          View
        </Button>
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
        id: "image",
        label: "Event Image",
        minWidth: 80,
        align: "left",
      },
      {
        id: "title",
        label: "Title",
        minWidth: 120,
        align: "left",
      },
      {
        id: "eventDate",
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

    rows: eventData?.map((event: any) => {
      return {
        image: (
          <img
            src={event.image}
            alt="event"
            width="200"
            className="thumbnail"
          />
        ),
        title: event.title,
        eventDate: formatISODateToDate(event.event_date),
        description: event.description,
        actions: actionButtons(event._id),
      };
    }),
  };

  const addEventHandler = () => {
    // setShowDrawer(true);
    navigate(paths.adminEventsForm.replace(":id", "add"));
  };

  return (
    <div className="admin-events">
      <Title
        title="Events"
        subtitle="Lorem Ipsum is simply dummy text of the printing"
        button={{
          show: true,
          text: "Add Event",
          onClick: addEventHandler,
        }}
      />
      <Table
        columns={tableDefs.columns}
        rows={tableDefs.rows}
        loading={loading}
      />
      <Form
        setShowDialog={setShowDialog}
        setShowDrawer={setShowDrawer}
        showDrawer={showDrawer}
        setEventData={setEventData}
        eventData={eventData}
      />
      <Toast
        isVisible={showToast}
        setter={setShowToast}
        text="Data has been submitted."
      />
    </div>
  );
};

export default memo(Events);
