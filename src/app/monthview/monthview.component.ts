import { Component, OnInit } from '@angular/core';
import {CalendarDay} from '../shared/models/calendarDay.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddEventDialogComponent} from '../shared/add-event-dialog/add-event-dialog.component';
import {EditEventDialogComponent} from "../shared/edit-event-dialog/edit-event-dialog.component";

@Component({
  selector: 'app-monthview',
  templateUrl: './monthview.component.html',
  styleUrls: ['./monthview.component.css']
})
export class MonthviewComponent implements OnInit {
  public calendar: CalendarDay[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  public displayMonth: string;
  private monthIndex = 0;
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

    const startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (let i = 0; i < 35; i++) {
      if (i === 15 || i === 10) {
        const createEvent = [{
          startDay: new Date(dateToAdd),
          endDay: new Date(dateToAdd),
          date: new Date(dateToAdd),
          startTime: '04:00 PM',
          endTime: '04:30 PM',
          title: 'Dr.appt',
          description: 'I will OOO for doctor appointment today',
          allDay: false
        }, {
          startDay: new Date(dateToAdd),
          endDay: new Date(dateToAdd),
          date: new Date(dateToAdd),
          startTime: '01:00 AM',
          endTime: '02:30 AM',
          title: 'Wait',
          description: 'Wake up',
          allDay: false
        }]
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
    }
    const dialogRef = this.dialog.open(AddEventDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.displayApptInCalendar(result.toAdd, result.toRemove);
    })
    $event.stopPropagation();
  }

  displayApptInCalendar(result, toRemove?): void {
    if (!result) {
      return;
    }
    if (result) {
      if (result.allDay) { // for multiple days
        let startIndex = -1, endIndex = -1;
        this.calendar.forEach((item, index) => {
          if (item.date.toDateString() === result.startDay.toDateString()) {
            startIndex = index;
          }
          if (item.date.toDateString() === result.endDay.toDateString()) {
            endIndex = index;
          }
        })
        console.log('startIndex ==', startIndex + '-------endIndex ===', endIndex);
        for (let i = startIndex; i <= endIndex; i++) {
          this.calendar[i].event.push({
            title: result.apptTitle,
            allDay: result.allDay
          });
        }
      } else { // for single day
        let tgtIndex = -1, removeIndex = -1;
        this.calendar.forEach((item, index) => {
          if (item.date.toDateString() === result.singleDay.toDateString()) {
            tgtIndex = index;
          }
          if (toRemove && item.date.toDateString() === toRemove.date.toDateString()) {
            removeIndex = index;
          }
        })
        if (toRemove) {
          let newEvent = this.calendar[removeIndex].event.filter(el => el.title !== toRemove.title);
          this.calendar[removeIndex].event = newEvent;
        }
        this.calendar[tgtIndex].event.push({
          title: result.apptTitle,
          startTime: result.startTime,
          endTime: result.endTime,
          description: result.description,
          allDay: result.allDay,
          startDay: result.startDay,
          endDay: result.endDay,
          date: result.singleDay
        });
        this.calendar[tgtIndex].event.sort((a,b) => Date.parse('1970/01/01 ' + a.startTime) - Date.parse('1970/01/01 ' + b.startTime));
      }
      console.log(this.calendar);
    }
  }
}
