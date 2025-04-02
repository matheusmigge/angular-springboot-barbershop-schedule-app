import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { BannerComponent } from "../banner/banner.component";
import { TableComponent } from "../table/table.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import {MatTimepickerModule} from '@angular/material/timepicker';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-schedule',
  imports: [BannerComponent, TableComponent, MatCardModule, MatDatepickerModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatTimepickerModule,MatButtonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent {
  selected = model<Date | null>(null);
  selectedValue: string = "";
}