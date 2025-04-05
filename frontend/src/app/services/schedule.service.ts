import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private refreshTableSubject = new Subject<void>();

  refreshTable$ = this.refreshTableSubject.asObservable();

  notifyTableRefresh(): void {
    this.refreshTableSubject.next();
  }
}