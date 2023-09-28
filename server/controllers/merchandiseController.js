import Merchandise from "../models/merchandiseModel.js";
import expressAsync from "express-async-handler";

/**
 * @desc:  Get All Information on Merchandise
 * @route: POST /api/merchandise
 * @acess: Private
 */

const getMerchandise = expressAsync(async (req, res) => {   
    const merchandises = await Merchandise.find({});
  
    if (merchandises.length) {
      res.json(merchandises);
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

const getMerchandiseByUserGuid = expressAsync(async (req, res) => {
    const  id  = req.params.id;
  
    if (!id) {
      throw new Error("Error occured with merchandise.");
    }
  
    const merchandises = await Merchandise.find({ _id: id });
  
    if (merchandises.length) {
      res.json(merchandises);
    } else {
      res.status(404);
      throw new Error("Error getting merchandise by id");
    }
  });

  export { getMerchandise, getMerchandiseByUserGuid };