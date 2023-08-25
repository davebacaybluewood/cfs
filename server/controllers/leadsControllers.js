import Leads from "../models/leadsModel.js";
import expressAsync from "express-async-handler";

/**
 * @desc:  POST a Lead
 * @route: POST /api/Leads/
 * @acess: Private
 */

const addLeads = expressAsync(async (req, res) =>{
    const { userGuid, agentUserGuid } = req.body;

    const leads = await Leads.create({
        userGuid,
        agentUserGuid,
    });

    if (leads) {
        res.status(201).json({
          _id: leads._id,          
          userGuid: leads.userGuid,
          createdAt: leads.createdAt,
          updatedAt: leads.updatedAt,
          agentUserGuid: leads.agentUserGuid,
        });
      } else {
        res.status(400);
        throw new Error("Invalid subscriber account data");
      }
});

export { addLeads };