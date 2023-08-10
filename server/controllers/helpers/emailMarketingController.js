import expressAsyncHandler from "express-async-handler";
import emailMarketing from "../../emailTemplates/emailMarketing";

/**
 * @desc: Request an email
 * @route: POST /api/email-marketing
 * @access: Private
 */

const getEmail = expressAsyncHandler(async (req, res, next) => {
  const email = emailMarketing({
    name: req.body.name,
    remarks: req.body.remarks,
  });
  res.send("Email Pass");
});

export { getEmail };
