import Orders from "../models/ordersModel.js";

const getOrdersHistoryByUserGuid = async (req, res, next) => {
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
};

export { getOrdersHistoryByUserGuid };
