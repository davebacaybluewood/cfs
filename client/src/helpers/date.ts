const getDateDays = (date: Date) => {
  const modifiedDate = ("0" + date.getDate()).slice(-2);

  return modifiedDate;
};

const getDateMonthShort = (date: Date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const modifiedDate = monthNames[date.getMonth()];

  return modifiedDate;
};

const getDateToFullDate = (date: string) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const tempDate = date.split("-");
  return (
    tempDate[2] + " " + monthNames[Number(tempDate[1]) - 1] + " " + tempDate[0]
  );
};

export { getDateDays, getDateMonthShort, getDateToFullDate };
