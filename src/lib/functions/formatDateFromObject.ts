export const formatDateFromObject = (
  date: any,
  pattern: any,
  patternArray: any,
  dividersArray: any
) => {
  let formatedYear = date.year;
  const getFullYear: any = pattern.match('yyyy');
  if (getFullYear === null) {
    formatedYear =
      formatedYear.slice(-1, 1) + formatedYear.slice(2, formatedYear.length);
  }
  let dateArray: any = [];
  patternArray.forEach((format: string) => {
    if (format === 'dd') {
      dateArray.push(date.day);
    } else if (format === 'mm') {
      dateArray.push(date.month);
    } else {
      dateArray.push(formatedYear);
    }
  });
  return `${dateArray[0]}${dividersArray[0]}${dateArray[1]}${dividersArray[1]}${dateArray[2]}`;
};
