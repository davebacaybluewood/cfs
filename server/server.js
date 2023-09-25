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
import notificationRoutes from "./routes/notificationRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import webinarClicksStatisticsRoutes from "./routes/webinarClicksStatisticsRoutes.js";
import webinarViewRoutes from "./routes/webinarViewRoutes.js";
import landingPageRoutes from "./routes/landingPageRoutes.js";
import landingPageRegisteredUsersRoutes from "./routes/landingPageRegisteredUsersRoutes.js";
import landingPageStatisticsRoutes from "./routes/landingPageStatisticsRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import blogAndResourceRoutes from "./routes/blogAndResourceRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import contractingRoutes from "./routes/contractingRoutes.js";
import emailMarketingRoutes from "./routes/emailMarketingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import subscriberAccountRoutes from "./routes/subscriberAccountRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import leadsRoutes from "./routes/leadsRoutes.js";
import emailSubscriberRoutes from "./routes/emailSubscriberRoutes.js";
import backOfficeRoutes from "./routes/backOfficeRoutes.js";
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
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.use("/api/events/", eventRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/profile/", profileRoutes);
app.use("/api/inquiries/", inquiryRoutes);
app.use("/api/contacts/", contactRoutes);
app.use("/api/medias/", mediaRoutes);
app.use("/api/agents/", agentRoutes);
app.use("/api/webinars/", webinarRoutes);
app.use("/api/appointments/", appointmentRoutes);
app.use("/api/blogs/", blogRoutes);
app.use("/api/notifications/", notificationRoutes);
app.use("/api/webinar-clicks-statistics/", webinarClicksStatisticsRoutes);
app.use("/api/webinar-view/", webinarViewRoutes);
app.use("/api/landing-page/", landingPageRoutes);
app.use(
  "/api/landing-page-registered-users/",
  landingPageRegisteredUsersRoutes
);
app.use("/api/landing-page-statistics/", landingPageStatisticsRoutes);
app.use("/api/blog-and-resource/", blogAndResourceRoutes);
app.use("/api/subscriptions/", subscriptionRoutes);
app.use("/api/contracting/", contractingRoutes);
app.use("/api/email-marketing/", emailMarketingRoutes);
app.use("/api/payment/", paymentRoutes);
app.use("/api/subscriberaccounts/", subscriberAccountRoutes);
app.use("/api/subscriber/", subscriberRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/email-subscriber", emailSubscriberRoutes);
app.use("/api/backOffice/", backOfficeRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/api", (req, res) => {
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
