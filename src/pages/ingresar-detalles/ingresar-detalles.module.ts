import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IngresarDetallesPage } from './ingresar-detalles';
import {LongPressModule} from "ionic-long-press";

@NgModule({
  declarations: [
    IngresarDetallesPage,
  ],
  imports: [
    IonicPageModule.forChild(IngresarDetallesPage),
    LongPressModule
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class IngresarDetallesPageModule {}
