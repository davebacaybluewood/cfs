export const formatDate = (fullDate, type) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return type === "dashFormat"
    ? new Date(fullDate).toISOString().slice(0, 10)
    : new Date(fullDate).toLocaleDateString("en-US", options);
};

export function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes().toString();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = parseInt(minutes) < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export const formatISODateToDate = (date) => {
  const formattedDate = new Date(date);
  let year = formattedDate.getFullYear();
  let month = (formattedDate.getMonth() + 1).toString();
  let dt = formattedDate.getDate().toString();
  let time;

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
