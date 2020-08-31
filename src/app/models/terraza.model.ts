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
    streetView: String;
    distancia: number;


    constructor(id_terraza = 0, id_distrito_local = 0, desc_distrito_local = '', id_barrio_local = 0, desc_barrio_local = '', cod_Postal = 0, coordenada_x_local = '', coordenada_y_local = '', id_situacion_local = 0, desc_situacion_local = '', rotulo = '', superficie_es = 0, desc_clase = '', desc_nombre = '', nom_terraza = '', num_terraza = 1, desc_ubicacion_terraza = '', hora_ini_lj_es, hora_fin_lj_es, hora_ini_lj_ra, hora_fin_lj_ra, hora_ini_vs_es, hora_fin_vs_es, hora_ini_vs_ra, hora_fin_vs_ra, mesas_es, sillas_es, streetView = '', distancia = 0) {

        this.id_terraza = id_terraza;
        this.id_distrito_local = id_distrito_local;
        this.desc_distrito_local = desc_distrito_local;
        this.id_barrio_local = id_barrio_local;
        this.desc_barrio_local = desc_barrio_local;
        this.cod_Postal = cod_Postal;
        this.coordenada_x_local = coordenada_x_local;
        this.coordenada_y_local = coordenada_y_local;
        this.id_situacion_local = id_situacion_local;
        this.desc_situacion_local = desc_situacion_local;
        this.rotulo = rotulo;
        this.superficie_es = superficie_es;
        this.desc_clase = desc_clase;
        this.desc_nombre = desc_nombre;
        this.nom_terraza = nom_terraza;
        this.num_terraza = num_terraza;
        this.desc_ubicacion_terraza = desc_ubicacion_terraza;
        this.hora_ini_lj_es = hora_ini_lj_es;
        this.hora_fin_lj_es = hora_fin_lj_es;
        this.hora_ini_lj_ra = hora_ini_lj_ra;
        this.hora_fin_lj_ra = hora_fin_lj_ra;
        this.hora_ini_vs_es = hora_ini_vs_es;
        this.hora_fin_vs_es = hora_fin_vs_es;
        this.hora_ini_vs_ra = hora_ini_vs_ra;
        this.hora_fin_vs_ra = hora_fin_vs_ra;
        this.mesas_es = mesas_es;
        this.sillas_es = sillas_es;
        this.streetView = streetView;
        this.distancia = distancia;
    }

}