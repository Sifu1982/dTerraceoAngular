import { Injectable } from '@angular/core';
import { Terraza } from './models/terraza.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TerrazasService {

  arrayTerrazasCarousel: Terraza[];

  constructor(private httpClient: HttpClient) {

    this.arrayTerrazasCarousel = [
      new Terraza(3678, 1, 'CENTRO', 103, 'CORTES', 28014, '440914,59', '4474421,52', 1, 'Abierto', 'CIRCULO DE BELLAS ARTES DE MADRID', 93.24, 'CALLE', 'ALCALA', 'NUM', 42, 'Acera', '8:00:00', '1:30:00', '8:00:00', '1:00:00', '8:00:00', '1:30:00', '8:00:00', '1:00:00', 26, 91),
      new Terraza(2336, 1, 'CENTRO', 105, 'UNIVERSIDAD', 28004, '440290,59', '4474978,53', 1, 'Abierto', 'LA MUCCA', 65.52, 'PLAZA', 'CARLOS CAMBRONERO', 'NUM', 4, 'Acera', '10:00:00', '1:00:00', '10:00:00', '0:00:00', '10:00:00', '2:30:00', '10:00:00', '0:00:00', 23, 82),
      new Terraza(2306, 1, 'CENTRO', 104, 'JUSTICIA', 28004, '440699,59', '4474677,53', 1, 'Abierto', 'HOTEL ROOM MATE', 55.44, 'PLAZA', 'PEDRO ZEROLO', 'NUM', 11, 'Plaza con bandas permanentes de circulación rodada', '10:00:00', '0:00:00', '10:00:00', '23:00:00', '10:00:00', '1:30:00', '10:00:00', '23:00:00', 16, 64),
      new Terraza(7269, 4, 'SALAMANCA', 401, 'RECOLETOS', 28001, '441534,59', '4474671,52', 1, 'Abierto', 'RAMSES LIFE & FOOD', 116.05, 'PLAZA', 'INDEPENDENCIA', 'NUM', 4, 'Acera', '8:00:00', '1:30:00', '8:00:00', '1:00:00', '8:00:00', '1:30:00', '8:00:00', '1:00:00', 31, 83),
      new Terraza(3891, 3, 'RETIRO', 305, 'LOS JERONIMOS', 28009, '442286,58', '4474379,51', 1, 'Abierto', 'FLORIDA RETIRO', 128.36, 'PASEO', 'FERNAN NUÑEZ', 'NUM', 26, 'Otros', '10:00:00', '1:00:00', '10:00:00', '0:00:00', '10:00:00', '2:30:00', '10:00:00', '0:00:00', 38, 184)
    ]

  }

  getArrayTerrazasCarousel() {
    return this.arrayTerrazasCarousel;
  }


  // getNombresTerrazas(): Promise<String[]> {
  //   return new Promise((resolve, reject) => {
  //     resolve(this.arrayTerrazasCarousel.map(terraza => terraza.rotulo));
  //   });
  // }

  // Método usado en home.component.ts para rellenar el array de barrios en el ngoninit
  // CONTRA ARRAY LOCAL:
  // getBarriosTerrazas(): Promise<String[]> {
  //   return new Promise((resolve, reject) => {
  //     resolve(this.arrayTerrazasCarousel.map(terraza => terraza.desc_barrio_local));
  //   });
  // };
  // CONTRA BBDD:
  getBarriosTerrazas(): Promise<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:3000/api/terrazas/barrios`).toPromise();
  };

  // Método usado en home.component.ts en el buscador por nombre
  // CONTRA ARRAY LOCAL:
  // getTerrazasPorNombre(pNombre: string): Promise<Terraza[]> {
  //   return new Promise((resolve, reject) => {
  //     resolve(this.arrayTerrazasCarousel.filter(terraza => terraza.rotulo.toLowerCase().includes(pNombre.toLowerCase())));
  //   });
  // };
  // CONTRA BBDD:
  getTerrazasPorNombre(pNombre: string): Promise<Terraza[]> {
    return this.httpClient.get<Terraza[]>(`http://localhost:3000/api/terrazas//name/${pNombre}`).toPromise();
  };


  // Método usado en home.component.ts en el buscador avanzado (búsqueda por barrio)
  // CONTRA ARRAY LOCAL:
  // getTerrazasPorBarrio(pBarrio: string): Promise<Terraza[]> {
  //   return new Promise((resolve, reject) => {
  //     resolve(this.arrayTerrazasCarousel.filter(terraza => terraza.desc_barrio_local.toLowerCase().includes(pBarrio.toLowerCase())));
  //   });
  // };
  // CONTRA BBDD:
  getTerrazasPorBarrio(pBarrio: string): Promise<Terraza[]> {
    return this.httpClient.get<Terraza[]>(`http://localhost:3000/api/terrazas//barrio/${pBarrio}`).toPromise();
  };


  // Método usado en busqueda.component.ts para obtener las terrazas a mostrar
  // CONTRA ARRAY LOCAL:
  // getTerrazasBusqueda(pArray: any[]): Promise<Terraza[]> {
  //   return new Promise((resolve, reject) => {
  //     for (const item of pArray) {
  //       if (item.desc_barrio_local) {
  //         resolve(this.arrayTerrazasCarousel.filter(terraza => terraza.desc_barrio_local.toLowerCase().includes(item.desc_barrio_local.toLowerCase())));
  //       }
  //       else if (item.calle) {
  //         resolve(this.arrayTerrazasCarousel.filter(terraza => terraza.DESC_NOMBRE.toLowerCase().includes(item.calle.toLowerCase())));
  //       }
  //       else {
  //         reject(console.log('ERROR: no se ha podido obtener la búsqueda'));
  //       }
  //     }
  //   });
  // };
  // CONTRA BBDD:
  getTerrazasBusqueda(pArray: any[]): Promise<Terraza[]> {

    for (const item of pArray) {
      if (item.desc_barrio_local) {
        return this.httpClient.get<Terraza[]>(`http://localhost:3000/api/terrazas/barrio/${item.desc_barrio_local}`).toPromise();
      } else if (item.calle) {
        return this.httpClient.get<Terraza[]>(`http://localhost:3000/api/terrazas/calle/${item.calle}`).toPromise();
      } else {
        return new Promise((resolve, reject) => {
          reject(console.log('ERROR: no se ha podido obtener la búsqueda'));
        });
      }
    }

  };


}
