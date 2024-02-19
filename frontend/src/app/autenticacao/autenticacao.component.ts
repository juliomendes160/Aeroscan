import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-autenticacao',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './autenticacao.component.html',
  styleUrl: './autenticacao.component.css'
})
export class AutenticacaoComponent {

  @ViewChild('kartNgForm') auteticacaoNgForm!: NgForm;

  usuario: any;
  senha: any;

  constructor(private http: HttpClient) {}

  login(){
    this.http.post<any>('http://localhost:3000/autenticacao', this.auteticacaoNgForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);

          // Armazenar o token de autenticação no localStorage
          localStorage.setItem('token', response.token);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
