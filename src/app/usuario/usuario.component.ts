import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Terraza } from '../models/terraza.model';
import { FavoritosService } from '../favoritos.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TerrazasService } from '../terrazas.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  arrFavoritos: Terraza[];
  lat: number;
  lng: number;
  username: string;

  constructor(private favoritosService: FavoritosService, private terrazasService: TerrazasService) {
    this.arrFavoritos = [];
    this.username = 'User';
  }

  async ngOnInit() {

    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });

    const token = sessionStorage.getItem('token');
    if (token) {
      const jwt = new JwtHelperService();
      const decodedToken = jwt.decodeToken(token);
      const idUsuario = decodedToken.userId;
      this.username = decodedToken.username;
      try {
        const favoritos = await this.favoritosService.getByUserId(idUsuario);
        const objLocalStorage = JSON.parse(localStorage.getItem("dTerraceo"));
        for (const favorito of favoritos) {
          this.arrFavoritos.push(await this.terrazasService.getTerrazaById(parseInt(favorito.fk_terraza), objLocalStorage));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
