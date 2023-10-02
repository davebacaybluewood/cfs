import Merchandise from "../models/merchandiseModel.js";
import expressAsync from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";

function isFieldEmpty(field) {
  return field === undefined || field === null || field === "";
}

/**
 * @desc: Create a new Merchandise
 * @route: POST /api/merchandise
 * @access: Private
 */
const createMerchandise = expressAsync(async (req, res) => {
  const { name, points } = req.body;

  // Check if any of the required fields are empty
  if (isFieldEmpty(name) || isFieldEmpty(points)) {
    res.status(400).json({
      error: "required_validation",
      message: "Fields are required.",
    });
    return;
  }

  /** Upload avatar to cloudinary */
  let profileImgResult;
  try {
    profileImgResult = await cloudinary.v2.uploader.upload(req.file?.path, {
      folder: "merchandises",
      use_filename: true,
    });
  } catch (error) {
    throw new Error("Error occured in adding merchandise.");
  }

  try {
    const newMerchandise = new Merchandise({
      name,
      points,
      image: profileImgResult.secure_url,
      status: "ACTIVATED",
    });

    const createdMerchandise = await newMerchandise.save();
    res.status(201).json(createdMerchandise);
  } catch (error) {
    throw new Error("Error occured in adding merchandise.");
  }
});

/**
 * @desc: Delete a Merchandise
 * @route: DELETE /api/merchandise/:id
 * @access: Private
 */
const deleteMerchandise = expressAsync(async (req, res) => {
  const merchandiseId = req.params.id;

  // Check if the merchandise ID is empty
  if (isFieldEmpty(merchandiseId)) {
    res.status(400).json({
      error: "required_validation",
      message: "Merchandise ID is required.",
    });
    return;
  }

  const merchandise = await Merchandise.findById(merchandiseId);

  if (merchandise) {
    await merchandise.remove();
    res.json({ message: "Merchandise deleted", success: true });
  } else {
    res.status(404);
    throw new Error("Merchandise not found");
  }
});

/**
 * @desc:  Get All Information on Merchandise
 * @route: POST /api/merchandise
 * @acess: Private
 */

const getMerchandise = expressAsync(async (req, res) => {
  const merchandises = await Merchandise.find({});

  res.json(merchandises);
});

/**
 * @desc:  Get Merchandise by ID
 * @route: GET /api/merchandise/:id
 * @acess: Private
 */

const getMerchandiseById = expressAsync(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new Error("Invalid Params.");
  }

  const merchandises = await Merchandise.find({ _id: id });

  if (merchandises.length) {
    res.json(merchandises[0]);
  } else {
    throw new Error("No merchandise found.");
  }
});

/**
 * @desc: Update Merchandise Details
 * @route: PUT /api/merchandise/:id
 * @access: Private
 */
const updateMerchandiseDetails = expressAsync(async (req, res) => {
  const merchandiseId = req.params.id;
  const { name, points, image } = req.body;

  // Check if any of the required fields are empty
  if (!name || !points) {
    res.status(400).json({
      error: "required_validation",
      message: "Fields are required.",
    });
    return;
  }

  const merchandise = await Merchandise.findById(merchandiseId);

  /** Upload avatar to cloudinary */
  let merchandiseImage;
  try {
    merchandiseImage = await cloudinary.v2.uploader.upload(req.file?.path, {
      folder: "merchandises",
      use_filename: true,
    });
  } catch (error) {
    merchandiseImage = image || "";
  }

  if (merchandise) {
    merchandise.name = name;
    merchandise.points = points;
    merchandise.image =
      typeof req.body.image === "string"
        ? req.body.image
        : merchandiseImage.secure_url
        ? merchandiseImage.secure_url
        : merchandise.image;

    const updatedMerchandise = await merchandise.save();
    res.json(updatedMerchandise);
  } else {
    res.status(404);
    throw new Error("Merchandise not found");
  }
});

/**
 * @desc: Update Merchandise Status
 * @route: PUT /api/merchandise/:id?status=true
 * @access: Private
 */
const updateMerchandiseStatus = expressAsync(async (req, res) => {
  const merchandiseId = req.params.id;
  const status = req.query.status;

  // Check if status is empty
  if (isFieldEmpty(status)) {
    res.status(400).json({
      error: "required_validation",
      message: "Status is required.",
    });
    return;
  }

  const merchandise = await Merchandise.findById(merchandiseId);

  if (merchandise) {
    merchandise.status = status;

    const updatedMerchandise = await merchandise.save();
    res.json(updatedMerchandise);
  } else {
    res.status(404);
    throw new Error("Merchandise not found");
  }
});

export {
  createMerchandise,
  deleteMerchandise,
  getMerchandise,
  getMerchandiseById,
  updateMerchandiseDetails,
  updateMerchandiseStatus,
};
