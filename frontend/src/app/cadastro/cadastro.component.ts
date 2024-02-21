import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { PistaComponent } from './pista/pista.component';
import { KartComponent } from './kart/kart.component';
import { CadastroService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule , UsuarioComponent, PistaComponent, KartComponent],
  providers: [CadastroService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  
}
