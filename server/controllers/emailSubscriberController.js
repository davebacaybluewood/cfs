import expressAsync from "express-async-handler";
import sendEmail from "../utils/sendNodeMail.js";

const sendEmailConfirmation = expressAsync(async (req, res, next) => {
    try {
        const { email, confirmationCode } = req.body;

        // Check if email and confirmationCode are empty
        if (!email || !confirmationCode) {
            return res.status(400).json({ message: "Email and confirmation code are required." });
        }

        const emailSubject = "GOCFS Subscriber Verification";
        const emailBody = `
            <p>Hello</p>
            <p>Thank you for confirming your email address ${email}.</p>
            <p>Your confirmation code is ${confirmationCode}</p>
            <p>This is a confirmation email from GoCFS.</p>
        `;

        await sendEmail(email, emailSubject, emailBody);

        res.status(200).json({ message: "Email confirmation sent successfully" });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Error occurred during sending of the email" });
    }
});

export { sendEmailConfirmation };