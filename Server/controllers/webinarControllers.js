import expressAsync from "express-async-handler";
import Webinars from "../models/webinarModel.js ";
import Agents from "../models/agentModel.js";
import cloudinary from "../utils/cloudinary.js";
import undefinedValidator from "./helpers/undefinedValidator.js";
import { v4 as uuidv4 } from "uuid";

/**
 * @desc: Fetch all webinars
 * @route: GET /api/webinars
 * @acess: Public
 */
const getAllWebinars = expressAsync(async (req, res) => {
  const webinars = await Webinars.find({});
  res.json(webinars);
});

/**
 * @desc: Fetch single webinar
 * @route: GET /api/webinar/:id
 * @acess: Public
 */
const getSingleWebinar = expressAsync(async (req, res) => {
  const webinar = await Webinars.findById(req.params.id);
  res.json(webinar);
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
  const contact = await Webinars.deleteOne({
    _id: req.params.id,
  });

  if (contact) {
    res.json({ message: "Webinar removed." });
  } else {
    res.status(404);
    throw new Error("Webinar not found");
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
  const webinars = await Webinars.find({}, "_id");
  const agents = Agents.filter((agent) => {
    return webinars
      .map((webinarId) => webinarId.toString())
      .includes(agent.webinars._id.toString());
  });

  res.json(agents);
});

export {
  getAllWebinars,
  getSingleWebinar,
  createWebinar,
  deleteWebinar,
  updateWebinar,
  getActiveWebinars,
};
