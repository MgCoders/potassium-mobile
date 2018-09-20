import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaTareaPage } from './alta-tarea';

@NgModule({
  declarations: [
    AltaTareaPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaTareaPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AltaTareaPageModule {}
