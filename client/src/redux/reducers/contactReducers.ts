import { CONTACT_ACTION_TYPES } from "constants/redux-constants";

export const contactListReducer = (
  state: any = { contacts: [] },
  action: any
) => {
  switch (action.type) {
    case CONTACT_ACTION_TYPES.CONTACT_ACTION_TYPES_REQUEST:
      return { loading: true, contacts: [] };
    case CONTACT_ACTION_TYPES.CONTACT_ACTION_TYPES_SUCCESS:
      return {
        loading: false,
        contacts: action.payload,
      };
    case CONTACT_ACTION_TYPES.CONTACT_ACTION_TYPES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
