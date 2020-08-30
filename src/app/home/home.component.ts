import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TerrazasService } from '../terrazas.service';
import { Terraza } from '../models/terraza.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fomularioBusquedaAvanzada: FormGroup;

  arrTerrazasPorNombre: Terraza[];
  keywordNombre: string;

  arrBarrio: any[];

  posicionActualLat: number;
  posicionActualLng: number;

  constructor(private terrazasService: TerrazasService, private router: Router) {

    this.fomularioBusquedaAvanzada = new FormGroup({

      barrio: new FormControl('', [

      ]),
      calle: new FormControl('', [

      ]),
      cercaDeMi: new FormControl('', [

      ]),
    });

    this.arrTerrazasPorNombre = [];
    this.keywordNombre = 'rotulo';

  }

  async ngOnInit() {

    this.arrBarrio = await this.terrazasService.getBarriosTerrazas();

    navigator.geolocation.getCurrentPosition(position => {
      this.posicionActualLat = position.coords.latitude;
      this.posicionActualLng = position.coords.longitude;
    });

  }


  //*METODOS DE BUSQUEDA POR NOMBRE
  onSelectNombre(item) {
    this.router.navigate(['/detalle', item.id_terraza]);
  }

  async onBusquedaNombre(nombre) {
    console.log(nombre);
    this.arrTerrazasPorNombre = await this.terrazasService.getTerrazasPorNombre(nombre);
  }

  onFocoNombre(e) {

  }

  //*METODOS DE BUSQUEDA AVANZADA
  onChangeBarrio($event) {
    console.log($event.target.value);
    let arrBusqueda = [];
    let item = {
      desc_barrio_local: $event.target.value.trim(),
      latitude: this.posicionActualLat,
      longitude: this.posicionActualLng
    }
    arrBusqueda.push(item);
    localStorage.setItem("dTerraceo", JSON.stringify(arrBusqueda));
    this.router.navigate(['/busqueda']);
  }

  onKeypressCalle($event) {
    // console.log($event.code);
    // console.log($event.target.value);
  }

  onChange($event) {
    console.log($event.checked);
    if ($event.checked) {
      navigator.geolocation.getCurrentPosition(position => {
        this.posicionActualLat = position.coords.latitude;
        this.posicionActualLng = position.coords.longitude;
      });
    }
  };

  onSubmitBusquedaAvanzada() {
    let arrBusqueda = [];
    this.fomularioBusquedaAvanzada.value.latitude = this.posicionActualLat;
    this.fomularioBusquedaAvanzada.value.longitude = this.posicionActualLng;
    arrBusqueda.push(this.fomularioBusquedaAvanzada.value);
    localStorage.setItem("dTerraceo", JSON.stringify(arrBusqueda));
    this.router.navigate(['/busqueda']);
  }

}
