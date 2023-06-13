import dotenv from "dotenv";
import colors from "colors";

/** DATA */
import events from "./data/events.js";
import users from "./data/users.js";
import eventInvites from "./data/eventInvites.js";

/** MODELS */
import Events from "./models/eventModel.js";
import EventInvites from "./models/eventInvitesModel.js";
import Users from "./models/userModel.js";

/** DB Connect */
import connectDB from "./config/db.js";

import { ROLES } from "./constants/constants.js"
import bcrypt from "bcryptjs"

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Users.deleteMany();
    await Events.deleteMany();
    await EventInvites.deleteMany();

    const createdUser = await Users.insertMany(users);
    const userCreated = createdUser[0]._id;

    const sampleEvents = events.map((event) => {
      return { ...event, user: userCreated };
    });
    const createdEvent = await Events.insertMany(sampleEvents);

    const sampleEventInvites = eventInvites.map((ei) => {
      return { ...ei, eventId: createdEvent[0]._id };
    });
    await EventInvites.insertMany(sampleEventInvites);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const importMasterAdmin = async () => {
  try {
    const users = [
      {
        name: "Dave Bacay Admin",
        userGuid: "6b076ae6-7399-46ff-9e34-1a3c994e9dc9",
        email: "dave.bacay.vc@gmail.com",
        password: bcrypt.hashSync("@D123123d@", 10),
        isAdmin: true,
        role: ROLES.ROLE_MASTER_ADMIN
      }
    ]
    const createdUser = await Users.insertMany(users);
    const userCreated = createdUser[0]._id;

    
    console.log("Users Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await EventInvites.deleteMany();
    await Events.deleteMany();
    await Users.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else if (process.argv[2] === "-a") {
  importMasterAdmin()
} else {
  importData();
}
