export const convertDate = (date) => {
  const months = [
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
  const dateTemp = new Date(date);
  const day = dateTemp.getDate(),
    month = dateTemp.getMonth(),
    year = dateTemp.getFullYear();
  const hour = dateTemp.getHours(),
    minutes = dateTemp.getMinutes(),
    second = dateTemp.getSeconds();
  function formatTime(time) {
    if (time <= 9) {
      return "0" + time;
    }
    return time;
  }
  return `${day} ${months[month]} ${year} ${formatTime(hour)}:${formatTime(
    minutes
  )}:${formatTime(second)}`;
};
