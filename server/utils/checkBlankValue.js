import { BLANK_VALUE } from "../constants/constants.js";

const checkBlankValue = (text) => {
  if (!text) {
    return BLANK_VALUE;
  }

  return text;
};

export default checkBlankValue;
