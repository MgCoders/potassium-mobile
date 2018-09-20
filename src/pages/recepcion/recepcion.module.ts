import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecepcionPage } from './recepcion';

@NgModule({
  declarations: [
    RecepcionPage,
  ],
  imports: [
    IonicPageModule.forChild(RecepcionPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class RecepcionPageModule {}
