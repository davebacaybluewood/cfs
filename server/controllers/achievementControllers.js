import expressAsync from "express-async-handler";
import subscriberServices from "../services/subscriberServices.js";

/**
 * @desc:  Get achievement by UserGuid
 * @route: GET /api/achievements/united-nations
 * @params: total: int => sets the condition for total leads to achieve
 * @access: Private
 */

const getAchievement = expressAsync(async (req, res) => {
    const total = req.query.total ?? null;
    const DEFAULT_TOTAL_LEADS = 4;

    const subscribers = await subscriberServices.fetchSubscribersByUser(req.user.userGuid);

    if (subscribers) {
        const totalLeads = subscribers.length;
        
        res.status(200).json({
            data: subscribers,
            total: totalLeads,
            isCompleted: totalLeads >= (total ?? DEFAULT_TOTAL_LEADS)
        });
    } else {
        res.status(200).json({ msg: "No leads found" });
    }
});

export { getAchievement };