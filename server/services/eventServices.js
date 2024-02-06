import { EVENT_STATUSES, PROFILE_POSITIONS } from "../constants/constants.js";
import undefinedValidator from "../controllers/helpers/undefinedValidator.js";
import Agent from "../models/agentModel.js";
import Events from "../models/eventModel.js";
import EventsRSVP from "../models/eventsRSVPModel.js";
import hierarchy from "../models/hierarchyModel.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose, { mongo } from "mongoose";

const createEvent = async (req, res, next) => {
  const {
    userGuid,
    title,
    eventDate,
    shortDescription,
    content,
    design,
    status,
    privacy,
    meetingLink,
  } = req.body;

  /** Upload image to cloudinary */
  let thumbnail;
  try {
    const eventImage = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "events",
      use_filename: true,
    });

    thumbnail = eventImage.secure_url;
  } catch (error) {
    thumbnail = "";
  }

  const agentModel = await Agent.find({ userGuid });
  const agentPositions = agentModel[0].position;
  const filteredPositions = agentPositions.map((data) => data.value);
  let postedBy;

  if (filteredPositions.includes(PROFILE_POSITIONS.AGENT.value)) {
    /** Agent */
    postedBy = PROFILE_POSITIONS.AGENT.value;
  } else {
    /** Master Admin | Content Creator */
    postedBy = PROFILE_POSITIONS.MASTER_ADMIN.value;
  }

  try {
    const event = await Events.create({
      userGuid,
      title,
      eventDate,
      shortDescription,
      content,
      design,
      status,
      privacy,
      thumbnail,
      postedBy,
      meetingLink,
    });

    return event;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateEvent = async (req, res, next) => {
  const {
    userGuid,
    title,
    eventDate,
    shortDescription,
    content,
    design,
    status,
    privacy,
  } = req.body;

  const { eventId } = req.params;

  let thumbnail;
  try {
    const thumbnailResult = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "events",
      use_filename: true,
    });
    thumbnail = thumbnailResult.secure_url;
  } catch (error) {
    thumbnail = req.body.thumbnail;
  }

  try {
    const event = await Events.findById(eventId);

    if (Object.keys(event).length) {
      event.userGuid = undefinedValidator(event.userGuid, userGuid);
      event.title = undefinedValidator(event.title, title);
      event.eventDate = undefinedValidator(event.eventDate, eventDate);
      event.shortDescription = undefinedValidator(
        event.shortDescription,
        shortDescription
      );
      event.content = undefinedValidator(event.content, content);
      event.design = undefinedValidator(event.design, design);
      event.status = undefinedValidator(event.status, status);
      event.privacy = undefinedValidator(event.privacy, privacy);
      event.thumbnail = undefinedValidator(event.thumbnail, thumbnail);

      await event.save();

      return event;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteEvent = async (eventId) => {
  const event = await Events.deleteOne({
    _id: eventId,
  });

  return event;
};

const getEvents = async (userGuid) => {
  const agentModel = await Agent.find({ userGuid });
  const agentPositions = agentModel[0].position;
  const filteredPositions = agentPositions.map((data) => data.value);

  let position;
  let recruiterUserGuid;

  if (filteredPositions.includes(PROFILE_POSITIONS.AGENT.value)) {
    /** Agent */
    position = PROFILE_POSITIONS.AGENT.value;
  } else if (filteredPositions.includes(PROFILE_POSITIONS.SUBSCRIBER.value)) {
    /** Subscriber */
    position = PROFILE_POSITIONS.SUBSCRIBER.value;

    const hierarchyModel = await hierarchy.find({ userGuid });
    recruiterUserGuid = hierarchyModel[0]?.recruiterUserGuid || "";
  } else {
    /** Master Admin | Content Creator */
    position = PROFILE_POSITIONS.MASTER_ADMIN.value;
  }

  /* Events list Visibility
   * admin = admin/own
   * agent = admin/own
   * subscriber = admin/recruiter
   * free-trial = admin/recruiter
   */
  let events;
  let userGuidFilter;
  if (
    position === PROFILE_POSITIONS.MASTER_ADMIN.value ||
    position === PROFILE_POSITIONS.AGENT.value
  ) {
    userGuidFilter = userGuid;
  } else if (
    position === PROFILE_POSITIONS.SUBSCRIBER.value ||
    position === PROFILE_POSITIONS.FREE_30DAYS_TRIAL.value
  ) {
    userGuidFilter = recruiterUserGuid;
  }

  events = await Events.aggregate([
    {
      $match: {
        $or: [
          { postedBy: PROFILE_POSITIONS.MASTER_ADMIN.value },
          { userGuid: userGuidFilter },
        ],
      },
    },
    {
      $lookup: {
        from: "agents",
        localField: "userGuid",
        foreignField: "userGuid",
        as: "eventDoc",
      },
    },
    {
      $set: {
        authorFirstName: {
          $first: "$eventDoc.firstName",
        },
        authorLastName: {
          $first: "$eventDoc.lastName",
        },
      },
    },
    {
      $unset: "eventDoc",
    },
  ]).sort({ createdAt: -1 });

  if (events.length < 1) return;

  const filteredEvents = events.map((data) => {
    const currentDate = Date.parse(new Date());
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const currentDayDate = new Date().getDate();
    const fullCurrentDate =
      currentMonth + "" + currentDayDate + "" + currentYear;

    const eventDate = Date.parse(data.eventDate);
    const eventMonth = new Date(data.eventDate).getMonth() + 1;
    const eventYear = new Date(data.eventDate).getFullYear();
    const eventDayDate = new Date(data.eventDate).getDate();
    const fullEventDate = eventMonth + "" + eventDayDate + "" + eventYear;

    let status;

    if (data.status === EVENT_STATUSES.COMPLETED.value) {
      status = EVENT_STATUSES.COMPLETED.value;
    } else if (
      data.status === EVENT_STATUSES.ACTIVE.value &&
      fullEventDate === fullCurrentDate
    ) {
      status = EVENT_STATUSES.ONGOING.value;
    } else if (
      data.status === EVENT_STATUSES.ACTIVE.value &&
      eventDate < currentDate
    ) {
      status = EVENT_STATUSES.COMPLETED.value;
    } else if (data.status === EVENT_STATUSES.CANCELLED.value) {
      status = EVENT_STATUSES.CANCELLED.value;
    } else if (
      currentDate < eventDate &&
      data.status === EVENT_STATUSES.ACTIVE.value
    ) {
      status = EVENT_STATUSES.COMING_SOON.value;
    } else if (currentDate >= eventDate) {
      status = EVENT_STATUSES.ONGOING.value;
    } else {
      status = EVENT_STATUSES.ACTIVE.value;
    }

    return {
      _id: data._id,
      thumbnail: data.thumbnail,
      userGuid: data.userGuid,
      title: data.title,
      eventDate: data.eventDate,
      shortDescription: data.shortDescription,
      content: data.content,
      design: data.design,
      status: status,
      privacy: data.privacy,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      authorFirstName: data.authorFirstName,
      authorLastName: data.authorLastName,
    };
  });

  const rsvps = await EventsRSVP.find({});
  const modifiedEvents = filteredEvents.map((data) => {
    const modifiedRSVPS = rsvps.filter(
      (rsvp) => rsvp.eventId === data._id.toString()
    );
    return {
      _id: data._id,
      thumbnail: data.thumbnail,
      userGuid: data.userGuid,
      title: data.title,
      eventDate: data.eventDate,
      shortDescription: data.shortDescription,
      content: data.content,
      design: data.design,
      status: data.status,
      privacy: data.privacy,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      authorFirstName: data.authorFirstName,
      authorLastName: data.authorLastName,
      rsvps: {
        noOfAtendees: modifiedRSVPS.length,
        attendees: modifiedRSVPS,
      },
    };
  });

  return modifiedEvents;
};

const getSingleEvent = async (eventId) => {
  const event = await Events.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(eventId) } },
    {
      $lookup: {
        from: "agents",
        localField: "userGuid",
        foreignField: "userGuid",
        as: "eventDoc",
      },
    },
    {
      $set: {
        authorFirstName: {
          $first: "$eventDoc.firstName",
        },
        authorLastName: {
          $first: "$eventDoc.lastName",
        },
      },
    },
    {
      $unset: "eventDoc",
    },
  ]);

  return event[0];
};

export default {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getSingleEvent,
};
