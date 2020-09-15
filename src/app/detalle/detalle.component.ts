import { Component, OnInit } from '@angular/core';
import { Terraza } from '../models/terraza.model';
import { TerrazasService } from '../terrazas.service';
import { ActivatedRoute } from '@angular/router';
import { PuntuacionesService } from '../puntuaciones.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  terraza: Terraza;

  // Variable para zoom del mapa
  zoom: number;
  // Variables para la geolocalización
  lat: number;
  lng: number;


  constructor(
    private terrazasService: TerrazasService,
    private activatedRoute: ActivatedRoute,
    private puntuacionesService: PuntuacionesService
  ) {
    this.terraza = new Terraza();

    this.zoom = 17;

  }

  ngOnInit() {
    // Conseguir la posición del usuario
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });


    this.activatedRoute.params.subscribe(async params => {
      const objLocalStorage = JSON.parse(localStorage.getItem("dTerraceo"));
      try {
        this.terraza = await this.terrazasService.getTerrazaById(parseInt(params.idTerraza), objLocalStorage);
        console.log(this.terraza);
      } catch (err) {
        console.log(err);
      }
    });
  }

}


