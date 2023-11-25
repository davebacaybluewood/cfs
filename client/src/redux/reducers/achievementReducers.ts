import { ACHIEVEMENT_ACTION_TYPES } from "constants/redux-constants";

export const achivementReducers = (state: any = { achievements: { oneYearTeam: { data: [], total: 0, isCompleted: false } }, content: [] }, action: any) => {
  switch (action.type) {
    case ACHIEVEMENT_ACTION_TYPES.ACHIEVEMENT_ACTION_GET_REQUEST:
      return { loading: true, achievements: {}, content: [] };
    case ACHIEVEMENT_ACTION_TYPES.ACHIEVEMENT_ACTION_GET_SUCCESS:
      return {
        loading: false,
        achievements: action.payload,
        content: action.content
      };
    case ACHIEVEMENT_ACTION_TYPES.ACHIEVEMENT_ACTION_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
