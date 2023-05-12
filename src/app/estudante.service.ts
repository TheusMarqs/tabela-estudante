import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudantes } from './estudante';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {
  url = "http://localhost:3000/Estudantes";

  constructor(private http: HttpClient) { }

  getEstudante() : Observable<Estudantes[]> {
    return this.http.get<Estudantes[]>(this.url);
  }

  save(estudante: Estudantes) : Observable<Estudantes> {
    return this.http.post<Estudantes>(this.url, estudante);
  } 

  update(estudante: Estudantes) : Observable<Estudantes> {
    return this.http.put<Estudantes>(`${this.url}/${estudante.id}`, estudante);
  }

  delete(estudante: Estudantes) : Observable<void> {
    return this.http.delete<void>(`${this.url}/${estudante.id}`);
  }
}
