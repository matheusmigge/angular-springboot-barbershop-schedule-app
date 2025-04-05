import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../../models/client.models';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  styleUrl: './clients-table.component.css',
  templateUrl: './clients-table.component.html',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private router: Router, private http: HttpClient) {

    this.dataSource = new MatTableDataSource<Client>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadClients();
  }

  loadClients() {
    this.http.get<Client[]>(`${environment.apiUrl}/clients`).subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  updateClient(client: any): void {
    this.router.navigate(['/new-client', client.id]);
  }

  deleteClient(client: Client) {
    if (confirm(`Tem certeza de que deseja excluir o cliente "${client.name}" e todos os seus agendamentos?`)) {
      this.http.delete(`${environment.apiUrl}/clients/${client.id}`).subscribe({
        next: () => {
          alert('Cliente e seus agendamentos foram excluídos com sucesso!');
          this.loadClients();
        },
        error: (err) => {
          if (err.status === 404) {
            alert('Erro: Cliente não encontrado.');
          } else {
            alert('Erro ao excluir o cliente.');
          }
        },
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}