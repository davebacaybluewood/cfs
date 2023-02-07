import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Button } from "@mui/material";
import "./Calendar.scss";
import { useDispatch, useSelector } from "react-redux";
import { listEvents } from "redux/actions/eventActions";
import { formatDate } from "helpers/dateFormatter";
import DrawerBase, { Anchor } from "library/Drawer/Drawer";
import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const Calendar = () => {
  return (
    <div className="calendar-content">
      <FullCalendar
        height="75vh"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: "",
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
        select={(event) => console.log(event)}
        eventClick={(event) => console.log(event)}
        initialEvents={[]}
      />

      {/* <DrawerBase
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
      </DrawerBase> */}
    </div>
  );
};

export default Calendar;
