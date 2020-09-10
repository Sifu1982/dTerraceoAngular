import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = sessionStorage.getItem('token');
    if (token) {
      const jwt = new JwtHelperService();
      const decodedToken = jwt.decodeToken(token);
      // console.log('TOKEN: ', decodedToken);
      const paramUrl = next.params.idUsuario;
      if (decodedToken.userId == paramUrl) {
        return true;
      } else {
        this.notLogged();
        return false;
      }
    } else {
      this.notLogged();
      return false;
    }
  }

  notLogged() {
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
      title: '<h2>Por favor, haz login para acceder.</h2>'
    });

    this.router.navigate(['/login']);
  }

}
