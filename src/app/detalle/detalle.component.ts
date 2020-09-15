import { Component, OnInit } from '@angular/core';
import { Terraza } from '../models/terraza.model';
import { TerrazasService } from '../terrazas.service';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FavoritosService } from '../favoritos.service';
import { ComentariosService } from '../comentarios.service';
import Swal from 'sweetalert2';
import { PuntuacionesService } from '../puntuaciones.service';

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
  numfavoritos: number;
  usuarioId: string;
  terrazaId: string;
  token: any;
  comentarios: any[];

  constructor(
    private terrazasService: TerrazasService,
    private activatedRoute: ActivatedRoute,
    private favoritosService: FavoritosService,
    private puntuacionesService: PuntuacionesService,
    private comentariosService: ComentariosService
  ) {
    this.terraza = new Terraza();
    this.zoom = 17;
    this.esFavorito = false;
    this.numfavoritos = 0;
    this.usuarioId = '';
    this.terrazaId = '';
    this.comentarios = [];
  }

  async ngOnInit() {
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

        this.terrazaId = params.idTerraza;
        this.numfavoritos = await this.favoritosService.getTerrazaId(this.terrazaId);
        // console.log('this.numfavoritos', this.numfavoritos);

        if (this.token) {
          const jwt = new JwtHelperService();
          const decodedToken = jwt.decodeToken(this.token);
          this.usuarioId = decodedToken.userId;
          // FAVORITOS
          const getFavsUserTerr = await this.favoritosService.getAll(this.usuarioId, this.terrazaId);
          this.esFavorito = getFavsUserTerr['BOOLEAN'];
          // COMENTARIOS
          this.pintarComentarios();
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  async pintarComentarios() {
    const comments = await this.comentariosService.getByTerrazaId(this.terrazaId);
    if (comments.length !== 0) {
      for (const comment of comments) {
        if (this.usuarioId == comment.fk_usuario) {
          comment.isOwner = true;
        } else {
          comment.isOwner = false;
        }
      }
    }
    this.comentarios = comments;
  }

  async onClickFav() {
    // console.log('this.token', this.token);
    if (this.token) {
      if (this.esFavorito === false) {
        const result = await this.favoritosService.create(this.usuarioId, this.terrazaId);
        this.esFavorito = true;
        this.numfavoritos = await this.favoritosService.getTerrazaId(this.terrazaId);
        // console.log('result create', result);
      } else {
        const result = await this.favoritosService.delete(this.usuarioId, this.terrazaId);
        this.esFavorito = false;
        this.numfavoritos = await this.favoritosService.getTerrazaId(this.terrazaId);
        // console.log('result delete', result);
      }
    } else {
      this.notLogged('Es necesario estar logado para agregar a favoritos.');
    }
  }

  async onClikAddComment() {
    if (this.token) {
      const { value: text } = await Swal.fire({
        input: 'textarea',
        inputPlaceholder: 'Escribe tu comentario aquí...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })
      if (text) {
        const result = this.comentariosService.create(this.usuarioId, this.terrazaId, text);
        this.pintarComentarios();
      }
    } else {
      this.notLogged('Es necesario estar logado para agregar comentarios.');
    }
  }

  async onClikDeleteComment(comentario) {
    const result = this.comentariosService.delete(comentario.id_comentario);
    this.pintarComentarios();
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
