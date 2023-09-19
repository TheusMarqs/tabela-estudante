import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = "http://localhost:8080/students";

  constructor(private http: HttpClient) { }

  getStudent() : Observable<Students[]> {
    return this.http.get<Students[]>(this.url);
  }

  save(students: Students) : Observable<Students> {
    return this.http.post<Students>(this.url, students);
  }

  update(students: Students) : Observable<Students> {
    return this.http.put<Students>(`${this.url}/${students.id}`, students);
  }

  delete(students: Students) : Observable<void> {
    return this.http.delete<void>(`${this.url}/${students.id}`);
  }
}
