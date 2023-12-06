import expressAsync from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import subscribedCloudinary from "../utils/subscribedCloudinary.js";

/**
 * @desc: Fetch all contacts
 * @route: GET /api/contacts
 * @acess: Private
 */
const getAllMedias = expressAsync(async (req, res) => {
  try {
    const images = await subscribedCloudinary.api.resources(
      { type: "upload", prefix: "{medias}" },
      function (error, result) {
        return result;
      }
    );

    res.json(images);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

export { getAllMedias };
