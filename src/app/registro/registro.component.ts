import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formulario: FormGroup;
  errores: any[];

  constructor(private usuariosService: UsuariosService, private router: Router) {
    this.formulario = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9@*#]{5,50})$/)
      ])
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    const response = await this.usuariosService.register(this.formulario.value);
    console.log(response);

    if (response['SUCCESS']) {
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
        title: '<h4>Usuario registrado corectamente.</h4>'
      });

      this.router.navigate(['/login']);

    } else {
      this.errores = response;
    }
  };
}
