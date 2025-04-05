import { Component, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { BannerComponent } from "../../components/banner/banner.component";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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
  readonly phone = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)
  ]);

  errorMessage = signal('');
  
  clientId: number | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.clientId = +params['id'];
        this.loadClientData(this.clientId);
      }
    });
  }

  loadClientData(id: number): void {
    this.http.get(`${environment.apiUrl}/clients/${id}`).subscribe((client: any) => {
      this.name.setValue(client.name);
      this.email.setValue(client.email);
      this.phone.setValue(client.phone);
    });
  }

  getNameErrorMessage() {
    if (this.name.hasError('required')) return 'O nome é obrigatório';
    return '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Preenchimento obrigatório');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('E-mail inválido');
    } else {
      this.errorMessage.set('');
    }
  }

  getPhoneErrorMessage() {
    if (this.phone.hasError('required')) return 'O número é obrigatório';
    if (this.phone.hasError('pattern')) return 'O número de estar no formato (XX) XXXXX-XXXX';
    return '';
  }

  saveClient(): void {
    if (this.name.valid && this.email.valid && this.phone.valid) {
      const clientData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value
      };

      if (this.clientId) {

        this.http.put(`${environment.apiUrl}/clients/${this.clientId}`, clientData).subscribe({
          next: () => {
            alert('Cliente atualizado com sucesso!');
            this.router.navigate(['/clients/list']);
          },
          error: () => alert('Erro ao atualizar cliente.'),
        });
      } else {
        this.http.post(`${environment.apiUrl}/clients`, clientData).subscribe({
          next: () => {
            alert('Cliente cadastrado com sucesso!');
            this.router.navigate(['/clients/list']);
          },
          error: () => alert('Erro ao cadastrar cliente.'),
        });
      }
    } else {
      alert('Por favor, revise todos os campos e tente novamente.');
    }
  }
}
