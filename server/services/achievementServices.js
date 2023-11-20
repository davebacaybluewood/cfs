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
        "agentDoc.status": status.ACTIVATED,
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

export const fetchQuickDraw = async (userGuid) => {
  const recruiter = await Hierarchy.aggregate([
    {
      $match: {
        userGuid: userGuid
      }
    },
    {
      $lookup: {
        from: "hierarchies",
        localField: "hierarchyCode",
        foreignField: "hierarchyCode",
        as: "doc",
      },
    },
    {
      $unwind: "$doc",
    },
    {
      $group: {
        _id: { hierarchyCode: "$hierarchyCode" },
        total: { $sum: 1 }
      },
    },
    {
      $limit: 1
    }
  ]);
  /* filter collection to get the total of leads per week
  *  sort the collection to get the first team */
  const leads = await Hierarchy.aggregate([
    {
      $match: {
        recruiterUserGuid: { $exists: true },
      },
    },
    {
      $addFields: {
        currentWeek: {
          $week: {
            date: {
              $dateFromString: {
                dateString: "$createdAt",
                onError: new Date(),
              },
            },
          },
        },
      },
    },
    {
      $group: {
        _id: { week: "$currentWeek", leadingTeam: "$hierarchyCode" },
        leadingTotal: { $sum: 1 }
      },
    },
    {
      $sort: {
        createdAt: 1,
        leadingTotal: -1
      }
    },
    {
      $limit: 1
    }
  ]);
  // first index is the first team that has the highest recruitment on the current week.
  return { ...leads.shift(), yourTeam: recruiter[0]._id.hierarchyCode, yourTotal: recruiter[0].total };
};

export const fetchSmokingGun = async (userGuid) => {
  const recruiter = await Hierarchy.findOne({ userGuid: userGuid });
  /* filter collection to get the total of leads per week
  *  sort the collection to get the first team */
  const leads = await Hierarchy.aggregate([
    {
      $match: {
        hierarchyCode: recruiter.hierarchyCode,
        recruiterUserGuid: { $exists: true },
      },
    },
    {
      $addFields: {
        currentWeek: {
          $week: {
            date: {
              $dateFromString: {
                dateString: "$createdAt",
                onError: new Date(),
              },
            },
          },
        },
      },
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
      $addFields: {
        _status: "$agentDoc.position.value"
      },
    },
    {
      $group: {
        _id: { week: "$currentWeek", recruiterUserGuid: "$recruiterUserGuid" },
        total: { $sum: 1 }
      },
    },
    {
      $sort: {
        createdAt: 1,
        leadingTotal: -1
      }
    },
    {
      $limit: 1
    }
  ]);

  // first index is the first team that has the highest recruitment on the current week.
  return leads.shift();
}
