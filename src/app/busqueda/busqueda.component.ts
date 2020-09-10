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

  // Variables para la geolocalización
  lat: number;
  lng: number;

  barrio: string;

  constructor(private terrazasService: TerrazasService) { }

  async ngOnInit() {
    // Conseguir la posición del usuario
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });

    // this.terrazas = this.terrazasService.getArrayTerrazasCarousel();
    const objLocalStorage = JSON.parse(localStorage.getItem("dTerraceo"));
    try {
      this.terrazas = await this.terrazasService.getTerrazasBusqueda(objLocalStorage);
    } catch (err) {
      console.log(err);
    }
    this.barrio = objLocalStorage[0].desc_barrio_local
  }

}
