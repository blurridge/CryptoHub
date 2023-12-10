export const checkIfDateIsGreater = (dateInvested: unknown) => {
  if (typeof dateInvested !== "string" || !dateInvested) {
    return false;
  }
  const dateParts = (dateInvested as string).split("-");
  const year = parseInt(dateParts[2], 10);
  const month = parseInt(dateParts[0], 10) - 1;
  const day = parseInt(dateParts[1], 10);
  const inputDate = new Date(year, month, day).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  return inputDate >= today;
};
