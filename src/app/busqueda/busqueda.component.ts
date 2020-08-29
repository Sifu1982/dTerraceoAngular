import { Component, OnInit } from '@angular/core';
import { TerrazasService } from '../terrazas.service';
import { Terraza } from '../models/terraza.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  terrazas: Terraza[];

  constructor(private terrazasService: TerrazasService) { }

  async ngOnInit() {
    // this.terrazas = this.terrazasService.getArrayTerrazasCarousel();
    const objLocalStorage = JSON.parse(localStorage.getItem("dTerraceo"));
    try {
      this.terrazas = await this.terrazasService.getTerrazasBusqueda(objLocalStorage);
    } catch (err) {
      console.log(err);
    }

  }

}
