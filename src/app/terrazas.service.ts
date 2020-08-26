import { Injectable } from '@angular/core';
import { Terraza } from './models/terraza.model';

@Injectable({
  providedIn: 'root'
})
export class TerrazasService {

  arrayTerrazasCarousel: Terraza[];

  constructor() {

    this.arrayTerrazasCarousel = [
      new Terraza(3678, 1, 'CENTRO', 103, 'CORTES', 28014, '440914,59', '4474421,52', 1, 'Abierto', 'CIRCULO DE BELLAS ARTES DE MADRID', 93.24, 'CALLE', 'ALCALA', 'NUM', 42, 'Acera', '8:00:00', '1:30:00', '8:00:00', '1:00:00', '8:00:00', '1:30:00', '8:00:00', '1:00:00', 26, 91),
      new Terraza(2336, 1, 'CENTRO', 105, 'UNIVERSIDAD', 28004, '440290,59', '4474978,53', 1, 'Abierto', 'LA MUCCA', 65.52, 'PLAZA', 'CARLOS CAMBRONERO', 'NUM', 4, 'Acera', '10:00:00', '1:00:00', '10:00:00', '0:00:00', '10:00:00', '2:30:00', '10:00:00', '0:00:00', 23, 82),
      new Terraza(2306, 1, 'CENTRO', 104, 'JUSTICIA', 28004, '440699,59', '4474677,53', 1, 'Abierto', 'HOTEL ROOM MATE', 55.44, 'PLAZA', 'PEDRO ZEROLO', 'NUM', 11, 'Plaza con bandas permanentes de circulación rodada', '10:00:00', '0:00:00', '10:00:00', '23:00:00', '10:00:00', '1:30:00', '10:00:00', '23:00:00', 16, 64),
      new Terraza(7269, 4, 'SALAMANCA', 401, 'RECOLETOS', 28001, '441534,59', '4474671,52', 1, 'Abierto', 'RAMSES LIFE & FOOD', 116.05, 'PLAZA', 'INDEPENDENCIA', 'NUM', 4, 'Acera', '8:00:00', '1:30:00', '8:00:00', '1:00:00', '8:00:00', '1:30:00', '8:00:00', '1:00:00', 31, 83),
      new Terraza(3891, 3, 'RETIRO', 305, 'LOS JERONIMOS', 28009, '442286,58', '4474379,51', 1, 'Abierto', 'FLORIDA RETIRO', 128.36, 'PASEO', 'FERNAN NUÑEZ', 'NUM', 26, 'Otros', '10:00:00', '1:00:00', '10:00:00', '0:00:00', '10:00:00', '2:30:00', '10:00:00', '0:00:00', 38, 184)
    ]

  }

  getArrayTerrazasCarousel(): Terraza[] {
    return this.arrayTerrazasCarousel;
  }

  buscarTerrazaPorNombre(pNombre: string): Promise<Terraza[]> {
    return new Promise((resolve, reject) => {
      resolve(this.arrayTerrazasCarousel.filter(terraza => terraza.rotulo.toLowerCase().includes(pNombre.toLowerCase())));
    });
  }
}
