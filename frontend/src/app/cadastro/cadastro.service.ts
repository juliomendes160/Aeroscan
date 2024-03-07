import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../autenticacao/autenticacao.service';
@Injectable({
  providedIn: 'root'
})
export class CadastroService extends AutenticacaoService{

  private readonly domain = 'http://localhost:3000'

  constructor(private http: HttpClient) {
    super();
   }

  salvar<T>(path: string, formGroup: FormGroup): Observable<T> {
    return this.http.post<T>(`${this.domain}${path}`, formGroup.value);
  }

  listar<T>(path: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.domain}${path}`);
  }

  consultar<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.domain}${path}`);
  }

  atualizar<T>(path: string, formGroup: FormGroup): Observable<T> {
    return this.http.put<T>(`${this.domain}${path}`, formGroup.value);
  }

  excluir<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.domain}${path}`);
  }
}