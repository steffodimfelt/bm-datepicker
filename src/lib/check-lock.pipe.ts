import { Pipe, PipeTransform } from "@angular/core";
import { splitDateToObject } from "./functions/splitDateToObject";
import { parseDateFromISO } from "./functions/parseDateFromISO";
import { parseDateToISO } from "./functions/parseDateToISO";
@Pipe({
  name: "checkLockPipe",
})
export class CheckLockPipe implements PipeTransform {
  transform(value: any): any {
    if (value.dayDate != undefined) {
      let parseDayDate = parseDateFromISO(value.dayDate);
      parseDayDate.year = value.localSelectedYear;
      const parseDayDateToIso = parseDateToISO(parseDayDate);

      if (!!value.lockDateBefore && !!value.lockDateAfter) {
        const _splitObjBefore = splitDateToObject(
          value.lockDateBefore,
          value.patternArray
        );
        const _inputToISOBefore = new Date(
          `${_splitObjBefore.year}-${_splitObjBefore.month}-${_splitObjBefore.day}`
        );
        let formatedInputDateBefore = new Date(_inputToISOBefore);
        formatedInputDateBefore.setHours(0, 0, 0, 0);

        const _splitObjAfter = splitDateToObject(
          value.lockDateAfter,
          value.patternArray
        );
        const _inputToISOAfter = new Date(
          `${_splitObjAfter.year}-${_splitObjAfter.month}-${_splitObjAfter.day}`
        );
        let formatedInputDateAfter = new Date(_inputToISOAfter);
        formatedInputDateAfter.setHours(0, 0, 0, 0);
        return (
          (true && parseDayDateToIso < formatedInputDateBefore) ||
          parseDayDateToIso > formatedInputDateAfter
        );
      }

      if (!!value.lockDateBefore && value.lockDateAfter === null) {
        const _splitObj = splitDateToObject(
          value.lockDateBefore,
          value.patternArray
        );
        const _inputToISO = new Date(
          `${_splitObj.year}-${_splitObj.month}-${_splitObj.day}`
        );
        let formatedInputDate = new Date(_inputToISO);
        formatedInputDate.setHours(0, 0, 0, 0);

        return true && parseDayDateToIso < formatedInputDate;
      }

      if (!!value.lockDateAfter && value.lockDateBefore === null) {
        const _splitObj = splitDateToObject(
          value.lockDateAfter,
          value.patternArray
        );
        const _inputToISO = new Date(
          `${_splitObj.year}-${_splitObj.month}-${_splitObj.day}`
        );
        let formatedInputDate = new Date(_inputToISO);
        formatedInputDate.setHours(0, 0, 0, 0);
        return true && parseDayDateToIso > formatedInputDate;
      }
      return false;
    }
    return false;
  }
}
