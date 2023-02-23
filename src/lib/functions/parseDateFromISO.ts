export const parseDateFromISO = (date: any) => {
  let _parseYear = date.getFullYear().toString();
  let _parseMonth = (date.getMonth() + 1).toString();
  let _parseDay = date.getDate().toString();
  _parseDay.length < 2 && (_parseDay = `0${_parseDay}`);
  _parseMonth.length < 2 && (_parseMonth = `0${_parseMonth}`);
  return {
    year: _parseYear,
    month: _parseMonth,
    day: _parseDay
  };
};
