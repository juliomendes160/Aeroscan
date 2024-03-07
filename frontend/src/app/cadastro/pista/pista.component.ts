import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-pista',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './pista.component.html',
  styleUrl: './pista.component.css'
})
export class PistaComponent {

  private readonly path = '/pista/'

  pista: FormGroup;

  pistas: FormGroup;

  constructor(private http: HttpClient, private FormBuilder: FormBuilder) {
    this.pista = this.FormBuilder.group({
      _id: [''], nome: [''],  tamanho: [''],  boxes: [''],  lugares: [''],
      
      endereco: this.FormBuilder.group({
        cep: [''],  logradouro: [''],  complemento: [''],  numero: [''],  bairro: [''],  cidade: [''],  estado: [''],
      }),
    });

    this.pistas = this.FormBuilder.group([]);
  }

  pesquisar() {
    
  //   switch(true){
  //     case !this.cep:{
  //       console.log('Operação pesquisar: cep obrigatório!');
  //       alert('Operação pesquisar: cep obrigatório!');
  //       return;
  //     }
  //     case !this.cep.match(/^[0-9]{5}-?[0-9]{3}$/):{
  //       console.log('Operação pesquisar: cep inválido!');
  //       alert('Operação pesquisar: cep inválido!');
  //       return;
  //     }
  //   }

  //   this.cep = this.cep.replace('-','');

  //   this.http.get<any>(`https://viacep.com.br/ws/${this.cep}/json/`)
  //   .subscribe({
  //     next: (response) => {
  //       if (response) {
  //           this.cep = response.cep;
  //           this.logradouro = response.logradouro;
  //           this.complemento = response.complemento;
  //           this.numero;
  //           this.bairro = response.bairro;
  //           this.cidade = response.localidade;
  //           this.estado = response.uf;
  //       }else{
  //         alert("Sucesso operação pesquisar: sem dados para exibir!");
  //       }
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   });
  }

  salvar() {
    this.http.post<FormGroup>('http://localhost:3000/pista', this.pista.value)
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
    this.http.get<FormGroup[]>('http://localhost:3000/pistas')
      .subscribe({
        next: (response) => {
          if (!response) {
            return alert("Sucesso: operação listar sem dados para exibir!");
          }
          console.log(this.pistas);
          this.pistas.value.patchValue(response);
          console.log(this.pistas);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  consultar() {
    
    if(!this.pista.value._id){
      console.log('Operação consultar: id obrigatório!');
      alert('Operação consultar: id obrigatório!');
      return;
    }

    this.http.get<FormGroup>(`http://localhost:3000/pista/${this.pista.value._id}`)
    .subscribe({
      next: (response) => {
        if (!response) {
            return alert("Sucesso: operação consultar sem dados para exibir!");
        }
        this.pista.patchValue(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  atualizar(){
    if(!this.pista.value._id){
      console.log('Operação consultar: id obrigatório!');
      alert('Operação consultar: id obrigatório!');
      return;
    }

    this.http.put<FormGroup>(`http://localhost:3000/pista/${this.pista.value._id}`, this.pista)
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
    if(!this.pista.value._id){
      console.log('Operação consultar: id obrigatório!');
      alert('Operação consultar: id obrigatório!');
      return;
    }

    this.http.delete<FormGroup>(`http://localhost:3000/pista/${this.pista.value._id}`)
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
    // this.pista.reset();
    // this.pistas = [];
  }
}