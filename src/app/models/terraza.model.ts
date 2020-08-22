export class Terraza {
    id_terraza: number;
    id_distrito_local: number;
    desc_distrito_local: string;
    id_barrio_local: number;
    desc_barrio_local: string;
    Cod_Postal: number;
    coordenada_x_local: string;
    coordenada_y_local: string;
    id_situacion_local: number;
    desc_situacion_local: string;
    rotulo: string;
    Superficie_ES: number;
    DESC_CLASE: string;
    DESC_NOMBRE: string;
    nom_terraza: string;
    num_terraza: number;

    constructor(id_terraza = 0, id_distrito_local = 0, desc_distrito_local = '', id_barrio_local = 0, desc_barrio_local = '', Cod_Postal = 0, coordenada_x_local = '', coordenada_y_local = '', id_situacion_local = 0, desc_situacion_local = '', rotulo = '', Superficie_ES = 0, DESC_CLASE = '', DESC_NOMBRE = '', nom_terraza = '', num_terraza = 1) {

        this.id_terraza = id_terraza;
        this.id_distrito_local = id_distrito_local;
        this.desc_distrito_local = desc_distrito_local;
        this.id_barrio_local = id_barrio_local;
        this.desc_barrio_local = desc_barrio_local;
        this.Cod_Postal = Cod_Postal;
        this.coordenada_x_local = coordenada_x_local;
        this.coordenada_y_local = coordenada_y_local;
        this.id_situacion_local = id_situacion_local;
        this.desc_situacion_local = desc_situacion_local;
        this.rotulo = rotulo;
        this.Superficie_ES = Superficie_ES;
        this.DESC_CLASE = DESC_CLASE;
        this.DESC_NOMBRE = DESC_NOMBRE;
        this.nom_terraza = nom_terraza;
        this.num_terraza = num_terraza;

    }

}