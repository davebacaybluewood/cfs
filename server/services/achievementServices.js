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
      $match: {
        "agentDoc.status": status.ACTIVATED,
        "agentDoc.nationality": { $exists: true },
      },
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
  console.log(documents)
  return uniqBy(documents, KEY_CONDITION);
};

export const checkMasterAgent = async (recruiterId) => {
  const MISSION_DURATION = 30;

  const recruiter = await Hierarchy.findOne({
    userGuid: recruiterId,
  });

  const addDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
  };

  //TEMP: Use createdAt timestamp as basis for the A&A Registration
  const durationStart = recruiter.createdAt.toISOString().substring(0, 10);
  const durationEnd = addDays(recruiter.createdAt, MISSION_DURATION)
    .toISOString()
    .substring(0, 10);

  if (!recruiter) {
    return;
  }

  try {
    const recruitedAgents = await Hierarchy.aggregate([
      { $match: { userGuid: recruiterId } },
      {
        $graphLookup: {
          from: "hierarchies",
          startWith: "$userGuid",
          connectFromField: "userGuid",
          connectToField: "recruiterUserGuid",
          as: "hierarchy",
        },
      },
      {
        $addFields: {
          downlines: {
            $filter: {
              input: "$hierarchy",
              as: "child",
              cond: {
                $and: [
                  { $gte: ["$$child.createdAt", durationStart] },
                  { $lt: ["$$child.createdAt", durationEnd] },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          downlines: 1,
        },
      },
    ]);

    return recruitedAgents;
  } catch (ex) {
    throw new Error(ex);
    console.log(ex);
  }
};
