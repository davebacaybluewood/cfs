import Inquiries from "../models/inquiryModel.js";
import expressAsync from "express-async-handler";

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
  const {
    fullName,
    mobileNumber,
    emailAddress,
    subject,
    message,
    inquiryType,
  } = req.body;

  const inquirySave = await Inquiries.create({
    fullName: fullName.toString(),
    mobileNumber: mobileNumber.toString(),
    emailAddress: emailAddress.toString(),
    subject: subject.toString(),
    message: message.toString(),
    inquiryType: inquiryType.toString(),
  });

  if (inquirySave) {
    res.status(201).json({
      _id: inquirySave._id,
      fullName: inquirySave.fullName,
      mobileNumber: inquirySave.mobileNumber,
      emailAddress: inquirySave.emailAddress,
      subject: inquirySave.subject,
      message: inquirySave.message,
      inquiryType: inquirySave.inquiryType,
    });
  } else {
    res.status(400);
    throw new Error("Error occured in submission.");
  }
});

export { getInquiries, getSingleInquiry, deleteInquiry, submitInquiry };
