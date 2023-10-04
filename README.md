# Bookmaker Datepicker for Angular 
A sweet, stylish and fast datepicker for Angular. Developed for developers who want full control over the stylesheet and patterns. Can be used within a formgroup or as a standalone input with a standalone callback output. 

## Notice
This application requires Angular version 15.0.0 or newer to work correctly.

<img src="https://github.com/steffodimfelt/bm-datepicker/blob/main/bookmaker.png"  alt="Bookmaker Datepicker">

# Installation 
`npm i bm-datepicker`

Import module in `app.module.ts`:
```javascript
import { BmDatepickerModule } from 'bm-datepicker';
  imports: [
    BmDatepickerModule,
    ...
  ],
```

Usage:
```html
<bm-datepicker></bm-datepicker>
```


# Formbuilder, evaluations, callbacks and error handling
## Is it possible to connect Bookmaker to my Formbuilder?
Yes it is. Use `formGroupInput` to connect to your formgroup and `formControlNameInput` to set a control name. 
```html
<form [formGroup]="generatedFormGroup" (submit)="submitForm()">
    <bm-datepicker
        [formGroupInput]="generatedFormGroup"
        formControlNameInput="dateFrom">
    </bm-datepicker>
</form>
```

If you need to pre-define a date, you can do it in the component. 
```javascript
    this.generatedFormGroup = this.formBuilder.group({
      dateFrom: ["24-02-2023"],
    })
```

Note! If you don't need Formbuilder at all, then remove both `formGroupInput` and `formControlNameInput`, otherwise you will get an error. 
You will then need the `calendarOutput` to fetch the callback event:
```html
<bm-datepicker (calendarOutput)="calendarToOutput($event)"></bm-datepicker>
```

## Can I use Formbuilder Validators?
Of course. Put you validation requirements in you component or service. Bookmaker will handle it via the `formControlNameInput` you gave it. 

## How do I handle validated errors and error messages?
You can add the error messages below the Bookmaker and reference to the input field via the FormControllName.
In component:
```javascript
    this.generatedFormGroup = this.formBuilder.group({
      dateFrom: ["", Validators.required],
    })
```
In HTML:
```html
<p *ngIf="generatedFormGroup.get('dateFrom')?.errors?.['required']">
    This field is required
</p>
```

There is a build in `invalid` handler, that can be used as an evaluator connected to the entire form (if the input field is in a formgroup). This handler will be activated when the date don't follow the selected `pattern`.
```html
<button type="submit" [disabled]="generatedFormGroup.invalid">
    Submit form
</button>
```

Use the `errorMessage` option to show an error message of your choice, underneath the input field, when the date don't follow the selected `pattern`.
```html
<bm-datepicker errorMessage="The field is invalid"></bm-datepicker>
```

## What if I want a different format of the input field, can I change it?
Yes, you can! Use the `pattern` option to change format. The pattern is using lowercase letters for year, month and day. 
```html
<bm-datepicker pattern="mm/dd/yy"></bm-datepicker>
```

The default format is `yyyy-mm-dd` and do not need the pattern to be written out.

The available patterns are... Have it your way! yyyy.mm-dd, dd/yyyy mm, mm/dd-yy - everything goes!
The restrictions are
- The dividers can only be space ` `, period `.`, forward slash `/` or dash `-`.
- Days and months must two letters (mm) and (dd).
- Year can be either two letters (yy) or four letters (yyyy).

## Can I use the input field to change the date?
Yes, you can! 
The Bookmaker will accept changes as long as it follows the `pattern`.
You can either pick a date from the calendar or fill it in manually.

The formated date will be presented in the input field and can be used via selected `formControlNameInput` or used from the callback `calendarOutput`.

## Can I lock input field against manually changes?
Yes. You can lock the field with the `[readonly]` option (and it must be inside square brackets `[]`). This option must have value of `true` to work. Default value is always `false` and do not need this option.
```html
<bm-datepicker [readonly]=true></bm-datepicker>
```

## I don't use Formbuilder, can I get a callback response from Bookmaker?
You can use `calendarOutput` to hook up to a response function of your own. The response value is the same as selected pattern. Default pattern is `yyyy-mm-dd`.
Make a function in the same component as the Bookmaker to fetch the event value from the `calendarOutput`.
```html
<bm-datepicker (calendarOutput)="calendarToOutput($event)"></bm-datepicker>
```

## Can I get a ISO-standard date callback?
There is an option to fetch an ISO-standard formatted date like `Sat Feb 11 2023 01:00:00 GMT+0100`. Use the `isoCalendarOutput` in those cases.
Read more about handling data below "Date handling, double calendars and advanced callbacks"
```html
<bm-datepicker (isoCalendarOutput)="isoOutput($event)"></bm-datepicker>
```


