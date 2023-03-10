import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import webinarRoutes from "./routes/webinarRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import path from "path";
import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";

const app = express();
const __dirname = path.resolve();
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());

app.use("/api/events/", eventRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/inquiries/", inquiryRoutes);
app.use("/api/contacts/", contactRoutes);
app.use("/api/medias/", mediaRoutes);
app.use("/api/agents/", agentRoutes);
app.use("/api/webinars/", webinarRoutes);
app.use("/api/appointments/", appointmentRoutes);
app.use("/api/blogs/", blogRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Web/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "Web", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {},
});

/** Middleware */
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    // Apply Apollo-Express-Server Middlware to express application
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(
      PORT,
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
          .yellow.bold
      )
    );
  } catch (error) {
    console.log(error);
  }
};

// Invoke Start Application Function
startServer();
