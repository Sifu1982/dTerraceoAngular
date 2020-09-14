import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl: String;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/usuarios';
  }

  register(formValues): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/registro`, formValues).toPromise();
  }

  login(formvalues): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, formvalues).toPromise();
  }

}
