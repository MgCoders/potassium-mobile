import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoEquipoPage } from './nuevo-equipo';

@NgModule({
  declarations: [
    NuevoEquipoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoEquipoPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class NuevoEquipoPageModule {}
