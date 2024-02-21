import { CadastroService } from './../cadastro.service';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from './usuario';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})

export class UsuarioComponent  {
  
  private readonly url = 'http://localhost:3000/usuario/'
  
  @ViewChild('usuarioNgForm') usuarioNgForm!: NgForm;

  usuario: Usuario = {
    _id: '',
    nome: '',
    tipo: '',
  }
  usuarios: Usuario[] = [];

  constructor(private service: CadastroService) {}
  
  salvar() {
    this.service.salvar<Usuario>(this.url, this.usuario)
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
    this.service.listar<Usuario>(this.url)
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.usuarios = response;
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

    if(!this.usuario._id){
      console.log('Operação consultar: id obrigatório!');
      alert('Operação consultar: id obrigatório!');
      return;
    }

    this.service.consultar<Usuario>(this.url + this.usuario._id)
    .subscribe({
      next: (response) => {
        if (response) {
            this.usuario._id = response._id;
            this.usuario.nome = response.nome;
            this.usuario.tipo = response.tipo;
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
    if(!this.usuario._id){
      console.log('Operação consultar: id obrigatório!');
      alert('Operação consultar: id obrigatório!');
      return;
    }

    this.service.atualizar<Usuario>(this.url + this.usuario._id, this.usuario)
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
    if(!this.usuario._id){
      console.log('Operação consultar: id obrigatório!');
      alert('Operação consultar: id obrigatório!');
      return;
    }

    this.service.excluir<Usuario>(this.url + this.usuario._id)
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
    this.service.limpar(this.usuarios);
  }
}
