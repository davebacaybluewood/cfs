import Banner from "library/Banner/Banner";
import React, { useEffect, useState } from "react";
import "./Events.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactHelmet from "react-helmet";
import NoResultsFound from "library/NoResults/NoResultsFound";

const Events: React.FC = () => {
  const currentTimestamp = Date.now();
  const formattedDate = new Date(currentTimestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const metaKeywords = [
    "insurance qualifying events",
    "insurance qualifying life events",
    "event insurance in california",
    "insurance company events",
    "insurance events near me",
    "insurance news california",
    "event insurance las vegas",
  ].join(", ");

  return (
    <div className="event-content">
      <ReactHelmet>
        <title>
          Financial Events | Insurance Events | Comfort Financial Solutions
        </title>
        <meta
          name="description"
          content="Take charge of your financial future by attending insurance and financial events hosted by Comfort Financial Solutions. Discover how to manage your finances!"
        />
        <meta name="keywords" content={metaKeywords} />
        <link rel="canonical" href={window.location.href} />
      </ReactHelmet>      
      <Banner bigTitle="Events" title="See Upcoming Events" hasBorder />
      {/* <WorkingSteps
        bigTitle={
          <React.Fragment>
            Some <span>easy steps</span> to attend an event.
          </React.Fragment>
        }
        title="WORKING STEPS"
        topTitle="Join Us!"
        steps={eventSteps}
      /> */}

      <NoResultsFound text="No future Events." />

      {/* {events.map((event: EventsType, i: number) => (
        <React.Fragment key={i}>
          <EventCard
            {...event}
            id={event._id}
            setShowDialog={setShowDialog}
            setClipboardValue={setClipboardValue}
            setTicket={setTicket}
          />
        </React.Fragment>
      ))}

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        className="custom-dialog"
      >
        <DialogTitle>
          <div className="custom-dialog-title">
            <CheckCircle />
            <span>Event Form Submitted</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="event-dialog-content">
            Share read-only reference ID link to invite an audience or friends
            in this event.
          </DialogContentText>
          <div className="copy-input">
            <TextField
              label="Reference ID"
              value={clipboardValue}
              fullWidth
              disabled
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() =>
                      navigator.clipboard.writeText(clipboardValue)
                    }
                  >
                    <ContentCopy />
                  </IconButton>
                ),
              }}
            />
            <p className="sent-email-instructions">
              This link has also been sent to your email.
            </p>
            <a href={ticket} download>
              <img alt="event-ticket" src={ticket} className="ticket-img" />
            </a>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)} variant="primary">
            CLOSE
          </Button>
          <Button
            onClick={downloadImage}
            variant="danger"
            className="download-button"
          >
            <FaFileDownload /> DOWNLOAD FLYER
          </Button>
        </DialogActions>
      </Dialog>
      <Spinner variant={loading} /> */}
      {/* For Future dev use */}
    </div>
  );
};

export default Events;
