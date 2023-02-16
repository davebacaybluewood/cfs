import {
  ADD_AGENT_ACTION_TYPES,
  AGENT_ACTION_TYPES,
  SINGLE_AGENT_ACTION_TYPES,
} from "constants/redux-constants";

export const agentListReducer = (state: any = { agents: [] }, action: any) => {
  switch (action.type) {
    case AGENT_ACTION_TYPES.AGENT_ACTION_GET_REQUEST:
      return { loading: true, agents: [] };
    case AGENT_ACTION_TYPES.AGENT_ACTION_GET_SUCCESS:
      return {
        loading: false,
        agents: action.payload,
      };
    case AGENT_ACTION_TYPES.AGENT_ACTION_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const agentListSingleReducer = (state = { agent: {} }, action: any) => {
  switch (action.type) {
    case SINGLE_AGENT_ACTION_TYPES.SINGLE_AGENT_ACTION_GET_REQUEST:
      return { loading: true, ...state };
    case SINGLE_AGENT_ACTION_TYPES.SINGLE_AGENT_ACTION_GET_SUCCESS:
      return {
        loading: false,
        agent: action.payload,
      };
    case SINGLE_AGENT_ACTION_TYPES.SINGLE_AGENT_ACTION_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createAgentReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case ADD_AGENT_ACTION_TYPES.ADD_AGENT_ACTION_REQUEST:
      return { loading: true };
    case ADD_AGENT_ACTION_TYPES.ADD_AGENT_ACTION_SUCCESS:
      return {
        loading: false,
        agent: action.payload,
        success: true,
      };
    case ADD_AGENT_ACTION_TYPES.ADD_AGENT_ACTION_FAIL:
      return { loading: false, error: action.payload };
    case ADD_AGENT_ACTION_TYPES.ADD_AGENT_ACTION_RESET:
      return { agent: {} };
    default:
      return state;
  }
};
