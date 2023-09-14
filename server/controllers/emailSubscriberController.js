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
        <div class="email">
            <div class="cfs-subscriber-registration valign-text-bottom">CFS Subscriber Registration</div>
        </div>
        <div class="email">
            <p class="below-you-will-find valign-text-bottom inter-normal-black-14px">
                Below You Will Find The Verification Code with Your Email Address ${email}
            </p>
        </div>
        <div class="email">
            <div class="email-code-wrapper">
                <div class="email-code">
                    <h1 class="code valign-text-bottom">${confirmationCode}</h1>
                </div>
            </div>
        </div>
        `;

        await sendEmail(email, emailSubject, emailBody);

        res.status(200).json({ message: "Email confirmation sent successfully" });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Error occurred during sending of the email" });
    }
});

export { sendEmailConfirmation };