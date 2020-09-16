import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dTerraceoAngular';

  desHome: Boolean;
  desLogin: Boolean;
  userLogged: Boolean;
  idUsuario: String;

  constructor(private router: Router) {
    this.desHome = true;
    this.userLogged = false;
  }
  ngOnInit() {
    //Desactivar el botón home en  "/home" y el botón login en "/login"
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.router.url === '/home') {
          this.desHome = false;
        } else {
          this.desHome = true;
        };
        if (this.router.url === '/login') {
          this.desLogin = false;
        } else {
          this.desLogin = true;
        };

        const token = sessionStorage.getItem('token');
        if (token != null) {
          this.userLogged = true;
          const jwt = new JwtHelperService();
          const decodedToken = jwt.decodeToken(token);
          this.idUsuario = decodedToken.userId
          // console.log('idUsuario', this.idUsuario);

        }
      }
    });
  }


  onClick() {
    sessionStorage.removeItem('token');
    this.userLogged = false;
    this.router.navigate(['/home']);
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
      icon: 'success',
      title: '<h4>Sesión cerrada correctamente.</h4>'
    });
  }

}
