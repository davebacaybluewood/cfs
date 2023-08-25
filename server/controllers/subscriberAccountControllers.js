import SubscriberAccount from "../models/subscriberAccountModel.js";
import expressAsync from "express-async-handler";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

/**
 * @desc:  Register a new user
 * @route: POST /api/SubscriberAccount/
 * @acess: Private
 */

const registerSubscriberAccount = expressAsync(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const emailIsExist = await SubscriberAccount.findOne({ email });

  if (emailIsExist) {
    res.status(400);
    throw new Error("Email already exist");
  }

  //Generate a UUID for userGuid using uuidv4
  const userGuid = uuidv4();

  //Hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const subscriberAccount = await SubscriberAccount.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    userGuid, // Assign the generated userGuid
  });

  if (subscriberAccount) {
    res.status(201).json({
      _id: subscriberAccount._id,
      email: subscriberAccount.email,
      firstName: subscriberAccount.firstName,
      lastName: subscriberAccount.lastName,
      userGuid: subscriberAccount.userGuid,
      createdAt: subscriberAccount.createdAt,
      updatedAt: subscriberAccount.updatedAt,
    });
  } else {
    res.status(400);
    throw new Error("Invalid subscriber account data");
  }
});

export { registerSubscriberAccount };