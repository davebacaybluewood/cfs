import expressAsync from "express-async-handler";
import Webinars from "../models/webinarModel.js ";
import Agents from "../models/agentModel.js";
import cloudinary from "../utils/cloudinary.js";
import undefinedValidator from "./helpers/undefinedValidator.js";
import { v4 as uuidv4 } from "uuid";
import WebinarAppointment from "../models/webinarAppointmentModel.js";
import fetch from "node-fetch";
import AgentAppointment from "../models/agentAppointment.js";
import {
  AGENT_STATUSES,
  API_RES_FAIL,
  NOTIFICATION_ENUMS,
} from "../constants/constants.js";

/**
 * @desc: Fetch all webinars
 * @route: GET /api/webinars
 * @acess: Public
 */
const getAllWebinars = expressAsync(async (req, res) => {
  try {
    const webinars = await Webinars.find({});
    res.json(webinars);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Fetch single webinar
 * @route: GET /api/webinar/:id
 * @acess: Public
 */
const getSingleWebinar = expressAsync(async (req, res) => {
  try {
    const webinarGuid = req.query.isGuid;

    let webinar;
    if (webinarGuid) {
      webinar = await Webinars.find({
        webinarGuid: req.params.id,
      });
    } else {
      webinar = await Webinars.findById(req.params.id);
    }

    res.json(webinar);
  } catch (error) {
    res.status(500).json(API_RES_FAIL("Error Occured"));
  }
});

// @desc    Create a webinar
// @route   POST /api/webinars/
// @access  Private/Admin
const createWebinar = expressAsync(async (req, res) => {
  try {
    /** Upload image to cloudinary */
    // /** Upload image to cloudinary */
    const webinarThumbnailResult = await cloudinary.v2.uploader.upload(
      req.file.path,
      {
        folder: "webinars",
        use_filename: true,
      }
    );

    let webinar = new Webinars({
      title: req.body.title.toString(),
      webinarGuid: uuidv4(),
      introVideo: req.body.introVideo.toString(),
      introVideoContent: req.body.introVideoContent.toString(),
      introVideoTimeTracker: req.body.introVideoTimeTracker,
      fullVideo: req.body.fullVideo.toString(),
      fullVideoContent: req.body.fullVideoContent.toString(),
      fullVideoTimeTracker: req.body.fullVideoTimeTracker,
      thumbnail_cloudinary_id: webinarThumbnailResult.public_id,
      thumbnail: webinarThumbnailResult.secure_url,
      calendlyLink: req.body.calendlyLink.toString(),
    });

    await webinar.save();
    res.status(201).json(webinar);
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("Error occured in adding webinar.");
  }
});

// @desc    Delete a webinar
// @route   DELETE /api/webinars/:id
// @access  Private/Admin
const deleteWebinar = expressAsync(async (req, res) => {
  try {
    const contact = await Webinars.deleteOne({
      _id: req.params.id,
    });

    if (contact) {
      res.json({ message: "Webinar removed." });
    } else {
      res.status(404);
      throw new Error("Webinar not found");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

// @desc    Update a webinar
// @route   PUT /api/webinars/:id
// @access  Private/Admin
const updateWebinar = expressAsync(async (req, res) => {
  try {
    /** Upload avatar to cloudinary */
    let webinarImageResult;
    try {
      webinarImageResult = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "webinars",
        use_filename: true,
      });
    } catch (error) {
      webinarImageResult = req.body.thumbnail;
    }

    const webinar = await Webinars.findById(req.params.id);

    if (webinar) {
      webinar.title = undefinedValidator(webinar.title, req.body.title);
      webinar.introVideo = undefinedValidator(
        webinar.introVideo,
        req.body.introVideo
      );
      webinar.introVideoContent = undefinedValidator(
        webinar.introVideoContent,
        req.body.introVideoContent
      );
      webinar.introVideoTimeTracker = undefinedValidator(
        webinar.introVideoTimeTracker,
        req.body.introVideoTimeTracker
      );
      webinar.fullVideo = undefinedValidator(
        webinar.fullVideo,
        req.body.fullVideo
      );
      webinar.fullVideoContent = undefinedValidator(
        webinar.fullVideoContent,
        req.body.fullVideoContent
      );
      webinar.fullVideoTimeTracker = undefinedValidator(
        webinar.fullVideoTimeTracker,
        req.body.fullVideoTimeTracker
      );
      webinar.calendlyLink = undefinedValidator(
        webinar.calendlyLink,
        req.body.calendlyLink
      );
      webinar.thumbnail =
        webinarImageResult.secure_url ?? ""
          ? webinarImageResult.secure_url ?? ""
          : webinar.thumbnail;
      webinar.thumbnail_cloudinary_id = webinarImageResult.public_id
        ? webinarImageResult.public_id
        : webinar.thumbnail_cloudinary_id;

      const updatedWebinar = await webinar.save();
      res.status(201).json(updatedWebinar);
    } else {
      res.status(404);
      throw new Error("Webinar not found");
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    throw new Error("Error occured in updating the webinar.");
  }
});

/**
 * @desc:  Get the active webinar for agents
 * @route: GET /api/webinars/:webinarId/agents
 * @acess: Public
 */
const getActiveWebinars = expressAsync(async (req, res) => {
  try {
    const webinars = await Webinars.find({}, "_id");
    const agents = Agents.filter((agent) => {
      return webinars
        .map((webinarId) => webinarId.toString())
        .includes(agent.webinars._id.toString());
    });

    res.json(agents);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc:  Get the active webinar for agents
 * @route: GET /api/webinars/:webinarId/agents
 * @acess: Public
 */
const getAgentWebinarAppointments = expressAsync(async (req, res) => {
  try {
    const userGuid = req.params.agentId;

    const agents = await Agents.find({
      userGuid: userGuid,
    });

    const agentWebinarGuids = agents[0].webinars.map(
      (data) => data.webinarGuid
    );

    const webinars = await Webinars.find({
      webinarGuid: { $in: agentWebinarGuids },
    });

    const appointments = await AgentAppointment.find({
      agentGuid: userGuid,
    });

    const filteredWebinars = webinars.map((webinar) => {
      const noOfAppointments = () => {
        const appointment = appointments
          .map((apData) => {
            return apData.webinarGuid === webinar.webinarGuid;
          })
          .filter((data) => data);

        return appointment.length;
      };
      return {
        title: webinar?.title,
        webinarGuid: webinar?.webinarGuid,
        _id: webinar?._id,
        thumbnail: webinar?.thumbnail,
        noOfAppointments: noOfAppointments(),
      };
    });

    res.json(filteredWebinars);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});
/**
 * @desc:  Submit a webinar form for the agent
 * @route: POST /api/webinars/:webinarId/:agentId
 * @acess: Public
 */
const submitAgentWebinar = expressAsync(async (req, res) => {
  try {
    const webinarGuid = req.params.webinarId;
    const agentGuid = req.params.agentId;
    const webinars = await Webinars.find({ _id: webinarGuid });
    if (webinars.length === 0) {
      res.status(404).json();
      throw new Error("Error occured in submitting webinar.");
    } else {
      let newData = new WebinarAppointment({
        name: req.body.name?.toString(),
        state: req.body.state?.toString(),
        email: req.body.email?.toString(),
        webinarGuid: webinarGuid,
        agentGuid: agentGuid,
      });

      await newData.save();
      res.status(201).json({ submissionId: newData._id });
      res.json(webinars);
    }
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("Error occured in submitting webinar.");
  }
});

/**
 * @desc:  Submit a webinar appointment to the agent.
 * @steps  1. Use the calendly URI response from Calendly hook to get the appointment information
 * @steps  2. Get the email, name, created_at, status, timezone, uri, eventURI, from the calendlyURI
 * @steps  3. Get the start_time and end_time from eventURI (eventURI is from calendlyURI)
 * @steps  4. Add the data to our database
 * @note   CALENDLY PERSONAL TOKEN IS NEEDED
 * @route: POST /:webinarId/:agentId/submit-appointment
 * @acess: Public
 */
const submitAppointment = expressAsync(async (req, res) => {
  try {
    const calendlyUri = req.body.calendlyURI;
    const webinarGuid = req.body.webinarGuid;
    const agentGuid = req.params.agentId;
    const state = req.body.state;
    const appointment_type = req.body.appointment_type;

    fetch(calendlyUri, {
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_PERSONAL_TOKEN}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        /** Get the email, name, created_at, status, timezone, uri, eventURI, from the calendlyURI */
        const email = res.resource.email;
        const name = res.resource.name;
        const created_at = res.resource.created_at;
        const timezone = res.resource.timezone;
        const uri = res.resource.uri;
        const status = res.resource.status;
        const eventURI = res.resource.event;
        const questionsNotes = res.resource.questions_and_answers;
        const event = res.resource.event;

        return {
          email,
          name,
          created_at,
          status,
          timezone,
          uri,
          eventURI,
          questionsNotes,
          event,
        };
      })
      .then(
        ({
          email,
          name,
          created_at,
          status,
          timezone,
          uri,
          eventURI,
          questionsNotes,
          event,
        }) => {
          /** Get the start_time and end_time from eventURI */
          fetch(eventURI, {
            headers: {
              Authorization: `Bearer ${process.env.CALENDLY_PERSONAL_TOKEN}`,
            },
          })
            .then((calRes) => calRes.json())
            .then((lastCalRes) => {
              const start_time = lastCalRes.resource.start_time;
              const end_time = lastCalRes.resource.end_time;

              return {
                start_time,
                end_time,
                email,
                name,
                created_at,
                status,
                timezone,
                uri,
                questionsNotes,
                event,
              };
            })
            .then((final_res) => final_res)
            .then(async (final_response_data) => {
              const getMeetingLink = async () => {
                const response = await fetch(final_response_data.event, {
                  headers: {
                    Authorization: `Bearer ${process.env.CALENDLY_PERSONAL_TOKEN}`,
                  },
                });

                const data = await response.json();
                return data.resource.location.join_url;
              };

              return {
                start_time: final_response_data.start_time,
                end_time: final_response_data.end_time,
                email: final_response_data.email,
                name: final_response_data.name,
                created_at: final_response_data.created_at,
                status: final_response_data.status,
                timezone: final_response_data.timezone,
                uri: final_response_data.uri,
                questionsNotes: final_response_data.questionsNotes,
                meetingLink: await getMeetingLink(),
              };
            })
            .then((response_with_meeting_link) => {
              return response_with_meeting_link;
            })
            .then(
              ({
                start_time,
                end_time,
                email,
                name,
                created_at,
                status,
                timezone,
                uri,
                questionsNotes,
                meetingLink,
              }) => {
                const appointment = new AgentAppointment({
                  name,
                  state,
                  email,
                  webinarGuid,
                  agentGuid,
                  calendly_start_time: start_time,
                  calendly_end_time: end_time,
                  calendly_timezone: timezone,
                  calendly_status: status,
                  calendly_uri: uri,
                  calendly_name: name,
                  calendly_email: email,
                  calendly_created_at: created_at,
                  appointment_type: appointment_type,
                  calendly_notes: questionsNotes[0]?.answer ?? "",
                  meeting_link: meetingLink,
                });
                appointment.save();
                return {
                  start_time,
                  end_time,
                  email,
                  name,
                  created_at,
                  status,
                  timezone,
                  uri,
                  questionsNotes,
                  meetingLink,
                };
              }
            )
            .then((email_response) => {
              const {
                start_time,
                end_time,
                email,
                name,
                created_at,
                status,
                timezone,
                uri,
                questionsNotes,
                meetingLink,
              } = email_response;

              res
                .status(200)
                .json({ message: "Appointment has been scheduled." });
            });
        }
      );
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("Error occured in submitting webinar.");
  }
});

const getAgentFilteredWebinars = expressAsync(async (req, res) => {
  try {
    const agentWebinars = await Agents.find({});
    const webinars = await Webinars.find({});
    const status = req.params.status;

    const allAgentWebinars = agentWebinars
      .filter((data) => data.status === AGENT_STATUSES.ACTIVATED)
      .map((data) => {
        const webinars = data?.webinars
          ?.filter((data) => data.status === status)
          ?.map((webinar) => {
            return {
              userGuid: webinar.userGuid,
              webinarGuid: webinar.webinarGuid,
              status: webinar.status,
              calendlyUrl: webinar.calendlyUrl,
              _id: webinar._id,
              thumbnail: webinar?.thumbnail,
              name: data?.name,
              firstName: data?.firstName,
              lastName: data?.lastName,
              createdAt: data?.createdAt,
            };
          });

        return webinars;
      })
      .flat(1);

    const joinedWebinars = allAgentWebinars.map((data) => {
      return webinars
        .filter((webinar) => webinar.webinarGuid === data.webinarGuid)
        .map((webinarData) => {
          return {
            _id: webinarData._id,
            title: webinarData.title,
            webinarGuid: webinarData.webinarGuid,
            introVideo: webinarData.introVideo,
            introVideoContent: webinarData.introVideoContent,
            introVideoTimeTracker: webinarData.introVideoTimeTracker,
            fullVideo: webinarData.fullVideo,
            fullVideoContent: webinarData.fullVideoContent,
            fullVideoTimeTracker: webinarData.fullVideoTimeTracker,
            calendlyLink: webinarData.calendlyLink,
            userGuid: data.userGuid,
            name: data.name,
            firstName: data.firstName,
            lastName: data.lastName,
            thumbnail: webinarData.thumbnail,
            createdAt: data.createdAt,
          };
        });
    });

    res.json(joinedWebinars.flat(1));
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

const getSingleAgentWebinar = expressAsync(async (req, res) => {
  try {
    const agentGuid = req.params.agentGuid;
    const webinarGuid = req.params.webinarGuid;
    const agent = await Agents.find({ userGuid: agentGuid });

    const agentWebinars = agent[0]?.webinars
      .filter((filData) => filData.webinarGuid === webinarGuid)
      .map((data) => data);

    res.json(agentWebinars[0]);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

export {
  getAllWebinars,
  getSingleWebinar,
  createWebinar,
  deleteWebinar,
  updateWebinar,
  getActiveWebinars,
  submitAgentWebinar,
  submitAppointment,
  getAgentWebinarAppointments,
  getAgentFilteredWebinars,
  getSingleAgentWebinar,
};
