import mongoose from "mongoose";

const eventsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    event_date: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    ticket: {
      type: String,
      required: true,
    },
    ticket_cloudinary_id: {
      type: String,
      required: true,
    },
    image_cloudinary_id: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: true,
      default: "dark",
    },
  },
  {
    timestamps: true,
  }
);

const Events = mongoose.model("Events", eventsSchema);

export default Events;
