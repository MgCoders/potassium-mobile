/**
 * Created by msteglich on 2/5/18.
 */
import * as models from './models';

export interface TrabajoFoto {

    id?: number;
    trabajo: models.Trabajo;
    foto: string;
    descripcion: string;

}
