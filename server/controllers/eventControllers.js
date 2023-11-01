import { API_RES_FAIL, API_RES_OK } from "../constants/constants.js";
import eventServices from "../services/eventServices.js";

const getEvents = async (req, res, next) => {
  const { userGuid } = req.query;

  if (!userGuid) {
    res.status(401).json(API_RES_FAIL("[Events] Params are required."));
    return;
  }

  const getResponse = await eventServices.getEvents(userGuid);

  if (getResponse) {
    res.json(getResponse);
  } else {
    res.status(401).json(API_RES_FAIL("[Events] Error Occured"));
  }
};

const getSingleEvent = async (req, res, next) => {
  const { eventId } = req.params;

  if (!eventId) {
    res.status(401).json(API_RES_FAIL("[Events] Params are required."));
    return;
  }

  const getResponse = await eventServices.getSingleEvent(eventId);

  if (getResponse) {
    res.json(getResponse);
  } else {
    res.status(401).json(API_RES_FAIL("[Events] Error Occured"));
  }
};

const createEvent = async (req, res, next) => {
  const { userGuid, title, eventDate, shortDescription, status, privacy } =
    req.body;

  if (
    !userGuid ||
    !title ||
    !eventDate ||
    !shortDescription ||
    !status ||
    !privacy
  ) {
    res.status(401).json(API_RES_FAIL("Fields are required."));
    return;
  }

  const createResponse = await eventServices.createEvent(req, res, next);

  if (createResponse) {
    res.status(200).json(API_RES_OK("[Events] Event Created"));
  } else {
    res.status(401).json(API_RES_FAIL("[Events] Error Occured"));
  }
};

const updateEvent = async (req, res, next) => {
  const { userGuid, title, eventDate, shortDescription, status, privacy } =
    req.body;

  const { eventId } = req.params;

  if (
    !userGuid ||
    !title ||
    !eventDate ||
    !shortDescription ||
    !status ||
    !privacy ||
    !eventId
  ) {
    res.status(401).json(API_RES_FAIL("Fields are required."));
    return;
  }

  const updateResponse = await eventServices.updateEvent(req, res, next);

  if (updateResponse) {
    res.status(200).json(API_RES_OK("[Events] Event Updated"));
  } else {
    res.status(401).json(API_RES_FAIL("[Events] Error Occured"));
  }
};

const deleteEvent = async (req, res, next) => {
  const { eventId } = req.params;

  if (!eventId) {
    res.status(401).json(API_RES_FAIL("Fields are required."));
    return;
  }

  const deleteResponse = await eventServices.deleteEvent(eventId);

  if (deleteResponse) {
    res.status(200).json(API_RES_OK("[Events] Event Deleted"));
  } else {
    res.status(401).json(API_RES_FAIL("[Events] Error Occured"));
  }
};

export default {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getSingleEvent,
};
