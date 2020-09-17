import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionesService {

  baseUrl: String;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/puntuaciones';
  }

  create(puntuacionCreate: number, usuarioId: string, terrazaId: string): Promise<any> {
    const body = {
      puntuacion: puntuacionCreate,
      idUsuario: usuarioId,
      idTerraza: terrazaId
    }
    return this.httpClient.post<any>(`${this.baseUrl}/create`, body).toPromise();
  };

  puntuacionByIdUsuarioIdTerraza(usuarioId: string, terrazaId: string): Promise<any> {
    const body = {
      idUsuario: usuarioId,
      idTerraza: terrazaId
    }
    return this.httpClient.post<any>(`${this.baseUrl}/puntuacion`, body).toPromise();
  };

  getByIdTerraza(terrazaId: string): Promise<any> {
    const body = {
      idTerraza: terrazaId
    }
    return this.httpClient.post<any>(`${this.baseUrl}/terraza`, body).toPromise();
  };

}
