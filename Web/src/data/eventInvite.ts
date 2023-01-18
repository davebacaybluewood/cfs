type EventInvite = {
  id: string;
  date: string | Date;
  eventId: string;
  invitee: string;
  referenceId: string;
};

const eventInvite: EventInvite[] = [
  {
    id: "cfea1143-7850-415d-92e7-fca733d6a9ab",
    date: new Date(),
    eventId: "7a1c45a8-dd86-44c7-8277-bf9eec496f80",
    invitee: "Dave Bacay",
    referenceId: "D3YIMFU",
  },
];

export default eventInvite;
