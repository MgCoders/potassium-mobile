import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ListaRegistroPage} from "./lista-registro";

@NgModule({
  declarations: [
    ListaRegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaRegistroPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class ListaRegistroPageModule {}
