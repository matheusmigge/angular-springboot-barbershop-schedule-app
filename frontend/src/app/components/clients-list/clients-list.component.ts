import { Component } from '@angular/core';
import { BannerComponent } from "../banner/banner.component";
import { TableComponent } from '../clients-table/clients-table.component';

@Component({
  selector: 'app-clients-list',
  imports: [BannerComponent, TableComponent],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css'
})
export class ClientsListComponent {

}
