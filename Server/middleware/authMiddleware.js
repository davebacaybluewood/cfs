import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { BEARER, ROLES } from "../constants/constants.js";
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

// const adminAuth = expressAsync(async (req, res, next) => {
//   let token;
//   console.log(req);
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith(BEARER) &&
//     req.user &&
//     req.user.role === ROLES.ROLE_MASTER_ADMIN
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error("Not autorized, auth failed.");
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error("Not autorized, auth failed.");
//   }
// });

const adminAuth = (req, res, next) => {
  if (req.user && req.user.role === ROLES.ROLE_MASTER_ADMIN) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

const agentAuth = expressAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(BEARER) &&
    req.user &&
    req.user.role === ROLES.ROLE_AGENT
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not autorized, auth failed.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not autorized, auth failed..");
  }
});
const blogAuth = expressAsync(async (req, res, next) => {
  let token;
  console.log(req.user);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(BEARER) &&
    req.user &&
    req.user.role === ROLES.ROLE_EDITOR
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not autorized, auth failed.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not autorized, auth failed..");
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

export { protect, admin, agentAuth, adminAuth, blogAuth };
