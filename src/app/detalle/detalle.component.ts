import { Component, OnInit } from '@angular/core';
import { Terraza } from '../models/terraza.model';
import { TerrazasService } from '../terrazas.service';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FavoritosService } from '../favoritos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  terraza: Terraza;

  // Variable para zoom del mapa
  zoom: number;
  // Variables para la geolocalización
  lat: number;
  lng: number;

  esFavorito: boolean;
  usuarioId: string;
  terrazaId: string;
  token: any;

  constructor(
    private terrazasService: TerrazasService,
    private activatedRoute: ActivatedRoute,
    private favoritosService: FavoritosService
  ) {
    this.terraza = new Terraza();
    this.zoom = 17;
    this.esFavorito = false;
    this.usuarioId = '';
    this.terrazaId = '';
  }

  ngOnInit() {
    // Conseguir la posición del usuario
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });


    this.activatedRoute.params.subscribe(async params => {
      const objLocalStorage = JSON.parse(localStorage.getItem("dTerraceo"));
      try {
        this.terraza = await this.terrazasService.getTerrazaById(parseInt(params.idTerraza), objLocalStorage);
        // console.log(this.terraza);
        this.token = sessionStorage.getItem('token');
        if (this.token) {
          const jwt = new JwtHelperService();
          const decodedToken = jwt.decodeToken(this.token);
          this.usuarioId = decodedToken.userId;
          this.terrazaId = params.idTerraza;
          const getFavs = await this.favoritosService.getAll(this.usuarioId, this.terrazaId);
          this.esFavorito = getFavs['BOOLEAN'];
          // console.log('this.esFavorito', this.esFavorito);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  async onClickFav() {
    console.log('this.token', this.token);

    if (this.token) {
      if (this.esFavorito === false) {
        const result = await this.favoritosService.create(this.usuarioId, this.terrazaId);
        this.esFavorito = true;
        // console.log('result create', result);
      } else {
        const result = await this.favoritosService.delete(this.usuarioId, this.terrazaId);
        this.esFavorito = false;
        // console.log('result delete', result);
      }
    } else {
      this.notLogged('Es necesario estar logado para agregar favoritos.');
    }
  }

  notLogged(msg) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'error',
      title: `<h4>${msg}</h4>`
    });
  }

}
