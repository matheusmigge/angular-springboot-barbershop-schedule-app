import { Routes } from '@angular/router';
import { NewClientComponent } from './pages/new-client/new-client.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

export const routes: Routes = [
    { path: 'clients/new-client', component: NewClientComponent, data: { title: 'Migge - Cadastrar Cliente' } },
    { path: 'clients/list', component: ClientsComponent, data: { title: 'Migge - Clientes Cadastrados' } },
    { path: 'schedules', component: ScheduleComponent, data: { title: 'Migge - Agendamentos' } },
    { path: '**', redirectTo: 'schedules' }
];
