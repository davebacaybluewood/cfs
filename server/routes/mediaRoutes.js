import express from "express";
import { getAllMedias } from "../controllers/mediaControllers.js";

const router = express.Router();

router.route("/").get(getAllMedias);

export default router;
