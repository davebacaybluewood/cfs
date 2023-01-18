import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import "./Calendar.scss";
import { useDispatch, useSelector } from "react-redux";
import { listEvents } from "redux/actions/eventActions";
import { formatDate } from "helpers/dateFormatter";
import DrawerBase, { Anchor } from "library/Drawer/Drawer";
import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState([
    {
      id: "",
      title: "",
      date: "",
      description: "",
      image: "",
    },
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listEvents() as any);
  }, [dispatch]);

  const eventList = useSelector((state: any) => state.eventList);
  const { loading, error, events } = eventList;

  const originalEvents = events.map((event: any) => {
    return {
      id: event._id,
      title: event.title,
      date: formatDate(event.event_date, "dashFormat"),
    };
  });

  const handleDateClick = (selectedId: any) => {
    const event = events
      .filter((ev: any) => selectedId === ev._id)
      .map((e: any) => {
        return {
          title: e.title,
          date: e.event_date,
          description: e.description,
          image: e.image,
        };
      });

    setSelectedEvent(event);
  };
  const handleEventClick = (selectedId: any) => {
    setShowDialog(true);
    const event = events
      .filter((ev: any) => selectedId === ev._id)
      .map((e: any) => {
        return {
          title: e.title,
          date: e.event_date,
          description: e.description,
          image: e.image,
        };
      });

    setSelectedEvent(event);
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="calendar-content">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={2}>
          <h2 className="list-title">Events</h2>
          <List>
            {events.map((event: any) => {
              const et = new Date(event.event_date);
              const eventTime = `${et.getHours()}:${et.getMinutes()}`;
              return (
                <ListItem
                  key={event._id}
                  sx={{
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                  onClick={() => handleEventClick(event._id)}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {`${formatDate(
                          event.event_date,
                          "fullFormat"
                        )} ${eventTime}`}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={12} lg={10}>
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            buttonIcons={{
              next: "Next",
              prev: "Prev",
            }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventColor="#333333"
            eventTextColor="white"
            select={(event) => handleDateClick(event)}
            eventClick={(event) => handleEventClick(event.event._def.publicId)}
            initialEvents={originalEvents}
          />
        </Grid>
      </Grid>

      <DrawerBase
        anchor={Anchor.Right}
        onClose={() => setShowDialog(false)}
        open={showDialog}
        title="EVENT DETAILS"
        footer={
          <React.Fragment>
            <Button onClick={() => setShowDialog(false)}>CANCEL</Button>
          </React.Fragment>
        }
        className="calendar-drawer"
      >
        <div>
          <div className="event-captions">
            <div className="date-wrapper">
              <CalendarTodayIcon />{" "}
              {formatDate(new Date(selectedEvent[0]?.date), "fullFormat")}
            </div>
            <h2>{selectedEvent[0]?.title}</h2>
          </div>
          <p className="event-drawer-description">
            {selectedEvent[0]?.description}
          </p>
          <img src={selectedEvent[0].image} width="100%" />
        </div>
      </DrawerBase>
    </div>
  );
};

export default Calendar;
