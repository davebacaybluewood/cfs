import dotenv from "dotenv";
import colors from "colors";
/** DB Connect */
import connectDB from "../config/db.js";
import LandingPage from "../models/landingPageModel.js";

dotenv.config();

connectDB();

const importLandingPage = async () => {
  try {
    const data = [
        {
          pageCustomId: "cfs-edge",
          name: "CFS Edge",
        },
        {
          pageCustomId: "cfs-advantage",
          name: "CFS Advantage",
        },
    ]

    await LandingPage.insertMany(data);

    
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};



const destroyData = async () => {
  try {
    await LandingPage.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-landingPage") {
    importLandingPage()
} else {
    destroyData();
}
