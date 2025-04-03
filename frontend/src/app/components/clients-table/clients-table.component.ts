import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-table',
  styleUrl: './clients-table.component.css',
  templateUrl: './clients-table.component.html',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone'];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  private clients: Client[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '555-123-4567' },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', phone: '444-987-6543' },
    { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com', phone: '333-222-1111' },
  ];

  constructor(private http: HttpClient) {

    this.dataSource = new MatTableDataSource<Client>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.http.get<Client[]>('/assets/data/clients.json').subscribe(data => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}