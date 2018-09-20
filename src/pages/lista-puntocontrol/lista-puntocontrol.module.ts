import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaPuntocontrolPage } from './lista-puntocontrol';

@NgModule({
  declarations: [
    ListaPuntocontrolPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaPuntocontrolPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class ListaPuntocontrolPageModule {}
