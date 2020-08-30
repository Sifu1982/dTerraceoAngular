import { Component, OnInit } from '@angular/core';
import { Terraza } from '../models/terraza.model';
import { TerrazasService } from '../terrazas.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  terraza: Terraza[];
  hola: String;

  constructor(private terrazasService: TerrazasService,) { }

  ngOnInit(): void {
    this.terraza = this.terrazasService.getTerrazaById(3891)[0]; //Pasar no un 3891, si no el Id de la terraza, con Router, como en app.component.ts
    this.hola = 'HOLA MUNDO'
  }

}
