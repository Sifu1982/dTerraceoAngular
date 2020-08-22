import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TerrazasService } from '../terrazas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fomularioBusquedaAvanzada: FormGroup;

  // arrDistrito: String[];
  arrBarrio: String[];

  constructor(private terrazasService: TerrazasService) {

    this.fomularioBusquedaAvanzada = new FormGroup({
      // distrito: new FormControl('', [

      // ]),
      barrio: new FormControl('', [

      ]),
      calle: new FormControl('', [

      ]),
      cercaDeMi: new FormControl('', [

      ]),
    });

    // this.arrDistrito = [];
    this.arrBarrio = [''];

  }

  ngOnInit(): void {

    const arrayTerrazasCarousel = this.terrazasService.getArrayTerrazasCarousel();

    for (const terraza of arrayTerrazasCarousel) {
      // if (this.arrDistrito.findIndex(distrito => distrito === terraza.desc_distrito_local) === -1) {
      //   this.arrDistrito.push(terraza.desc_distrito_local);
      // }
      if (this.arrBarrio.findIndex(barrio => barrio === terraza.desc_barrio_local) === -1) {
        this.arrBarrio.push(terraza.desc_barrio_local);
      }
    }

    console.log(this.arrBarrio);


  }

  onChangeDistrito($event) {

  }

  onChangeBarrio($event) {

  }

  onSubmit() {
    console.log(this.fomularioBusquedaAvanzada.value);
  }
}
