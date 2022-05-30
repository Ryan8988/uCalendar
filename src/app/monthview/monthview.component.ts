import { Component, OnInit } from '@angular/core';
import {CalendarDay} from '../shared/models/calendarDay.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddEventDialogComponent} from '../shared/add-event-dialog/add-event-dialog.component';

@Component({
  selector: 'app-monthview',
  templateUrl: './monthview.component.html',
  styleUrls: ['./monthview.component.css']
})
export class MonthviewComponent implements OnInit {
  calendar: CalendarDay[] = [];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  displayMonth: string;
  displayYear: number;
  monthIndex = 0;
  constructor(public dialog: MatDialog) {
    this.generateCalendarDays(this.monthIndex);
  }

  ngOnInit(): void {

  }

  generateCalendarDays(monthIndex: number): void {
    this.calendar = [];
    // If a parameter is outside of the expected range, setMonth() attempts to update the date information in the Date object accordingly.
    // For example, if you use 15 for monthValue, the year will be incremented by 1, and 3 will be used for month.
    const day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    this.displayMonth = this.monthNames[day.getMonth()];
    this.displayYear = day.getFullYear();
    const startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (let i = 0; i < 35; i++) {
      if (i === 15 || i === 10) {
        const createEvent = [{
          startDay: new Date(dateToAdd),
          endDay: new Date(dateToAdd),
          date: new Date(dateToAdd),
          startTime: '11:00 AM',
          endTime: '11:30 AM',
          title: 'Dr.appt',
          description: 'I will OOO for doctor appointment today',
          color: '#7987cb',
          location: {
            Address: {
              StreetAddress: '1 Independence Way',
              City: 'Princeton',
              State: 'NJ',
              StateName: 'New Jersey',
              Zip: '08540',
              County: 'Mercer',
              Country: 'US',
              CountryFullName: 'United States',
              SPLC: null
            },
            Coords: {
              Lat: '40.361007',
              Lon: '-74.599268'
            },
            Region: 4,
            POITypeID: 1128,
            PersistentPOIID: 2014,
            SiteID: -1,
            ResultType: 10,
            ShortString: 'Trimble MAPS, 1 Independence Way, Princeton, NJ, US, Mercer 08540'
          },
          allDay: false
        }, {
          startDay: new Date(dateToAdd),
          endDay: new Date(dateToAdd),
          date: new Date(dateToAdd),
          startTime: '03:00 PM',
          endTime: '04:00 PM',
          title: 'Wait',
          description: 'Wake up',
          color: 'blue',
          allDay: false
        }];
        this.calendar.push(new CalendarDay(new Date(dateToAdd), createEvent));
      } else {
        this.calendar.push(new CalendarDay(new Date(dateToAdd), []));
      }
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
    // make sure to include the whole month in the view
    if (this.displayMonth === this.monthNames[dateToAdd.getMonth()]) {
      for (let i = 0; i < 7; i++) {
        this.calendar.push(new CalendarDay(new Date(dateToAdd), []));
        dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
      }
    }
  }

  getStartDateForCalendar(selectedDate: Date): Date{
    // If 0 is provided for dayValue, the date will be set to the last day of the previous month.
    const lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;
    // find the last Monday of previous month
    while (startingDateOfCalendar.getDay() !== 1) {
      startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
    }
    return startingDateOfCalendar;
  }

  nextMonth(): void {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  previousMonth(): void {
    this.monthIndex--;
    this.generateCalendarDays(this.monthIndex);
  }

  getCurrentDay(): void {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  addEvent(day): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.autoFocus = false;
    dialogConfig.data =  {
      action: 'add',
      appt: day
    };
    const dialogRef = this.dialog.open(AddEventDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (!result) {
        return;
      }
      this.displayApptInCalendar(result.toAdd);
    });


  }

  editEvent(event, $event): void {
    console.log(event);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      action: 'edit',
      appt: event
    };
    const dialogRef = this.dialog.open(AddEventDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (!result) {
        return;
      }
      this.displayApptInCalendar(result.toAdd, result.toRemove);
    });
    $event.stopPropagation();
  }

  displayApptInCalendar(result, toRemove?): void {
    if (!result) {
      return;
    }
    if (result) {
      if (result.allDay) { // for multiple days
        let startIndex = -1;
        let endIndex = -1;
        let removeStartIndex = -1;
        let removeEndIndex = -1;
        this.calendar.forEach((item, index) => {
          if (item.date.toDateString() === result.startDay.toDateString()) {
            startIndex = index;
          }
          if (item.date.toDateString() === result.endDay.toDateString()) {
            endIndex = index;
          }
          if (toRemove && item.date.toDateString() === toRemove.startDay.toDateString()) {
            removeStartIndex = index;
          }
          if (toRemove && item.date.toDateString() === toRemove.endDay.toDateString()) {
            removeEndIndex = index;
          }
        });
        if (toRemove) {
          for (let i = removeStartIndex; i <= removeEndIndex; i++) {
            const newEvent = this.calendar[i].event.map((el) => {
              if (el.title === toRemove.title) {
                return {};
              } else {
                return el;
              }
            });
            this.calendar[i].event = newEvent;
          }
        }
        let height = 0;
        for (let i = startIndex; i <= endIndex; i++) {
          height = Math.max(height, this.calendar[i].event.length);
        }
        console.log('height ====', height);
        for (let i = startIndex; i <= endIndex; i++) {
          for (let j = 0; j <= height; j++) {
            if (j === height) {
              this.calendar[i].event.push({
                title: result.apptTitle,
                allDay: result.allDay,
                startDay: result.startDay,
                endDay: result.endDay,
                date: this.calendar[i].date,
                description: result.description,
                location: result.location,
                color: result.color
              });
            } else {
              if (!this.calendar[i].event[j]) { // exclude existing event
                this.calendar[i].event.push({});
              }
            }
          }
        }
      } else { // for single day
        let tgtIndex = -1;
        let removeStartIndex = -1;
        let removeEndIndex = -1;
        this.calendar.forEach((item, index) => {
          if (item.date.toDateString() === result.singleDay.toDateString()) {
            tgtIndex = index;
          }
          if (toRemove && item.date.toDateString() === toRemove.startDay.toDateString()) {
            removeStartIndex = index;
          }
          if (toRemove && item.date.toDateString() === toRemove.endDay.toDateString()) {
            removeEndIndex = index;
          }
        });
        if (toRemove) {
          for (let i = removeStartIndex; i <= removeEndIndex; i++) {
            //const newEvent = this.calendar[i].event.filter(el => el.title !== toRemove.title);
            //this.calendar[i].event = newEvent;
            const newEvent = this.calendar[i].event.map((el) => {
              if (el.title === toRemove.title) {
                return {};
              } else {
                return el;
              }
            });
            this.calendar[i].event = newEvent;
          }
        }
        this.calendar[tgtIndex].event.push({
          title: result.apptTitle,
          allDay: result.allDay,
          startDay: result.singleDay,
          endDay: result.singleDay,
          date: result.singleDay,
          description: result.description,
          location: result.location,
          startTime: result.startTime,
          endTime: result.endTime,
          color: result.color
        });
        this.calendar[tgtIndex].event.sort((a, b) => Date.parse('1970/01/01 ' + a.startTime) - Date.parse('1970/01/01 ' + b.startTime));
      }
      console.log(this.calendar);
    }
  }

}
