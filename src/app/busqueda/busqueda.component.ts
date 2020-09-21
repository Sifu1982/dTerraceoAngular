import { Component, OnInit } from '@angular/core';
import { TerrazasService } from '../terrazas.service';
import { Terraza } from '../models/terraza.model';
import { PuntuacionesService } from '../puntuaciones.service';

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


  constructor(
    private terrazasService: TerrazasService,
    private puntuacionesService: PuntuacionesService
  ) { }

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

      for (const terraza of this.terrazas) {
        terraza.puntuacionMedia = await this.calcularPuntuacionMedia(terraza.id_terraza);

        if (terraza.puntuacionMedia) {
          terraza.aparece = true;
        }
      }
    } catch (err) {
      console.log(err);
    }

    this.barrio = objLocalStorage[0].desc_barrio_local
  }



  // Puntuación media terraza
  async calcularPuntuacionMedia(idTerraza) {
    const puntuaciones = await this.puntuacionesService.getByIdTerraza(idTerraza.toString());
    if (puntuaciones.length !== 0) {
      let suma = 0;
      for (const puntuacion of puntuaciones) {
        suma += puntuacion.puntuacion;
      }
      return suma / puntuaciones.length;
    }
  }

}
