import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})

export class UsuarioComponent  {
  
  @ViewChild('usuarioNgForm') usuarioNgForm!: NgForm;

  id: any; 
  nome: any; 
  tipo: any;
  
  usuarios: any;

  constructor(private http: HttpClient) {}
  
  salvar() {

     this.http.post<any>('http://localhost:3000/usuario', this.usuarioNgForm.value)
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
    this.http.get<[any]>('http://localhost:3000/usuarios')
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
    
    if(!this.id){
      console.log('Operação consultar: id obrigatório!');
      alert('Operação consultar: id obrigatório!');
      return;
    }

    this.http.get<any>(`http://localhost:3000/usuario/${this.id}`)
    .subscribe({
      next: (response) => {
        if (response) {
            this.id = response._id;
            this.nome = response.nome;
            this.tipo = response.tipo;
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

    this.http.put<any>(`http://localhost:3000/usuario/${this.id}`, this.usuarioNgForm.value)
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

    this.http.delete<any>(`http://localhost:3000/usuario/${this.id}`)
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
    this.usuarioNgForm.resetForm();
    this.usuarios = undefined;
  }
}
