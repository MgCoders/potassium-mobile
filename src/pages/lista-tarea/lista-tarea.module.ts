import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaTareaPage } from './lista-tarea';

@NgModule({
  declarations: [
    ListaTareaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaTareaPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class ListaTareaPageModule {}
