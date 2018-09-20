import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaDescripcionPage } from './alta-descripcion';

@NgModule({
  declarations: [
    AltaDescripcionPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaDescripcionPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AltaDescripcionPageModule {}
