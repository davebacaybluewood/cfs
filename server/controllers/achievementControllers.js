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
    const KEY_CONDITION = 'nationality';

    const subscribers = await subscriberServices.fetchSubscribersByUser(req.user.userGuid);
    const uniqueByNation = [...new Map(subscribers.filter(Boolean).map(sub => [sub[KEY_CONDITION], sub])).values()];

    if (uniqueByNation) {
        const totalLeads = uniqueByNation.length;

        res.status(200).json({
            data: uniqueByNation,
            total: totalLeads,
            isCompleted: totalLeads >= (total ?? DEFAULT_TOTAL_LEADS)
        });
    } else {
        res.status(200).json({ msg: "No leads found" });
    }
});

export { getAchievement };