import { Component, OnInit } from '@angular/core';
import { Terraza } from '../models/terraza.model';
import { TerrazasService } from '../terrazas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  terraza: Terraza;

  constructor(
    private terrazasService: TerrazasService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.terraza = await this.terrazasService.getTerrazaById(parseInt(params.idTerraza));
      console.log(this.terraza);
    });
  }
}


