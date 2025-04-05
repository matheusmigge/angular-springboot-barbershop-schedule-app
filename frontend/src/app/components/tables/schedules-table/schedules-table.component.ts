import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../../../models/schedule.models';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-schedules-table',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatIconModule, CommonModule],
  templateUrl: './schedules-table.component.html',
  styleUrl: './schedules-table.component.css'
})
export class SchedulesTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'phone', 'startAt', 'endAt', 'actions'];
  dataSource: MatTableDataSource<Schedule>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private http: HttpClient) {

    this.dataSource = new MatTableDataSource<Schedule>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.http.get<Schedule[]>(`${environment.apiUrl}/schedules`).subscribe(data => {
      this.dataSource.data = data;
    });

    this.dataSource.filterPredicate = (data: Schedule, filter: string) => {
      const normalizedFilter = filter.trim().toLowerCase();
      return (
        data.client.name.toLowerCase().includes(normalizedFilter) ||
        data.client.phone.toLowerCase().includes(normalizedFilter) ||
        data.startAt.toString().toLowerCase().includes(normalizedFilter) ||
        data.endAt.toString().toLowerCase().includes(normalizedFilter)
      );
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshTable(): void {
    this.http.get<Schedule[]>(`${environment.apiUrl}/schedules`).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  deleteSchedule(schedule: Schedule): void {
    if (confirm(`Tem certeza de que deseja excluir o agendamento de ${schedule.client.name}?`)) {
      this.http.delete(`${environment.apiUrl}/schedules/${schedule.id}`).subscribe({
        next: () => {
          alert('Agendamento excluído com sucesso!');
          this.refreshTable();
        },
        error: () => {
          alert('Erro ao excluir o agendamento.');
        },
      });
    }
  }
}