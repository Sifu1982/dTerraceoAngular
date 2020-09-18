import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TerrazasService } from '../terrazas.service';
import { Terraza } from '../models/terraza.model';
import { Router, UrlHandlingStrategy } from '@angular/router';
import Swal from 'sweetalert2';


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

  fondoOscuro: Boolean;

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
    this.fondoOscuro = false;
  }

  async ngOnInit() {

    this.arrBarrio = await this.terrazasService.getBarriosTerrazas();

    navigator.geolocation.getCurrentPosition(position => {
      this.posicionActualLat = position.coords.latitude;
      this.posicionActualLng = position.coords.longitude;
    });

  }


  /*
  *METODOS DE BUSQUEDA POR NOMBRE
  */

  async onBusquedaNombre(nombre) {
    if (nombre) {
      const result = await this.terrazasService.getTerrazasPorNombre(nombre);
      this.arrTerrazasPorNombre = result;
    } else {
      this.arrTerrazasPorNombre = [];
    }
  };

  onSelectNombre(terraza) {
    let arrBusqueda = [];
    if (this.checkUbicacion()) {
      let item = {
        latitude: this.posicionActualLat,
        longitude: this.posicionActualLng
      }
      arrBusqueda.push(item);
      localStorage.setItem("dTerraceo", JSON.stringify(arrBusqueda));
      this.router.navigate(['/detalle', terraza.id_terraza]);
    } else {
      this.alertaNoUbicacion();
    }
  };

  onFocoNombre(e) {
  };

  //*METODOS DE BUSQUEDA AVANZADA
  onClickBusquedaAvanzada() {
    this.fondoOscuro = !this.fondoOscuro;
  }

  onChangeBarrio($event) {
    if (this.checkUbicacion()) {
      let arrBusqueda = [];
      let item = {
        desc_barrio_local: $event.target.value.trim(),
        latitude: this.posicionActualLat,
        longitude: this.posicionActualLng
      }
      arrBusqueda.push(item);
      localStorage.setItem("dTerraceo", JSON.stringify(arrBusqueda));
      this.router.navigate(['/busqueda']);
    } else {
      this.alertaNoUbicacion();
    }
  };

  onKeypressCalle($event) { };

  onChange($event) {
    if ($event.checked) {
      navigator.geolocation.getCurrentPosition(position => {
        this.posicionActualLat = position.coords.latitude;
        this.posicionActualLng = position.coords.longitude;
      });
    }
  };

  async onSubmitBusquedaAvanzada() {
    if (!this.fomularioBusquedaAvanzada.value.calle && !this.fomularioBusquedaAvanzada.value.barrio && !this.fomularioBusquedaAvanzada.value.cercaDeMi) {
      this.alertaBusqeudaNoValida();
    } else if (this.fomularioBusquedaAvanzada.value.calle) {
      const existeCalle = await this.terrazasService.getCalle(this.fomularioBusquedaAvanzada.value.calle)
      if (existeCalle.length == 0) {
        this.alertaBusqeudaNoValida();
      } else {
        if (this.checkUbicacion()) {
          let arrBusqueda = [];
          this.fomularioBusquedaAvanzada.value.latitude = this.posicionActualLat;
          this.fomularioBusquedaAvanzada.value.longitude = this.posicionActualLng;
          arrBusqueda.push(this.fomularioBusquedaAvanzada.value);
          localStorage.setItem("dTerraceo", JSON.stringify(arrBusqueda));
          this.router.navigate(['/busqueda']);
        } else {
          this.alertaNoUbicacion();
        }
      }
    } else {
      if (this.checkUbicacion()) {
        let arrBusqueda = [];
        this.fomularioBusquedaAvanzada.value.latitude = this.posicionActualLat;
        this.fomularioBusquedaAvanzada.value.longitude = this.posicionActualLng;
        arrBusqueda.push(this.fomularioBusquedaAvanzada.value);
        localStorage.setItem("dTerraceo", JSON.stringify(arrBusqueda));
        this.router.navigate(['/busqueda']);
      } else {
        this.alertaNoUbicacion();
      }
    }
  };

  /*
  *HELPERS
  */
  checkUbicacion() {
    if (this.posicionActualLat == undefined || this.posicionActualLat == undefined) {
      return false;
    } else {
      return true;
    }
  };

  alertaNoUbicacion() {
    Swal.fire({
      // icon: 'error',
      title: 'Ubicación no detectada',
      text: 'Para el correcto funcionamiento, es necesario poder acceder a la ubicación del dispositivo',
      imageUrl: '../../assets/dTerraceo.logo_white.jpg',
      // imageWidth: 400,
      // imageHeight: 200,
      imageAlt: 'DTerraceo logo'
    });
    this.router.navigate(['/home']);
  };

  alertaBusqeudaNoValida() {
    Swal.fire({
      title: 'Busqueda no válida',
      text: 'No hemos localizado terrazas para su búsqueda. Por favor, inténtelo de nuevo.',
      imageUrl: '../../assets/dTerraceo.logo_white.jpg',
      imageAlt: 'DTerraceo logo'
    });
  };

}
