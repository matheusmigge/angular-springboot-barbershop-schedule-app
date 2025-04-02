import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { NewClientComponent } from "./components/new-client/new-client.component";
import { ClientsListComponent } from "./components/clients-list/clients-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NewClientComponent, ClientsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
