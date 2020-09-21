export class Terraza {
    id_terraza: number;
    id_distrito_local: number;
    desc_distrito_local: string;
    id_barrio_local: number;
    desc_barrio_local: string; //Nombre barrio
    cod_Postal: number;
    coordenada_x_local: string;
    coordenada_y_local: string;
    id_situacion_local: number;
    desc_situacion_local: string;   //Abierto, baja reunificación, cerrado y en obras
    rotulo: string;             //Nombre de la terraza
    superficie_es: number;
    desc_clase: string;         //Tipo vía
    desc_nombre: string;        //Nombre de la vía
    nom_terraza: string;        //Número
    num_terraza: number;        //Dígito de la terraza
    desc_ubicacion_terraza: string; //Descripción ubicación
    hora_ini_lj_es: Date;
    hora_fin_lj_es: Date;
    hora_ini_lj_ra: Date;
    hora_fin_lj_ra: Date;
    hora_ini_vs_es: Date;
    hora_fin_vs_es: Date;
    hora_ini_vs_ra: Date;
    hora_fin_vs_ra: Date;
    mesas_es: number;
    sillas_es: number;
    streetView: string;
    distancia: number;
    googlePlacesData: { telefono: string, imagenes: string[] };
    puntuacionMedia: number;

}