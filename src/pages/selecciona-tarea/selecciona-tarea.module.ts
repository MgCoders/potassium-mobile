import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeleccionaTareaPage } from './selecciona-tarea';

@NgModule({
  declarations: [
    SeleccionaTareaPage,
  ],
  imports: [
    IonicPageModule.forChild(SeleccionaTareaPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class SeleccionaTareaPageModule {}
