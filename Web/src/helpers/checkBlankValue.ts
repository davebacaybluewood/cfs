import { BLANK_VALUE } from "constants/constants";

const checkBlankValue = (text: string): string => {
  if (!text) {
    return BLANK_VALUE;
  }

  return text;
};

export default checkBlankValue;
