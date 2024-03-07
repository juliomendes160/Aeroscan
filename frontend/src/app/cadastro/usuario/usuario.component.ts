import { CadastroService } from './../cadastro.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})

export class UsuarioComponent{
  
  private readonly path = '/usuario/'

  usuario:FormGroup;
   
  constructor(private service: CadastroService, private FormBuilder: FormBuilder) {
    this.usuario = this.FormBuilder.group({
      _id: [''],
      nome: [''],
      tipo: [''],
      usuarios: [[]],
    })
  }
  
  salvar() {
    this.service.salvar<FormGroup>(this.path, this.usuario)
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
    this.service.listar<FormGroup[]>(this.path)
      .subscribe({
        next: (response) => {
          if (!response) {
            return alert("Sucesso operação listar: sem dados para exibir!");
          }
          this.usuario.patchValue({usuarios: response})
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  consultar() {
    if(!this.usuario.value._id){
      console.log('Operação consultar: id obrigatório!');
      alert('Operação consultar: id obrigatório!');
      return;
    }

    this.service.consultar<FormGroup>(`${this.path}${this.usuario.value._id}`)
    .subscribe({
      next: (response) => {
        if (!response) {
          return alert("Resposta: Sucesso operação consultar: sem dados para exibir!");
        }
        this.usuario.patchValue(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  atualizar<FormGroup>(){
    if(!this.usuario.value._id){
      console.log('Operação consultar: id obrigatório!');
      alert('Operação consultar: id obrigatório!');
      return;
    }
    this.service.atualizar<FormGroup>(`${this.path}${this.usuario.value._id}`, this.usuario)
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  excluir<FormGroup>() {
    if(!this.usuario.value._id){
      console.log('Operação consultar: id obrigatório!');
      alert('Operação consultar: id obrigatório!');
      return;
    }

    this.service.excluir<FormGroup>(`${this.path}${this.usuario.value._id}`)
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
    this.usuario.reset();
    this.usuario.value.usuarios = [];
  }
}
