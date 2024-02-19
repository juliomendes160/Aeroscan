import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pista',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pista.component.html',
  styleUrl: './pista.component.css'
})
export class PistaComponent {

  @ViewChild('pistaNgForm') pistaNgForm!: NgForm;

  id: any;

  nome: any; tamanho:any; boxes: any; lugares: any;

  cep: any; logradouro: any; complemento:any; numero: any; bairro: any; cidade: any; estado: any;

  pistas: any;

  constructor(private http: HttpClient) {}

  pesquisar() {
    
    switch(true){
      case !this.cep:{
        console.log('Operação pesquisar: cep obrigatório!');
        alert('Operação pesquisar: cep obrigatório!');
        return;
      }
      case !this.cep.match(/^[0-9]{5}-?[0-9]{3}$/):{
        console.log('Operação pesquisar: cep inválido!');
        alert('Operação pesquisar: cep inválido!');
        return;
      }
    }

    this.cep = this.cep.replace('-','');

    this.http.get<any>(`https://viacep.com.br/ws/${this.cep}/json/`)
    .subscribe({
      next: (response) => {
        if (response) {
            this.cep = response.cep;
            this.logradouro = response.logradouro;
            this.complemento = response.complemento;
            this.numero;
            this.bairro = response.bairro;
            this.cidade = response.localidade;
            this.estado = response.uf;
        }else{
          alert("Sucesso operação pesquisar: sem dados para exibir!");
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  salvar() {
    this.http.post<any>('http://localhost:3000/pista', this.pistaNgForm.value)
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
    this.http.get<any>('http://localhost:3000/pistas')
      .subscribe({
        next: (response) => {
          if (response.length) {
            this.pistas = response;
          }else{
             alert("Sucesso operação listar: sem dados para exibir!");
          }
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

    this.http.get<any>(`http://localhost:3000/pista/${this.id}`)
    .subscribe({
      next: (response) => {
        if (response) {
            this.id = response._id;
            this.nome = response.nome;
            this.tamanho = response.tamanho;
            this.boxes = response.boxes;
            this.lugares = response.lugares;

            this.cep = response.endereco.cep;
            this.logradouro = response.endereco.logradouro;
            this.complemento = response.endereco.complemento;
            this.numero = response.endereco.numero;
            this.bairro = response.endereco.bairro;
            this.cidade = response.endereco.cidade;
            this.estado = response.endereco.estado;
        }else{
          alert("Resposta: Sucesso operação consultar: sem dados para exibir!");
        }
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

    this.http.put<any>(`http://localhost:3000/pista/${this.id}`, this.pistaNgForm.value)
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

    this.http.delete<any>(`http://localhost:3000/pista/${this.id}`)
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
    this.pistaNgForm.resetForm();
    this.pistas = undefined;
  }
}
