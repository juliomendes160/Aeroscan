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

  
  @ViewChild('auteticacaoNgForm') auteticacaoNgForm!: NgForm;

  usuario: any;
  senha: any;

  constructor(private http: HttpClient) {}

  // constructor(private authService: AuthService) {}

  register(){
    this.http.post<any>('http://localhost:3000/autenticacao/register', this.auteticacaoNgForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  login(){
    this.http.post<any>('http://localhost:3000/autenticacao/login', this.auteticacaoNgForm.value)
      .subscribe({
        
        next: (response) => {
          
          if(!response){
            alert(response);
            return;
          }
          localStorage.setItem('token', response);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  logout(){
    localStorage.removeItem('token');
  }

  token(){
    debugger;
    const token = localStorage.getItem('token');
    if (token) {
      this.http.post<any>('http://localhost:3000/autenticacao/token', {}, {
        headers: {
          Authorization: token
        }
      }).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Token não encontrado no localStorage.');
    }
  }

  limpar() {
    this.auteticacaoNgForm.resetForm();
  }
}
