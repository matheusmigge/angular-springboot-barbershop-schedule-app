import { Component, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { BannerComponent } from "../banner/banner.component";

@Component({
  selector: 'app-new-client',
  imports: [
    MatInputModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,
    BannerComponent
],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.css'
})
export class NewClientComponent {
  readonly name = new FormControl('', [Validators.required]);

  readonly email = new FormControl('', [Validators.required, Validators.email]);

  phone = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)
  ]);

  errorMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Preenchimento obrigatório');
    } else if (this.email.hasError('mail')) {
      this.errorMessage.set('E-mail inválido');
    } else {
      this.errorMessage.set('');
    }
  }

  getNameErrorMessage() {
    if (this.name.hasError('required')) return 'O nome é obrigatório';
    return '';
  }

  getPhoneErrorMessage() {
    if (this.phone.hasError('required')) return 'O número é obrigatório';
    if (this.phone.hasError('pattern')) return 'O número de estar no formato (XX) XXXXX-XXXX';
    return '';
  }
}
