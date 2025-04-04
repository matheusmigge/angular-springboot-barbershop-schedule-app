import { Component } from '@angular/core';
import { BannerComponent } from "../../components/banner/banner.component";
import { TableComponent } from '../../components/tables/clients-table/clients-table.component';

@Component({
  selector: 'app-clients',
  imports: [BannerComponent, TableComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

}
