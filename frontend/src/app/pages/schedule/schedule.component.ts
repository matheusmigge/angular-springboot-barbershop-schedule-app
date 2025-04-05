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
import { ScheduleService } from '../../services/schedule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from '../../models/schedule.models';

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
  clientId = new FormControl<number | null>(null, [Validators.required]);
  calendarDate!: Date | null;
  startTime = new FormControl<Date | null>(null, [Validators.required]);
  endTime = new FormControl<Date | null>(null, [Validators.required]);
  formControl = new FormControl<Date | null>(null);
  scheduleId: number | null = null;

  readonly openingTime = { hours: 8, minutes: 0 };
  readonly closingTime = { hours: 18, minutes: 0 };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.scheduleId = +params['id'];
        this.loadScheduleData(this.scheduleId);
      }
    });

    this.http.get<Client[]>(`${environment.apiUrl}/clients`).subscribe((data) => {
      this.clients = data;
    });
  }

  loadScheduleData(id: number): void {   
    this.http.get<Schedule>(`${environment.apiUrl}/schedules/${id}`).subscribe((schedule) => {
      this.clientId.setValue(schedule.client.id);
      this.calendarDate = new Date(schedule.startAt);
      this.startTime.setValue(new Date(schedule.startAt));
      this.endTime.setValue(new Date(schedule.endAt));
    });
  }

  getTimeFormatted(hours: number, minutes: number): string {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  getClientErrorMessage(): string {
    if (this.clientId.hasError('required')) {
      return 'O cliente é obrigatório';
    }
    return '';
  }

  getTimeErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'O horário é obrigatório';
    }
    if (control.hasError('matTimepickerParse')) {
      return 'O valor inserido não é um horário válido';
    }
    if (control.hasError('matTimepickerMin')) {
      return 'O horário selecionado é muito cedo';
    }
    if (control.hasError('matTimepickerMax')) {
      return 'O horário selecionado é muito tarde';
    }
    return '';
  }

  isTimeWithinRange(time: Date | null): boolean {
    if (!time) return false;

    const selectedTime = new Date(time);
    const opening = new Date();
    const closing = new Date();

    opening.setHours(this.openingTime.hours, this.openingTime.minutes, 0, 0);
    closing.setHours(this.closingTime.hours, this.closingTime.minutes, 0, 0);

    return selectedTime >= opening && selectedTime <= closing;
  }

  saveSchedule(): void {
    if (!this.calendarDate) {
      alert('Por favor, selecione uma data no calendário.');
      return;
    }

    if (!this.isTimeWithinRange(this.startTime.value)) {
      alert(
        `O horário de início deve estar entre ${this.openingTime.hours.toString().padStart(2, '0')}:${this.openingTime.minutes.toString().padStart(2, '0')} e ${this.closingTime.hours.toString().padStart(2, '0')}:${this.closingTime.minutes.toString().padStart(2, '0')}.`
      );
      console.log(this.startTime.value);
      return;
    }

    if (!this.isTimeWithinRange(this.endTime.value)) {
      alert(
        `O horário de término deve estar entre ${this.openingTime.hours.toString().padStart(2, '0')}:${this.openingTime.minutes.toString().padStart(2, '0')} e ${this.closingTime.hours.toString().padStart(2, '0')}:${this.closingTime.minutes.toString().padStart(2, '0')}.`
      );
      console.log(this.endTime.value);
      
      return;
    }

    if (this.startTime.value && this.endTime.value && this.endTime.value <= this.startTime.value) {
      alert('O horário de término não pode ser anterior ou igual ao horário de início.');
      return;
    }

    if (this.calendarDate && this.startTime.valid && this.endTime.valid && this.clientId.valid) {
      const startAt = new Date(this.calendarDate);
      const endAt = new Date(this.calendarDate);

      startAt.setHours(this.startTime.value!.getHours(), this.startTime.value!.getMinutes(), 0, 0);
      endAt.setHours(this.endTime.value!.getHours(), this.endTime.value!.getMinutes(), 0, 0);

      const scheduleData = {
        clientId: this.clientId.value,
      startAt: startAt.toISOString(), // Envia como UTC
      endAt: endAt.toISOString(),     // Envia como UTC
      };

      if (this.scheduleId) {
        this.http.put(`${environment.apiUrl}/schedules/${this.scheduleId}`, scheduleData).subscribe({
          next: () => {
            alert('Agendamento atualizado com sucesso!');
            this.scheduleService.notifyTableRefresh();
            this.router.navigate(['/schedules']);
          },
          error: () => alert('Erro ao atualizar o agendamento.'),
        });
      } else {
        this.http.post(`${environment.apiUrl}/schedules`, scheduleData).subscribe({
          next: () => {
            alert('Agendamento salvo com sucesso!');
            this.scheduleService.notifyTableRefresh();
            this.clearForm();
          },
          error: () => alert('Erro ao salvar o agendamento.'),
        });
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  clearForm(): void {
    this.clientId.reset(null);
    this.calendarDate = null;
    this.startTime.reset(null);
    this.endTime.reset(null);
    this.scheduleId = null; 
  }
}