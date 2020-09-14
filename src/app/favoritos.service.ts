import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  baseUrl: String;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/favoritos';
  }

  getByUserId(idUsuario: string): Promise<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/${idUsuario}`).toPromise();
  };

  getAll(usuarioId: string, terrazaId: string): Promise<any> {
    const body = {
      idUsuario: usuarioId,
      idTerraza: terrazaId
    }
    return this.httpClient.post<any>(`${this.baseUrl}/getAll`, body).toPromise();
  };

  create(usuarioId: string, terrazaId: string): Promise<any> {
    const body = {
      idUsuario: usuarioId,
      idTerraza: terrazaId
    }
    return this.httpClient.post<any>(`${this.baseUrl}/create`, body).toPromise();
  };

  delete(usuarioId: string, terrazaId: string): Promise<any> {
    const body = {
      idUsuario: usuarioId,
      idTerraza: terrazaId
    }
    return this.httpClient.post<any>(`${this.baseUrl}/delete`, body).toPromise();
  };

}
