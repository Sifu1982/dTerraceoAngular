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

  constructor(private terrazasService: TerrazasService) { }

  ngOnInit(): void {
    this.terrazas = this.terrazasService.getArrayTerrazasCarousel();
  }

}
