import RaiseSupport from "../models/raiseSupportModel.js";
import expressAsync from "express-async-handler";

/**
 * @desc: Create a new Raise Support
 * @route: POST /api/raise-support
 * @access: Private
 */
const createRaiseSupport = expressAsync(async (req, res) => {
  const { name, email, contactNumber, subject, issue, status } = req.body;

  // Check if any of the required fields are empty
  if (!name || !email || !contactNumber || !subject || !issue || !status) {
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
      status
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

export { createRaiseSupport, getRaiseSupport, getRaiseSupportById };
