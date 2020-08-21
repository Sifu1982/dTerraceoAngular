import { Injectable } from '@angular/core';
import { Terraza } from './models/terraza.model';

@Injectable({
  providedIn: 'root'
})
export class TerrazasService {

  arrayTerrazasCarousel: Terraza[];

  constructor() {

    this.arrayTerrazasCarousel = [
      new Terraza(3678, 1, 'CENTRO', 103, 'CORTES', 28014, '440914,59', '4474421,52', 1, 'Abierto', 'CIRCULO DE BELLAS ARTES DE MADRID', 93.24, 'CALLE', 'ALCALA', 'NUM', 42),
      new Terraza(2336, 1, 'CENTRO', 105, 'UNIVERSIDAD', 28004, '440290,59', '4474978,53', 1, 'Abierto', 'LA MUCCA', 65.52, 'PLAZA', 'CARLOS CAMBRONERO', 'NUM', 4,),
      new Terraza(2306, 1, 'CENTRO', 104, 'JUSTICIA', 28004, '440699,59', '4474677,53', 1, 'Abierto', 'HOTEL ROOM MATE', 55.44, 'PLAZA', 'PEDRO ZEROLO', 'NUM', 11,)
    ]

  }
}
