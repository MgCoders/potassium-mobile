import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaClientePage } from './lista-cliente';

@NgModule({
  declarations: [
    ListaClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ListaClientePage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class ListaClientePageModule {}
