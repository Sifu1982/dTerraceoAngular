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



}
