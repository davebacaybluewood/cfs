import expressAsync from "express-async-handler";
import { NOTIFICATION_ENUMS } from "../constants/constants.js";
import Notifications from "../models/notificationModel.js";

/**
 * @desc: Fetch all notifications
 * @route: GET /api/notifications
 * @acess: Private
 */
const getAllNotifications = expressAsync(async (req, res) => {
  const { userGuid } = req.query;
  const notificationConfigs = userGuid ? { userGuid } : {};
  const notifications = await Notifications.find(notificationConfigs);

  const clonedNotifications = [...notifications];

  const data = {
    totalOfNotifications: clonedNotifications.length,
    notifications: clonedNotifications,
    notificationTypes: {
      blogDraft: clonedNotifications.filter(
        (notification) =>
          notification.type === NOTIFICATION_ENUMS.BLOGS.BLOGS_DRAFT
      ),
      blogRequest: clonedNotifications.filter(
        (notification) =>
          notification.type === NOTIFICATION_ENUMS.BLOGS.BLOGS_REQUEST
      ),
      blogPublished: clonedNotifications.filter(
        (notification) =>
          notification.type === NOTIFICATION_ENUMS.BLOGS.BLOGS_PUBLISHED
      ),
      blogDeclined: clonedNotifications.filter(
        (notification) =>
          notification.type === NOTIFICATION_ENUMS.BLOGS.BLOGS_DECLINED
      ),
      newAppointment: clonedNotifications.filter(
        (notification) =>
          notification.type === NOTIFICATION_ENUMS.APPOINTMENTS.APPOINTMENT_NEW
      ),
      cancelledAppointment: clonedNotifications.filter(
        (notification) =>
          notification.type ===
          NOTIFICATION_ENUMS.APPOINTMENTS.APPOINTMENT_CANCELLED
      ),
      webinarRequest: clonedNotifications.filter(
        (notification) =>
          notification.type === NOTIFICATION_ENUMS.WEBINARS.WEBINAR_REQUEST
      ),
      webinarDeclined: clonedNotifications.filter(
        (notification) =>
          notification.type === NOTIFICATION_ENUMS.WEBINARS.WEBINAR_DECLINED
      ),
      webinarApproved: clonedNotifications.filter(
        (notification) =>
          notification.type === NOTIFICATION_ENUMS.WEBINARS.WEBINAR_APPROVED
      ),
    },
  };

  if (notifications.length === 0) {
    throw new Error("No notifications found.");
  } else {
    res.status(200).json(data);
  }
});

/**
 * @desc: Create a notification
 * @route: POST /api/notifications
 * @acess: Private
 */
const createNotification = expressAsync(async (req, res) => {
  const { userGuid, label, description, type } = req.body;

  const acceptedType = [
    NOTIFICATION_ENUMS.BLOGS.BLOGS_DRAFT,
    NOTIFICATION_ENUMS.BLOGS.BLOGS_DECLINED,
    NOTIFICATION_ENUMS.BLOGS.BLOGS_PUBLISHED,
    NOTIFICATION_ENUMS.BLOGS.BLOGS_REQUEST,
    NOTIFICATION_ENUMS.APPOINTMENTS.APPOINTMENT_CANCELLED,
    NOTIFICATION_ENUMS.APPOINTMENTS.APPOINTMENT_NEW,
    NOTIFICATION_ENUMS.WEBINARS.WEBINAR_REQUEST,
    NOTIFICATION_ENUMS.WEBINARS.WEBINAR_DECLINED,
    NOTIFICATION_ENUMS.WEBINARS.WEBINAR_APPROVED,
  ];

  if (!acceptedType.includes(type)) {
    throw new Error("Invalid Notification Type");
  } else {
    const notification = await Notifications({
      userGuid,
      label,
      description,
      type,
    });

    await notification.save();
    res.status(200).json("Notification Submitted");
  }
});
/** Will develop in the future 
 * 
 * const viewNotification = expressAsync(async (req, res) => {
  if (!req.params.userGuid) {
    throw new Error("Invalid User ID");
  } else {
    const notification = await Notifications.findById(req.params.id);
    notification.isViewed = true;
    notification.save();
  }
});

*/

export { getAllNotifications, createNotification };
