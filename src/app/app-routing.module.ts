import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DetalleComponent } from './detalle/detalle.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AvisoLegalComponent } from './aviso-legal/aviso-legal.component';
import { ProteccionDeDatosComponent } from './proteccion-de-datos/proteccion-de-datos.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'detalle/:idTerraza', component: DetalleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuario/:idUsuario', component: UsuarioComponent, canActivate: [LoginGuard] },
  { path: 'avisoLegal', component: AvisoLegalComponent },
  { path: 'proteccionDeDatos', component: ProteccionDeDatosComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
