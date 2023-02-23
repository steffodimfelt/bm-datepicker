export const parseDateToISO = (date: any) => {
  let inputDateToISO = new Date(`${date.year}-${date.month}-${date.day}`);
  let formatedInputDate = new Date(inputDateToISO);
  formatedInputDate.setHours(0, 0, 0, 0);

  return new Date(formatedInputDate);
};
