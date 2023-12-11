import Orders from "../models/ordersModel.js";
import { API_RES_FAIL } from "../constants/constants.js";

const getOrdersHistoryByUserGuid = async (req, res, next) => {
  try {
    const { userGuid } = req.params;

    if (!userGuid) {
      res.status(401).json({
        message: "[Orders] Params is required.",
        success: false,
      });
      return;
    }

    const orders = await Orders.aggregate([
      { $match: { userGuid: userGuid } },
      {
        $lookup: {
          from: "merchandises",
          localField: "merchandiseId",
          foreignField: "_id",
          as: "merchandiseDoc",
        },
      },
      {
        $set: {
          merchandiseName: {
            $first: "$merchandiseDoc.name",
          },
        },
      },
      {
        $unset: "merchandiseDoc",
      },
    ]).skip(1);

    res.json(orders);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
};

export { getOrdersHistoryByUserGuid };
