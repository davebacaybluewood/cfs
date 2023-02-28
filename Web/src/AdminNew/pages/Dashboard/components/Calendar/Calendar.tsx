import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "./Calendar.scss";

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
        initialView="timeGridDay"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventColor="#333333"
        eventTextColor="white"
        select={(event) => console.log(event)}
        eventClick={(event) => console.log(event)}
        initialEvents={[
          { title: "event 1", date: "2023-02-28T03:04:05.678123Z" },
          { title: "event 2", date: "2023-02-28T03:04:05.678123Z" },
        ]}
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
