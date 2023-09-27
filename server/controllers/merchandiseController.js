import Merchandise from "../models/merchandiseModel.js";
import expressAsync from "express-async-handler";

/**
 * @desc:  Get All Information on Merchandise
 * @route: POST /api/merchandise
 * @acess: Private
 */

const getMerchandise = expressAsync(async (req, res) => {   
    const merchandise = await Merchandise.find({});
  
    if (merchandise) {
      res.json(merchandise);
    } else {
      res.status(404);
      throw new Error("Error Getting Merchandise Information");
    }
  });

  /**
 * @desc:  Get Merchandise by ID
 * @route: GET /api/merchandise/:id
 * @acess: Private
 */

const getLeadByUserGuid = expressAsync(async (req, res) => {
    const  id  = req.params.id;
  
    if (!id) {
      throw new Error("Error occured with merchandise.");
    }
  
    const merchandise = await Merchandise.find({ id: id });
  
    if (merchandise) {
      res.json(merchandise);
    } else {
      res.status(404);
      throw new Error("Error getting merchandise by id");
    }
  });

  export { getMerchandise, getLeadByUserGuid };