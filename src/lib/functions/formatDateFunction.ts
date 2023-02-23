export const formatDateFunction = (date: any) => {
  const formatedYear = date.year.toString();
  let formatedMonth = date.month.toString();
  formatedMonth.length < 2 && (formatedMonth = `0${formatedMonth}`);
  let formatedDay = date.day.toString();
  formatedDay.length < 2 && (formatedDay = `0${formatedDay}`);
  return { year: formatedYear, month: formatedMonth, day: formatedDay };
};
