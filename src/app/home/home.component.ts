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

  arrBarrio: String[];


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

  }


  //*METODOS DE BUSQUEDA POR NOMBRE
  onSelectNombre(item) {
    console.log(item);
    let arrayResult = [];
    // arrayResult.push(item);
    // localStorage.setItem("arrayResult", JSON.stringify(arrayResult));
    this.router.navigate(['/detalle', item.id_terraza]);
  }

  async onBusquedaNombre(nombre) {

    console.log(nombre);

    this.arrTerrazasPorNombre = await this.terrazasService.getTerrazaPorNombre(nombre);

  }

  onFocoNombre(e) {

  }

  //*METODOS DE BUSQUEDA AVANZADA
  onChangeBarrio($event) {
    // console.log($event.target.value);
    let arrayResult = [];
    let item = {
      desc_barrio_local: $event.target.value
    }
    arrayResult.push(item);
    localStorage.setItem("arrayResult", JSON.stringify(arrayResult));
    this.router.navigate(['/busqueda']);
    // console.log('arrayResult', arrayResult);
    // console.log('localStorage', localStorage.getItem("arrayResult"));

  }

  onKeypressCalle($event) {
    console.log($event);

  }

  onSubmitBusquedaAvanzada() {
    console.log(this.fomularioBusquedaAvanzada.value);
  }

}
