const rewardsHistoryUtils = (type: string) => {
  if (type === "PERSONAL_ACCOUNT_REGISTRATION") {
    return "Personal Account Registration";
  } else if (type === "SUBSCRIBER_REGISTRATION_SUCCESS") {
    return "Subscriber Registration Success";
  }

  return "-";
};

export default rewardsHistoryUtils;
