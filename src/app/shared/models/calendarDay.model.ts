import {CalendarEvent} from './calendarEvent.model';

export class CalendarDay {
  public date: Date;
  public isPastDate: boolean;
  public isToday: boolean;
  public event: CalendarEvent[];

  constructor(d: Date, event: CalendarEvent[]) {
    this.date = d;
    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
    this.event = event;
  }
}
