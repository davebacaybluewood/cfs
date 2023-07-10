import Inquiries from "../models/inquiryModel.js";
import expressAsync from "express-async-handler";
import agentRegistrationSuccess from "../emailTemplates/agent-registration-success.js";
import sendEmail from "../utils/sendNodeMail.js";
import inquiryEmail from "../emailTemplates/inquiry-email.js";

/**
 * @desc: Fetch all inquiries
 * @route: GET /api/inquiries
 * @acess: Private
 */
const getInquiries = expressAsync(async (req, res) => {
  const inquiries = await Inquiries.find({});
  res.json(inquiries);
});

/**
 * @desc: Fetch single inquiry
 * @route: GET /api/inquiries/:id
 * @acess: Private
 */
const getSingleInquiry = expressAsync(async (req, res) => {
  const inquiry = await Inquiries.findOne({
    _id: req.params.id,
  });

  if (inquiry) {
    res.json(inquiry);
  } else {
    res.status(404);
    throw new Error("Inquiry not found.");
  }
});

// @desc    Delete a inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
const deleteInquiry = expressAsync(async (req, res) => {
  const inquiry = await Inquiries.deleteOne({
    _id: req.params.id,
  });

  if (inquiry) {
    res.json({ message: "Inquiry removed." });
  } else {
    res.status(404);
    throw new Error("Inquiry not found");
  }
});

// @desc    Submit a inquiry
// @route   POST /api/inquiries/
// @access  Public
const submitInquiry = expressAsync(async (req, res) => {
  const { fullName, phoneNumber, emailAddress, state, message } = req.body;

  const mailSubject = "Customer Inquiry";
  const mailContent = inquiryEmail({
    fullName,
    phoneNumber,
    emailAddress,
    state,
    message,
  });

  try {
    await sendEmail("dave.bacay@gocfs.pro", mailSubject, mailContent, []);
    res.json("Email sent.");
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("Error occured in submission.");
  }
});

export { getInquiries, getSingleInquiry, deleteInquiry, submitInquiry };
