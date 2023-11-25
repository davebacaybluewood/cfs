import { rewardItems } from "events/mission/Rewards/contants/Items";
import { REWARD_ACTION_TYPES } from "constants/redux-constants";
import userInfoConfig from "./helpers/userInfoConfig";
import errorMessage from "./helpers/errorMessage";
import ENDPOINTS from "constants/endpoints";
import axios from "axios";

export const listRewards = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: REWARD_ACTION_TYPES.REWARD_ACTION_GET_REQUEST,
    });
    const {
        userLogin: { userInfo },
      } = getState();

    const { data } = await axios.get(
      `${ENDPOINTS.REWARDS}/${userInfo.userGuid}`,
      userInfoConfig(getState)
    );

    dispatch({
      type: REWARD_ACTION_TYPES.REWARD_ACTION_GET_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: REWARD_ACTION_TYPES.REWARD_ACTION_GET_FAIL,
      payload: errorMessage(error),
    });
  }
};
