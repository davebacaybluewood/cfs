import { REWARD_ACTION_TYPES } from "constants/redux-constants";

export const rewardReducers = (
  state: any = { rewards: [] },
  action: any
) => {
  switch (action.type) {
    case REWARD_ACTION_TYPES.REWARD_ACTION_GET_REQUEST:
      return { loading: true, rewards: {}, content: [] };
    case REWARD_ACTION_TYPES.REWARD_ACTION_GET_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case REWARD_ACTION_TYPES.REWARD_ACTION_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
