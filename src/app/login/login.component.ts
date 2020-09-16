import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuariosService } from 'src/app/usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  errores: any[];

  constructor(private usuariosService: UsuariosService, private router: Router) {
    this.formulario = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });

    this.errores = [];
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    const response = await this.usuariosService.login(this.formulario.value);
    console.log(response);
    if (response['SUCCESS']) {
      sessionStorage.setItem('token', response['token']);

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
        title: '<h4>Usuario logado correctamente.</h4>'
      });

      this.router.navigate(['/usuario', response['id_usuario']]);

    } else {
      this.errores = response;
      console.log('errores: ', this.errores);

    }
  };

}
