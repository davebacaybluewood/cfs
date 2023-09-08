import expressAsync from "express-async-handler";
import sendEmail from "../utils/sendNodeMail.js";

const sendEmailConfirmation = expressAsync(async (req, res, next) => {
    try {
        const { email, confirmationCode } = req.body;

       
        const emailSubject = "GOCFS Subscriber Verification";
        const emailBody = `
            <p>Hello</p>
            <p>Thank you for confiming your email address ${email}.</p>
            <p>Your confirmation ode is ${confirmationCode}</p>
            <p>This is a confirmation email from GoCFS.</p>
        `;
        const fromAddress = "do-not-reply@gocfs.com";

        await sendEmail(email, emailSubject, emailBody);

        res.status(200).json({ message: "Email confirmation sent sucessfully"});
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Error occurred during sending of the email"});
    }
});

export { sendEmailConfirmation };