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

export const formatDate = (
  fullDate: Date,
  type: "dashFormat" | "fullFormat"
) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return type === "dashFormat"
    ? new Date(fullDate).toISOString().slice(0, 10)
    : new Date(fullDate).toLocaleDateString("en-US", options as any);
};

export function formatAMPM(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes().toString();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = parseInt(minutes) < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export const formatISODateToDate = (date: string) => {
  const formattedDate = new Date(date);
  let year = formattedDate.getFullYear();
  let month = (formattedDate.getMonth() + 1).toString();
  let dt = formattedDate.getDate().toString();

  if (parseInt(dt) < 10) {
    dt = "0" + dt;
  }
  if (parseInt(month) < 10) {
    month = "0" + month;
  }

  return (
    formatDate(new Date(year + "-" + month + "-" + dt), "fullFormat") +
    " " +
    formatAMPM(formattedDate)
  );
};

//DATE ONLY
export const formatISODateOnly = (date: string) => {
  const formattedDate = new Date(date);
  let year = formattedDate.getFullYear();
  let month = (formattedDate.getMonth() + 1).toString();
  let dt = formattedDate.getDate().toString();

  if (parseInt(dt) < 10) {
    dt = "0" + dt;
  }
  if (parseInt(month) < 10) {
    month = "0" + month;
  }

  return formatDate(new Date(year + "-" + month + "-" + dt), "fullFormat");
};

export { getDateDays, getDateMonthShort, getDateToFullDate };
