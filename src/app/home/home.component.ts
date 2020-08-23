import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TerrazasService } from '../terrazas.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fomularioBusquedaNombre: FormGroup;
  fomularioBusquedaAvanzada: FormGroup;

  arrBarrio: String[];
  arrNombreTerraza: String[];

  constructor(private terrazasService: TerrazasService) {

    this.fomularioBusquedaNombre = new FormGroup({
      nombre: new FormControl('', [

      ])
    });

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

  }

  ngOnInit(): void {

    const arrayTerrazasCarousel = this.terrazasService.getArrayTerrazasCarousel();

    const arrTemp = arrayTerrazasCarousel.map(terraza => terraza.desc_barrio_local);
    this.arrBarrio = [...new Set(arrTemp)];
    this.arrNombreTerraza = arrayTerrazasCarousel.map(terraza => terraza.rotulo);

    this.fomularioBusquedaNombre.controls.nombre.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      console.log(this.arrNombreTerraza.find(nombre => nombre.toLowerCase().includes(value.toLowerCase())));
    });

  }

  onChangeDistrito($event) {

  }

  onChangeBarrio($event) {

  }

  onSubmitBusquedaNombre() {

  }

  onSubmitBusquedaAvanzada() {
    console.log(this.fomularioBusquedaAvanzada.value);
  }
}
