import { EventCardVariant } from "pages/Events/components/EventCard";

export type EventsType = {
  title: string;
  createdAt: Date;
  description: string;
  _id: string;
  event_date: string | Date;
  image: string;
  variant: EventCardVariant;
};

export type EventInvite = {
  id: string;
  date: string | Date;
  eventId: string;
  invitee: string;
  referenceId: string;
  title: string;
  description: string;
  event_date: string | Date;
  image: string;
  variant: EventCardVariant;
};
