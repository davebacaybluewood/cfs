import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import Banner from "library/Banner/Banner";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EventInvites.scss";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventForm from "./EventForm/EventForm";
import { CheckCircle, ContentCopy } from "@mui/icons-material";
import Button from "library/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { listEventInviteDetails } from "redux/actions/eventActions";
import Spinner from "library/Spinner/Spinner";
import { formatDate, formatISODateToDate } from "helpers/dateFormatter";
import PageTitle from "library/PageTitle/PageTitle";

const EventInvites: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventInviteDetails = useSelector(
    (state: any) => state.eventInviteDetails
  );
  const { loading, event, error } = eventInviteDetails;
  const [showDialog, setShowDialog] = useState(false);
  const [clipboardValue, setClipboardValue] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(listEventInviteDetails(id as any) as any);
  }, [id, dispatch]);

  if (error) {
    navigate("/invalid");
  }

  if (loading) {
    return <Spinner isVisible={true} />;
  }

  return (
    <div className="event-invites">
      <PageTitle title={`${event.title} event`} />
      <Banner title="COME WITH US" bigTitle="Event Invite" hasBorder />
      <div className="event-invite-content">
        <Container>
          <div className="event-description">
            <div className="date-wrapper">
              <CalendarTodayIcon />{" "}
              <div>{formatISODateToDate(event.event_date?.toString())} PST</div>
            </div>
            <h1>{event.title}</h1>
            <img src={event.image} alt={event.title} />
            <p>{event.description}</p>
          </div>
          <EventForm
            date={event.date ?? ""}
            description={event.description ?? ""}
            id={id ?? ""}
            image={event.image ?? ""}
            setClipboardValue={setClipboardValue}
            setShowDialog={setShowDialog}
            title={event.title ?? ""}
            invitee={event.fullName ?? ""}
            eventId={event.eventId}
          />
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
                <p>
                  Share read-only reference ID link to invite an audience or
                  friends in this event.
                </p>
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
                    This link has also sent to your email
                  </p>
                  <a href={event.ticket} download>
                    <img
                      alt="event-ticket"
                      src={event.ticket}
                      className="ticket-img"
                    />
                  </a>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDialog(false)} variation="light">
                CLOSE
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </div>
  );
};

export default EventInvites;
