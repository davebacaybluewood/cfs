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
} else {
  importData();
}
