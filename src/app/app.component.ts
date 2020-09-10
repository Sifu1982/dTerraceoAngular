import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

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

  constructor(private router: Router) {
    this.desHome = true;
    this.userLogged = false;
  }
  ngOnInit() {

    //Desactivar el botón home en  "/home" y el botón ligin en "/login"


    const token = sessionStorage.getItem('token');
    if (token) {
      this.userLogged = true;
    }

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.router.url === '/home') {
          this.desHome = false;
        } else {
          this.desHome = true;
        };
        if (this.userLogged == true) {
          this.userLogged = false;
        } else {
          if (this.router.url === '/login') {
            this.desLogin = false;
          } else {
            this.desLogin = true;
          };
        }

      }
    });
  }
}
