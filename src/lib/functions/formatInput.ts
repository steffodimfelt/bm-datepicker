export const formatInputNumber = (dateInput: any) => {
  let formatInput = dateInput.toString();
  formatInput.length < 2 && (formatInput = `0${formatInput}`);
  return formatInput;
};
