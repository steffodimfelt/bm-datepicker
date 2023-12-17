import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InputDataInterface } from "./interfaces/inputData-interface";

import { CalendarDaysService } from "./services/calendar-days.service";
import { CalendarMonthsService } from "./services/calendar-months.service";
import { CalendarYearsService } from "./services/calendar-years.service";
import stylesDefault from "./styles-default";
import { splitDateToObject } from "./functions/splitDateToObject";
import { parseDateFromISO } from "./functions/parseDateFromISO";
import { parseDateToISO } from "./functions/parseDateToISO";
import { formatDateFromObject } from "./functions/formatDateFromObject";
import { formatDateFunction } from "./functions/formatDateFunction";
import { formatInputNumber } from "./functions/formatInput";
import { splitPattern } from "./functions/splitPattern";
import { matchPattern } from "./functions/matchPattern";

@Component({
  selector: "bm-datepicker",
  templateUrl: "./bm-datepicker.component.html",
  styleUrls: ["./styles.scss"],
  animations: [
    trigger("toggleTable", [
      state(
        "open",
        style({
          opacity: 1,
          marginTop: "10px",
        })
      ),
      state(
        "close",
        style({
          height: 0,
          padding: 0,
          opacity: 0,
          marginTop: 0,
        })
      ),
      transition("open <=> close", [animate(".2s ease-out")]),
    ]),
  ],
})
export class BmDatepickerComponent implements OnInit {
  @Input() label?: string | null = null;
  @Input() styleSheet?: string | null = null;
  @Input() weekdays: any = null;
  @Input() months: any = null;
  @Input() formGroupInput?: FormGroup;
  @Input() formControlNameInput: string = "bm-datepicker";
  @Input() placeholder: string = "Pick a date";
  @Input() pattern: string = "yyyy-mm-dd";
  @Output() calendarOutput: EventEmitter<any> = new EventEmitter();

  //---------- New in Datepicker ----------
  @Input() readonly: boolean = false;
  @Input() errorMessage: string | null = null;
  @Input() lockDateBefore: string | null = null;
  @Input() lockDateAfter: string | null = null;
  @Input() selectedDate: string | null = null;
  @Input() manualClose: boolean = false;
  @Input() isSunday: boolean = false;
  @Output() isoCalendarOutput: EventEmitter<any> = new EventEmitter();
  defaultForm!: FormGroup;
  weekdayLabels: any;
  //---------------------------------------

  date = new Date();
  inputData: InputDataInterface = { year: "", month: "", day: "" };
  showDatePicker = false;
  patternArray: any = [];
  dividersArray: any = [];
  showError: boolean = false;

  isPlain: boolean = false;

  constructor(
    private elementRef: ElementRef,
    public calendarYearsService: CalendarYearsService,
    public calendarMonthsService: CalendarMonthsService,
    public calendarDaysService: CalendarDaysService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.calendarYearsService.year = this.date;
    this.calendarMonthsService.month = this.date;
    this.calendarDaysService.day = this.date;
    this.calendarDaysService.selectedDay = null;
    !!this.weekdays && (this.calendarDaysService.dayLabels = this.weekdays);
    !!this.months && (this.calendarMonthsService.monthLabels = this.months);

    this.weekdayLabels = this.calendarDaysService.dayLabels;
    if (this.isSunday) {
      this.weekdayLabels.unshift(this.weekdayLabels.pop());
    }

    this.createStyle();

    this.dividersArray = matchPattern(this.pattern);
    this.patternArray = splitPattern(this.pattern);

    this.defaultForm = this.formBuilder.group({
      selectedDate: [this.selectedDate],
    });

    const validatePattern = `[0-9]{${this.patternArray[0].length}}${this.dividersArray[0]}[0-9]{${this.patternArray[1].length}}${this.dividersArray[1]}[0-9]{${this.patternArray[2].length}}`;
    this.formGroupInput
      ?.get(this.formControlNameInput)
      ?.addValidators(Validators.pattern(validatePattern));

    if (!!this.selectedDate) {
      const splitDateToObj = splitDateToObject(
        this.selectedDate,
        this.patternArray
      );
      const formatedInputDate = parseDateToISO({
        year: splitDateToObj.year,
        month: splitDateToObj.month,
        day: splitDateToObj.day,
      });
      this.selectDay(formatedInputDate);
    } else {
      if (this.lockDateBefore === null && this.lockDateAfter === null) {
        this.lockDateBefore = formatDateFromObject(
          parseDateFromISO(this.date),
          this.pattern,
          this.patternArray,
          this.dividersArray
        );
      }
    }
  }

