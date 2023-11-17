import Hierarchy from "../models/hierarchyModel.js";
import { status } from "../constants/constants.js";
import uniqBy from "lodash/uniqBy.js";

export const fetchUnitedNations = async (userGuid) => {
  const KEY_CONDITION = "nationality";

  const subscribers = await Hierarchy.aggregate([
    {
      $match: { recruiterUserGuid: userGuid },
    },
    {
      $lookup: {
        from: "agents",
        localField: "userGuid",
        foreignField: "userGuid",
        as: "agentDoc",
      },
    },
    {
      $unwind: "$agentDoc",
    },
    {
      $match: { "agentDoc.status": status.ACTIVATED, "agentDoc.nationality": { $exists: true } },
    },
    {
      $project: {
        _id: 1,
        userGuid: 1,
        recruiterUserGuid: 1,
        hierarchyId: 1,
        hierarchyCode: 1,
        parent: 1,
        nationality: "$agentDoc.nationality",
      },
    },
    {
      $unset: "userDoc",
    },
  ]);

  return uniqBy(subscribers, KEY_CONDITION);
};

export const fetchOneYearTeam = async (userGuid) => {
  const KEY_CONDITION = "birthMonth";

  const documents = await Hierarchy.aggregate([
    {
      $match: { recruiterUserGuid: userGuid },
    },
    {
      $lookup: {
        from: "agents",
        localField: "userGuid",
        foreignField: "userGuid",
        as: "agentDoc",
      },
    },
    {
      $unwind: "$agentDoc",
    },
    {
      $match: {
        "agentDoc.birthDate": {
          $exists: true,
          $ne: "",
        },
      },
    },
    {
      $project: {
        _id: 1,
        userGuid: 1,
        recruiterUserGuid: 1,
        emailAddress: "$agentDoc.emailAddress",
        birthMonth: {
          $month: {
            $dateFromString: {
              dateString: "$agentDoc.birthDate",
              timezone: "America/New_York",
              format: "%Y-%m-%dT%H:%M:%S.%LZ",
              onError: new Date(0),
            },
          },
        },
      },
    },
  ]);

  return uniqBy(documents, KEY_CONDITION);
};
