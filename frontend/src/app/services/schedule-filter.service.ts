import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleFilterService {
  private selectedDateSubject = new BehaviorSubject<Date | null>(null);
  selectedDate$ = this.selectedDateSubject.asObservable();

  updateSelectedDate(date: Date | null): void {
    this.selectedDateSubject.next(date);
  }
}