  keyboardInput(event: any) {
    this.onInputChange(event.target.value);
  }

  onInputChange(input: any) {
    this.showError = false;
    const inputArray: any = splitPattern(input);
    this.patternArray.forEach((pattern: string, index: number) => {
      const onlyDigits: any = inputArray[index]?.match(/[0-9]*$/g);
      if (parseInt(inputArray[index]) === 0 || onlyDigits?.length < 2) {
        this.showError = true;
      }
      switch (pattern) {
        case "dd":
          this.inputData.day = inputArray[index];
          break;
        case "mm":
          this.inputData.month = inputArray[index];
          break;
        case "yyyy":
          this.inputData.year = inputArray[index];
          break;
        default:
          this.inputData.year = "20" + inputArray[index];
          break;
      }
    });

    let inputDateToISO = new Date(
      `${this.inputData.year}-${this.inputData.month}-${this.inputData.day}`
    );
    let formatedInputDate = new Date(inputDateToISO);
    let formatedCurrentDate = new Date(this.date);
    const inputDividersArray: any = matchPattern(input);

    let lockDateBeforeISO: any = null;
    let lockDateAfterISO: any = null;

    if (!!this.lockDateBefore) {
      const lockDateBeforeObject = splitDateToObject(
        this.lockDateBefore,
        this.patternArray
      );
      lockDateBeforeISO = new Date(
        `${lockDateBeforeObject.year}-${lockDateBeforeObject.month}-${lockDateBeforeObject.day}`
      );
    }

    if (!!this.lockDateAfter) {
      const lockDateAfterObject = splitDateToObject(
        this.lockDateAfter,
        this.patternArray
      );
      lockDateAfterISO = new Date(
        `${lockDateAfterObject.year}-${lockDateAfterObject.month}-${lockDateAfterObject.day}`
      );
    }

    const numberOfDaysOfMonth = new Date(
      parseInt(this.calendarYearsService.selectedYear),
      parseInt(this.calendarMonthsService.selectedMonth) + 1,
      0
    ).getDate();
    if (
      parseInt(this.inputData?.month) > 12 ||
      parseInt(this.inputData?.day) > numberOfDaysOfMonth ||
      (!!this.lockDateAfter && formatedInputDate > lockDateAfterISO) ||
      (!!this.lockDateBefore && formatedInputDate < lockDateBeforeISO) ||
      (this.lockDateBefore === null &&
        this.lockDateAfter === null &&
        formatedInputDate < formatedCurrentDate) ||
      this.inputData?.year?.length !== 4 ||
      this.inputData?.month?.length !== 2 ||
      this.inputData?.day?.length !== 2 ||
      (!!inputDividersArray &&
        (inputDividersArray[0] !== this?.dividersArray[0] ||
          inputDividersArray[1] !== this?.dividersArray[1]))
    ) {
      this.showError = true;
      this.formGroupInput?.controls[this.formControlNameInput].setErrors({
        incorrect: true,
      });
    }
    if (!this.showError) {
      inputDateToISO = new Date(
        `${this.inputData.year}-${this.inputData.month}-${this.inputData.day}`
      );
      formatedInputDate = new Date(
        `${this.inputData.year}-${this.inputData.month}-${this.inputData.day}`
      );
      this.isoCalendarOutput.emit(inputDateToISO);
      this.calendarOutput.emit({ selectedDate: input });
      this.selectDay(formatedInputDate);
      this.showDatePicker = false;
    }
  }

