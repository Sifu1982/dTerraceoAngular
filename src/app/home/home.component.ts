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

  arrBarrio: String[];

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

  }

  ngOnInit(): void {

    const arrayTerrazasCarousel = this.terrazasService.getArrayTerrazasCarousel();

    for (const terraza of arrayTerrazasCarousel) {

      if (this.arrBarrio.findIndex(barrio => barrio === terraza.desc_barrio_local) === -1) {
        this.arrBarrio.push(terraza.desc_barrio_local);
      }
    }


  }

  onChangeDistrito($event) {

  }

  onChangeBarrio($event) {

  }

  onSubmit() {
    console.log(this.fomularioBusquedaAvanzada.value);
  }
}
