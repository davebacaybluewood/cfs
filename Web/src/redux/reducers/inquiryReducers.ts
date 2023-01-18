import { INQUIRY_ACTION_TYPES } from "constants/redux-constants";

export const inquiryListReducer = (
  state: any = { inquiries: [] },
  action: any
) => {
  switch (action.type) {
    case INQUIRY_ACTION_TYPES.INQUIRY_ACTION_TYPES_REQUEST:
      return { loading: true, inquiries: [] };
    case INQUIRY_ACTION_TYPES.INQUIRY_ACTION_TYPES_SUCCESS:
      return {
        loading: false,
        inquiries: action.payload,
      };
    case INQUIRY_ACTION_TYPES.INQUIRY_ACTION_TYPES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
