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
        time: '4:00 pm',
        title: 'Dr.appt'
      }, {
        time: '4:30 pm',
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

  increaseMonth(): void {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  decreaseMonth(): void {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
  }

  setCurrentMonth(): void {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  addEvent(i, j): void {
    const index = i * 7 + j;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '30%';
    dialogConfig.autoFocus = false;
    dialogConfig.data = this.calendar[index];
    const dialogRef = this.dialog.open(AddEventDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });


  }

  editEvent(event, $event) {
    console.log(event);
    $event.stopPropagation();
  }
}
