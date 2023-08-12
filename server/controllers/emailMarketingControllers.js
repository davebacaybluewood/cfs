import expressAsync from "express-async-handler";
import emailMarketingEmail from "../emailTemplates/emailMarketingEmail.js";
import sendEmail from "../utils/sendNodeMail.js";
import BlogsAndResource from "../models/blogAndResourceModel.js";
import Agents from "../models/agentModel.js";

/**
 * @desc: Send an email marketing
 * @route: POST /api/email-marketing
 * @access: Private
 */
const sendEmailMarketing = expressAsync(async (req, res, next) => {
  let sendHTMLEmail;
  const mailSubject = req.body.subject;
  const contractEmail = req.body.recipients;

  const blogs = await BlogsAndResource.find().limit(5).sort({ $natural: -1 });
  const agent = await Agents.find({ userGuid: req.body.userGuid });

  const agentInfo = {
    name: agent[0].firstName
      ? agent[0].firstName + " " + agent[0].lastName
      : agent[0].name,
    bio: agent[0].bio,
    phoneNumber: agent[0].phoneNumber,
    emailAddress: agent[0].emailAddress,
    userGuid: agent[0].userGuid,
    avatar: agent[0].avatar
      ? agent[0].avatar
      : "https://www.gocfs.pro/assets/others/no-image.png",
    licenseNumber: agent[0].licenseNumber,
    position: agent[0].roles[0].label,
  };

  const blogEmail = blogs?.map((data) => {
    const content = data.content.replace(/<[^>]*>/g, "").replace("&quot;", " ");
    const filteredTitle = data.title.split(" ").join("-").toLowerCase();
    const filteredContent = `<div style="margin-bottom: 30px">
              <h5 style="font-size: 16px; margin: 0; color: #333;">
                ${data.title}
              </h5>
              <p
                style="
                  font-family: 0;
                  font-weight: 300;
                  font-size: 12px;
                  margin-top: 5px;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
              >
                ${
                  content.length > 250
                    ? content.substring(0, 250) + "..."
                    : content
                }
              </p>
              <a
                style="
                  background-color: #0057b7;
                  color: #fff;
                  padding: 10px 20px;
                  border-radius: 2px;
                  font-size: 12px;
                "
                href="https://www.gocfs.pro/blogs/${filteredTitle}"
                >Learn More</a
              >
            </div>`;

    return filteredContent.replace(",", "");
  });

  const mailContent = emailMarketingEmail({
    agentInfo: agentInfo,
    body: req.body.emailBody,
    blogEmail: blogEmail.join(""),
  });

  try {
    sendHTMLEmail = sendEmail(contractEmail, mailSubject, mailContent, [])
      .then((request, response) => {
        response?.send("[Email Marketing] has been successfully submitted.") ??
          "";
      })
      .catch((error) => {
        res.status(500);
        console.log(error);
        throw new Error("Error occured in submission.");
      });

    res.send(sendHTMLEmail);
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("Error occured in submission.");
  }
});

export { sendEmailMarketing };
