import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  baseUrl: String;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/comentarios';
  }

  getByTerrazaId(idTerraza: string): Promise<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/${idTerraza}`).toPromise();
  };

  create(usuarioId: string, terrazaId: string, comment: any): Promise<any> {
    const body = {
      idUsuario: usuarioId,
      idTerraza: terrazaId,
      comentario: comment
    }
    return this.httpClient.post<any>(`${this.baseUrl}/create`, body).toPromise();
  };
}