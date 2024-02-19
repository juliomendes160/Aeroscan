import { Component } from '@angular/core';
import {RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { PistaComponent } from './pista/pista.component';
import { KartComponent } from './kart/kart.component';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterOutlet, RouterLink, UsuarioComponent, PistaComponent, KartComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  
}
