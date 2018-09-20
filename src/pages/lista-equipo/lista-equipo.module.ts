import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaEquipoPage } from './lista-equipo';

@NgModule({
  declarations: [
    ListaEquipoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaEquipoPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class ListaEquipoPageModule {}
