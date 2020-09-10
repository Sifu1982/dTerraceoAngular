import { Injectable } from '@angular/core';
import { Terraza } from './models/terraza.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TerrazasService {

  baseUrl: String;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/terrazas';
  }

  // Método usado en home.component.ts para rellenar el array de barrios en el ngoninit
  getBarriosTerrazas(): Promise<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/barrios`).toPromise();
  };

  // Método usado en home.component.ts en el buscador por nombre
  getTerrazasPorNombre(pNombre: string): Promise<Terraza[]> {
    return this.httpClient.get<Terraza[]>(`${this.baseUrl}/name/${pNombre}`).toPromise();
  };

  // Método usado en home.component.ts en el buscador avanzado (búsqueda por barrio)
  getTerrazasPorBarrio(pBarrio: string): Promise<Terraza[]> {
    return this.httpClient.get<Terraza[]>(`${this.baseUrl}/barrio/${pBarrio}`).toPromise();
  };

  // Método usado en busqueda.component.ts para obtener las terrazas a mostrar
  getTerrazasBusqueda(pArray: any[]): Promise<Terraza[]> {

    if (pArray[0].cercaDeMi === true && pArray[0].latitude && pArray[0].longitude) {
      const body = {
        latitude: pArray[0].latitude,
        longitude: pArray[0].longitude
      };
      return this.httpClient.post<Terraza[]>(`${this.baseUrl}`, body).toPromise();
    } else if (pArray[0].desc_barrio_local) {
      const body = {
        latitude: pArray[0].latitude,
        longitude: pArray[0].longitude
      };
      return this.httpClient.post<Terraza[]>(`${this.baseUrl}/barrio/${pArray[0].desc_barrio_local}`, body).toPromise();
    } else if (pArray[0].calle) {
      const body = {
        latitude: pArray[0].latitude,
        longitude: pArray[0].longitude
      };
      return this.httpClient.post<Terraza[]>(`${this.baseUrl}/calle/${pArray[0].calle}`, body).toPromise();
    } else {
      return new Promise((resolve, reject) => {
        reject(console.log('ERROR: no se ha podido obtener la búsqueda'));
      });
    }

  };

  //Método usado en detalle.component para obtener la terraza a mostrar
  getTerrazaById(pId: number, pArray: any[]): Promise<Terraza> {
    const body = {
      latitude: pArray[0].latitude,
      longitude: pArray[0].longitude
    }
    return this.httpClient.post<Terraza>(`${this.baseUrl}/id/${pId}`, body).toPromise();
  };

}
