import { Routes } from '@angular/router';
import { NewClientComponent } from './pages/new-client/new-client.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

export const routes: Routes = [
    { path: 'clients/new-client', component: NewClientComponent, data: { title: 'Cadastrar cliente' } },
    { path: 'new-client/:id', component: NewClientComponent, data: { title: 'Editar cliente' }  },
    { path: 'clients/list', component: ClientsComponent, data: { title: 'Clientes cadastrados' } },
    { path: 'schedules', component: ScheduleComponent, data: { title: 'Agendamentos' } },
    { path: '**', redirectTo: 'schedules' }
];
