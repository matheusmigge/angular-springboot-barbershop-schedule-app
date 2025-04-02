import { Routes } from '@angular/router';
import { NewClientComponent } from './components/new-client/new-client.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

export const routes: Routes = [
    { path: 'clients/new-client', component: NewClientComponent, data: { title: 'Barbearia Migge - Cadastrar Cliente' } },
    { path: 'clients/list', component: ClientsListComponent, data: { title: 'Barbearia Migge - Clientes Cadastrados' } },
    { path: 'schedules', component: ScheduleComponent, data: { title: 'Barbearia Migge - Agendamentos' } },
    { path: '**', redirectTo: 'schedules' }
];
