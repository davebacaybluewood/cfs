import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { BEARER } from "../constants/constants.js";
import expressAsync from "express-async-handler";

const protect = expressAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(BEARER)
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not autorized, token failed.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not autorized, no token.");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
