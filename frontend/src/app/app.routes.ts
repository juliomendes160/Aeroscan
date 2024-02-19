import { Routes } from '@angular/router';
import { UsuarioComponent } from './cadastro/usuario/usuario.component';
import { PistaComponent } from './cadastro/pista/pista.component';
import { KartComponent } from './cadastro/kart/kart.component';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component';

export const routes: Routes = [
    {path: '', component: AutenticacaoComponent},
    {path: 'usuario', component: UsuarioComponent},
    { path: 'pista', component:  PistaComponent},
    { path: 'kart', component:  KartComponent},
];