  createStyle(): void {
    let styleElement = document.createElement("style");
    const stylesheetFormated = `${stylesDefault} ${this.styleSheet}`;
    styleElement.appendChild(document.createTextNode(stylesheetFormated));
    this.elementRef.nativeElement.appendChild(styleElement);
  }

  selectNext = () => {
    this.calendarMonthsService.nextMonth();
    this.calendarYearsService.selectedYear =
      this.calendarMonthsService.selectedMonth === 0
        ? this.calendarYearsService.selectedYear + 1
        : this.calendarYearsService.selectedYear;
    this.setFirstAndLastDay();
  };
  selectPrevious = () => {
    this.calendarMonthsService.previousMonth();
    this.calendarYearsService.selectedYear =
      this.calendarMonthsService.selectedMonth === 11
        ? this.calendarYearsService.selectedYear - 1
        : this.calendarYearsService.selectedYear;
    this.setFirstAndLastDay();
  };

  selectDay = (dayValue: any) => {
    this.showError = false;
    this.inputData = {
      year: this.calendarYearsService.selectedYear.toString(),
      month: this.calendarMonthsService.returnMonthDate(dayValue).toString(),
      day: this.calendarDaysService.returnWeekdayDate(dayValue).toString(),
    };

    this.selectedDayDate(dayValue);

    const formatDate = formatDateFromObject(
      {
        year: this.inputData.year,
        month: formatInputNumber(parseInt(this.inputData.month) + 1),
        day: formatInputNumber(this.inputData.day),
      },
      this.pattern,
      this.patternArray,
      this.dividersArray
    );

    this.formGroupInput?.controls[this.formControlNameInput]?.setValue(
      formatDate
    );

    if (this.showDatePicker) {
      this.defaultForm.controls["selectedDate"].setValue(formatDate);

      const formatDateOut: any = formatDateFunction({
        year: this.inputData.year,
        month: parseInt(this.inputData.month) + 1,
        day: this.inputData.day,
      });

      const convertedSelectedDate = formatDateFromObject(
        {
          year: formatDateOut.year,
          month: formatDateOut.month,
          day: formatDateOut.day,
        },
        this.pattern,
        this.patternArray,
        this.dividersArray
      );

      this.calendarOutput.emit({
        selectedDate: convertedSelectedDate,
      });

      const inputDateToISO = new Date(
        `${this.inputData.year}-${(
          parseInt(this.inputData.month) + 1
        ).toString()}-${this.inputData.day}`
      );
      this.formGroupInput
        ?.get(this.formControlNameInput)
        ?.setValue(convertedSelectedDate);
      this.isoCalendarOutput.emit(inputDateToISO);
    }

    !this.manualClose && (this.showDatePicker = false);
  };

  selectedDayDate = (dayDate: any) => {
    const parsedDate = parseDateFromISO(dayDate);
    if (
      this.inputData.year !== undefined &&
      this.inputData.month !== undefined &&
      this.inputData.day !== undefined
    ) {
      const formatDateOut: any = formatDateFunction({
        year: this.inputData.year,
        month: parseInt(this.inputData.month) + 1,
        day: this.inputData.day,
      });
      if (
        this.calendarYearsService.selectedYear.toString() ===
          formatDateOut.year &&
        parsedDate.month === formatDateOut.month &&
        parsedDate.day === formatDateOut.day
      ) {
        return true;
      }
    }
    return false;
  };

  setFirstAndLastDay() {
    this.calendarMonthsService.firstDayOfSelectedMonth(
      this.calendarYearsService.selectedYear,
      this.calendarMonthsService.selectedMonth
    );
    this.calendarMonthsService.lastDayOfSelectedMonth(
      this.calendarYearsService.selectedYear,
      this.calendarMonthsService.selectedMonth
    );
  }
  toggleCalendar() {
    this.showDatePicker = !this.showDatePicker;
    if (isNaN(this.calendarMonthsService.selectedMonth)) {
      this.calendarMonthsService.selectedMonth =
        this.calendarMonthsService.currentMonth;
    }
  }
}