# Names, labels and texts
## Hey, I want to change the label! Can I do that?
Use the `label` option to change the text. 
```html
<bm-datepicker label="Date from"></bm-datepicker>
```

## What about the placeholder, can I change that too?
Use the `placeholder` option to change the text. The default value is "Pick a date".
```html
<bm-datepicker placeholder="Pick a date"></bm-datepicker>
```

## How I change the name of the Weekdays?
Bookmaker comes with a default array of the names in english. Use it to change it to a language of your choice. Connect it to `weekdays` option.

In the HTML:
```html
<bm-datepicker [weekdays]="weekdays"></bm-datepicker>
```
In the component:
```javscript
weekdays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
```

## Can I change the week to start on a Sunday? 
Yes! Use the `[isSunday]` option (and it must be inside square brackets `[]`).
```html
<bm-datepicker [isSunday]=true></bm-datepicker>
```

## How I change the name of the Months name?
Bookmaker comes with a default array of the names in english. Use it to change it to a language of your choice. Connect it to `months` option.

In the HTML:
```html
<bm-datepicker [months]="months"></bm-datepicker>
```
In the component:
```javscript
  months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
```

# Styles, icons and animations
## Can I change the animations? 
You can't change the toggle effect, but you change when it happens. You can use the `[manualClose]` option to have the calendar open until you click on the open/close icon.
```html
<bm-datepicker [manualClose]=true></bm-datepicker>
```
Note! The toggle effect will occure after manually changes in the input field. This is needed to update the calender correctly and can't be turned off. 

## Can I change placement of the datepicker and input field? 
Sorry, not yet. Officially. (Maybe if you hack the stylesheet - if so - let me know about it) :-)

## I want a different calendar button icon. How do I change that (even if the default icon is quite fancy)?
Bookmaker have a default calendar icon. If you want to use your own, you can add it inside the Bookmaker. 
The default size i maximum 20px, but if you want bigger button, you should also change the size in the `.bm-toggle-button` style
```html
<bm-datepicker>
    <ng-icon 
        name="akarCalendar" 
        size="16px" color="white"
    ></ng-icon>
</bm-datepicker>
```

## Can I change the stylesheet?
You can change everything in Bookmaker. That's the beauty. It is a list of styles, but hey, you are a developer, aren't you? You can use the stylesheet to change parts or everything, it's up to you. Treat it as an usual stylesheet in SCSS. This is an overview of all elements, but you can concentrate it and put togther elements as you wish.  

Use `styleSheet` option to do the changes, and `formControlNameInput` to make an individual stylesheet:

In the HTML: 
```html
<bm-datepicker 
formControlNameInput="dateFrom"
[styleSheet]="styles">
<bm-datepicker>
```
In the component: 
```javascript
 styles = `
