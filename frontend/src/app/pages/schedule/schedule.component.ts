import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { BannerComponent } from "../../components/banner/banner.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SchedulesTableComponent } from "../../components/tables/schedules-table/schedules-table.component";
import { environment } from '../../../environments/environment';
import { Client } from '../../models/client.models';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule, BannerComponent, MatCardModule, MatDatepickerModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatTimepickerModule, MatButtonModule, SchedulesTableComponent, ReactiveFormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent {
  clients: any[] = [];
  selectedValue!: number;
  selected!: Date | null;
  startTime = new FormControl<Date | null>(null, [Validators.required]);
  endTime = new FormControl<Date | null>(null, [Validators.required]);

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<Client[]>(`${environment.apiUrl}/clients`).subscribe(data => {
      this.clients = data;
    });
  }

  saveSchedule(): void {
    if (this.selected && this.startTime.valid && this.endTime.valid && this.selectedValue) {
      const startAt = new Date(this.selected);
      const endAt = new Date(this.selected);

      startAt.setHours(this.startTime.value!.getHours(), this.startTime.value!.getMinutes(), 0, 0);
      endAt.setHours(this.endTime.value!.getHours(), this.endTime.value!.getMinutes(), 0, 0);

      const newSchedule = {
        clientId: this.selectedValue,
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString()
      };

      this.http.post(`${environment.apiUrl}/schedules`, newSchedule).subscribe({
        next: () => alert('Agendamento salvo com sucesso!'),
        error: () => alert('Erro ao salvar o agendamento.')
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}