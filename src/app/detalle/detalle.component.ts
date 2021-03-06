import { Component, OnInit } from '@angular/core';
import { Terraza } from '../models/terraza.model';
import { TerrazasService } from '../terrazas.service';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FavoritosService } from '../favoritos.service';
import { ComentariosService } from '../comentarios.service';
import Swal from 'sweetalert2';
import { PuntuacionesService } from '../puntuaciones.service';
import { Options, LabelType } from 'ng5-slider';

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
  // Variables para slider de puntuaciones
  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 5,
    showTicks: true,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Mi puntuación:</b> ' + value;
        default:
          return '';
      }
    }
  }

  esFavorito: boolean;
  numfavoritos: number;
  usuarioId: string;
  terrazaId: string;
  token: any;
  comentarios: any[];
  estaLogado: boolean;
  puntuacionMedia: number;

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
    this.estaLogado = false;
    this.puntuacionMedia = 0;
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
        this.token = sessionStorage.getItem('token');
        this.terrazaId = params.idTerraza;
        this.numfavoritos = await this.favoritosService.getTerrazaId(this.terrazaId);

        if (this.token) {
          this.estaLogado = true;
          const jwt = new JwtHelperService();
          const decodedToken = jwt.decodeToken(this.token);
          this.usuarioId = decodedToken.userId;
          // FAVORITOS
          const getFavsUserTerr = await this.favoritosService.getAll(this.usuarioId, this.terrazaId);
          this.esFavorito = getFavsUserTerr['BOOLEAN'];
          // COMENTARIOS
          this.pintarComentarios();
          // GUARDAR PUNTUACIÓN USUARIO EN EL SLIDER
          const arrayUsuarioTerrazaPuntuacion = await this.puntuacionesService.puntuacionByIdUsuarioIdTerraza(this.usuarioId, this.terrazaId);
          if (arrayUsuarioTerrazaPuntuacion.length !== 0) {
            this.value = arrayUsuarioTerrazaPuntuacion[0].puntuacion;
          }
        }
        // COMENTARIOS
        this.pintarComentarios();
      } catch (err) {
        console.log(err);
      }
      try {
        this.calcularPuntuacionMedia();
      } catch (err) {
        console.log(err);
      }
    });
  }

  async pintarComentarios() {
    const comments = await this.comentariosService.getByTerrazaId(this.terrazaId);
    if (comments.length != 0) {
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
    if (this.token) {
      if (this.esFavorito === false) {
        const result = await this.favoritosService.create(this.usuarioId, this.terrazaId);
        this.esFavorito = true;
        this.numfavoritos = await this.favoritosService.getTerrazaId(this.terrazaId);
      } else {
        const result = await this.favoritosService.delete(this.usuarioId, this.terrazaId);
        this.esFavorito = false;
        this.numfavoritos = await this.favoritosService.getTerrazaId(this.terrazaId);
      }
    } else {
      this.notLogged('Es necesario estar logado para agregar a favoritos.');
    }
  }

  async onClikAddComment() {
    if (this.token) {
      const { value: text } = await Swal.fire({
        imageUrl: '../../assets/dTerraceo.logo_white.jpg',
        imageAlt: 'DTerraceo logo',
        input: 'textarea',
        inputPlaceholder: 'Escribe tu comentario aquí...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })
      if (text) {
        const result = await this.comentariosService.create(this.usuarioId, this.terrazaId, text);
        this.pintarComentarios();
      }
    } else {
      this.notLogged('Es necesario estar logado para agregar comentarios.');
    }
  }

  async onClikDeleteComment(comentario) {
    const result = await this.comentariosService.delete(comentario.id_comentario);
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
      imageUrl: '../../assets/dTerraceo.logo_white.jpg',
      imageAlt: 'DTerraceo logo',
      title: `<h4>${msg}</h4>`
    });
  }

  async onCambioSliderPuntuacion() {
    if (this.token) {
      await this.puntuacionesService.create(this.value, this.usuarioId, this.terrazaId);
      this.calcularPuntuacionMedia();
    } else {
      this.notLogged('Es necesario estar logado para poder puntuar las terrazas')
    }
  }

  async calcularPuntuacionMedia() {
    // Puntuación media terraza
    const puntuaciones = await this.puntuacionesService.getByIdTerraza(this.terrazaId);
    if (puntuaciones.length !== 0) {
      let suma = 0;
      for (const puntuacion of puntuaciones) {
        suma += puntuacion.puntuacion;
      }
      this.puntuacionMedia = suma / puntuaciones.length;
    }
  }
}
