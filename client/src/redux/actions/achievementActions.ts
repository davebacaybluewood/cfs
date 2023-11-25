import { rewardItems } from "events/mission/Rewards/contants/Items";
import { ACHIEVEMENT_ACTION_TYPES } from "constants/redux-constants";
import userInfoConfig from "./helpers/userInfoConfig";
import errorMessage from "./helpers/errorMessage";
import ENDPOINTS from "constants/endpoints";
import axios from "axios";

export const listAchievements = () => async (dispatch: any, getState: any) => {
  try {
    const achievementTitle = {
      oneYearTeam: { label: "One Year Team", total: 12 },
    };

    dispatch({
      type: ACHIEVEMENT_ACTION_TYPES.ACHIEVEMENT_ACTION_GET_REQUEST,
    });

    const oneYearTeam = await axios.get(
      ENDPOINTS.ACHIEVEMENT_ONE_YEAR_TEAM,
      userInfoConfig(getState)
    );

    const cards = rewardItems.map((content) => {
      content["progress"] = 0;
      switch (content.name) {
        case achievementTitle.oneYearTeam.label:
          content["progress"] = Number(
            (oneYearTeam.data.total / achievementTitle.oneYearTeam.total) * 100
          );

          break;

        default:
          break;
      }
      return content;
    });

    // add each achievements to payload
    dispatch({
      type: ACHIEVEMENT_ACTION_TYPES.ACHIEVEMENT_ACTION_GET_SUCCESS,
      payload: { oneYearTeam: oneYearTeam.data },
      content: cards,
    });
  } catch (error: any) {
    dispatch({
      type: ACHIEVEMENT_ACTION_TYPES.ACHIEVEMENT_ACTION_GET_FAIL,
      payload: errorMessage(error),
    });
  }
};
