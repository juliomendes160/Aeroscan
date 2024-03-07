import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AutenticacaoService } from './autenticacao.service';

@Component({
  selector: 'app-autenticacao',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  providers: [AutenticacaoService],
  templateUrl: './autenticacao.component.html',
  styleUrl: './autenticacao.component.css'
})
export class AutenticacaoComponent {

  private readonly url = 'http://localhost:3000/autenticacao'

  autenticacao:FormGroup;

  constructor(private http: HttpClient, private service: AutenticacaoService, private FormBuilder: FormBuilder) {
    this.autenticacao = this.FormBuilder.group({
      usuario: [''],
      senha: [''],
    })
  }

  login(){
    this.http.post(`${this.url}/login`, this.autenticacao.value)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.toString());
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  logout(){
    localStorage.removeItem('token');
  }

  register(){
    this.http.post(`${this.url}/register`, this.autenticacao.value, {headers: this.service.getHeaders()})
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  limpar() {
    this.autenticacao.reset();
  }
}
