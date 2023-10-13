import RaiseSupport from "../models/raiseSupportModel.js";
import expressAsync from "express-async-handler";
import { TICKET_STATUS } from "../constants/constants.js";

/**
 * @desc: Create a new Raise Support
 * @route: POST /api/raise-support
 * @access: Private
 */
const createRaiseSupport = expressAsync(async (req, res) => {
  const { name, email, contactNumber, subject, issue, status, type } = req.body;

  // Check if any of the required fields are empty
  if (!name || !email || !contactNumber || !subject || !issue || !status || !type) {
    res.status(400).json({
      error: "required_validation",
      message: "Fields are required.",
    });
    return;
  }

  try {
    const newRaiseSupport = new RaiseSupport({
      name,
      email,
      contactNumber,
      subject,
      issue,
      status,
      type
    });

    const createdRaiseTicket = await newRaiseSupport.save();
    res.status(201).json(createdRaiseTicket);
  } catch (error) {
    throw new Error("Error occured in adding ticket.");
  }
});

/**
 * @desc:  Get All Information on Raise Ticket
 * @route: GET /api/raise-support
 * @acess: Private
 */

const getRaiseSupport = expressAsync(async (req, res) => {
  const raiseSupport = await RaiseSupport.find({});

  res.json(raiseSupport);
});

/**
 * @desc:  Get Raise Support by ID
 * @route: GET /api/raise-support/:id
 * @acess: Private
 */

const getRaiseSupportById = expressAsync(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new Error("Invalid Params.");
  }

  const raiseSupport = await RaiseSupport.find({ _id: id });

  if (raiseSupport.length) {
    res.json(raiseSupport[0]);
  } else {
    throw new Error("No Ticket found.");
  }
});

/**
* @desc: Update the status of a Raise Support Ticket to "RESOLVED" by ID
* @route: PUT /api/raise-support/:id
* @access: Private
*/
const markRaiseSupportAsResolved = expressAsync(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({
      error: "invalid_params",
      message: "Invalid ID provided.",
    });
    return;
  }

  try {
    const raiseSupport = await RaiseSupport.findById(id);

    if (!raiseSupport) {
      res.status(404).json({
        error: "not_found",
        message: "Support ticket not found.",
      });
      return;
    }

    // Set the status to "RESOLVED"
    raiseSupport.status = TICKET_STATUS.RESOLVED;

    const updatedRaiseSupport = await raiseSupport.save();

    res.json(updatedRaiseSupport);
  } catch (error) {
    res.status(500).json({
      error: "server_error",
      message: "An error occurred while updating the support ticket.",
    });
  }
});

const changeRaiseSupportType = expressAsync(async (req, res) => {
  const id = req.params.id;
  const type = req.body.type;

  if (!id) {
    res.status(400).json({
      error: "invalid_params",
      message: "Invalid ID provided.",
    });
    return;
  }

  try {
    const raiseSupport = await RaiseSupport.findById(id);

    if (!raiseSupport) {
      res.status(404).json({
        error: "not_found",
        message: "Support ticket not found.",
      });
      return;
    }

    // Set the status to "RESOLVED"
    raiseSupport.type = type;

    const updatedRaiseSupport = await raiseSupport.save();

    res.json(updatedRaiseSupport);
  } catch (error) {
    res.status(500).json({
      error: "server_error",
      message: error + "An error occurred while updating the support ticket.",
    });
  }
});

export { createRaiseSupport, getRaiseSupport, getRaiseSupportById, markRaiseSupportAsResolved, changeRaiseSupportType };
