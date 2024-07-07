import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getRepositories(): Observable<Repository[]> {
    return this.http.get<Repository[]>(`${this.apiUrl}/`);
  }

  getRepositoryById(id: String): Observable<Repository> {
    return this.http.get<Repository>(`${this.apiUrl}/repository${id}`);
  }

  getRepositoryByName(name: String): Observable<Repository> {
    return this.http.get<Repository>(`${this.apiUrl}/repository?name=${name}`);
  }
}
