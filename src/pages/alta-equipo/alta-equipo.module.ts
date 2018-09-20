import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaEquipoPage } from './alta-equipo';

@NgModule({
  declarations: [
    AltaEquipoPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaEquipoPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AltaEquipoPageModule {}
