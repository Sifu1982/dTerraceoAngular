import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TerrazasService } from '../terrazas.service';
import { Terraza } from '../models/terraza.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fomularioBusquedaAvanzada: FormGroup;

  arrBarrio: String[];
  arrNombreTerraza: String[];
  arrTempterrazas: Terraza[];

  keyword: string;

  constructor(private terrazasService: TerrazasService) {

    this.fomularioBusquedaAvanzada = new FormGroup({

      barrio: new FormControl('', [

      ]),
      calle: new FormControl('', [

      ]),
      cercaDeMi: new FormControl('', [

      ]),
    });


    this.arrBarrio = [''];
    this.arrNombreTerraza = [];

    this.arrTempterrazas = [];
    this.keyword = 'rotulo';

  }

  ngOnInit(): void {

    const arrayTerrazasCarousel = this.terrazasService.getArrayTerrazasCarousel();

    this.arrTempterrazas = this.terrazasService.getArrayTerrazasCarousel();
    console.log(this.arrTempterrazas);

    const arrTemp = arrayTerrazasCarousel.map(terraza => terraza.desc_barrio_local);
    this.arrBarrio = [...new Set(arrTemp)];
    this.arrNombreTerraza = arrayTerrazasCarousel.map(terraza => terraza.rotulo);

    // this.fomularioBusquedaNombre.controls.nombre.valueChanges.pipe(debounceTime(500)).subscribe(value => {
    //   console.log(this.arrNombreTerraza.find(nombre => nombre.toLowerCase().includes(value.toLowerCase())));
    // });

  }


  onChangeDistrito($event) {

  }

  onChangeBarrio($event) {

  }

  onSubmitBusquedaAvanzada() {
    console.log(this.fomularioBusquedaAvanzada.value);
  }


  selectEvent(item) {
    console.log(item); //El item es el objeto tipo terraza entero que he seleccionado

  }

  async onChangeSearch(val: string) {
    // this.arrTempterrazas = this.terrazasService.getArrayTerrazasCarousel();

    console.log(val);

    // this.arrTempterrazas = [new Terraza(3678, 1, 'CENTRO', 103, 'CORTES', 28014, '440914,59', '4474421,52', 1, 'Abierto', 'CIRCULO DE BELLAS ARTES DE MADRID', 93.24, 'CALLE', 'ALCALA', 'NUM', 42, 'Acera', '8:00:00', '1:30:00', '8:00:00', '1:00:00', '8:00:00', '1:30:00', '8:00:00', '1:00:00', 26, 91)];

    this.arrTempterrazas = await this.terrazasService.buscarTerrazaPorNombre(val);
  }

  onFocused(e) {
    // do something when input is focused
  }

}
