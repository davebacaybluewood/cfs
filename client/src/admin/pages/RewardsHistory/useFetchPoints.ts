import agent from "admin/api/agent";
import { PointRows, PointsData } from "admin/models/pointsModels";
import { formatISODateOnly } from "helpers/dateFormatter";
import { useEffect, useState } from "react";
import rewardsHistoryUtils from "./rewardsHistoryUtils";

const useFetchPoints = (userGuid: string) => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<PointRows[] | undefined>();
  const [pointsData, setPointsData] = useState<PointsData | undefined>();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await agent.Points.getPointsByUserGuid(userGuid);

      const filteredData: PointRows[] | undefined = data?.points?.map(
        (data) => {
          return {
            id: data._id ?? "",
            date: formatISODateOnly(data.createdAt ?? "") ?? "",
            points: parseInt(data.points),
            expirationDate: formatISODateOnly(data.expirationDate) ?? "",
            transactionType: rewardsHistoryUtils(data.type) ?? "",
          };
        }
      );
      setRows(filteredData);
      setPointsData(data);
      setLoading(false);
    };

    getData();
  }, [userGuid]);

  return {
    rows,
    loading,
    pointsData,
  };
};

export default useFetchPoints;
