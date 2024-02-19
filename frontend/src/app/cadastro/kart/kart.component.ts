import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-kart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './kart.component.html',
  styleUrl: './kart.component.css'
})
export class KartComponent {

  @ViewChild('kartNgForm') kartNgForm!: NgForm;

  id: any;

  nome: any; marca: any; modelo: any; potencia: any; pneus: any; status: any;

  karts: any;

  constructor(private http: HttpClient) {}

  salvar() {
    this.http.post<any>('http://localhost:3000/kart', this.kartNgForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        }
    });
  }

  listar() {
    this.http.get<any>('http://localhost:3000/karts')
      .subscribe({
        next: (response) => {
          if (!response.length) {
            alert("Sucesso operação listar: sem dados para exibir!");
            return;
          }
          this.karts = response;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  consultar() {
    
    if(!this.id){
      console.log('Operação consultar: id obrigatório!');
      alert('Operação consultar: id obrigatório!');
      return;
    }

    this.http.get<any>(`http://localhost:3000/kart/${this.id}`)
    .subscribe({
      next: (response) => {

        if(!response){
          alert("Resposta: Sucesso operação consultar: sem dados para exibir!");
          return;
        }

        this.id = response._id;
        this.nome = response.nome;
        this.marca = response.marca;
        this.modelo = response.modelo;
        this.potencia = response.potencia;
        this.pneus = response.pneus;
        this.status = response.status;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  atualizar(){
    if(!this.id){
      console.log('Operação consultar: id obrigatório!');
      alert('Operação consultar: id obrigatório!');
      return;
    }

    this.http.put<any>(`http://localhost:3000/kart/${this.id}`, this.kartNgForm.value)
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  excluir() {
    if(!this.id){
      console.log('Operação consultar: id obrigatório!');
      alert('Operação consultar: id obrigatório!');
      return;
    }

    this.http.delete<any>(`http://localhost:3000/kart/${this.id}`)
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
    this.kartNgForm.resetForm();
    this.karts = undefined;
  }
  
}
