import { splitPattern } from './splitPattern';
export const splitDateToObject = (input: string, patternArray: any) => {
  const inputArray: any = splitPattern(input);
  let outputObj = { year: '', month: '', day: '' };
  patternArray.forEach((pattern: string, index: number) => {
    switch (pattern) {
      case 'dd':
        outputObj.day = inputArray[index];
        break;
      case 'mm':
        outputObj.month = inputArray[index];
        break;
      case 'yyyy':
        outputObj.year = inputArray[index];
        break;
      default:
        outputObj.year = '20' + inputArray[index];
        break;
    }
  });
  return outputObj;
};