p{
    font-family:"Poppins", Verdana, sans-serif;
    color: #000;
    margin:0;
    padding:0;
} 
input{
    font-family:"Poppins", Verdana, sans-serif;
    color: #000;
    margin:0;
    padding:0;
} 
label{
    font-family:"Poppins", Verdana, sans-serif;
    color: #000;
    margin:0;
    padding:0;
    font-size: .9rem;
    font-weight: 500;
    margin-left:15px;
}
.bm-date-input{
    display:flex;
    flex:1;height:40px;
    border-radius: 9999px;
    padding: 3px 0 3px 20px; 
    border: 1px solid rgb(195, 195, 195)
}
.bm-date-input-wrapper{
    position:relative; 
    width: 100%; 
    display:flex;
    flex-direction:row; 
    align-items: center;
}
.bm-date-input-wrapper input[readonly] { 
    cursor: default !important;
    background:  rgb(245,245,245);
}
.bm-toggle-button{
    position:absolute; 
    right:5px; 
    width:30px; 
    height:30px;
    display:flex;
    align-items:center; 
    justify-content:center; 
    background-color:rgb(0, 153, 235);
    border: 1px solid rgb(0, 153, 235);
    border-radius: 9999px;
    transition:.5s
}
.bm-toggle-button:hover{
    background-color: rgb(0, 131, 202);
    cursor:pointer;
    color:fff;
    border: 1px solid rgb(0, 131, 202)
}
.bm-table{
    width:100%; 
    background-color:#f5f5f5;
    overflow: hidden;
    padding:16px; 
    display:flex;
    flex-direction: column; 
    border-radius: 8px; 
    box-shadow: 0 0 0.125rem 0 rgba(0,0,0,0.08), 0 0.125rem 0.75rem 0 rgba(0,0,0,0.24);
    box-sizing:border-box;
}
.bm-tr{
    display:flex;
    flex:1; 
    justify-content:space-between; 
    align-items:center;
    flex-direction: row;
}
.bm-th{
    display:flex; 
    flex:1; 
    justify-content:center; 
    align-items:center;
    flex-direction:row;
}
.bm-td{
    display:flex; 
    flex:1;
    justify-content:center; 
    align-items: center; 
}
.bm-td-empty{
    display:flex; 
    flex:1;
    justify-content:center; 
    align-items: center; 
}
.bm-td-empty .bm-td-inner-empty{
    height:30px;
    width:30px;
    margin:2px;
}
.bm-td-inner{
    height:30px;
    width:30px;
    margin:2px;
    display:flex; 
    justify-content:center; 
    align-items: center; 
    border-radius:9999px;
    transition: .4s;
    border: 1px solid #f5f5f5;
}
.bm-td-inner:hover{
    background-color: rgb(0, 131, 202);
    cursor:pointer;
    border: 1px solid rgb(0, 131, 202)
}
.bm-td-selected-day{
    background-color: rgb(0, 153, 235);
    cursor:pointer;
    border: 1px solid rgb(0, 153, 235)
}
.bm-td-inner:hover p{color:#fff !important}
.bm-td-selected-day p{color:#fff !important}
.bm-th p{
    font-size: .9rem;
    font-weight: 500;
}
.bm-td-inner p{
    font-size: .8rem;
    font-weight: 300;
}
.bm-daylabels-wrapper{margin-bottom: 20px}
.bm-year-month-title {
    display:flex; 
    flex: 5;
    justify-content: center; 
    align-items: center;
    flex-direction: column;
    margin-bottom: 10px
}
.bm-year-month-title p.bm-month-title{
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: -8px
}
.bm-td-current-day{border: 1px solid rgb(0, 202, 101)}

.bm-td-lock-day{ 
    pointer-events:none;
    background: repeating-linear-gradient(-55deg,rgb(222, 222, 222), rgb(222, 222, 222) 2px,rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px);
    border: 1px solid rgb(222, 222, 222)
}

.bm-arrow {
    border: solid #000;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
}
.bm-td-inner:hover .bm-arrow{
    border-color:white;
    border-width: 0 3px 3px 0;
}
.bm-arrow-right {transform: rotate(-45deg);}
.bm-arrow-left {transform: rotate(135deg);}
.bm-weekend {color: #ff0000 !important}
.bm-error-message {
    padding: 8px 16px 20px 16px;
}
.bm-error-message p{
    color: #ff0000;
    font-size: .8rem;
}
  `;
```

## There is a reference to the font "Poppins" in the stylesheet, but I only get Verdana?
To handle external fonts in Bookmaker, you need to have them globally in your Angular project. Use the link below in your root `index.html` to get Poppins fontstyle:
```html
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap"
      rel="stylesheet" />
```



# Date handling, double calendars and advanced callbacks
## What is the default behavior?
The default behavior is to lock dates before current date. Current day is indicated with a green border. Selected date have blue background (if you don't change the stylesheet...)
```html
<bm-datepicker></bm-datepicker>
```

## How do I pre-define my own selected date?
You must use `pattern` and `selectedDate` options. Default pattern is `yyyy-mm-dd`. If you're using this, you don't need to add this option, only `selectedDate`.
It is important that `selectedDate` uses the same pattern as `pattern`.
```html
<bm-datepicker 
    pattern="dd-mm-yyyy"
    selectedDate="24-02-2023"
></bm-datepicker>
```

If you want a dynamic date from the component, you can wrap the option name inside square brackets `[]`
```javscript
    selectedDateValue="24-02-2023"
```
And add square brackets around the option `[selectedDate]`.
```html
<bm-datepicker 
    pattern="dd-mm-yyyy"
    [selectedDate]="selectedDateValue"
></bm-datepicker>
```
Note! The option `selectedDate` overrides the default settings. If only `selectedDate` is used without `lockDateBefore` or `lockDateAfter`, all dates are unlocked. 

## Can I lock dates before or after a current or a pre-defined date?
If you want to define your own lockings you can use the `lockDateBefore` or `lockDateAfter` options or use `[lockDateBefore]` or `[lockDateAfter]` for dynamic values.
It is important that `lockDateBefore` and `lockDateAfter` uses the same pattern as `pattern`.

```html
<bm-datepicker 
    pattern="dd-mm-yyyy"
    lockDateBefore="24-02-2023"
></bm-datepicker>
<bm-datepicker 
    pattern="dd-mm-yyyy"
    lockDateAfter="24-02-2023"
></bm-datepicker>
```

You can either combine both `lockDateBefore` and `lockDateAfter` to limit the input range.
```html
<bm-datepicker 
    pattern="dd-mm-yyyy"
    lockDateBefore="20-02-2023"
    lockDateAfter="24-02-2023"
></bm-datepicker>
```
Or you can add `lockDateAfter` with `selectedDate` if you need all dates before the `lockDateAfter`.
```html
<bm-datepicker 
    pattern="dd-mm-yyyy"
    selectedDate="24-02-2023"
    lockDateAfter="24-02-2023"
></bm-datepicker>
```
Or add all three and get a limit input range and a pre-selected date.
```html
<bm-datepicker 
    pattern="dd-mm-yyyy"
    selectedDate="24-02-2023"
    lockDateBefore="20-02-2023"
    lockDateAfter="24-02-2023"
></bm-datepicker>
```

## I want two datepickers - like "From Date" and "To Date", is that possible?
Of course! This is not a tiny lite version! This is the real deal!
I assume that you have read through the documentation, because this tutorial needs some basic knownledge. 

In this tutorial you will learn how to use two datepickers - a "From Date" and a "To Date".
The "From Date" will be responsable for locking `lockDateBefore` inside "To Date" and the "To Date" will be responsable for locking `lockDateAfter` inside "From Date". 

Why? 

Because it will prevent "From Date" to be selected later than "To Date" and vice versa. 

Also - "From Date" will be locked before current date. 

### 1. Set up the HTML 
It is important to use square brackets `[]` though the values will be dynamic. 
There will also need the callback function `calendarOutput` that will be used in the component. 
```html
<bm-datepicker 
    label="From Date"
    pattern="dd-mm-yyyy"
    [lockDateAfter]="lockDateAfterValue"
    [selectedDate]="selectedFromDateValue"
    (calendarOutput)="lockDateBefore($event)"
></bm-datepicker>
<bm-datepicker 
    label="To Date"
    pattern="dd-mm-yyyy"
    [lockDateBefore]="lockDateBeforeValue"
    [selectedDate]="selectedToDateValue"
    (calendarOutput)="lockDateAfter($event)"
></bm-datepicker>
```

### 2. Set up the component
In the component we need variables to hold the dates and functions to receive callbacks from the datepicker.  
```javascript
lockDateAfterValue: string = ""
lockDateBeforeValue: string = ""
selectedFromDateValue: string = ""
selectedToDateValue: string = ""

lockDateBefore(event:any){
    this.lockDateBeforeValue = event.selectedDate
}
lockDateAfter(event:any){
    this.lockDateAfterValue = event.selectedDate
}
```

### 3. Pre-define dates
You can also pre-define dates from, for example, a database. Use the variables in the component to set values:
```javascript
lockDateAfterValue: string = "24-02-2023"
lockDateBeforeValue: string = "15-02-2023"
selectedFromDateValue: string = "24-02-2023"
selectedToDateValue: string = "20-02-2023"
```

### 4. Lock both calendars from current date
So this works fine. But what about limit the before date to current date in both calendars?
The "To Date" calendar is just fine, as it is, but if we use the dynamic option of `[lockDateBefore]` inside the "From Date"...
```html
<bm-datepicker 
    label="From Date"
    pattern="dd-mm-yyyy"
    [lockDateAfter]="lockDateAfterValue"
    [lockDateBefore]="lockDateBeforeValue"
    [selectedDate]="selectedFromDateValue"
    (calendarOutput)="lockDateBefore($event)"
></bm-datepicker>
```
...There will only be trouble. The problem is that the value will change everytime everytime we select a new date. We can always select forward, but never backwards. How to solve this - it is simple. Add a new variable in the component that won't be updated at all:
```javascript
constantLockDateBeforeValue: string = "23-02-2023"
```
And add it to the `[lockDateBefore]` in "From Date":
```html
<bm-datepicker 
    label="From Date"
    pattern="dd-mm-yyyy"
    [lockDateBefore]="constantLockDateBeforeValue"
    [lockDateAfter]="lockDateAfterValue"
    [selectedDate]="selectedFromDateValue"
    (calendarOutput)="lockDateBefore($event)"
></bm-datepicker>
```
Done!

### 5. Test, tweak and test again!
That's it! Now it's up to you! Good luck!

# Author
Steffo Dimfelt
[steffo.dimfelt@gmail.com](mailto:steffo.dimfelt@gmail.com)

# Version list
- 1.0.2: Update peerDependencies
- 1.0.1: Bug fixes
- 1.0.0: Initial setup
