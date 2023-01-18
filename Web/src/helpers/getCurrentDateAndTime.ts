import { formatDate } from "./dateFormatter";

const getCurrentDateAndTime = () => {
  const date = new Date();
  const leadingZero = (num: any) => `0${num}`.slice(-2);
  const formattedTime = () => {
    return [date.getHours(), date.getMinutes()].map(leadingZero).join(":");
  };
  const formattedDate = formatDate(new Date(), "dashFormat");

  return `${formattedDate}T${formattedTime()}`;
};

export default getCurrentDateAndTime;
