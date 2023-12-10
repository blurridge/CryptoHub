export const convertDate = (currentDate: number) => {
  const date = new Date(currentDate * 1000);
  const day = ("0" + date.getDate()).slice(-2); // Get the day with leading zero
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month with leading zero
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};
