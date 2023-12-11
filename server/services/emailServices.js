import EmailTemplate from "../models/emailTemplate.js";

const getEmailTemplates = async (userGuids, status) => {
  const templates = EmailTemplate.aggregate([
    { $match: { userGuid: { $in: [...userGuids] }, status: status } },
    {
      $lookup: {
        from: "agents",
        localField: "userGuid",
        foreignField: "userGuid",
        as: "agentDoc",
      },
    },
    {
      $addFields: {
        authorFirstName: { $first: "$agentDoc.firstName" },
        authorLastName: { $first: "$agentDoc.lastName" },
      },
    },
    {
      $addFields: {
        authorName: { $concat: ["$authorFirstName", " ", "$authorLastName"] },
      },
    },
    {
      $unset: "agentDoc",
    },
    {
      $sort: { authorName: 1 },
    },
  ]);

  return templates || [];
};

export { getEmailTemplates };
