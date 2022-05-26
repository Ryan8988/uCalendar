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
      const createEvent = [{
        startTime: '4:00 pm',
        endTime: '4:30 pm',
        title: 'Dr.appt'
      }, {
        startTime: '4:30 pm',
        endTime: '5:30 pm',
        title: 'test'
      }]
      if (i === 5 || i === 10) {
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
    dialogConfig.data = day;
    const dialogRef = this.dialog.open(AddEventDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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
            });
          }
        } else { // for single day
          let tgtIndex = -1;
          this.calendar.forEach((item, index) => {
            if (item.date.toDateString() === result.singleDay.toDateString()) {
              tgtIndex = index;
            }
          })
          console.log(tgtIndex);
          this.calendar[tgtIndex].event.push({
            title: result.apptTitle,
            startTime: result.startTime,
            endTime: result.endTime,
            description: result.description
          });
          this.calendar[tgtIndex].event.sort((a,b) => Date.parse('1970/01/01 ' + a.startTime) - Date.parse('1970/01/01 ' + b.startTime));
        }
        console.log(this.calendar);
      }
    });


  }

  editEvent(event, $event) {
    console.log(event);
    $event.stopPropagation();
  }
}
