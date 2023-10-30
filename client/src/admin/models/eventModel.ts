type RSVP = {
  noOfAtendees: number;
  attendees: {
    _id: string;
    userGuid: string;
    eventId: string;
    remarks: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
interface Event {
  _id: string;
  userGuid: string;
  thumbnail: string;
  shortDescription: string;
  title: string;
  eventDate: string;
  authorFirstName: string;
  authorLastName: string;
  noOfAttendees: number;
  status: string;
  content: string;
  design: string;
  rsvps: RSVP;
  meetingLink: string;
}

export interface EventBody {
  userGuid: string;
  title: string;
  eventDate: string;
  shortDescription: string;
  content?: string;
  design?: string;
  status: string;
  privacy: string;
  thumbnail: any;
  meetingLink: string;
}

export interface ResponseMessage {
  message: string;
  status: string;
}
export default Event;
