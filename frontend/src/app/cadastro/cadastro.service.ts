import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  salvar<T>(url: string, objeto: T): Observable<T> {
    return this.http.post<T>(url, objeto);
  }

  listar<T>(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  }

  consultar<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  atualizar<T>(url: string, objeto: T): Observable<T> {
    return this.http.put<T>(url, objeto);
  }

  excluir<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }

  limpar<T>(objeto: T[]): void  {
    objeto = [];
  }

}
