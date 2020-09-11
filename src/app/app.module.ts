import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DetalleComponent } from './detalle/detalle.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AvisoLegalComponent } from './aviso-legal/aviso-legal.component';
import { ProteccionDeDatosComponent } from './proteccion-de-datos/proteccion-de-datos.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RegistroComponent } from './registro/registro.component';
import { environment } from './../environments/environment';
import { CarouselModule } from "ngx-carousel-lib";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BusquedaComponent,
    DetalleComponent,
    LoginComponent,
    UsuarioComponent,
    AvisoLegalComponent,
    ProteccionDeDatosComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    NgbModule,
    AutocompleteLibModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    SweetAlert2Module,
    AgmCoreModule.forRoot({
      // apiKey: environment.GOOGLE_API_KEY
    }),
    GoogleMapsModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
